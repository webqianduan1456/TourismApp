<script setup lang="ts">
defineOptions({
  name: 'SearchNav'
})
import router from '@/router';
import { useCityStore } from '@/stores/modules/city';
import { storeToRefs } from 'pinia';
import { onBeforeMount, ref } from 'vue';
import ContentCity from './cpns/ContentCity.vue';
// 搜索功能
const values = ref('');
const Cancel = () => {
  router.push('/home')
};
// tab切换功能
const activeName = ref(1);

// 内容展示区功能
// 对后端数据处理
const CityStores = useCityStore()
onBeforeMount(() => {
  CityStores.fetchAllCityDate()
})
const { getCityAllD } = storeToRefs(CityStores)



</script>

<template>
  <div>
    <!-- 搜索栏 -->
    <van-search show-action placeholder="请输入/城市/区域/位置" @cancel="Cancel()" v-model="values" />
    <!-- 国内和海外切换栏 -->
    <div class="vanTabs">
      <van-tabs v-model:active="activeName" color="red">
        <!-- 国内 -->
        <van-tab :title="getCityAllD?.Domestic.title" :name="getCityAllD?.Domestic.id">
        </van-tab>
        <!-- 海外 -->
        <van-tab :title="getCityAllD?.Abroad?.title" :name="getCityAllD?.Abroad.id">
        </van-tab>
      </van-tabs>
    </div>
    <!-- 各个城市展示区域 -->
    <!-- 优化:使用v-show解决快速切换问题 -->
    <ContentCity :ContentCityDate="getCityAllD?.Domestic" v-show="activeName === getCityAllD?.Domestic.id">
    </ContentCity>
    <ContentCity :ContentCityDate="getCityAllD?.Abroad" v-show="activeName === getCityAllD?.Abroad.id">
    </ContentCity>
  </div>

</template>

<style scoped lang="less">
.vanTabs {
  position: relative;
  z-index: 3;
}


</style>
