/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-10 11:17:59
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 11:18:31
 * @FilePath: \blog\vue3-admin\mock\index.js
 * @Description: mock
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

const modules = import.meta.globEager('./modules/*.js')
const mockModules = []
Object.keys(modules).forEach((key) => {
  mockModules.push(...modules[key].default)
})

export function setupProdMockServer() {
  createProdMockServer(mockModules)
}
