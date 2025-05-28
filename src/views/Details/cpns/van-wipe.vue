<script setup lang="ts">
import { onMounted, ref, } from 'vue';
// props
interface HouseKeyImgSection {
  orderIndex: number;
  title: string;
  url: string;
}
defineProps({
  Detail: {
    type: Array as () => HouseKeyImgSection[],
    default: () => []
  }
});
const isMobile = ref(false)

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
      <template v-for="item in Detail" :key="item.orderIndex">
        <van-swipe-item>
          <img style="width: 100%; height: 100%;" :src="item.url" alt="轮播图" />
        </van-swipe-item>
      </template>
      <!-- 自定义指示器 -->
    </van-swipe>
  </div>
</template>

<style scoped lang="less">
.my-swipe{
  width: 100%;
  height: 30vh;
}
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
