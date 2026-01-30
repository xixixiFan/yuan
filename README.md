# yuan-ui-vue3

vitepress文档有点展示的小问题，欢迎提交正确代码（PR）

一套基于 Vue 3 + TypeScript 的企业级（玩具级） UI 组件库。

## 特性

- **Vue 3 原生支持**：基于 Vue 3.2+ 和 Composition API 开发
- **TypeScript 支持**：完整的类型定义
- **按需引入**：支持按需加载，减少打包体积
- **主题定制**：支持 CSS 变量主题定制
- **丰富的组件**：包含 30+ 常用组件

## 安装

```bash
npm install yuan-ui-vue3
```

## 快速开始

### 全局引入

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import YuanUI from 'yuan-ui-vue3'
import 'yuan-ui-vue3/dist/style.css'

const app = createApp(App)
app.use(YuanUI)
app.mount('#app')
```

### 按需引入

```typescript
import { mButton, mInput } from 'yuan-ui-vue3'
import 'yuan-ui-vue3/dist/style.css'

app.component('mButton', mButton)
app.component('mInput', mInput)
```

## 组件列表

### 基础组件

| 组件 | 说明 |
|------|------|
| [Button 按钮](/components/button) | 触发操作 |
| [Icon 图标](/components/icon) | 图标组件 |
| [Space 间距](/components/space) | 间距组件 |

### 布局组件

| 组件 | 说明 |
|------|------|
| [Layout 布局](/components/layout) | 栅格布局 |

### 表单组件

| 组件 | 说明 |
|------|------|
| [Input 输入框](/components/input) | 文本输入 |
| [Select 选择器](/components/select) | 下拉选择 |
| [Checkbox 多选框](/components/checkbox) | 多选 |
| [Radio 单选框](/components/radio) | 单选 |
| [Switch 开关](/components/switch) | 开关切换 |
| [DatePicker 日期选择器](/components/date-picker) | 日期选择 |
| [ColorPicker 颜色选择器](/components/color-picker) | 颜色选择 |

### 导航组件

| 组件 | 说明 |
|------|------|
| [DropDown 下拉菜单](/components/dropdown) | 下拉菜单 |
| [Tabs 标签页](/components/tabs) | 标签页切换 |

### 数据展示

| 组件 | 说明 |
|------|------|
| [Table 表格](/components/table) | 数据表格 |

### 反馈组件

| 组件 | 说明 |
|------|------|
| [Modal 对话框](/components/modal) | 模态对话框 |
| [Message 消息提示](/components/message) | 全局消息 |
| [Loading 加载](/components/loading) | 加载指示器 |

## 开发

### 环境要求

- Node.js 16+
- npm 7+

### 启动开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 启动文档
npm run docs:dev

# 构建组件库
npm run build

# 运行测试
npm run test
```

## 项目结构

```
yuan-ui-vue3/
├── docs/                 # 文档
│   └── components/       # 组件文档
├── packages/             # 组件源码
│   ├── button/           # 按钮组件
│   ├── input/            # 输入框组件
│   ├── ...
│   └── index.js          # 入口文件
├── dist/                 # 构建输出
└── package.json
```

## LICENSE

MIT
