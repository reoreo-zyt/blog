/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-10 11:56:52
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 11:57:06
 * @FilePath: \blog\vue3-admin\src\router\guard\page-loading-guard.js
 * @Description: 处理全局 loading-bar
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */
export function createPageLoadingGuard(router) {
  router.beforeEach(() => {
    window.$loadingBar?.start()
  })

  router.afterEach(() => {
    setTimeout(() => {
      window.$loadingBar?.finish()
    }, 200)
  })

  router.onError(() => {
    window.$loadingBar?.error()
  })
}
