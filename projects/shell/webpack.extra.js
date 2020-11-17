const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        mfe1: "mfe1@http://localhost:3000/remoteEntry.js" 
      },
      shared: ["@angular/core", "@angular/common", "@angular/router"]
    })
  ],
};


