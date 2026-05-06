<template>
  <Transition name="slide-fade">
    <!-- customClass 是留给使用这个组件的父组件传入的，用于覆盖或扩展样式 -->
    <!-- currentTypeObj 是动态取值。type 是 props 传入的字符串 -->
    <div :class="['yuan-message', customClass]" :style="typeStyles[type]" v-show="isShow">
      
      <template v-if="isText">
        <i :class="[currentTypeObj?.icon]"></i>
        <span class="text">{{ text }}</span>
      </template>
      
      <template v-else>
      <!-- Object：可能是 VNode，用于复杂内容（比如带链接的消息） -->
        <slot />
      </template>
    
    </div>
  </Transition>
</template>
<script setup>
import { onMounted, ref, reactive, computed } from 'vue'

const props = defineProps({
  //消息文字
  text: {
    type: [String, Object],
    default: ''
  },
  //消息类型
  type: {
    type: String,
    default: 'info'
  },
  //消息图标
  icon: String,
  //文本颜色
  textColor: String,
  //背景颜色
  bgColor: String,
  //自定义样式类
  customClass: String
})

const typeStyles = {
  info: {
    icon: 'm-icon-prompt-filling',
    color: '#505050',
    backgroundColor: 'rgb(229 227 224)',
    borderColor: 'rgb(229 227 224)'
  },
  warn: {
    icon: 'm-icon-warning',
    color: '#f57b29',
    backgroundColor: 'rgb(243 233 220)',
    borderColor: 'rgb(243 233 220)'
  },
  error: {
    icon: 'm-icon-delete-filling',
    color: '#ec3437',
    backgroundColor: 'rgb(251 228 228)',
    borderColor: 'rgb(251 228 228)'
  },
  success: {
    icon: 'm-icon-success',
    color: '#09b63d',
    backgroundColor: 'rgb(223 243 212)',
    borderColor: 'rgb(223 243 212)'
  },
  custom: {
    icon: '',
    color: '',
    backgroundColor: '',
    borderColor: ''
  }
}

const currentTypeObj = computed(() => {
  const type = props.type
  // 容错：不存在的类型默认用 info
  const config = typeStyles[type] || typeStyles.info
  
  return {
    ...config,
    // 父组件传了 icon 就覆盖默认值
    icon: props.icon || config.icon,
    // 自定义样式覆盖
    color: props.textColor || config.color,
    backgroundColor: props.bgColor || config.backgroundColor,
    borderColor: props.bgColor || config.borderColor
  }
})

const isShow = ref(false)
// 计算最终的样式，优先使用 props 传入的值，如果没有则使用默认值
const style = computed(() => currentTypeObj.value)
// 判断 text 是字符串还是对象，如果是字符串就显示文本，如果是对象就显示插槽内容
const isText = computed(() => {
  return typeof props.text === 'string'
})

onMounted(() => {
  isShow.value = true
})

</script>
<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

div.slide-fade-enter-from,
div.slide-fade-leave-to {
  transform: translate3d(-50%, -75px, 0);
}
.yuan-message {
  position: fixed;
  z-index: 9999;
  left: 50%;
  top: 25px;
  transform: translateX(-50%);
  height: auto;
  display: flex;
  align-items: center;
  min-height: 45px;
  padding: 5px 25px;
  border: 1px solid #e4e4e4;
  background: #f5f5f5;
  color: #999;
  border-radius: 4px;
}
.yuan-message i {
  margin-right: 8px;
  vertical-align: middle;
  font-size: 16px;
  height: 100%;
  display: inline-block;
  float: left;
}
.yuan-message .text {
  vertical-align: middle;
  font-size: 14px;
  line-height: 22px;
}
</style>
