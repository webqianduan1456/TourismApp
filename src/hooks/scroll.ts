import { onMounted, onUnmounted, ref, type Ref } from "vue";

// 自定义 Hook：监听滚动事件并触发传入的回调函数
export function useScroll(fetchMoreData: () => void = () => {}, elemt: Ref<HTMLElement>) {
  let el: Window | HTMLElement = window;
  const clientHeight = ref(0);
  const scrollTop = ref(0);
  const scrollHeight = ref(0);
  const isThrottled = ref(false); // 节流标志

  // 滚动事件处理函数
  const handleScroll = () => {
    if (isThrottled.value) return;
    isThrottled.value = true;
     // 如果处于节流状态，直接返回
    setTimeout(() => {
      if (el === window) {
        clientHeight.value = document.documentElement.clientHeight; // 可视区域高度
        scrollTop.value = document.documentElement.scrollTop; // 滚动条距离顶部的距离
        scrollHeight.value = document.documentElement.scrollHeight; // 文档总高度
        // 判断是否滚动到底部（考虑偏移量）
        if (clientHeight.value + Math.ceil(scrollTop.value) >= scrollHeight.value - 1) {
          fetchMoreData(); // 调用传入的回调函数
        }
      } else {
        clientHeight.value = Math.ceil((el as HTMLElement).clientHeight);
        scrollTop.value = Math.ceil((el as HTMLElement).scrollTop);
        scrollHeight.value = (el as HTMLElement).scrollHeight
        // 判断是否滚动到底部（考虑偏移量）
        if (clientHeight.value + Math.ceil(scrollTop.value + 2) >= scrollHeight.value) {
          fetchMoreData()
        }
      }
      isThrottled.value = false; // 重置节流标志
    }, 200); // 节流间隔时间
  };

  // 组件挂载时添加滚动事件监听器
  onMounted(() => {
    if (elemt?.value) el = elemt.value;
    el.addEventListener("scroll", handleScroll, { passive: true });
  });

  // 组件卸载时移除滚动事件监听器
  onUnmounted(() => {
    if (elemt?.value) el = elemt.value;
    el.removeEventListener("scroll", handleScroll);
  });

  return { clientHeight, scrollTop, scrollHeight };
}
