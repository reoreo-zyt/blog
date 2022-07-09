/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-09 21:27:18
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 00:25:39
 * @FilePath: \blog\vue3-admin\vite.config.js
 * @Description: 初始化环境变量至 process.env；配置全局 scss ；配置代理；
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */
import { defineConfig, loadEnv } from "vite";
import path from "path";

import { wrapperEnv, createProxy } from "./build/utils";
import { createVitePlugins } from "./build/plugin";

export default defineConfig(({ command, mode }) => {
  const isBuild = command === "build";
  const env = loadEnv(mode, process.cwd());
  const viteEnv = wrapperEnv(env);

  // 这样就可以拿到定义好的环境变量了，也可以使用process.env.xxx这种方式进行访问
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv;

  return {
    plugins: createVitePlugins(viteEnv, isBuild),
    base: VITE_PUBLIC_PATH || "/",
    resolve: {
      // 设置别名
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    css: {
      preprocessorOptions: {
        //define global scss variable
        scss: {
          additionalData: `@import '@/styles/variables.scss';`,
        },
      },
    },
    server: {
      host: "0.0.0.0", // 默认为'127.0.0.1'，如果将此设置为 `0.0.0.0` 或者 `true` 将监听所有地址，包括局域网和公网地址
      port: VITE_PORT, // 端口
      proxy: createProxy(VITE_PROXY), // 代理
    },
  };
});
