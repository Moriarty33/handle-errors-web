import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";
import {
  Configuration as WebpackDevServerConfiguration,
  WebpackConfiguration,
} from "webpack-dev-server";
import { merge } from "webpack-merge";
import commonConfig from "./webpack.common.config";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

export const config: Configuration = {
  mode: "development",
  target: "web",
  devtool: "eval-source-map",
  devServer: {
    static: path.join(__dirname, "../dist"),
    historyApiFallback: true,
    port: 3000,
    open: false,
    hot: true,
    devMiddleware: {
      stats: "minimal",
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [require("react-refresh/babel")],
          },
        },
      },
      {
        test: /\.(css|scss|sass)$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [new ReactRefreshWebpackPlugin()],
};

export default merge(commonConfig, config);
