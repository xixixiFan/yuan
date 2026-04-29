import { defineConfig } from "vite"; // Vite 配置方法
import Vue from "@vitejs/plugin-vue"; // Vue 单文件组件支持
import Markdown from "vite-plugin-md"; // 支持 Markdown 文件作为 Vue 组件
import Dts from "vite-plugin-dts"; // 自动生成 TypeScript 类型声明文件
import { resolve } from "path"; // Node 路径处理工具

export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/], // 允许 .vue 和 .md 文件都作为 Vue 组件处理
    }),
    Markdown(), // 使 Markdown 文件可直接作为 Vue 组件引入
    Dts({
      insertTypesEntry: true, // 在 package.json 中自动插入 types 字段
      tsconfigPath: "./tsconfig.json", // 指定 tsconfig 路径
      outputDir: "dist/types", // 类型声明文件输出目录
      rollupTypes: true, // 合并类型声明为单一入口
      exclude: [
        "node_modules",
        "dist",
        "**/*.spec.ts",
        "**/*.test.ts",
        "docs/.vitepress/**"
      ] // 排除不生成类型声明的文件/目录
    }),
  ],
  build: {
    rollupOptions: {
      external: ["vue", "highlight.js", "sass"], // 指定这些依赖为“外部依赖”，不会被打包进最终产物
      output: {
        globals: {
          vue: "Vue", // umd 格式下全局变量名
        },
        exports: "named", // 导出方式为命名导出
        extend: true, // 允许扩展全局对象
      },
    },
    lib: {
      entry: "./packages/index.js", // 打包入口，所有组件统一从这里导出
      name: "yuan-ui", // 打包库的全局名称
      formats: ["es", "umd"], // 输出格式：ESM（现代打包工具）和 UMD（浏览器/Node.js）
      fileName: (format) => `yuan-ui.${format}.js`,
    },
    // 使用 terser 作为代码压缩工具，并配置压缩选项以去除 console 和 debugger 语句
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    cssCodeSplit: false, // 不分割 CSS，确保所有样式合并
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "yuan-ui": resolve(__dirname, "packages/index.js"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "./src/styles/variables.scss" as *;',
      },
    },
  },
});
