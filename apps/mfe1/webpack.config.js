const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
    path.join(__dirname, '../../tsconfig.base.json'),
    ['@demo/auth-lib']    
);

module.exports = {
  output: {
    uniqueName: "mfe1"
  },
  optimization: {
    // Only needed to bypass a temporary bug
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "mfe1",
      filename: "remoteEntry.js",
      exposes: {
          './Module': './apps/mfe1/src/app/flights/flights.module.ts',
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
        ...sharedMappings.getDescriptors()
      }
    }),
    sharedMappings.getPlugin(),
  ],
};
