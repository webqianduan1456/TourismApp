<script setup lang="ts">
defineOptions({
  name: 'HomeView'
})
import router from '@/router';
import TNavBar from '@/views/Home/cpns/TNavBar.vue';
import StayDays from '@/views/Home/cpns/StayDays.vue';
import { onActivated, ref } from 'vue';
import HotPicks from '@/views/Home/cpns/HotPicks.vue';
import LocationView from '@/views/Home/cpns/LocationView.vue';
import { storeToRefs } from 'pinia';
import { userHomeStore } from '@/stores/modules/home';
import HeadFixation from '@/views/Home/cpns/HeadFixation.vue';
import SwiperView from '@/views/Home/cpns/SwiperView.vue';
import { useCityStore } from '@/stores/modules/city';
import { useScroll } from '@/hooks/scroll';

const useCityStores = useCityStore();
// 请求首页数据
const userHomeStores = userHomeStore();
userHomeStores.fetchAllHomeData(useCityStores.CurrentCity.id);
userHomeStores.fetchAllHomeCategories();
userHomeStores.fetchAllSwiperDate();
const HomeViewRef = ref()
// 鼠标滚动到底部时触发

const { scrollTop } = useScroll(() => {
  userHomeStores.fetchAllHomeHouseList();
}, HomeViewRef);

// 获取stores数据
const { HomeStayDate, SwiperImg } = storeToRefs(userHomeStores);
// defineEmits数据
const NewBeforeDates = ref('')
const NewBehindDates = ref('')
const StayDaysDates = (NewBeforeDate: string, NewBehindDate: string) => {
  NewBeforeDates.value = NewBeforeDate
  NewBehindDates.value = NewBehindDate
}

// 跳转住宿选着区
const ResidenceSearch = (BeforeDate: string, BehindDate: string) => {
  router.push({
    path: "/ResidenceSearch",
    query: {
      BeforeDate,
      BehindDate
    }
  })
}
// 回到首页记录当前位置
onActivated(() =>
  HomeViewRef?.value?.scrollTo({
    top: scrollTop?.value
  })
)
// 景点查询
const getAttractions = ref('')
</script>

<template>
  <!-- 标题 -->
  <div class="HomeView" ref="HomeViewRef">
    <TNavBar></TNavBar>
    <!-- 轮播图 -->
    <SwiperView :SwiperData="SwiperImg || []"></SwiperView>
    <!-- 位置 -->
    <LocationView />
    <!-- 入驻时间,景点,便捷导航 -->
    <div class="Content">
      <!-- 入驻时间 -->
      <StayDays @StayDaysDate="StayDaysDates"></StayDays>
      <!-- 景点查询 -->
      <van-search v-model="getAttractions" shape="round" placeholder="关键字/位置/民宿名" />
      <div class="SearchContent">
        <!-- 选着地区 -->
        <div class="Contents">
          <template v-for="(item, index) in HomeStayDate?.citiesArea" :key="index">
            <span>{{ item.area }}</span>
          </template>
        </div>
        <!-- 搜索按钮 -->
        <div class="Searches">
          <van-button color="orange" round block
            @click="ResidenceSearch(NewBeforeDates, NewBehindDates)">开始搜索</van-button>
        </div>
      </div>
      <!-- 便捷导航 -->
      <div class="Convenience">
        <template v-for="(item, index) in userHomeStores?.HomeCategories?.mergedData" :key="index">
          <div class="ConvenienceContent">
            <img :src="item?.img" alt="">
            <span>{{ item?.title }}</span>
          </div>
        </template>
      </div>
    </div>
    <!-- 头部固定搜索栏 -->
    <HeadFixation :scrollTop="scrollTop" />
    <!-- 热门精选 -->
    <HotPicks></HotPicks>
  </div>
</template>

<style scoped lang="less">
@import "@/common/less/Home/HomeVariable.less";

.HomeView {
  position: relative;
  height: 100vh;
  overflow-y: scroll ;
}


.Content {

  .SearchContent {
    margin: 3.3333vw;

    .Contents {
      display: flex;
      flex-wrap: wrap;

      span {
        cursor: pointer;
        font-size: 4.4vw;
        margin: 2vw;
      }
    }

    .Searches {
      margin-top: 1.3333vw;
    }
  }
}

.Convenience {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 3.3333vw;
  overflow-x: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    height: calc(1vw);
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: calc(0.5vw);
  }

  &::-webkit-scrollbar-track {
    background: #f5f5f5;
  }

  @media (max-width: 1024px) {
    &::-webkit-scrollbar {
      display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .ConvenienceContent {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-right: 3vw;

    img {
      width: 12vw;
      height: 12vw;
      border-radius: 50%;
    }

    span {
      font-size: 3vw;
      margin-top: 1vw;
      text-align: center;
      white-space: nowrap;
    }
  }
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 7.7333vw;
  line-height: 45vw;
  text-align: center;
  background-color: #39a9ed;
}
</style>
