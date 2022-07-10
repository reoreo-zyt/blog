/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-10 11:17:45
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 11:19:54
 * @FilePath: \blog\vue3-admin\mock\modules\auth.js
 * @Description: auth
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */
import { resolveToken } from '../utils'

const token = {
  admin: 'admin',
  editor: 'editor',
}

export default [
  {
    url: '/api/auth/login',
    method: 'post',
    response: ({ body }) => {
      if (['admin', 'editor'].includes(body?.name)) {
        return {
          code: 0,
          data: {
            token: token[body.name],
          },
        }
      } else {
        return {
          code: -1,
          message: '没有此用户',
        }
      }
    },
  },
  {
    url: '/api/auth/refreshToken',
    method: 'post',
    response: ({ headers }) => {
      return {
        code: 0,
        data: {
          token: resolveToken(headers?.authorization),
        },
      }
    },
  },
]
