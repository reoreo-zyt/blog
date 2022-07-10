/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-10 11:38:03
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 11:38:47
 * @FilePath: \blog\vue3-admin\src\store\modules\user.js
 * @Description: user 状态管理
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */
import { defineStore } from 'pinia'
import { getUser } from '@/api/user'
import { removeToken } from '@/utils/token'
import { toLogin } from '@/utils/auth'

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: {},
    }
  },
  getters: {
    userId() {
      return this.userInfo?.id
    },
    name() {
      return this.userInfo?.name
    },
    avatar() {
      return this.userInfo?.avatar
    },
    role() {
      return this.userInfo?.role || []
    },
  },
  actions: {
    async getUserInfo() {
      try {
        const res = await getUser()
        if (res.code === 0) {
          const { id, name, avatar, role } = res.data
          this.userInfo = { id, name, avatar, role }
          return Promise.resolve(res.data)
        } else {
          return Promise.reject(res)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async logout() {
      removeToken()
      this.userInfo = {}
      toLogin()
    },
    setUserInfo(userInfo = {}) {
      this.userInfo = { ...this.userInfo, ...userInfo }
    },
  },
})
