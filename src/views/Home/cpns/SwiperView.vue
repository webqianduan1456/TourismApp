<script setup lang="ts">

defineProps<{
  SwiperData: {
    id: number;
    img_url: string;
    img_message: string;
  }[]
}>(

)


</script>

<template>
  <div>
    <!-- 首页轮播图展示 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#skyblue">
      <template v-for="(item, index) in SwiperData" :key="index">
        <van-swipe-item>
          <img :src="item.img_url" alt="">
        </van-swipe-item>
      </template>
    </van-swipe>
  </div>
</template>

<style scoped lang="less">
.my-swipe{
    height: var(--my-swipe) ;
 }
img {
  width: 100%;
  height: 100%;
}
</style>
