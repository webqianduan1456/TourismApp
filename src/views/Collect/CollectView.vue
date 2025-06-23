<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
import CollectChild from './CollectView/CollectChild.vue';
import { storeToRefs } from 'pinia';
import { userHomeStore } from '@/stores/modules/home';
const userHomeStores = userHomeStore()
const { HomeHouseListCopyS,getHistory } = storeToRefs(userHomeStores)
const router = useRouter()

// 返回上一页
const Rollback = () => {
  router.back()
}
// 我的收藏和浏览记录切换以及对应的容器切换
const title = ['我的收藏', '浏览记录']
const VanBarShow = ref(0)

const VanBarClick = async (index: number) => {
  // 控制(我的收藏和浏览记录)样式显示
  VanBarShow.value = index
  // 我的收藏和浏览记录切换显示
  if (VanBarShow.value === 0) {
    await userHomeStores.fetchAllHomeHouseListCopy()
  } else {
    await userHomeStores.fetchAllGetDataHistory()
  }
}
// 首次挂载显示
onMounted(() => {
  userHomeStores.fetchAllHomeHouseListCopy()
})
</script>

<template>
  <div style="width: 100vw; height: 100vw;">
    <div style="width: 100%; position: fixed;">
      <!-- 详情页头部 -->
      <van-nav-bar left-text="返回" left-arrow @click-left="Rollback">
        <template #title>
          <div>
            <template v-for="(item, index) in title" :key="index">
              <span :class="{ span_active: VanBarShow == index }" @click="VanBarClick(index)">{{ item }}</span>
            </template>
          </div>
        </template>
        <template #right>
          <van-icon name="bell" size="6vw !important" color="" />
        </template>
      </van-nav-bar>
      <!-- 切换栏 -->
      <van-tabs animated title-active-color="#ff5722" line-height="1.4vw" line-width="10.3vw" :swipeable="true"
        :sticky="true">
        <!-- 房屋 -->
        <van-tab title="房屋">
          <!-- 房屋内容 -->
          <!-- -------收藏模块------ -->
          <div v-if="VanBarShow == 0" class="House">
            <template v-for="(item, index) in HomeHouseListCopyS" :key="index">
              <CollectChild :CopyDate="item"></CollectChild>
            </template>
          </div>
          <!-- -------历史模块------ -->
          <div v-else class="House">
            <template v-for="(item, index) in getHistory" :key="index">
              <CollectChild :CopyDate="item"></CollectChild>
            </template>
          </div>
        </van-tab>
        <!-- 房东 -->
        <van-tab title="房东">
          <!-- 内容区 -->
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<style scoped lang="less">
.van-nav-bar__title {
  div {
    display: flex;
    border: 1px solid #ff1313;

    span {
      padding: .8667vw;
      font-size: 4.5vw;
      color: #ff1313;
      cursor: pointer;
    }

    .span_active {
      color: aliceblue;
      background-color: #ff5722;
    }
  }
}

.van-tab__panel {
  .House {
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;

  }
}
</style>
