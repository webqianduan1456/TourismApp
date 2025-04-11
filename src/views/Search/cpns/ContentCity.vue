<script setup lang="ts">
import router from '@/router';
import { useCityStore } from '@/stores/modules/city';
import { computed } from 'vue';
const useCityStores = useCityStore()
// props
const props = defineProps({
  ContentCityDate: {
    type: Object,
    default: () => ({})
  }
})
// 符号#
const Symbol = computed(() => {
  // @ts-expect-error(item.group服务器响应的数据)
  const newSymbol = props.ContentCityDate?.cities?.map((item:string) => item.group)
  newSymbol.unshift("#")
  return newSymbol
})
// 更改当前城市返回上一级
const ObtainCity = (item:object) => {

  useCityStores.CurrentCity = item
  router.back()
}
</script>

<template>
  <div class="Content">
    <van-index-bar highlight-color="red" :index-list="Symbol" :sticky="false">
      <!-- 1 -->
      <van-index-anchor :index="'热门'" />
      <div class="HotCity">
        <template v-for="item in ContentCityDate?.hotCities" :key="item.cityId">
          <span @click="ObtainCity(item)">{{ item.cityName }}</span>
        </template>
      </div>

      <!-- 2 -->
      <template v-for="(ite, index) in ContentCityDate?.cities" :key="index">
        <!-- 标题A-Z -->
        <van-index-anchor :index="ite.group" />
        <!-- 展示所有城市 -->
        <template v-for="item in ite?.cities" :key="item?.cityId">
          <van-cell :title="item.cityName" @click="ObtainCity(item)"  />
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<style scoped lang="less">
.Content {
  height: calc(100vh - 98px);
  overflow-y: auto;
}

.HotCity {
  display: flex;
  justify-content: start;
  padding: 0 2.6667vw;
  flex-wrap: wrap;

  span {
    color: rgb(0, 0, 0);
    width: 10.6667vw;
    height: 4vw;
    background-color: #29d996;
    border-radius: 1.3333vw;
    line-height: 4vw;
    text-align: center;
    margin: .6667vw;
    cursor: pointer;
  }
}
</style>
