import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import HTMLWebpackPlugin from "html-webpack-plugin";
import HTMLWebpackTagsPlugin from "html-webpack-tags-plugin";
import { join, resolve } from "path";
import { Configuration, DefinePlugin, DevtoolModuleFilenameTemplateInfo, DllReferencePlugin } from "webpack";
import { Configuration as DevServerConfig } from "webpack-dev-server";

import { development } from "../app.config.json";

const config = (dirPath: string): Configuration => {
  return {
    devServer: ((): DevServerConfig => {
      return {
        contentBase: join(dirPath, "dev"),
        host: development.host,
        hotOnly: true,
        inline: true,
        port: development.port,
        publicPath: "/",
      };
    })(),
    devtool: "eval-source-map",
    output: {
      // You might need to modify this to suit your own environments
      devtoolFallbackModuleFilenameTemplate: "webpack:///[resource-path]?[hash]",
      devtoolModuleFilenameTemplate: (info: DevtoolModuleFilenameTemplateInfo) => `sources://${info.resourcePath}`,
      filename: "[name].js",
      path: join(dirPath, "/dev"),
      publicPath: "/",
    },
    plugins: [
      process.env.WEBPACK_DEV_SERVER && new ReactRefreshWebpackPlugin(),
      new DefinePlugin({
        __MAP_ACCESS_TOKEN__: JSON.stringify(development.mapAccessToken),
      }),
      new DllReferencePlugin({
        context: ".",
        manifest: resolve(join(dirPath, "/dev/libs-manifest.json")),
      }),
      new HTMLWebpackPlugin({
        filename: "index.html",
        inject: true,
        template: join(dirPath, "/src/html/index.html"),
        title: development.title,
      }),
      new HTMLWebpackTagsPlugin({
        append: false,
        scripts: ["libs.js"],
        publicPath: "/",
      }),
    ].filter(Boolean),
  };
};

export default config;
