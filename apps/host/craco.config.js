const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.plugins = [ 
        ...webpackConfig.plugins,
        new ModuleFederationPlugin({
          name: 'host',
          remotes: {
            editor: "editor@http://127.0.0.1:5001/editor.js",
          },
          shared: {
            react: {
              singleton: true
            }
          }
        })
      ]
      return webpackConfig;
    },
  },
};