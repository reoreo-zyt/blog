/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-10 10:31:31
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 10:31:41
 * @FilePath: \blog\vue3-admin\src\utils\token.js
 * @Description: token
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */
import { lStorage } from './cache'

const TOKEN_CODE = 'access_token'
const DURATION = 6 * 60 * 60

export function getToken() {
  return lStorage.get(TOKEN_CODE)
}

export function setToken(token) {
  lStorage.set(TOKEN_CODE, token, DURATION)
}

export function removeToken() {
  lStorage.remove(TOKEN_CODE)
}
