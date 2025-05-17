<script setup lang="ts">
import { onMounted, ref, reactive, watch } from 'vue';
// type
interface Details {
  albumUrl?: string,
  enumPictureCategory?: number | string,
  orderIndex?: number,
  pictureExplain?: string,
  title?: string,
  url?: string,
}
// props
const props = defineProps({
  Detail: {
    type: Array as () => Details[],
    default: () => []
  }
});

const isMobile = ref(false)
// 分类后的新数据
const NewDetail = reactive<Record<string | number, Details[]>>({});

/**
 * 监听 `Detail` 属性的变化，并处理新的数据。
 *
 * - 每当 `Detail` 发生变化时，遍历 `newDetail` 数组。
 * - 根据 `enumPictureCategory` 属性对 `newDetail` 中的项目进行分类。
 * - 如果 `NewDetail` 中不存在某个分类，则初始化为一个空数组。
 * - 将每个项目添加到 `NewDetail` 中对应的分类数组。
 *
 * 配置选项:
 * - `immediate: true` 确保在组件挂载后立即执行一次监听器。
 *
 * @param {Array} props.Detail - 要监听和处理的详情对象数组。
 * @param {Object} NewDetail - 按 `enumPictureCategory` 分类存储项目的对象。
 */
watch(
  () => props.Detail,
  (newDetail) => {
    for (const item of newDetail) {
      let valueDetails = NewDetail[item.enumPictureCategory || 1];
      if (!valueDetails) {
        NewDetail[item.enumPictureCategory || 1] = [];
        valueDetails = NewDetail[item.enumPictureCategory || 1];
      }
      valueDetails.push(item);
    }
  },
  { immediate: true }
);

// 进行需要的内容做提取
const getName = (title: string): string => {
  const match = title.match(/【(.*?)】/);
  // 如果匹配成功，返回括号内的文字；否则返回 title 本身
  return match ? match[1] : '未知';
};
// 页数自动播放器
const getDetailDynamicPage = (item: Details) => {
  const ValueArray = NewDetail[item.enumPictureCategory || 1];
  return ValueArray.findIndex((data) => data === item) + 1; // 修正为从 1 开始计数
}

// 解决pc端和移动端的轮播图小手问题
onMounted(() => {
  // 检测是否为移动端
  isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
});


</script>

<template>
  <div class="Swipe">
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="2500" indicator-color="white" :touchable="isMobile" :show-indicators="false">
      <template v-for="(item, index) in Detail" :key="index">
        <van-swipe-item>
          <!-- 图片 -->
          <img style="width: 100%;" :src="item.url" alt="">
        </van-swipe-item>
      </template>
      <!-- 自定义指示器 -->
      <template #indicator="{ active }">
        <div class="indicator">
          <template v-for="(value, key) in NewDetail" :key="key">
            <span class="ItemChild" :class="{ activeItem: Detail[active]?.enumPictureCategory == key }" v-if="getName(value[0]?.title || '').replace('1', '') !== '未知'">
              {{ getName(value[0]?.title || '').replace('1', '')}}
              <!-- 当前页数播放 -->
              <span v-if="Detail[active]?.enumPictureCategory == key">
                {{ getDetailDynamicPage(Detail[active]) }}/{{ value.length }}
              </span>
            </span>
          </template>
        </div>
      </template>

    </van-swipe>
  </div>
</template>

<style scoped lang="less">
.indicator {
  display: flex;
  justify-content: space-evenly;
  position: absolute;
  bottom: 1.3333vw;
  right: 0;
  color: #ffffff;
  background-color: black;
}

.ItemChild {
  display: block;
  margin: 1.0667vw;
  padding: 1.3333vw;
}

.activeItem {
  background-color: #515555;
  border-radius: 50%;
}
</style>
