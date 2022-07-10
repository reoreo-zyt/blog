/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-10 11:20:55
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 11:21:08
 * @FilePath: \blog\vue3-admin\build\plugin\mock.js
 * @Description: mock
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */
import { viteMockServe } from 'vite-plugin-mock'

export function configMockPlugin(isBuild) {
  return viteMockServe({
    mockPath: 'mock/modules',
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
      import { setupProdMockServer } from '../mock';
      setupProdMockServer();
    `,
  })
}
