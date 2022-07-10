/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-10 11:28:45
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 11:34:25
 * @FilePath: \blog\vue3-admin\src\router\routes\index.js
 * @Description: 路由
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */
export const basicRoutes = [
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
