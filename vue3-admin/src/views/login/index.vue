<!--
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-10 11:27:00
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 11:41:22
 * @FilePath: \blog\vue3-admin\src\views\login\index.vue
 * @Description: 登录页
 * 
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved. 
-->
<template>
  <div flex h-full>
    <div m-auto bg-gray-100 w-350 flex flex-col items-center border border-gray-300 p-30 rounded-10>
      <h5 text-24 font-normal color="#6a6a6a">
        {{ title }}
      </h5>
      <div mt-30 w-full>
        <n-input
          v-model:value="loginInfo.name"
          autofocus
          class="text-16 items-center h-50 pl-10"
          placeholder="admin"
          :maxlength="20"
        >
        </n-input>
      </div>
      <div mt-30 w-full>
        <n-input
          v-model:value="loginInfo.password"
          class="text-16 items-center h-50 pl-10"
          type="password"
          show-password-on="mousedown"
          placeholder="123456"
          :maxlength="20"
          @keydown.enter="handleLogin"
        />
      </div>

      <div mt-20 w-full>
        <n-checkbox :checked="isRemember" label="记住我" :on-update:checked="(val) => (isRemember = val)" />
      </div>

      <div mt-20 w-full>
        <n-button w-full h-50 rounded-5 text-16 type="primary" @click="handleLogin">登录</n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { login } from '@/api/auth'
import { lStorage } from '@/utils/cache'
import { setToken } from '@/utils/token'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const title = import.meta.env.VITE_APP_TITLE

const router = useRouter()

const loginInfo = ref({
  name: '',
  password: '',
})

initLoginInfo()

function initLoginInfo() {
  const localLoginInfo = lStorage.get('loginInfo')
  if (localLoginInfo) {
    loginInfo.value.name = localLoginInfo.name || ''
    loginInfo.value.password = localLoginInfo.password || ''
  }
}

const isRemember = ref(false)
async function handleLogin() {
  const { name, password } = loginInfo.value
  if (!name || !password) {
    $message.warning('请输入用户名和密码')
    return
  }
  try {
    const res = await login({ name, password: password.toString() })
    if (res.code === 0) {
      $message.success('登录成功')
      setToken(res.data.token)
      if (isRemember.value) {
        lStorage.set('loginInfo', { name, password })
      } else {
        lStorage.remove('loginInfo')
      }
      router.push('/')
    } else {
      $message.warning(res.message)
    }
  } catch (error) {
    $message.error(error.message)
  }
}
</script>
