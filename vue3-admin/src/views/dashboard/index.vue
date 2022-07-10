<!--
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-10 11:26:47
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 12:01:22
 * @FilePath: \blog\vue3-admin\src\views\dashboard\index.vue
 * @Description: 首页
 * 
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved. 
-->
<template>
  <div p-35>
    <n-gradient-text flex items-center text-26 type="info">
      我的角色是：<n-gradient-text type="error">{{ userStore.name }}</n-gradient-text>
    </n-gradient-text>

    <n-gradient-text text-16 mt-10 type="info">我有这些页面的权限：</n-gradient-text>

    <ul mt-10>
      <li
        v-for="item in permissionStore.menus"
        :key="item.name"
        cursor-pointer
        hover-color-red
        @click="$router.push(item.path)"
      >
        {{ item.meta?.title }}
      </li>
    </ul>

    <n-button type="info" mt-20 size="small" @click="logout">换个角色看看</n-button>
  </div>
</template>

<script setup>
import { usePermissionStore } from '../../store/modules/permission'
import { useUserStore } from '../../store/modules/user'

const permissionStore = usePermissionStore()
const userStore = useUserStore()

function logout() {
  userStore.logout()
  $message.success('已退出登录')
}
</script>
