const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.output = {
        ...webpackConfig.output,
        publicPath:
          'auto'
      };
      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new ModuleFederationPlugin({
          name: 'editor',
          filename: 'editor.js',
          exposes: {
            './App': './src/App',
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