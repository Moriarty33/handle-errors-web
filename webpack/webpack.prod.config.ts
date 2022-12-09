import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import { WebpackConfiguration } from "webpack-dev-server";
import { merge } from "webpack-merge";
import commonConfig from "./webpack.common.config";

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
  ],
};

export default merge(commonConfig, config);
