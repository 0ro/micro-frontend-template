// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { ModuleFederationPlugin } = require("webpack").container;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const deps = require("./package.json").dependencies;

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
            editor: "editor@http://127.0.0.1:5001/editor.js",
          },
          shared: {
            react: {
              singleton: true,
              eager: true,
              requiredVersion: deps.react,
            },
            "react-dom": {
              singleton: true,
              eager: true,
              requiredVersion: deps["react-dom"],
            },
            "react-router-dom": {
              singleton: true,
              eager: true,
              requiredVersion: deps["react-router-dom"],
            },
            store: {
              eager: true,
              singleton: true,
            },
            ui: {
              eager: true,
              singleton: true,
            },
          },
        }),
      ];
      return webpackConfig;
    },
  },
};
