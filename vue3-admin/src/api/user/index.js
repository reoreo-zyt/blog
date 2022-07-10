/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-10 10:58:47
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 11:00:08
 * @FilePath: \blog\vue3-admin\src\api\user\index.js
 * @Description: user api
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */

import { defAxios as request } from '@/utils/http'

export function getUsers(data = {}) {
  return request({
    url: '/users',
    method: 'get',
    data,
  })
}

export function getUser(id) {
  if (id) {
    return request({
      url: `/user/${id}`,
      method: 'get',
    })
  }
  return request({
    url: '/user',
    method: 'get',
  })
}

export function saveUser(data = {}, id) {
  if (id) {
    return request({
      url: '/user',
      method: 'put',
      data,
    })
  }

  return request({
    url: `/user/${id}`,
    method: 'put',
    data,
  })
}
