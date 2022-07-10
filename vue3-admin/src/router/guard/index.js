/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-10 12:04:23
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 12:06:41
 * @FilePath: \blog\vue3-admin\src\router\guard\index.js
 * @Description: guard
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */
import { createPageLoadingGuard } from './page-loading-guard'
import { createPageTitleGuard } from './page-title-guard'
import { createPermissionGuard } from './permission-guard'

export function setupRouterGuard(router) {
  createPageLoadingGuard(router)
  createPermissionGuard(router)
  createPageTitleGuard(router)
}
