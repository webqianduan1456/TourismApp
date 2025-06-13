<script setup lang="ts">
defineOptions({
  name: 'UserOrder'
})
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import OrderContent from './cpns/OrderContent.vue';
import UserOrder from '@/stores/modules/Order';
import { storeToRefs } from 'pinia';
import { showDialog } from 'vant';
const route = useRoute();
// 订单相关数据
const UserOrders = UserOrder()
const { AllOrder, CompletedOrder, WaitingOrder } = storeToRefs(UserOrders)
// 获取时间戳改成秒
const nows = Date.now();
const secondes = Math.floor((nows / 1000) % 60);
// 是否支付弹出框显示隐藏 和 当前活跃栏
const show = ref(false);
const active = ref(0);
// 处于用户频繁请求
const requestCount = ref(0);
const lastRequestTime = ref(secondes);
const control = ref(true)
watch(active, async (newActive) => {
  // 控制请求时间(开)
  if (!control.value) return

  const now = Date.now();
  const seconds = Math.floor((now / 1000) % 60);
  const DifferTime = ref(seconds - lastRequestTime.value)

  if (seconds - lastRequestTime.value < 0) {
    DifferTime.value = 60 - lastRequestTime.value + seconds;
  } else {
    DifferTime.value = seconds - lastRequestTime.value;
  }
  // 短时间内频繁请求秒数小于或等于0触发
  if (requestCount.value >= 3 && Math.abs(DifferTime.value) <= 0) {
    // 控制请求时间(关)
    control.value = false
    requestCount.value = 0;
    showDialog({
      message: '请求过于频繁!稍后重试',
      theme: 'round-button',
    })
    //开启定时6秒后触发
    setTimeout(() => {
      // 控制请求时间(开)
      control.value = true
      console.log('执行');
    }, 6000)
    return;
  }
  // 正常请求
  switch (newActive) {
    case 0:
      await UserOrders.fetchAllOrder(1);
      break;
    case 1:
      await UserOrders.fetchCompletedOrder();
      break;
    case 2:
      await UserOrders.fetchWaitingOrder();
      break;
  }
  requestCount.value++;
  lastRequestTime.value = seconds;
})
// 用户展示提示
const payment = (data: boolean) => {
  show.value = data;
}
// 获取子组件传递过来的数据
const confirm = async () => {
  show.value = false;
  // 获取更新后的数据
  await UserOrders.fetchUpdateOrder(Number(route.params.id))
  await UserOrders.fetchWaitingOrder()
  await UserOrders.fetchAllOrder(1)
}
onMounted(async () => {
  // 获取全部订单数据
  await UserOrders.fetchAllOrder(1)
  // 获取近期订单
  await UserOrders.fetchCompletedOrder()
  // 获取待支付订单
  await UserOrders.fetchWaitingOrder()
})
</script>

<template>
  <div style="width: 100vw; height: 100vh;">
    <div style="width: 100%; position: fixed;">
      <!-- 头部 -->
      <van-nav-bar left-text="返回" left-arrow :sticky="true">
        <template #title>
          {{ '订单列表' }}
        </template>
        <template #right>
          <van-icon name="bell" size="6vw !important" color="" />
        </template>
      </van-nav-bar>
      <!-- 切换栏 -->
      <van-tabs animated title-active-color="#ff5722" line-height="1.4vw" line-width="10.3vw" :swipeable="true"
        :sticky="true" v-model:active="active">
        <!-- 全部订单 -->
        <van-tab title="全部订单">
          <!-- 订单内容 -->
          <div class="order">
            <template v-for="item in AllOrder" :key="item.id">
              <OrderContent @payment="payment" :items="item" />
            </template>
          </div>
        </van-tab>
        <!-- CompletedOrder -->
        <!-- 近期订单 -->
        <van-tab title="近期订单">
          <div class="order">
            <template v-for="item in CompletedOrder" :key="item?.id">
              <OrderContent @payment="payment" :items="item" v-if="item !== null" />
            </template>
          </div>
        </van-tab>
        <!-- 待支付 -->
        <van-tab title="待支付">
          <template v-for="item in WaitingOrder" :key="item.id">
            <OrderContent @payment="payment" :items="item"></OrderContent>
          </template>
        </van-tab>
      </van-tabs>
      <!-- 是否支付提示展示 -->
      <van-dialog v-model:show="show" show-cancel-button @confirm="confirm">
        <div style="text-align: center; margin: 2.6667vw;">是否支付?</div>
      </van-dialog>
    </div>
  </div>
</template>

<style scoped lang="less">
.order {
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  background-color: #ececec;
}
</style>
