<!-- <template>
  <headerBlockVue />
  <router-view></router-view>
</template>
<script setup>
import headerBlockVue from "./components/header-block.vue";
</script>
/* SCSS —— 支持嵌套、变量、混入等 */
<style lang="scss">
@import "./styles/style.scss";
#app {
  overflow: hidden;
}
</style> -->
<template>
  <div>
    <m-button @click="testSuccess">成功</m-button>
    <m-button @click="testError">错误</m-button>
    <m-button @click="testMultiple">多条消息</m-button>
  </div>
</template>

<script setup>
import Message from '../packages/message/index.js'

const testSuccess = () => Message.success('操作成功')
const testError = () => Message.error('操作失败')
const testMultiple = () => {
  Message.success('第一条')
  Message.error('第二条')
  Message.warning('第三条')
}
</script>