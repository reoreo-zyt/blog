/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-10 10:59:35
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 10:59:40
 * @FilePath: \blog\vue3-admin\src\api\auth\index.js
 * @Description: auth api
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */

import { defAxios as request } from '@/utils/http'

export const login = (data) => {
  return request({
    url: '/auth/login',
    method: 'post',
    data,
  })
}

export const refreshToken = () => {
  return request({
    url: '/auth/refreshToken',
    method: 'post',
  })
}
