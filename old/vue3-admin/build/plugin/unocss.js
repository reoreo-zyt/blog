/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-10 01:07:06
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 01:07:24
 * @FilePath: \blog\vue3-admin\build\plugin\unocss.js
 * @Description: 原子化 css
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */
import Unocss from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'

export function unocss() {
  return Unocss({
    presets: [presetUno(), presetAttributify(), presetIcons()],
  })
}
