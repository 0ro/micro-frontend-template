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

      webpackConfig.output = {
        ...webpackConfig.output,
        publicPath: "auto",
      };
      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new ModuleFederationPlugin({
          name: "remote",
          filename: "remote.js",
          exposes: {
            "./App": "./src/App",
          },
          shared: {
            react: {
              requiredVersion: deps.react,
              singleton: true,
            },
            "react-dom": {
              requiredVersion: deps.react,
              singleton: true,
            },
            "react-router-dom": {
              singleton: true,
              requiredVersion: deps["react-router-dom"],
            },
            store: {
              singleton: true,
            },
            ui: {
              singleton: true,
            },
          },
        }),
      ];
      return webpackConfig;
    },
  },
};
