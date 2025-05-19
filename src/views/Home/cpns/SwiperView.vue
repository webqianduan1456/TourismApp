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
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <template v-for="(item, index) in SwiperData" :key="index">
        <van-swipe-item>
          <img :src="item.img_url" alt="">
        </van-swipe-item>
      </template>
    </van-swipe>
  </div>
</template>

<style scoped lang="less">
img {
  width: 100%;
  height: 100%;
}

.my-swipe .van-swipe-item {
  height: 28.6667vh;
  text-align: center
}
</style>
