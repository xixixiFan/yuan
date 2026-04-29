import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import yuanUI from "../packages/index";
import hljs from "highlight.js";
// import "highlight.js/styles/color-brewer.css";

import router from "@/router";
// 被注释掉的两个导入是生产时（构建产物)的使用方式：
// import yuanUI from '../dist/yuan-ui.es'      // ES Module 构建产物
// import '../dist/style.css'                   // 组件库样式文件
const app = createApp(App);
app.use(yuanUI);
app.use(router);
app.use(createPinia());
hljs.configure({
  // 忽略未转义的 HTML，防止 XSS 同时提升性能
  ignoreUnescapedHTML: true,
  // 性能优化：限制自动检测的语言范围，避免遍历所有语言包
  languages: [
    "javascript",
    "css",
    "python",
    "html",
    "bash",
    "java",
    "sql",
    "json",
    "http",
    "go",
    "c++",
    "c#",
    "",
  ],
});
app.directive("highlight", {
  mounted(el) {
    const blocks = el.querySelectorAll("pre code");
    blocks.forEach((block) => {
      // v11+ 用 highlightElement，v10 及以下用 highlightBlock
      if (hljs.highlightElement) {
        hljs.highlightElement(block);
      } else {
        hljs.highlightBlock(block); // 兼容旧版
      }
    });
  },
  updated(el) {
    // 内容更新时重新高亮
    const blocks = el.querySelectorAll("pre code");
    blocks.forEach((block) => {
      // 先移除已高亮的标记，避免重复包裹
      block.removeAttribute('data-highlighted');
      if (hljs.highlightElement) {
        hljs.highlightElement(block);
      } else {
        hljs.highlightBlock(block);
      }
    });
  }
});
app.mount("#app");
