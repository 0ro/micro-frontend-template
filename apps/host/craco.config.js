// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // ts-loader is required to reference external typescript projects/files (non-transpiled)
      webpackConfig.module.rules.push({
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
          configFile: "tsconfig.json",
        },
      });

      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new ModuleFederationPlugin({
          name: "host",
          remotes: {
            remote: "remote@http://127.0.0.1:5001/remote.js",
          },
          shared: {
            react: {
              singleton: true,
            },
            "react-dom": {
              singleton: true,
            },
            store: {
              singleton: true,
            },
          },
        }),
      ];
      return webpackConfig;
    },
  },
};
