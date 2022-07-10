/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-10 10:57:32
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 10:57:51
 * @FilePath: \blog\vue3-admin\src\utils\http\interceptors.js
 * @Description: 定义网络处理
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */
import { isNullOrUndef } from '@/utils/is'

export function reqResolve(config) {
  // 防止缓存，给get请求加上时间戳
  if (config.method === 'get') {
    config.params = { ...config.params, t: new Date().getTime() }
  }

  return config
}

export function reqReject(error) {
  return Promise.reject(error)
}

export function resResolve(response) {
  return response?.data
}

export function resReject(error) {
  let { code, message } = error.response?.data || {}
  if (isNullOrUndef(code)) {
    // 未知错误
    code = -1
    message = '接口异常！'
  } else {
    /**
     * TODO 此处可以根据后端返回的错误码自定义框架层面的错误处理
     */
    switch (code) {
      case 401:
        message = message || '登录已过期'
        break
      case 403:
        message = message || '没有权限'
        break
      case 404:
        message = message || '资源或接口不存在'
        break
      default:
        message = message || '未知异常'
        break
    }
  }
  console.error(`【${code}】 ${error}`)
  return Promise.resolve({ code, message, error })
}
