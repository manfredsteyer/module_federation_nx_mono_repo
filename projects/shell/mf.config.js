const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

exports.default = {
    config: function(config) {

        config.output.publicPath = 'http://localhost:5000/';
        config.output.uniqueName = 'shell';
        config.optimization.runtimeChunk = false;

        config.plugins.unshift(new ModuleFederationPlugin({
            // remoteType: 'var',
            remotes: {
              mfe1: "mfe1@http://localhost:3000/remoteEntry.js"
            },
            shared: ["@angular/core", "@angular/common", "@angular/router"]
        }));

        return config;
    }
}

