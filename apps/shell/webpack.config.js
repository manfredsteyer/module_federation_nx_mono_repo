const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');

module.exports = {
    output: {
        uniqueName: "shell",
        chunkFilename: '[name]-[contenthash].js',
    },
    optimization: {
        // Only needed to bypass a temporary bug
        runtimeChunk: false
    },
    plugins: [
        new ModuleFederationPlugin({
            remotes: {
                'mfe1': "mfe1@http://localhost:3000/remoteEntry.js" 
            },
            shared: {
                "@angular/core": {
                    singleton: true,
                    strictVersion: true
                },
                "@angular/common": {
                    singleton: true,
                    strictVersion: true
                },
                "@angular/router": {
                    singleton: true,
                    strictVersion: true
                },
                "auth-lib": {
                    import: path.resolve(__dirname, "../../libs/auth-lib/src/index.ts"),
                    requiredVersion: false
                }
            }
        })
    ],
};