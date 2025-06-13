<script setup lang="ts">
import { userHomeStore } from '@/stores/modules/home'
import HomeHouseV3 from '@/components/HomeHouse-v3/HomeHouse-v3.vue'
import HomeHouseV9 from '@/components/HomeHouse-v9/HomeHouse-v9.vue'
import router from '@/router'
import UserDetailStore from '@/stores/modules/detail'
import { storeToRefs } from 'pinia'
// 数据1
const UserDetailStores = UserDetailStore()
// 数据2
const userHomeStores = userHomeStore()
userHomeStores.fetchAllHomeHouseList(null)
const { HomeHouseListCopy } = storeToRefs(userHomeStores)

// 跳转详情界面
const Details = async (item: { id: number }) => {

  if (!item.id) return
  // 跳转之前进行当前详情页面的数据获取
  await UserDetailStores.fetchAllDetailsDate(item?.id)
  // 跳转之前获取热门精选副本数据
  await userHomeStores.fetchAllHomeHouseListCopy(item?.id)
  // 跳转前记录用户历史记录
  await userHomeStores.fetchAllHomeHouseList(1, item?.id)

  //  查找出热门副本的数据flay通过路由传到详情页面控制收藏图标状态
  const n = HomeHouseListCopy?.value && Array.isArray(HomeHouseListCopy.value)
    ? HomeHouseListCopy.value.map((ite) => ite?.id === item?.id)
    : []
  const flay = n.includes(true)
  //  跳转
  router.push(`/DetailsView/${item.id}/${flay}`)
}
</script>

<template>
  <div>
    <!-- 热门精选标题 -->
    <h1>热门精选</h1>
    <div class="hot-picks">
      <!-- 遍历 HomeHouseList，根据 discoveryContentType 渲染不同组件 -->
      <template v-for="(item, index) in userHomeStores?.HomeHouseList?.SelectedS" :key="index">
        <!-- 如果 discoveryContentType 为 3，渲染 HomeHouseV3 -->
        <HomeHouseV3 v-if="item.discoveryContentType === 3" :item-data="item" @click="Details(item)" />
        <!-- 如果 discoveryContentType 为 9，渲染 HomeHouseV9 -->
        <HomeHouseV9 v-else-if="item.discoveryContentType === 9" :item-data="item" @click="Details(item)" />
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
