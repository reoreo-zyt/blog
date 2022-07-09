/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-10 00:42:41
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 00:42:54
 * @FilePath: \blog\vue3-admin\build\plugin\html.js
 * @Description: 集成 vite-plugin-html 主要是为了对 index.html 进行压缩和注入动态数据，例如替换网站标题和cdn
 * 
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved. 
 */
import html from "vite-plugin-html";

export function configHtmlPlugin(viteEnv, isBuild) {
  const { VITE_APP_TITLE } = viteEnv;
  const htmlPlugin = html({
    minify: isBuild,
    inject: {
      data: {
        title: VITE_APP_TITLE,
      },
    },
  });
  return htmlPlugin;
}
