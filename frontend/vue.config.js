/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-07 02:52:18
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-11 22:40:29
 * @FilePath: \blog\frontend\vue.config.js
 * @Description: 配置代理
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */
const port = 80;
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
module.exports = {
  transpileDependencies: true,
  //关闭eslint校验
  lintOnSave: false,
  devServer: {
    port: port,
    // 配置后端代理
    proxy: {
      "/api/v1": {
        // 不要写成 localhost:8000，跨域会失败
        target: "http://localhost:5200", //****这里写上后端提供的基础地址 *****
        ws: true, //是否允许websocket
        secure: false,
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: "async",
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
    plugins: [
      new BundleAnalyzerPlugin(),
      new CompressionWebpackPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"), // 匹配文件名

        threshold: 10240, // 对超过10K的数据进行压缩

        minRatio: 0.8, // 极小比
      }),
    ],
  },
};
