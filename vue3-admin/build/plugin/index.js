/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-10 00:22:43
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 11:22:29
 * @FilePath: \blog\vue3-admin\build\plugin\index.js
 * @Description: 插件
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */
import vue from '@vitejs/plugin-vue'

/**
 * * 扩展setup插件，支持在script标签中使用name属性
 * usage: <script setup name="MyComp"></script>
 */
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// rollup打包分析插件
import visualizer from 'rollup-plugin-visualizer'

import { configHtmlPlugin } from './html'
import { unocss } from './unocss'

/**
 * * 组件库按需引入插件
 * usage: 直接使用组件,无需在任何地方导入组件
 */
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

import { configMockPlugin } from './mock'

export function createVitePlugins(viteEnv, isBuild) {
  const plugins = [
    vue(),
    VueSetupExtend(),
    configHtmlPlugin(viteEnv, isBuild),
    unocss(),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
  ]

  if (isBuild) {
    plugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      })
    )
  }

  if (viteEnv?.VITE_APP_USE_MOCK) {
    plugins.push(configMockPlugin(isBuild))
  }

  return plugins
}
