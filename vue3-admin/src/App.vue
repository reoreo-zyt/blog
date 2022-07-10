<!--
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-09 21:27:18
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 10:18:35
 * @FilePath: \blog\vue3-admin\src\App.vue
 * @Description: 主页面
 * 
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved. 
-->
<template>
  <n-space m-50>
    <n-button>Default</n-button>
    <n-button type="tertiary"> Tertiary </n-button>
    <n-button type="primary"> Primary </n-button>
    <n-button type="info"> Info </n-button>
    <n-button type="success"> Success </n-button>
    <n-button type="warning"> Warning </n-button>
    <n-button type="error"> Error </n-button>
  </n-space>
  <AppProvider>
    <n-space m-50>
      <n-button>Default</n-button>
      <n-button type="tertiary"> Tertiary </n-button>
      <n-button type="primary"> Primary </n-button>
      <n-button type="info"> Info </n-button>
      <n-button type="success"> Success </n-button>
      <n-button type="warning"> Warning </n-button>
      <n-button type="error"> Error </n-button>
    </n-space>
  </AppProvider>
</template>

<script setup>
import { onMounted } from 'vue'
import AppProvider from '@/components/AppProvider/index.vue'

onMounted(() => {
  $loadingBar.start()
  setTimeout(() => {
    $loadingBar.finish()
    $message.success('加载完成，Perfect~')
  }, 500)
})
</script>
