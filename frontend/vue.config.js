/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-07 02:52:18
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-07 23:12:07
 * @FilePath: \blog\frontend\vue.config.js
 * @Description: 配置代理
 * 
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved. 
 */
const port = 80
module.exports = {
  transpileDependencies: true,
  //关闭eslint校验
  lintOnSave: false,
  devServer: {
    port: port,
    // 配置后端代理
    proxy: {
      '/api/v1': {
        // 不要写成 localhost:8000，跨域会失败
        target: 'http://localhost:5200',//****这里写上后端提供的基础地址 *****
        ws: true, //是否允许websocket
        secure: false,
        changeOrigin: true,
      },
    },
  },
}
