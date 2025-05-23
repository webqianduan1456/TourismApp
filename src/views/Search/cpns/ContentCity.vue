<script setup lang="ts">
import router from '@/router';
import { useCityStore } from '@/stores/modules/city';
import { computed } from 'vue';
const useCityStores = useCityStore()
// props
const props = defineProps({
  ContentCityDate: {
    type: Object,
    default: () => ({ cityInfo: [Object] })
  }
})
// 符号#
const newSymbol = computed(() => {

  const newSymbol = props.ContentCityDate?.cityInfo.map((item: { group: string; }[]) => {
    return item[0].group;
  })
  newSymbol.unshift("#")
  return newSymbol
})


// 更改当前城市返回上一级
const ObtainCity = (item: string) => {
  useCityStores.CurrentCity.cityName = item
  router.back()
}
</script>

<template>
  <div class="Content">
    <van-index-bar highlight-color="red" :index-list="newSymbol" sticky>
      <!-- 热门头部 -->
      <van-index-anchor :index="'热门'" />
      <!-- 热门展示区 -->
      <div class="HotCity">
        <template v-for="(item, index) in ContentCityDate?.cityInfo" :key="index">
          <template v-for="ite in item" :key="ite.id">
            <span v-if="ite.hot == 'True'" @click="ObtainCity(ite.cityName)">{{ ite.cityName }}</span>
          </template>
        </template>
      </div>
      <!-- 地理选择区 -->
      <template v-for="(ite, index) in ContentCityDate?.cityInfo" :key="index">
        <!-- 标题A-Z -->
        <van-index-anchor :index="ite[0].group" />
        <!-- 展示所有城市 -->
        <template v-for="(item) in ite" :key="item">
          <van-cell :title="item.cityName" @click="ObtainCity(item.cityName)" />
        </template>
      </template>

    </van-index-bar>
  </div>
</template>

<style scoped lang="less">
.Content {
  height: calc(100vh - 98px);
  overflow-y: auto;
  font-size: var(--van-font-size);
}

.HotCity {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  padding: 0 2.6667vw;

  span {
    color: rgb(0, 0, 0);
    width: 16vw;
    height: 8vw;
    background-color: #29d996;
    border-radius: calc(1.3333vw * 2);
    line-height: 8vw;
    text-align: center;
    margin: calc(.6667vw * 1.5);
    cursor: pointer;
    overflow: hidden;
  }
}
</style>
