/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-10 10:29:45
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 10:31:06
 * @FilePath: \blog\vue3-admin\src\utils\cache\storage.js
 * @Description: 封装 localStorage 和 sessionStorage（支持命名空间和过期时间）
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */
import { isNullOrUndef } from '@/utils/is'

class Storage {
  constructor(option) {
    this.storage = option.storage
    this.prefixKey = option.prefixKey
  }

  getKey(key) {
    return `${this.prefixKey}${key}`.toUpperCase()
  }

  set(key, value, expire) {
    const stringData = JSON.stringify({
      value,
      time: Date.now(),
      expire: !isNullOrUndef(expire) ? new Date().getTime() + expire * 1000 : null,
    })
    this.storage.setItem(this.getKey(key), stringData)
  }

  get(key) {
    const { value } = this.getItem(key, {})
    return value
  }

  getItem(key, def = null) {
    const val = this.storage.getItem(this.getKey(key))
    if (!val) return def
    try {
      const data = JSON.parse(val)
      const { value, time, expire } = data
      if (isNullOrUndef(expire) || expire > new Date().getTime()) {
        return { value, time }
      }
      this.remove(key)
      return def
    } catch (error) {
      this.remove(key)
      return def
    }
  }

  remove(key) {
    this.storage.removeItem(this.getKey(key))
  }

  clear() {
    this.storage.clear()
  }
}

export function createStorage({ prefixKey = '', storage = sessionStorage }) {
  return new Storage({ prefixKey, storage })
}
