import { createRouter, createWebHashHistory } from "vue-router";
import pagesRouter from "./routerPage/page.js";
const router = createRouter({
  //Hash 模式关键特性：# 及后面的内容不会发送到服务器，所以刷新页面服务器永远返回 index.html。
  history: createWebHashHistory(),
  
  //滚动行为控制，每次路由切换时右侧内容区滚动到顶部
  scrollBehavior: (to, from, savedPosition) => {
    document.title = to.name;
    if (to.fullPath != "/") {
      document.querySelector(".yuanuirightView").scrollTop = 0;
    }
  },

  routes: [...pagesRouter],
});
export default router;
