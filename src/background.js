"use strict";

import downloadsFolder from "downloads-folder";

import {
    app,
    protocol,
    screen,
    BrowserWindow,
    ipcMain,
    dialog,
    Menu,
    shell,
} from "electron";
import settings from "electron-settings";
import { autoUpdater } from "electron-updater";
import { exec } from "child_process";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
const { DownloaderHelper } = require("node-downloader-helper");
const isDevelopment = process.env.NODE_ENV !== "production";
// const path = require("path");

Menu.setApplicationMenu(null);
autoUpdater.checkForUpdatesAndNotify();

let downloadFolder = downloadsFolder();

protocol.registerSchemesAsPrivileged([
    { scheme: "app", privileges: { secure: true, standard: true } },
]);
var win;

async function createWindow() {
    win = new BrowserWindow({
        width: screen.getPrimaryDisplay().bounds.width - 50,
        height: screen.getPrimaryDisplay().bounds.height - 50,
        frame: false,
        webPreferences: {
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            webviewTag: true,
        },
        title: "Electron App Store",
    });
    app.setName("Electron App Store");
    win.maximize();
    captureDownloadEvents(win);
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    } else {
        createProtocol("app");
        // Load the index.html when not in development
        win.loadURL("app://./index.html");
    }
    win.webContents.on("new-window", function(e, url) {
        e.preventDefault();
        require("electron").shell.openExternal(url);
    });
    win.addEventListener("maximize", () => {
        win.webContents.send("windowIsMaximize", true)
    })
    win.addEventListener("move", () => {
        win.webContents.send("windowIsMaximize", false)
    })

}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async() => {
    createWindow();
    if (isDevelopment) {
        win.openDevTools()
    }

});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === "win32") {
        process.on("message", (data) => {
            if (data === "graceful-exit") {
                app.quit();
            }
        });
    } else {
        process.on("SIGTERM", () => {
            app.quit();
        });
    }
}

ipcMain.on("windowAction", (e, action) => {
    console.log(action)
    if (action == "close") {
        app.quit()
        return
    }
    if (action == "minimize") {
        win.minimize()
        return
    }
    if (action == "maximize") {
        win.maximize()
        return
    }
    if (action == "unmaximize") {
        win.unmaximize()
        win.center()
        return
    }
})

ipcMain.handle("sendSettings", async() => {
    return await getSettings();
});
ipcMain.handle("getAppVersion", async() => {
    return app.getVersion();
});

ipcMain.on("setSetting", async(e, payload) => {
    await settings.set(`${payload[0]}`, payload[1]);
});

ipcMain.on("showFolderDialog", () => {
    dialog
        .showOpenDialog(win, { properties: ["openDirectory"] })
        .then((result) => {
            win.webContents.send("updateSetting", [
                "saveFolder",
                result.filePaths[0],
            ]);
        })
        .catch((err) => {
            console.log(err);
        });
});

const downloads = new Map();

ipcMain.on("downloadFile", (e, download) => {
    initiateFileDownload(download);
});

ipcMain.on("retry", (e, id) => {
    console.log("Retrying");
    const url = downloads.get(id).url;
    const dl = new DownloaderHelper(url, downloadFolder);
    addDownloadListeners(dl, id);
    dl.start();
    win.webContents.send("updateDownload", {
        id,
        percent: 0,
        fileSize: 0,
        state: "Downloading",
    });
});

ipcMain.on("cancel", (e, id) => {
    console.log("Canceling");
    const dl = downloads.get(id).dl;
    dl.stop();
    win.webContents.send("updateDownload", {
        id,
        percent: 0,
        fileSize: 0,
        state: "Canceled",
    });
});

ipcMain.on("pause", (e, id) => {
    console.log("Pausing");
    const dl = downloads.get(id).dl;
    dl.pause();
    win.webContents.send("updateDownloadState", { id, state: "Paused" });
});

ipcMain.on("resume", (e, id) => {
    console.log("Resuming");
    const dl = downloads.get(id).dl;
    dl.resume();
    win.webContents.send("updateDownloadState", { id, state: "Downloading" });
});

ipcMain.on("openFileLocation", (e, filePath) => {
    shell.showItemInFolder(filePath);
});

function initiateFileDownload(download) {
    const dl = new DownloaderHelper(download.url, downloadFolder, {
        override: true,
    });
    downloads.set(download.id, {
        ...download,
        dl,
    });
    addDownloadListeners(dl, download.id);
    dl.start();
}

function bytesTopMb(bytes) {
    return Math.floor(bytes / 1000000);
}

function addDownloadListeners(dlObject, id) {
    dlObject.on("error", (info) => {
        console.log("Download Error");
        console.log(info);
        win.webContents.send("updateDownload", {
            id,
            percent: 0,
            fileSize: 0,
            state: "Canceled",
        });
    });
    dlObject.on("end", (info) => {
        if (info.incomplete) return;
        win.webContents.send("updateDownload", {
            id,
            percent: 100,
            fileSize: info.onDiskSize,
            state: "Completed",
            fileName: info.fileName,
            filePath: info.filePath,
        });
        spawnSilentInstall(id, info);
    });
    dlObject.on("progress", (stats) => {
        const percent = Math.floor(stats.progress);
        const fileSize = bytesTopMb(stats.total);
        const state = "Downloading";
        console.log("downloading");
        win.webContents.send("updateDownload", {
            id,
            percent,
            fileSize,
            state,
        });
    });
}

async function getSettings() {
    const savedSettings = await settings.get();
    console.log(savedSettings);
    const defaultSettings = {
        darkMode: false,
        saveFolder: downloadFolder,
    };
    const settingsToSend = Object.assign(defaultSettings, savedSettings);
    downloadFolder = settingsToSend.saveFolder;
    return settingsToSend;
}

function spawnSilentInstall(id, info) {
    console.log("Spawning installer");
    console.log(info);
    const exeRegex = /exe/i
    const appImageRegex = /appimage/i;
    if (exeRegex.test(info.filePath)) {
        exec(`${info.filePath}`, function(err, data) {
            if (err) return;
            sendInstallInfo(id, info)
        });
    }
    if (appImageRegex.test(info.filePath)) {
        exec(`chmod +x ${info.filePath} && ${info.filePath}`, function(err, data) {
            if (err) {
                console.log(err);
                return;
            };
            console.log(data)
            sendInstallInfo(id, info)
        });
    }
}

function sendInstallInfo(id, info) {
    win.webContents.send("updateDownload", {
        id,
        percent: 100,
        fileSize: info.onDiskSize,
        state: "Installed",
        fileName: info.fileName,
        filePath: info.filePath,
    });
}

function captureDownloadEvents(win) {
    win.webContents.session.on("will-download", (e, item, webContents) => {
        e.preventDefault();
        const fileURL = item.getURL();
        const newDownload = {
            id: Date(),
            url: fileURL,
            name: fileURL,
            percent: 0,
            fileSize: "0mb",
            state: "Starting",
        };
        win.webContents.send("newWebsiteDownload", newDownload);
        initiateFileDownload(newDownload);
    });
}
