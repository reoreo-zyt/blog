/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-10 00:22:43
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 01:08:33
 * @FilePath: \blog\vue3-admin\build\plugin\index.js
 * @Description: 集成 vite-plugin-vue-setup-extend；
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */
import vue from "@vitejs/plugin-vue";

/**
 * * 扩展setup插件，支持在script标签中使用name属性
 * usage: <script setup name="MyComp"></script>
 */
import VueSetupExtend from "vite-plugin-vue-setup-extend";

// rollup打包分析插件
import visualizer from "rollup-plugin-visualizer";

import { configHtmlPlugin } from "./html";
import { unocss } from "./unocss";

export function createVitePlugins(viteEnv, isBuild) {
  const plugins = [
    vue(),
    VueSetupExtend(),
    configHtmlPlugin(viteEnv, isBuild),
    unocss(),
  ];

  if (isBuild) {
    plugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      })
    );
  }

  return plugins;
}
