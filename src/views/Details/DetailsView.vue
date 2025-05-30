<script setup lang="ts">
import router from '@/router';
import UserDetailStore from '@/stores/modules/detail';
import VanWipe from '@/views/Details/cpns/van-wipe.vue'
import { computed, onBeforeMount, ref, watch } from 'vue';
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
import HeadNav from './cpns/HeadNav.vue';
import { useScroll } from '@/hooks/scroll';
const route = useRoute()
const UserDetailStores = UserDetailStore()
const { HousingResourceData, HouseKeyImgs } = storeToRefs(UserDetailStores)

const useCityStoreS = useCityStore()
const { CurrentCity } = storeToRefs(useCityStoreS)


// 回到上一页
const Rollback = () => {
  router.back()
}
// 刷新获取当前数据
onBeforeMount(async () => {
  await UserDetailStores.fetchAllDetailsDate(Number(route.params.id))
  await UserDetailStores.fetchAllHouseKeyImg(Number(route.params.id))
})

// 获取ref
const rf = ref()
const HeadNavRef = ref()
// 解决滚动后点击切换乱跳问题
const isClick = ref(false)
const isFlag = ref()
const { scrollTop } = useScroll(() => { }, rf)
const newScorllTop = computed(() => {
  return scrollTop.value >= 100
})

// 获取re上的getDetailsRef上的key:name以及value:offsetTop
const getDetailsRefArr = ref<{ [key: string]: HTMLElement }>({})
//(特殊情况注释)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDetailsRef = (el: any) => {
  const name = el?.$el?.getAttribute('name')
  if (el) {
    getDetailsRefArr.value[name] = el?.$el
  }
}
// 接收子组件传过来的getEmit
const getEmit = (index: number) => {
  const key = Object.keys(getDetailsRefArr.value)[index]
  const el = getDetailsRefArr.value[key]

  isClick.value = true
  // 记录滚动到的位置开启滚动
  isFlag.value = el.offsetTop - 35
  // 滚动到指定el元素位置
  rf.value.scrollTo({
    top: (index == 2 ? (el.offsetTop - 35) : el.offsetTop),
    behavior: 'smooth',
    easing: 'linear'
  })
}
// 监听滚动位置动态加上样式
watch(scrollTop, (newvalue) => {
  // 控制滚动
  if(newvalue == isFlag.value){
    isClick.value = false
  }
  // 切换状态关闭滚动
  if (isClick.value) return
  const getDetails = Object.values(getDetailsRefArr.value)
  const getvalue = getDetails.map(value => value.offsetTop)
  let index = 0
  for (let i = 0; i < getvalue.length; i++) {
    if (newvalue + 50> getvalue[i]) {
      index = i
    }
  }
  if(HeadNavRef.value){
    HeadNavRef.value.trigger = index
  }
})
</script>

<template>
  <div class="Details" ref="rf">
    <!-- 头部固定导航 -->
    <HeadNav :HeadData="getDetailsRefArr" v-if="newScorllTop" @getEmit="getEmit" ref="HeadNavRef" ></HeadNav>
    <!-- 详情页头部 -->
    <van-nav-bar title="商品" left-text="返回" left-arrow @click-left="Rollback">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <!-- 轮播图 -->
    <VanWipe :Detail="HouseKeyImgs?.HouseKeyImg"></VanWipe>
    <!-- 简述描述 -->
    <DetailedMessage :Detail="HousingResourceData?.HousingResource" name="描述" :ref="getDetailsRef"></DetailedMessage>
    <!-- 房屋设施 -->
    <HouseFacilities name="设施" :ref="getDetailsRef">
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
    <DetailedComments :Comments="HousingResourceData?.HousingResource" name="评分" :ref="getDetailsRef">
    </DetailedComments>
    <!-- 用户评论区 -->
    <ReserveNotice :note="HousingResourceData?.HousingResource.houserNotice"></ReserveNotice>
    <!-- 高德地图 -->
    <MapDisplay :positionMaps="CurrentCity"></MapDisplay>
    <!-- 底部其他信息补充 -->
    <PriceExplanation :Price="HousingResourceData?.HousingResource.housMessage"></PriceExplanation>
  </div>
</template>

<style scoped lang="less">
.Details {
  overflow-y: scroll;
  height: 100vh
}
</style>
