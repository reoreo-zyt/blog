/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-10 11:28:45
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 11:55:59
 * @FilePath: \blog\vue3-admin\src\router\routes\index.js
 * @Description: 路由
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */
export const basicRoutes = [
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    isHidden: true,
  },

  {
    name: 'LOGIN',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    isHidden: true,
    meta: {
      title: '登录页',
    },
  },

  {
    name: 'Dashboard',
    path: '/',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      title: 'Dashboard',
    },
  },

  {
    name: 'TestUnocss',
    path: '/test/unocss',
    component: () => import('@/views/test-page/unocss/index.vue'),
    meta: {
      title: '测试unocss',
    },
  },
]

export const NOT_FOUND_ROUTE = {
  name: 'NotFound',
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  isHidden: true,
}

// modules文件夹下的路由都会作为动态路由
const modules = import.meta.globEager('./modules/*.js')
const asyncRoutes = []
Object.keys(modules).forEach((key) => {
  asyncRoutes.push(...modules[key].default)
})

export { asyncRoutes }
