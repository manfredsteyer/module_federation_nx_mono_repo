const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

exports.default = {
    config: function(config) {

        config.output.publicPath = "http://localhost:3000/";
        config.output.uniqueName = 'mfe1';
        config.optimization.runtimeChunk = false;

        config.plugins.unshift(new ModuleFederationPlugin({
            name: "mfe1",
            library: { type: "var", name: "mfe1" },
            filename: "remoteEntry.js",
            exposes: {
              './Component': './projects/mfe1/src/app/app.component.ts',
              './Module': './projects/mfe1/src/app/flights/flights.module.ts'
            },
            shared: ["@angular/core", "@angular/common", "@angular/router"]
          }));

        return config;
    }
}
