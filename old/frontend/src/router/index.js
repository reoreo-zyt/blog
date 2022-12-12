/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-06-01 16:49:40
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-12 00:20:27
 * @FilePath: \blog\frontend\src\router\index.js
 * @Description: 路由
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */
//1.导入vue 和 vuerouter 的包
import Vue from "vue";
import VueRouter from "vue-router";

//2.调用vue.use() 函数，把 VueRouter 安装为 Vue 的插件
//vue.use()函数的作用，就是来安装插件的
Vue.use(VueRouter);

//3.创建路由的实例对象
const router = new VueRouter({
  routes: [
    {
      path: "/",
      meta: {
        title: "主页",
      },
      component: () => import("@/views/HelloWorld.vue"),
    },
    {
      path: "/article",
      meta: {
        title: "文章"
      },
      component: () => import("@/views/ArticleView.vue"),
    },
  ],
});

// 全局路由守卫，动态改变tille
router.beforeEach((to, from, next) => {
  window.document.title =
    "reoreo的博客 | " + to.meta.title || "reoreo的博客记录";
  next();
});

//4.向外共享路由的实例对象
export default router;
