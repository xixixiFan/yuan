<template>
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
</style>
