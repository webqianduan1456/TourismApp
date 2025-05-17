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

const route = useRoute()
const UserDetailStores = UserDetailStore()
UserDetailStores.fetchAllDetailsDate(Number(route.params.id))

// 回到上一页
const Rollback = () => {
  router.back()
}
onBeforeMount(() => {
  UserDetailStores.fetchAllDetailsDate(Number(route.params.id))
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
    <VanWipe :Detail="UserDetailStores?.DetailsDate?.mainPart?.topModule?.housePicture?.housePics || []"></VanWipe>
    <!-- 详情内容 -->
    <DetailedMessage :Detail="UserDetailStores?.DetailsDate?.mainPart?.topModule || {}"></DetailedMessage>
    <!-- 房屋设施 -->
    <HouseFacilities>
      <!-- left -->
      <template #top>
        <span>房屋设施</span>
      </template>
      <!-- center  -->
      <template #center>
        <template
          v-for="(item, index) in UserDetailStores?.DetailsDate?.mainPart?.dynamicModule?.facilityModule?.houseFacility?.houseFacilitys"
          :key="index">
          <div class="FacilitiesChild" v-if="UserDetailStores?.DetailsDate?.mainPart?.dynamicModule?.facilityModule?.houseFacility?.facilitySort?.includes(index)">
              <!-- 设施 -->
            <span class="basis">
              <span>{{ item?.groupName }}</span>
              <img :src="item?.icon">
            </span>
              <!-- 设施描述 -->
            <div class="Child">
              <template v-for="(items,index) in item.facilitys?.slice(0,4)" :key="index">
                <div>
                  <van-icon name="certificate" color="#03a9f4" /><span>{{ items.name }}</span>
                </div>
              </template>
            </div>
          </div>
        </template>
      </template>
      <!-- right  -->
      <template #bottom>
        <span> 查看全部内容 ></span>
      </template>
    </HouseFacilities>
    <!-- 房东介绍 -->
    <LandlordView :Landlord = "UserDetailStores?.DetailsDate?.mainPart?.dynamicModule?.landlordModule" ></LandlordView>
     <!-- 详细内容评论 -->
    <DetailedComments :Comments = "UserDetailStores?.DetailsDate?.mainPart?.dynamicModule?.commentModule"></DetailedComments>
     <!-- 预定须知 -->
    <ReserveNotice :note="UserDetailStores?.DetailsDate?.mainPart?.dynamicModule?.rulesModule "></ReserveNotice>
     <!-- 地图展示 -->
    <MapDisplay :positionMaps="UserDetailStores?.DetailsDate?.mainPart?.dynamicModule?.positionModule "></MapDisplay>
    <!-- 价格说明 -->
    <PriceExplanation :Price="UserDetailStores?.DetailsDate?.mainPart?.introductionModule"></PriceExplanation>
  </div>
</template>

<style scoped lang="less">

</style>
