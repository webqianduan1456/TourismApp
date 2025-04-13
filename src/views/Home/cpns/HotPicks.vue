<script setup lang="ts">
import { userHomeStore } from '@/stores/modules/home'
import HomeHouseV3 from '@/components/HomeHouse-v3/HomeHouse-v3.vue'
import HomeHouseV9 from '@/components/HomeHouse-v9/HomeHouse-v9.vue'
// 获取用户首页的 store
const userHomeStores = userHomeStore()
userHomeStores.fetchAllHomeHouseList()
</script>

<template>
  <div>
    <!-- 热门精选标题 -->
    <h1>热门精选</h1>
    <div class="hot-picks">
      <!-- 遍历 HomeHouseList，根据 discoveryContentType 渲染不同组件 -->
      <template v-for="(item, index) in userHomeStores.HomeHouseList" :key="index">
        <!-- 如果 discoveryContentType 为 3，渲染 HomeHouseV3 -->
        <HomeHouseV3 v-if="item.discoveryContentType === 3" :item-data="item.data" />
        <!-- 如果 discoveryContentType 为 9，渲染 HomeHouseV9 -->
        <HomeHouseV9 v-else-if="item.discoveryContentType === 9" :item-data="item.data" />
      </template>
    </div>

  </div>
</template>

<style scoped lang="less">
/* 热门精选的样式 */
.hot-picks {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1vw;
  box-sizing: border-box;
  padding: 0;
  margin: 0 auto;
  max-width: 100%;
}
</style>
