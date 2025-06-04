<script setup lang="ts">
defineOptions({
  name: 'DetailsView'
})
import router from '@/router';
import UserDetailStore from '@/stores/modules/detail';
import VanWipe from '@/views/Details/cpns/van-wipe.vue'
import { computed, onMounted, ref, watch } from 'vue';
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
import { userHomeStore } from '@/stores/modules/home';
const route = useRoute()
const UserDetailStores = UserDetailStore()
const { HousingResourceData, HouseKeyImgs } = storeToRefs(UserDetailStores)
const itemData = ref()

const useCityStoreS = useCityStore()
const { CurrentCity } = storeToRefs(useCityStoreS)
const setcolor = ref(false)
const setcolorRed = ref(['#ff1313 !important', '#c1bebe !important'])

const userHomeStores = userHomeStore()

const { HomeHouseList, HomeHouseListCopy } = storeToRefs(userHomeStores)

// 回到上一页
const Rollback = async () => {

  // 收藏图标样式切换状态执行
  if (setcolor.value == true) {
    // 获取第一次首页已经存储的数据,对远程服务器进行添加数据
    itemData.value = HomeHouseList.value.SelectedS.find((item) =>
      item.id === Number(route.params.id)
    )
    // 添加收藏数据
    if (itemData.value) {
      await userHomeStores.fetchAllHomeHouseListAdd(itemData.value)
    }
  } else {
    // 删除数据
    await userHomeStores.fetchAllHomeHouseListDelete(Number(route.params.id))
    // 通过id删除热门副本数据
    const CopyIndex = HomeHouseListCopy?.value?.findIndex(item => item.id === Number(route.params.id))
    if (CopyIndex !== -1 && CopyIndex !== undefined) {
      HomeHouseListCopy?.value?.splice(CopyIndex, 1)
    }
  }
  router.back()
}
// 刷新获取当前数据
onMounted(async () => {
  // 获取详情的数据与轮播图图片
  await UserDetailStores.fetchAllDetailsDate(Number(route.params.id))
  await UserDetailStores.fetchAllHouseKeyImg(Number(route.params.id))
  // 获取路由传过来的id决定收藏样式显示还是隐藏
  setcolor.value = route.params.flay === 'false' ? !Boolean(route.params.flay) : Boolean(route.params.flay)
})


// 获取ref
const rf = ref()
const HeadNavRef = ref()
// 解决滚动后点击切换乱跳问题(isClick开关,isFlag获取元素位置)
const isClick = ref(false)
const isFlag = ref(0)

const { scrollTop } = useScroll(() => { }, rf)
// 滚动到指定位置显示头部
const newScorllTop = computed(() => {
  return scrollTop.value >= 300
})



// 获取ref上的getDetailsRef上的key:name以及value:offsetTop
const getDetailsRefArr = ref<{ [key: string]: HTMLElement }>({})
//------HeadNav组件点击切换触发的getDetailsRef和getEmit----
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
    top: (index !== 1 ? (el.offsetTop - 50) : el.offsetTop),
    behavior: 'smooth',
    easing: 'linear'
  })
}
// 监听滚动位置动态加上样式
watch(scrollTop, (newvalue, oldValue) => {
  // 控制滚动
  if (newvalue - 50 >= isFlag.value && oldValue - 50 <= isFlag.value) {
    isClick.value = false
  }
  // 切换状态关闭滚动
  if (isClick.value) return
  // 获取所有引用元素的DOM节点
  const getDetails = Object.values(getDetailsRefArr.value)
  // 映射出所有元素的垂直偏移量
  const getvalue = getDetails.map(value => value.offsetTop)
  let index = 0
  // 遍历所有偏移量，找出当前滚动位置对应的区域索引
  for (let i = 0; i < getvalue.length; i++) {
    if (newvalue + 50 > getvalue[i]) {
      index = i
    }
  }
  // 如果头部导航存在，更新其激活项
  if (HeadNavRef.value) {
    HeadNavRef.value.trigger = index
  }
})


</script>

<template>
  <div class="Details" ref="rf">
    <!-- 头部固定导航 -->
    <HeadNav :HeadData="getDetailsRefArr" v-if="newScorllTop" @getEmit="getEmit" ref="HeadNavRef"></HeadNav>
    <!-- 详情页头部 -->
    <van-nav-bar title="商品" left-text="返回" left-arrow @click-left="Rollback">
      <template #right>
        <van-icon name="star" size="7vw !important" @click="setcolor = !setcolor"
          :color="setcolor ? setcolorRed[0] : setcolorRed[1]" />
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
