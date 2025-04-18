import { onMounted, onUnmounted, ref } from 'vue'

// 自定义 Hook：监听滚动事件并触发传入的回调函数
export function useScroll(fetchMoreData: () => void = () => {}) {
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)

  if (typeof fetchMoreData !== 'function') {
    console.error('fetchMoreData 必须是一个函数')
    return
  }

  let isThrottled = false // 节流标志

  // 滚动事件处理函数
  const handleScroll = () => {
    if (isThrottled) return // 如果处于节流状态，直接返回
    isThrottled = true
    setTimeout(() => {
      clientHeight.value = document.documentElement.clientHeight // 可视区域高度
      scrollTop.value = document.documentElement.scrollTop // 滚动条距离顶部的距离
      scrollHeight.value = document.documentElement.scrollHeight // 文档总高度

      // 判断是否滚动到底部（考虑偏移量）
      if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
        fetchMoreData() // 调用传入的回调函数
      }

      isThrottled = false // 重置节流标志
    }, 200) // 节流间隔时间
  }

  // 组件挂载时添加滚动事件监听器
  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true }) // 确保事件监听器是被动的
  })

  // 组件卸载时移除滚动事件监听器
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return { clientHeight, scrollTop, scrollHeight }
}

