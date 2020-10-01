import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CompressionWebpackPlugin from "compression-webpack-plugin";
import HTMLWebpackPlugin from "html-webpack-plugin";
import HTMLWebpackTagsPlugin from "html-webpack-tags-plugin";
import { join, resolve } from "path";
import { Configuration, DefinePlugin, DllReferencePlugin } from "webpack";

import { production } from "../app.config.json";

const config = (dirPath: string): Configuration => {
  return {
    devtool: "source-map",
    output: {
      filename: "[name].[hash].js",
      path: join(dirPath, "/dist"),
      publicPath: "/",
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [join(dirPath, "/dist/app.*.*"), join(dirPath, "/dist/styles.*.*")],
        verbose: true,
      }),
      new DefinePlugin({
        __MAP_ACCESS_TOKEN__: JSON.stringify(production.mapAccessToken),
      }),
      new DllReferencePlugin({
        context: ".",
        manifest: resolve(join(dirPath, "/dist/libs-manifest.json")),
      }),
      new HTMLWebpackPlugin({
        filename: "index.html",
        inject: "body",
        minify: {
          collapseWhitespace: true,
          html5: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
        },
        template: join(dirPath, "/src/html/index.html"),
        title: production.title,
      }),
      new HTMLWebpackTagsPlugin({
        append: false,
        scripts: [
          {
            glob: "libs.*.js",
            globPath: join(dirPath, "/dist"),
            path: "./",
          },
        ],
        publicPath: "/",
      }),
      new CompressionWebpackPlugin({
        algorithm: "gzip",
        minRatio: 0.8,
        test: /\.(js|html|css)$/,
        threshold: 10240, // Customize this to the amount you think is big enough to enable compression (in bytes)
      }),
    ],
  };
};

export default config;
