<template>
  <div 
    class="yuan-group-input" 
    :class="`yuan-group-input--${size}`"
    :data-size="size"
  >
    <div 
      class="yuan-input"
      :class="inputClasses"
      :style="isStyle"
      :data-size="size"
    >
      <!-- 左图标 -->
      <i 
        v-if="!showPassword && leftIcon" 
        class="yuan-input__icon yuan-input__icon--left iconfont" 
        :class="leftIcon"
      ></i>
      
      <!-- 输入框 -->
      <input
        class="yuan-input__field"
        :type="inptype"
        :value="modelValue"
        @input="iptChange"
        @focus="focus"
        @blur="blur"
        @change="change"
        :disabled="disabled"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :readonly="readonly"
        :form="form"
      />
      
      <!-- 清除按钮 -->
      <transition name="slide-fade">
        <i
          v-if="!showPassword && clearable && modelValue !== ''"
          class="yuan-input__icon yuan-input__icon--clear iconfont m-icon-close"
          @click="clear"
        ></i>
      </transition>
      
      <!-- 右图标 -->
      <i
        v-if="!showPassword && rightIcon && !clearable"
        class="yuan-input__icon yuan-input__icon--right iconfont"
        :class="rightIcon"
      ></i>
      
      <!-- 密码图标 -->
      <i
        v-if="showPassword"
        class="yuan-input__icon yuan-input__icon--password iconfont m-icon-browse"
        @click="showPwd(type)"
      ></i>
    </div>
    
    <slot name="btn"/>
  </div>
</template>
<script setup>
// defineOptions 是用来定义组件选项的，比如组件名称等
defineOptions({name: "mInput"});
import { ref, useSlots, computed } from "vue";
const emit = defineEmits([
  'update:modelValue','clear','focus','blur','input','change'
])
const props = defineProps({
  modelValue: [String, Number],
  disabled: Boolean,
  clearable: Boolean,
  showPassword: Boolean,
  type: { type: String, default: 'text' },
  size: { type: String, default: 'default' },
  leftIcon: { type: String, default: '' },
  rightIcon: { type: String, default: '' },
  placeholder: String,
  autofocus: Boolean,
  focusColor: { type: String, default: '#0e80eb' },
  readonly: Boolean,
  form: String
})
const slot = useSlots()
const isStyle = ref({})
const baseStyle = computed(() => ({
  width: slot.btn ? 'auto' : '100%',
  float: slot.btn ? 'left' : 'none',
  borderRadius: slot.btn ? '4px 0 0 4px' : '4px',
}))
isStyle.value = {
  ...baseStyle.value,
  borderColor: '#dcdfe6f6'
}
const focus  = (e) =>{
   isStyle.value = {
    ...baseStyle.value,
    borderColor: props.focusColor
  }
  emit('focus',e)
}
const blur  = (e) =>{
  isStyle.value = baseStyle.value
  emit('blur', e)
}

const iptChange = (e) => {
  emit('update:modelValue', e.target.value)
  emit('input',e.target.value)
}
const change = (e) =>{
  emit('change',e)
}
const clear = (e) =>{
  emit('update:modelValue', "")
  emit('clear')
}

const inptype = ref(props.type)
const showPwd = (e) =>{
  inptype.value = inptype.value === 'text' ? 'password' : 'text'
}


const inputClasses = computed(() => {
 const classes = []
  
  // 尺寸修饰符
  classes.push(`yuan-input--${props.size}`)
  
  // 功能修饰符
  if (props.clearable) classes.push('yuan-input--clearable')
  if (props.disabled) classes.push('yuan-input--disabled')
  if (props.leftIcon) classes.push('yuan-input--left-icon')
  if (props.rightIcon && !props.clearable) classes.push('yuan-input--right-icon')
  
  // 密码框
  if (props.type === 'password') {
    classes.push(props.showPassword ? 'yuan-input--password-show' : 'yuan-input--password')
  }
  
  return classes
})
</script>
<style>
@import url("../../styles/iconfont.css");
@import url("../../styles/main.css");

/* ============================================
   基础变量（default）
   ============================================ */
.yuan-input,
.yuan-group-input {
  --input-height: 35px;
  --input-font-size: 14px;
  --input-padding-y: 10px;
  --input-padding-x: 10px;
  --input-icon-top: 11px;
  --input-clearable-top: 10px;
  --input-clearable-size: 13px;
  --input-btn-padding: 9px 20px;
}

/* ============================================
   尺寸变量覆盖
   ============================================ */
.yuan-input--small,
.yuan-group-input--small {
  --input-height: 30px;
  --input-font-size: 13px;
  --input-padding-y: 7px;
  --input-padding-x: 10px;
  --input-icon-top: 8px;
  --input-clearable-top: 7px;
  --input-clearable-size: 13px;
  --input-btn-padding: 6.6px 15px;
}

.yuan-input--mini,
.yuan-group-input--mini {
  --input-height: 28px;
  --input-font-size: 12px;
  --input-padding-y: 6px;
  --input-padding-x: 10px;
  --input-icon-top: 7px;
  --input-clearable-top: 7px;
  --input-clearable-size: 12px;
  --input-btn-padding: 7px 15px;
}

/* ============================================
   基础容器
   ============================================ */
.yuan-input {
  width: 100%;
  height: var(--input-height);
  border: 1px solid #dcdfe6f6;
  overflow: hidden;
  border-radius: 4px;
  transition: all 0.2s ease;
  position: relative;
  box-sizing: border-box;
}

/* ============================================
   输入框基础
   ============================================ */
.yuan-input__field {
  width: 100%;
  height: 100%;
  font-size: var(--input-font-size);
  outline: none;
  border: 0;
  margin: 0;
  padding: var(--input-padding-y) var(--input-padding-x);
  box-sizing: border-box;
  color: #606266;
  background: transparent;
}

.yuan-input__field::placeholder {
  color: #c6c8cc;
  font-size: var(--input-font-size);
}

.yuan-input__field:disabled {
  cursor: no-drop;
  color: #c3bfbf;
}

/* ============================================
   图标基础
   ============================================ */
.yuan-input__icon {
  position: absolute;
  color: #94969b;
  transition: all 0.2s ease;
}

/* ============================================
   密码图标
   ============================================ */
.yuan-input__icon--password {
  right: 10px;
  top: var(--input-icon-top);
  cursor: pointer;
}

/* 密码框：右侧留位 */
.yuan-input--password .yuan-input__field,
.yuan-input--password-show .yuan-input__field {
  padding-right: 30px;
}

/* ============================================
   清除按钮
   ============================================ */
.yuan-input__icon--clear {
  right: 10px;
  top: var(--input-clearable-top);
  font-size: var(--input-clearable-size);
  cursor: pointer;
}

/* 可清除：右侧留位 */
.yuan-input--clearable .yuan-input__field {
  padding-right: 30px;
}

/* 禁用状态隐藏清除按钮 */
.yuan-input--disabled .yuan-input__icon--clear {
  display: none;
}

/* ============================================
   左图标
   ============================================ */
.yuan-input__icon--left {
  left: 10px;
  top: var(--input-icon-top);
}

/* 左图标：左侧留位，右侧给清除按钮或右图标留位 */
.yuan-input--left-icon .yuan-input__field {
  padding-left: 32px;
}

/* 左图标 + 可清除：右侧需要更多空间 */
.yuan-input--left-icon.yuan-input--clearable .yuan-input__field {
  padding-right: 30px;
}

/* 左图标 + 右图标（理论上不会同时出现，但防御性定义） */
.yuan-input--left-icon.yuan-input--right-icon .yuan-input__field {
  padding-left: 32px;
  padding-right: 32px;
}

/* ============================================
   右图标
   ============================================ */
.yuan-input__icon--right {
  right: 10px;
  top: var(--input-icon-top);
}

/* 右图标：右侧留位 */
.yuan-input--right-icon .yuan-input__field {
  padding-right: 32px;
}

/* ============================================
   组合状态：左 + 清除 + 右（防御性）
   ============================================ */
.yuan-input--left-icon.yuan-input--clearable.yuan-input--right-icon .yuan-input__field {
  padding-left: 32px;
  padding-right: 52px;  /* 30 + 22 间隔，或根据实际调整 */
}

/* ============================================
   禁用状态
   ============================================ */
.yuan-input--disabled .yuan-input__icon--left,
.yuan-input--disabled .yuan-input__icon--right {
  color: #c6c8cc;
}

/* ============================================
   Group 容器
   ============================================ */
.yuan-group-input {
  display: flex;
  min-width: auto;
  border: none;
  height: auto;
}

.yuan-group-input--default {
  /* default 变量已在基础定义 */
}

.yuan-group-input--small .yuan-input {
  /* 变量已覆盖，无需额外定义 */
}

.yuan-group-input--mini .yuan-input {
  /* 变量已覆盖，无需额外定义 */
}

/* Group 里的按钮 */
.yuan-group-input .yuan-button {
  border-radius: 0 2px 2px 0;
  padding: var(--input-btn-padding) !important;
}

/* ============================================
   动画
   ============================================ */
.slide-fade-enter-active {
  transition: all 0.1s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
