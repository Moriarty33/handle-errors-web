import CopyWebpackPlugin from "copy-webpack-plugin";
import Dotenv from "dotenv-webpack";
import ESLintPlugin from "eslint-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
import { Configuration as WebpackConfiguration, ProgressPlugin } from "webpack";

const commonConfig: WebpackConfiguration = {
  entry: "./src/index.tsx",
  output: {
    publicPath: "/",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      fs: false,
      net: false,
    },
  },
  plugins: [
    new ProgressPlugin({
      entries: false,
      dependencies: false,
    }),
    new NodePolyfillPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: "public" }],
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new Dotenv({
      expand: true,
      systemvars: true,
    }),
    new ESLintPlugin({
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    }),
  ],
};

export default commonConfig;
