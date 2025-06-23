<script setup lang="ts">

import { TabBar_Navigation_Value, type TabBarNavigationItem } from '@/assets/LocalData/TabBar_Navigation_Data'
import getAssetUrl from '@/utils/getAssetUrl.ts'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const currentIndex = ref(0);
const router = useRouter()
// TabBar_Navigation状态切换
const TN_Switch_Page: (item: TabBarNavigationItem, index: number) => void = (item, index) => {
  currentIndex.value = index
  router.push(item.path)
}

</script>

<template>
  <div class="TabBar_Navigation">
    <template v-for="(item, index) in TabBar_Navigation_Value" :key="index">
      <div class="text" :class="{ active: currentIndex === index }" @click="TN_Switch_Page(item, index)">
        <!-- 切换图片活跃与休眠状态 -->
        <img v-if="currentIndex === index" :src=getAssetUrl(item.TabBar_Navigation_ImgSrcS) alt="">
        <img v-else :src=getAssetUrl(item.TabBar_Navigation_ImgSrc) alt="">
        <!-- 文本内容 -->
        <span>{{ item.TabBar_Navigation_Text }}</span>
      </div>
    </template>
  </div>
</template>

<style scoped lang="less">
.TabBar_Navigation {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 10vh;
  display: flex;
  cursor: pointer;
  justify-content: space-around;
  align-items: center;

  .text {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    img {
      width: 5.3333vw;
      height: 5.3333vw;

    }

    span {
      font-size: 1.6vw;
    }

    &.active {
      color: #1296db;
    }
  }


}
</style>
