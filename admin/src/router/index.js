import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
// 所有权限通用路由表：登录、404、dashboard
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // TODO: 
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: '博客数据一览', icon: 'dashboard' }
  //   }]
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/blogMessage/blogList',
    name: 'BlogMessage',
    meta: { title: '博客列表', icon: 'el-icon-edit', roles: ['admin'] },// 表示该页面只有admin和超级管理员才能有资格进入。
    children: [
      {
        path: '/blogMessage/blogList',
        name: 'BlogList',
        component: () => import('@/views/blogList/index'),
        meta: { title: '文章列表', icon: 'el-icon-s-operation', roles: ['admin'] }
      },
      {
        path: '/blogMessage/addBlogList',
        name: 'AddBlogList',
        component: () => import('@/views/addBlogList/index'),
        meta: { title: '添加文章', icon: 'el-icon-s-operation', roles: ['admin'] }
      },
    ]
  },
  {
    path: '/blogMessage/demo',
    component: Layout,
    redirect: '/blogMessage/demo',
    name: 'Demo',
    meta: { title: 'demo信息', icon: 'el-icon-edit', roles: ['admin'] },
    children: [
      {
        path: '/blogMessage/demo/demoMessage',
        name: 'DemoMessage',
        component: () => import('@/views/demoMessage/index'),
        meta: { title: 'demo信息列表', icon: 'el-icon-s-operation', roles: ['admin'] }
      },
      {
        path: '/blogMessage/demoAdd',
        name: 'DemoAdd',
        component: () => import('@/views/demoAdd/index'),
        meta: { title: 'demo信息添加', icon: 'el-icon-s-operation', roles: ['admin'] }
      },
    ]
  },
]

// 权限路由
export const asyncRoutes = [
  // TODO: 系统设置
  // {
  //   path: '/sysMessage',
  //   component: Layout,
  //   redirect: '/sysMessage/studentsManage',
  //   name: 'SysMessage',
  //   meta: { title: '系统设置', icon: 'el-icon-setting' },
  //   children: [
  //     {
  //       path: 'studentsManage',
  //       name: 'StudentsManage',
  //       component: () => import('@/views/studentsManage/index'),
  //       meta: { title: '学生管理', icon: 'el-icon-s-operation' }
  //     },
  //     {
  //       path: 'teacherManage',
  //       name: 'TeacherManage',
  //       component: () => import('@/views/teacherManage/index'),
  //       meta: { title: '教师管理', icon: 'el-icon-s-operation' }
  //     },
  //     // {
  //     //   path: 'sysParams',
  //     //   name: 'SysParams',
  //     //   component: () => import('@/views/sysParams/index'),
  //     //   meta: { title: '系统参数', icon: 'el-icon-s-operation' }
  //     // },
  //     {
  //       path: 'log',
  //       name: 'Log',
  //       component: () => import('@/views/log/index'),
  //       meta: { title: '日志记录', icon: 'el-icon-s-operation' }
  //     },
  //   ]
  // },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

//实例化vue的时候只挂载constantRouter
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
