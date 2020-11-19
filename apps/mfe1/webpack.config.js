const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const SharedMappings = require('./shared-mappings').default;

const sharedMappings = new SharedMappings();
sharedMappings.register('../../tsconfig.base.json');

module.exports = {
  output: {
    uniqueName: "mfe1"
  },
  optimization: {
    // Only needed to bypass a temporary bug
    runtimeChunk: false
  },
  plugins: [
    sharedMappings.getPlugin(),
    // new webpack.NormalModuleReplacementPlugin(
    //   /auth-lib/, function(r) {

    //       // if ( r.contextInfo && r.contextInfo.issuer && r.contextInfo.issuer.includes('flight-search.component.ts')
          
    //       //     && r.request.includes('auth-lib')
    //       // ) {

    //       //     console.log('replace');
    //     if (r.request.includes('auth-lib') && r.context && r.context.includes('mfe1')) {
    //       console.log('c', r.context);
    //       console.log('r', r.request);
    //       console.log('c+r', path.join(r.context, r.request));

    //       console.log('---');
    //       //console.log('ctx', path.normalize(r.context));

    //       // console.log('request', path.normalize(r.request));
    //       // context.request = path.combine(__dirname, 'libs/auth-lib/src/index.ts'); 
    //       r.request = 'auth-lib';
    //   }
      
    //   }
    // ),
    new ModuleFederationPlugin({
      
        // For remotes (please adjust)
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
          // "auth-lib": {
          //   import: path.resolve(__dirname, "../../libs/auth-lib/src/index.ts"),
          //   requiredVersion: false
          // },
          ...sharedMappings.getDescriptors()
        }
        
    })
  ],
};
