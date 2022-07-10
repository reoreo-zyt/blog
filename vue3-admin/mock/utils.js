/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-10 11:17:52
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 11:19:29
 * @FilePath: \blog\vue3-admin\mock\utils.js
 * @Description: jwt token
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */
export function resolveToken(authorization) {
  /**
   * * jwt token
   * * Bearer + token
   * ! 认证方案: Bearer
   */
  const reqTokenSplit = authorization.split(' ')
  if (reqTokenSplit.length === 2) {
    return reqTokenSplit[1]
  }
  return ''
}
