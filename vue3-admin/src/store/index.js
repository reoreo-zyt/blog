/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-10 11:37:44
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 11:38:15
 * @FilePath: \blog\vue3-admin\src\store\index.js
 * @Description: pinia 状态管理
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */
import { createPinia } from 'pinia'

export function setupStore(app) {
  app.use(createPinia())
}
