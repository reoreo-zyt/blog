/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-10 11:36:57
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 11:37:08
 * @FilePath: \blog\vue3-admin\src\utils\auth.js
 * @Description: auth
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */
import { router } from '@/router'

export function toLogin() {
  router.replace({ path: '/login' })
}
