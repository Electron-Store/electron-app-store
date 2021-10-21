module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptioons: {
                publish: [{
                    provider: "github",
                    owner: "Electron-Store",
                    repo: "electron-app-store"
                }]
            },
        },
    },
};