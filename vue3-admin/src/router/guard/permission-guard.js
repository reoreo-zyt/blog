/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-10 11:59:32
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 11:59:52
 * @FilePath: \blog\vue3-admin\src\router\guard\permission-guard.js
 * @Description: 动态路由守卫
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */
import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'
import { NOT_FOUND_ROUTE } from '@/router/routes'
import { getToken, removeToken } from '@/utils/token'
import { toLogin } from '@/utils/auth'

const WHITE_LIST = ['/login']
export function createPermissionGuard(router) {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  router.beforeEach(async (to, from, next) => {
    const token = getToken()
    if (token) {
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        if (userStore.userId) {
          // 已经拿到用户信息
          next()
        } else {
          await userStore.getUserInfo().catch((error) => {
            removeToken()
            toLogin()
            $message.error(error.message || '获取用户信息失败！')
            return
          })
          const accessRoutes = permissionStore.generateRoutes(userStore.role)
          accessRoutes.forEach((route) => {
            !router.hasRoute(route.name) && router.addRoute(route)
          })
          router.addRoute(NOT_FOUND_ROUTE)
          next({ ...to, replace: true })
        }
      }
    } else {
      if (WHITE_LIST.includes(to.path)) {
        next()
      } else {
        next({ path: '/login' })
      }
    }
  })
}
