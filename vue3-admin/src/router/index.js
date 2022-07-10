/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-10 11:29:13
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 12:00:41
 * @FilePath: \blog\vue3-admin\src\router\index.js
 * @Description: 路由
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import { basicRoutes as routes } from './routes'
import { setupRouterGuard } from './guard'

export const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export function setupRouter(app) {
  app.use(router)
  setupRouterGuard(router)
}
