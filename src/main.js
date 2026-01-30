import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import yuanUI from "../packages/index";
import hljs from "highlight.js";
// import "highlight.js/styles/color-brewer.css";

import router from "@/router";
// import yuanUI from '../dist/yuan-ui.es'
// import '../dist/style.css'
const app = createApp(App);
app.use(yuanUI);
app.use(router);
app.use(createPinia());
hljs.configure({
  ignoreUnescapedHTML: true,
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
app.directive("highlight", function (el) {
  const blocks = el.querySelectorAll("pre code");
  blocks.forEach((block) => {
    hljs.highlightBlock(block);
  });
});
app.mount("#app");
