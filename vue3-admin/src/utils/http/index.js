/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-10 10:56:42
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 10:57:00
 * @FilePath: \blog\vue3-admin\src\utils\http\index.js
 * @Description: 封装 axios
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */
import axios from 'axios'
import { resResolve, resReject, reqResolve, reqReject } from './interceptors'

export function createAxios(options = {}) {
  const defaultOptions = {
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 12000,
  }
  const service = axios.create({
    ...defaultOptions,
    ...options,
  })
  service.interceptors.request.use(reqResolve, reqReject)
  service.interceptors.response.use(resResolve, resReject)
  return service
}

export const defAxios = createAxios()

export const testAxios = createAxios({
  baseURL: import.meta.env.VITE_APP_BASE_API_TEST,
})
