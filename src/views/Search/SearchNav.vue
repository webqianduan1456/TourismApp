<script setup lang="ts">
import router from '@/router';
import { useCityStore } from '@/stores/modules/city';
import { storeToRefs } from 'pinia';
import {  ref } from 'vue';
import ContentCity from './cpns/ContentCity.vue';
// 搜索功能
const values = ref('');
const Cancel = () => {
  router.push('/home')
};
// tab切换功能
const activeName = ref();

// 内容展示区功能
// 对后端数据处理
const CityStores = useCityStore()
CityStores.fetchAllCityDate()
const { getCityAllD } = storeToRefs(CityStores)



</script>

<template>
  <div>
    <!-- 搜索栏 -->
    <van-search class="search" show-action placeholder="请输入/城市/区域/位置" @cancel="Cancel()" v-model="values" />
    <!-- 国内和海外切换栏 -->
    <div class="vanTabs">
      <van-tabs v-model:active="activeName" color="red">
        <template v-for="(item, key) in getCityAllD" :key="key">
          <van-tab :title="(item as any)?.title" :name="key">
          </van-tab>
        </template>
      </van-tabs>
    </div>
    <!-- 各个城市展示区域 -->
    <!-- 优化:使用v-show解决快速切换问题 -->
    <template v-for="(ite, key) in getCityAllD" :key="key">
      <ContentCity v-show="activeName === key" :ContentCityDate="ite"></ContentCity>
    </template>
  </div>
</template>

<style scoped lang="less">
.vanTabs {
  position: relative;
  z-index: 3;
}
.search{
  z-index: 6;
}
</style>
