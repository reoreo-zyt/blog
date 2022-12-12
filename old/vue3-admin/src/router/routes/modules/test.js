/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-10 11:54:40
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 11:57:50
 * @FilePath: \blog\vue3-admin\src\router\routes\modules\test.js
 * @Description: test 路由模块
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */
export default [
  {
    name: 'Page1',
    path: '/page1',
    component: () => import('@/views/test-page/page1/index.vue'),
    meta: {
      title: '动态路由1',
      role: ['admin'],
    },
  },
  {
    name: 'Page2',
    path: '/page2',
    component: () => import('@/views/test-page/page2/index.vue'),
    meta: {
      title: '动态路由2',
      role: ['editor'],
    },
  },
  {
    name: 'Page3',
    path: '/page3',
    component: () => import('@/views/test-page/page3/index.vue'),
    meta: {
      title: '动态路由3',
      role: ['admin'],
    },
  },
]
