module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            mainProcessFile: "main/background.js",
            builderOptions: {
                appId: "electron-store",
                productName: "Electron Store",
                publish: [{
                    provider: "github",
                    owner: "Electron-Store",
                    repo: "electron-app-store",
                }],
                snap: {
                    title: "Electron Store",
                    confinement: "classic",
                    summary: "The Internet's App Store",
                    grade: "devel",
                },
            },
        },
    },
};
