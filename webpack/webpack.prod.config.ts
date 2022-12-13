import SentryCliPlugin from "@sentry/webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
//@ts-ignore
import DeleteSourceMapsWebpackPlugin from "delete-source-maps-webpack-plugin";
import dotenv from "dotenv";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import { WebpackPluginInstance } from "webpack";
import { WebpackConfiguration } from "webpack-dev-server";
import { merge } from "webpack-merge";
import commonConfig from "./webpack.common.config";

const sentryPlugin = (): WebpackPluginInstance => {
  dotenv.config();
  return new SentryCliPlugin({
    include: "./build",
    setCommits: {
      commit: process.env.REACT_APP_COMMIT,
      repo: "Moriarty33/handle-errors-web",
    },
    release: process.env.REACT_APP_COMMIT,
    dryRun: !process.env.REACT_APP_COMMIT,
  });
};

export const config: WebpackConfiguration = {
  mode: "production",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "../build"),
    publicPath: "/",
    clean: true,
    filename: "[name].[contenthash].js",
    chunkFilename: "[id].[contenthash].js",
  },
  optimization: {
    minimizer: ["...", new CssMinimizerPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(css|scss|sass)$/i,
        use: [
          "style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
    sentryPlugin(),
    new DeleteSourceMapsWebpackPlugin(),
  ],
};

export default merge(commonConfig, config);
