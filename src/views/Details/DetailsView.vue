<script setup lang="ts">
import router from '@/router';
import UserDetailStore from '@/stores/modules/detail';
import VanWipe from '@/views/Details/cpns/van-wipe.vue'
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import DetailedMessage from '@/views/Details/cpns/DetailedMessage.vue'
import HouseFacilities from '@/views/Details/cpns/HouseFacilities.vue'
import LandlordView from '@/views/Details/cpns/LandlordView.vue'
import DetailedComments from '@/views/Details/cpns/DetailedComments.vue'
import ReserveNotice from "@/views/Details/cpns/ReserveNotice.vue"
import MapDisplay from "@/views/Details/cpns/MapDisplay.vue"
import PriceExplanation from "@/views/Details/cpns/PriceExplanation.vue"
import { storeToRefs } from 'pinia';
import { useCityStore } from '@/stores/modules/city';

const route = useRoute()
const UserDetailStores = UserDetailStore()
const { HousingResourceData } = storeToRefs(UserDetailStores)

const useCityStoreS = useCityStore()
const { CurrentCity } = storeToRefs(useCityStoreS)

// 回到上一页
const Rollback = () => {
  router.back()
}
// 刷新获取当前数据
onBeforeMount(async () => {
  await UserDetailStores.fetchAllDetailsDate(Number(route.params.id))
})



</script>

<template>
  <div class="Details">
    <!-- 详情页头部 -->
    <van-nav-bar title="商品" left-text="返回" left-arrow @click-left="Rollback">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <!-- 轮播图 -->
    <VanWipe :Detail="HousingResourceData?.HousingResource.houseKeyimg"></VanWipe>
    <!-- 简述描述 -->
    <DetailedMessage :Detail="HousingResourceData?.HousingResource"></DetailedMessage>
    <!-- 房屋设施 -->
    <HouseFacilities>
      <template #top>
        <span>房屋设施</span>
      </template>
      <template #center>
        <template v-for="item in HousingResourceData?.HousingResource.housefacilities" :key="item.id">
          <div class="FacilitiesChild">
            <div class="basis">
              <div>{{ item.name }}</div>
              <img :src="item.url" alt="">
            </div>
            <div class="Child">
              <template v-for="(ite, index) in item.housefacilitieses" :key="index">
                <div><van-icon name="checked" />{{ ite.Benefits1 }}</div>
                <div><van-icon name="checked" />{{ ite.Benefits2 }}</div>
                <div><van-icon name="checked" />{{ ite.Benefits3 }}</div>
                <div><van-icon name="checked" />{{ ite.Benefits4 }}</div>
              </template>
            </div>
          </div>
        </template>
      </template>
      <template #bottom>
        查看全部
      </template>
    </HouseFacilities>
    <!-- 房东介绍界面 -->
    <LandlordView :Landlord="HousingResourceData?.HousingResource"></LandlordView>
    <!-- 评分区域界面 -->
    <DetailedComments :Comments="HousingResourceData?.HousingResource"></DetailedComments>
    <!-- 用户评论区 -->
    <ReserveNotice :note="HousingResourceData?.HousingResource.houserNotice"></ReserveNotice>
    <!-- 高德地图 -->
    <MapDisplay :positionMaps="CurrentCity"></MapDisplay>
    <!-- 底部其他信息补充 -->
    <PriceExplanation :Price="HousingResourceData?.HousingResource.housMessage"></PriceExplanation>
  </div>
</template>

<style scoped lang="less"></style>
