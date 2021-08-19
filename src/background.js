"use strict";

import {
	app,
	protocol,
	screen,
	BrowserWindow,
	ipcMain,
	dialog,
	Menu,
} from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
const { DownloaderHelper } = require("node-downloader-helper");
import settings from "electron-settings";
const isDevelopment = process.env.NODE_ENV !== "production";
const path = require("path");

let downloadFolder = path.join(require("os").homedir(), "Downloads");

protocol.registerSchemesAsPrivileged([
	{ scheme: "app", privileges: { secure: true, standard: true } },
]);
var win;

async function createWindow() {
	Menu.setApplicationMenu(null);
	// Create the browser window.
	win = new BrowserWindow({
		width: screen.getPrimaryDisplay().bounds.width,
		height: screen.getPrimaryDisplay().bounds.height,
		webPreferences: {
			// Use pluginOptions.nodeIntegration, leave this alone
			// See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
			nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
			contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
		},
	});

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
app.on("ready", async () => {
	createWindow();
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

ipcMain.handle("sendSettings", async () => {
	return await getSettings();
});

ipcMain.on("setSetting", async (e, payload) => {
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
	console.log(download);
	const dl = new DownloaderHelper(download.url, downloadFolder);
	downloads.set(download.id, {
		...download,
		dl,
	});
	setUpDownload(dl, download.id);
	dl.start();
});

ipcMain.on("retry", (e, id) => {
	console.log("Retrying");
	const url = downloads.get(id).url;
	const dl = new DownloaderHelper(url, downloadFolder);
	setUpDownload(dl, id);
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

function bytesTopMb(bytes) {
	return Math.floor(bytes / 1000000);
}

function setUpDownload(dlObject, id) {
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
		win.webContents.send("updateDownload", {
			id,
			percent: 100,
			fileSize: info.onDiskSize,
			state: "Completed",
			fileName: info.fileName,
			filepath: info.filePath,
		});
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
