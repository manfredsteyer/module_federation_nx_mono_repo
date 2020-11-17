const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

// MFE1
module.exports = {
  output: {
    publicPath: "http://localhost:3000/"
  },
  plugins: [
   
    new ModuleFederationPlugin({
      name: "mfe1",
      library: { type: "var", name: "mfe1" },
      filename: "remoteEntry.js",
      exposes: {
        './Component': './projects/mfe1/src/app/app.component.ts',
        './Module': './projects/mfe1/src/app/flights/flights.module.ts'
      },
      shared: ["@angular/core", "@angular/common", "@angular/router"]
    }),

  ],
};


