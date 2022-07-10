<!--
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-07-09 21:27:18
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-10 09:26:32
 * @FilePath: \blog\vue3-admin\src\App.vue
 * @Description: 主页面
 * 
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved. 
-->
<template>
  <div p-24>
    <p>
      文档：<a hover-decoration-underline c-blue href="https://uno.antfu.me/" target="_blank">https://uno.antfu.me/</a>
    </p>
    <p>
      playground:
      <a c-blue hover-decoration-underline href="https://unocss.antfu.me/play/" target="_blank">
        https://unocss.antfu.me/play/
      </a>
    </p>

    <div flex mt-20>
      <div flex p-20 rounded-5 bg-white>
        <div text-20 font-600>Flex布局</div>
        <div flex w-360 flex-wrap justify-around ml-15 p-10>
          <div w-50 h-50 b-1 rounded-5 flex justify-center items-center p-10 m-20>
            <span w-6 h-6 rounded-3 bg-black />
          </div>
          <div w-50 h-50 b-1 rounded-5 flex justify-between p-10 m-20>
            <span w-6 h-6 rounded-3 bg-black />
            <span w-6 h-6 rounded-3 bg-black self-end />
          </div>
          <div w-50 h-50 b-1 rounded-5 flex justify-between p-10 m-20>
            <span w-6 h-6 rounded-3 bg-black />
            <span w-6 h-6 rounded-3 bg-black self-center />
            <span w-6 h-6 rounded-3 bg-black self-end />
          </div>
          <div w-50 h-50 b-1 rounded-5 flex justify-between p-10 m-20>
            <div flex flex-col justify-between>
              <span w-6 h-6 rounded-3 bg-black />
              <span w-6 h-6 rounded-3 bg-black />
            </div>
            <div flex flex-col justify-between>
              <span w-6 h-6 rounded-3 bg-black />
              <span w-6 h-6 rounded-3 bg-black />
            </div>
          </div>
          <div w-50 h-50 b-1 rounded-5 flex flex-col justify-between items-center p-10 m-20>
            <div flex w-full justify-between>
              <span w-6 h-6 rounded-3 bg-black />
              <span w-6 h-6 rounded-3 bg-black />
            </div>
            <span w-6 h-6 rounded-3 bg-black />
            <div flex w-full justify-between>
              <span w-6 h-6 rounded-3 bg-black />
              <span w-6 h-6 rounded-3 bg-black />
            </div>
          </div>
          <div w-50 h-50 b-1 rounded-5 flex flex-col justify-between p-10 m-20>
            <div flex w-full justify-between>
              <span w-6 h-6 rounded-3 bg-black />
              <span w-6 h-6 rounded-3 bg-black />
            </div>
            <div flex w-full justify-between>
              <span w-6 h-6 rounded-3 bg-black />
              <span w-6 h-6 rounded-3 bg-black />
            </div>
            <div flex w-full justify-between>
              <span w-6 h-6 rounded-3 bg-black />
              <span w-6 h-6 rounded-3 bg-black />
            </div>
          </div>
        </div>
      </div>

      <div flex ml-35 p-20 rounded-5 bg="#fff">
        <div text-20 font-600>字体：</div>
        <div ml-15 p-10 pl-30 pr-30 rounded-5>
          <p text-12>font-size: 12px</p>
          <p text-16>font-size: 16px</p>
          <p text-20>font-size: 20px</p>

          <p font-300 mt-10>font-weight: 300</p>
          <p font-600>font-weight: 600</p>
          <p font-bold>font-weight: bold</p>
        </div>
      </div>

      <div flex p-20 ml-35 rounded-5 bg-white>
        <div text-20 font-600>颜色：</div>
        <div ml-15 p-10 pl-30 pr-30 rounded-5>
          <p color="#881337">color: #881337</p>
          <p c-pink-500>color: #ec4899</p>

          <p bg="pink" mt-10>background: pink</p>
          <p bg="#2563eb" mt-10>background: #2563eb</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
