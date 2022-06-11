const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

    name: "mfe1",

    exposes: {
      './Module': './apps/mfe1/src/app/flights/flights.module.ts',
    }, 

    shared: shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),

    sharedMappings: ['@demo/auth-lib'],

});