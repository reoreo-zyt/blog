/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-10 11:47:00
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 11:47:15
 * @FilePath: \blog\vue3-admin\src\utils\http\helpers.js
 * @Description: token验证
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */
import { useUserStore } from '@/store/modules/user'

const WITHOUT_TOKEN_API = [{ url: '/auth/login', method: 'POST' }]

export function isWithoutToken({ url, method = '' }) {
  return WITHOUT_TOKEN_API.some((item) => item.url === url && item.method === method.toUpperCase())
}

export function addBaseParams(params) {
  if (!params.userId) {
    params.userId = useUserStore().userId
  }
}
