/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-10 11:57:53
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 11:58:50
 * @FilePath: \blog\vue3-admin\src\router\guard\page-title-guard.js
 * @Description: 动态修改页面 title
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */
const baseTitle = import.meta.env.VITE_APP_TITLE

export function createPageTitleGuard(router) {
  router.afterEach((to) => {
    const pageTitle = to.meta?.title
    if (pageTitle) {
      document.title = `${pageTitle} | ${baseTitle}`
    } else {
      document.title = baseTitle
    }
  })
}
