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
                mac: {
                    target: [{
                        target: "dmg",
                        arch: ["universal"]
                    }]
                },
                linux: {
                    target: [{
                            target: "AppImage",
                            arch: ['x64']
                        },
                        {
                            target: "deb",
                            arch: ['x64']
                        },
                        {
                            target: "rpm",
                            arch: ['x64']
                        },
                    ],
                },
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
