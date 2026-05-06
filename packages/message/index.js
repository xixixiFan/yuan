import { createVNode, render } from 'vue'
import mMessage from './index.vue'
import './message.css' 

let container = null  // 单例容器,确保只创建一个DOM容器来显示消息,避免message组件覆盖以及重复创建多个容器导致性能问题

// 获取/创建全局容器
function getContainer() {
  if (typeof document === 'undefined' || typeof document.createElement === 'undefined') return null
  if (!container) {
    container = document.createElement('div')
    container.className = 'yuan-message-container'
    document.body.appendChild(container)
  }
  return container
}

//导出一个函数，接收一个对象作为参数，包含消息的文本、类型、持续时间、图标、文本颜色、背景颜色和自定义类名
function Message(options) {
  const { text, type, timeout, icon, textColor, bgColor, customClass } = options
  const container = getContainer()
  if (!container) return
  // 每条消息的独立包装
  const wrapper = document.createElement('div')
  wrapper.className = 'yuan-message-wrapper'
  container.appendChild(wrapper)

  let timer = null
  // 传递给组件的选项，参数：组件、props、children（默认插槽的内容）
  const vnode = createVNode(mMessage, { text, type, timeout, icon, textColor, bgColor, customClass }, [text])
  // 将虚拟节点渲染到DOM容器中
  render(vnode, wrapper)

  const close = () => {
    clearTimeout(timer)
    // 清空渲染（移除组件）
    render(null, wrapper)
    // 移除wrapper元素
    wrapper.remove()
    // 容器空了，移除容器并重置单例引用
    if (container.children.length === 0) {
      //把 DOM 元素从页面移除,并且把 container 变量设置为 null，这样下次调用 Message 函数时就会重新创建一个新的容器。
      container.remove()
      container = null
    }
  }
  // 自动关闭
  if (timeout !== 0) {
    timer = setTimeout(close, timeout || 2500)
  }
  return { close }
}

// 便捷方法,添加属性，方便用户直接调用Message.success()、Message.error()等方法来显示不同类型的消息
Message.success = (text, options = {}) => Message({ ...options, text, type: 'success' })
Message.error = (text, options = {}) => Message({ ...options, text, type: 'error' })
Message.warning = (text, options = {}) => Message({ ...options, text, type: 'warning' })
Message.info = (text, options = {}) => Message({ ...options, text, type: 'info' })

export default Message