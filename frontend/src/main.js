/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-05-31 10:35:27
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-11 21:41:54
 * @FilePath: \blog\frontend\src\main.js
 * @Description: main
 * 
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved. 
 */
import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import VueLazyload from 'vue-lazyload'
import 'github-markdown-css/github-markdown.css'

Vue.config.productionTip = false

Vue.use(VueLazyload)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
