<template>
  <div class="pre-code-box">
    <!-- 1. 复制按钮（hover 显示） -->
    <span class="m-copy" v-if="showCode" @click="copyCode">
      <i class="m-icon-copy"></i>
    </span>

     <!-- 2. 代码区域（带展开动画） -->
    <transition name="slide-fade">
      //v-highlight	自定义指令，用于代码高亮
      <pre
        class="language-html"
        v-if="showCode && sourceCode"
        v-highlight
      >
        <code class="language-html">{{ sourceCode }}</code>
      </pre>
    </transition>

    <!-- 3. 展开/收起控制 -->
    <div class="showCode" @click="showOrhideCode">
      <span>{{ showCode ? "隐藏代码" : "显示代码" }}</span>
      <i class="m-icon-code"></i>
    </div>

     <!-- 4. 隐藏的 textarea（用于复制） -->
    <textarea id="inputCopy" />
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";
import Message from "../../packages/message/index";
const props = defineProps({
  // 组件目录名
  compName: {
    type: String,
    default: "",
    required: true,
  },
  // demo 文件名
  demoName: {
    type: String,
    default: "",
    required: true,
  },
});

const showCode = ref(false);
const border = ref("1px solid rgba(0,0,0,.06)");
const showOrhideCode = () => {
  showCode.value = !showCode.value;
  if (showCode.value) {
    border.value = "0";
  } else {
    border.value = "1px solid rgba(0,0,0,.06)";
  }
};
const sourceCode = ref("");
//动态读取组件源码  
async function getSourceCode() {
  const isDev = import.meta.env.MODE === "development";
  if (isDev) {
    // 开发环境：用 import ?raw 直接读取文件内容
    sourceCode.value = (
      await import(
        /* @vite-ignore */ `/packages/${props.compName}/doc/${props.demoName}.vue?raw`
      )
    ).default;
  } else {
     // 生产环境：用 fetch 请求文件
    sourceCode.value = await fetch(
      `/packages/${props.compName}/doc/${props.demoName}.vue`
    ).then((res) => res.text());
  }
}

const copyCode = () => {
  const input = document.getElementById("inputCopy");
  input.value = sourceCode.value;
  // 选中全部内容
  input.select();
  if (document.execCommand("copy")) {
    document.execCommand("copy");
    Message({
      type: "success",
      text: "代码复制成功",
    });
  } else {
    Message({
      type: "error",
      text: "代码复制失败",
    });
  }
};
onMounted(() => {
  getSourceCode();
});
</script>

<style scoped lang="scss">
#inputCopy {
  opacity: 0;
  border: 0;
  outline: none;
  height: 0;
  position: fixed;
  z-index: -99999999;
}
.slide-fade-enter-active {
  transition: all 0.1s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0.5;
}
.pre-code-box {
  width: 100%;
  height: auto;
  overflow: hidden;
  border-top: 0;
  margin: 0px 0 15px 0;
  position: relative;
  transition: all 0.15s ease-out;
  .m-copy {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    i {
      font-size: 22px;
      color: #b7b3b3;
      &:hover {
        color: #000;
      }
    }
  }
  .showCode {
    width: 100%;
    line-height: 40px;
    font-size: 14px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f9f9f9;
    box-shadow: 0px 16px 15px -16px rgb(0 0 0 / 10%);
    color: #505050;
    cursor: pointer;
    i {
      margin-left: 10px;
    }
    i.rotate {
      transform: rotate(180deg);
    }
    &:hover {
      background: #f9f9f9;
      color: #0e80eb;
    }
  }
  &:hover {
    box-shadow: 0px 16px 15px -16px rgb(0 0 0 / 10%);
  }
}
</style>