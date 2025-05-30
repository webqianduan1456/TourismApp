<script setup lang="ts">
import { onMounted, ref, } from 'vue';
// props

interface HouseKeyImg {
  orderIndex: number;
  title: string;
  orderSum: number;
  houseimg: Array<{
    id: number;
    url: string;
  }>;
}

defineProps({
  Detail: {
    type: Array as () => HouseKeyImg[],
    default: () => []
  }
});
const isMobile = ref(false)

// 解决pc端和移动端的轮播图小手问题
onMounted(() => {
  // 检测是否为移动端
  isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
});

</script>

<template>
  <div class="Swipe">
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="2500" indicator-color="white" :touchable="isMobile" :show-indicators="false">
      <!-- 图片 -->
      <template v-for="item in Detail" :key="item.orderIndex">
        <template v-for="ite in item.houseimg" :key="ite.id">
          <van-swipe-item>
            <img style="width: 100%; height: 100%;" :src="ite.url" alt="">
          </van-swipe-item>
        </template>
      </template>
      <!-- 自定义指示器 -->
      <template #indicator="{ active }">
        <div class="indicator">
          <template v-for="item in Detail" :key="item.orderIndex">
            <div
              :class="{ activeItem: (active + 1) + item.houseimg.length > item.orderSum && (active + 1) < item.orderSum || (active + 1) == item.orderSum }">
              {{ item.title }}
              <span
                v-if="(active + 1) + item.houseimg.length > item.orderSum && (active + 1) < item.orderSum || (active + 1) == item.orderSum">{{
                  active + 1 }}/{{ item.orderSum }}</span>

            </div>
          </template>
        </div>
      </template>

    </van-swipe>
  </div>
</template>

<style scoped lang="less">
.my-swipe {
  width: 100%;
  height: 30vh;
}

.indicator {
  display: flex;
  justify-content: space-evenly;
  position: absolute;
  bottom: 1.3333vw;
  right: 0;
  color: #ffffff;
  background-color: #515555;

  div {
    height: 4.6667vw;
    margin: 1.3333vw 2.3333vw 1.3333vw 0;
    line-height: 4.6667vw;
    text-align: center;
  }

  div:first-child {
    margin-left: 2.3333vw;
  }
}

.ItemChild {
  display: block;
  margin: 1.0667vw;
  padding: 1.3333vw;
}

.activeItem {
  border-radius: 45%;
  background-color: rgb(42, 186, 243);
  font-weight: 600;
  padding: 0 5px;
  transform: scale(1.1);
}
</style>
