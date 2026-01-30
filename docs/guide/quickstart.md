# 快速上手

## 安装

```bash
npm install yuan-ui
```

## 完整引入

如果你不需要按需引入，可以直接引入整个组件库：

```ts
import { createApp } from 'vue';
import YuanUI from 'yuan-ui';
import 'yuan-ui/styles/index.css';
import App from './App.vue';

const app = createApp(App);

app.use(YuanUI);
app.mount('#app');
```



## 浏览器支持

支持所有现代浏览器和 IE11+。

| Chrome | Firefox | Safari | Edge | IE11 |
| :----: | :----: | :----: | :----: | :----: |
| ✅ | ✅ | ✅ | ✅ | ✅ |
