<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { userHomeStore } from '@/stores/modules/home';
import { storeToRefs } from 'pinia';
import UserOrder from '@/stores/modules/Order';
import router from '@/router';
import { showDialog } from 'vant';
const UserOrders = UserOrder()
const userHomeStores = userHomeStore()
const { HomeHouseList, StartDate, EndDate, Days } = storeToRefs(userHomeStores)

const route = useRoute()

// 控制预约界面提示显示
const show = ref(false);
// 获取用户入住时间表与离开时间表
const currentTimeStart = ref(['12', '00']);
const currentTimeEEnd = ref(['00', '00']);
// 用户待支付订单

const OrderData = {
  title: HomeHouseList.value.SelectedS.find(item => item.id === Number(route.params.keyId))?.houseName || '',
  url: HomeHouseList.value.SelectedS.find(item => item.id === Number(route.params.keyId))?.url || '',
  StartTime: new Date(`${new Date().getUTCFullYear()}-${StartDate.value.replace('月', '-').replace('日', '')} ${currentTimeStart.value[0]}:${currentTimeStart.value[1]}`),
  EndTime: new Date(`${new Date().getUTCFullYear()}-${EndDate.value.replace('月', '-').replace('日', '')} ${currentTimeEEnd.value[0]}:${currentTimeEEnd.value[1]}`),
  totalPrice: (HomeHouseList.value.SelectedS.find(item => item.id ===
    Number(route.params.keyId))?.finalPrice ?? 0) * Number(Days.value),
  Overall: 0,
  houseId: Number(route.params.keyId),
  userid: sessionStorage.getItem('userid')
}
// 触发预定事件
const ReservationHouse = () => {
  show.value = true
};

// 立即预约按钮事件
const confirm = async () => {
  show.value = false
  // 调用创建待支付方法
  const res = await UserOrders.fetchCreateOrder(OrderData)

  // 未登录
  if (res?.code === 401) {
    // 订单重复提示
    showDialog({
      message: '请先登录!!!!!!!!!',
      theme: 'round-button',
    })
    return
  }
  // 数据未支付
  if (res?.code === 400) {
    // 订单重复提示
    showDialog({
      message: '订单已存在请前往支付',
      theme: 'round-button',
    })

  } else {
    // 如果创建成功，跳转到订单详情页面
    router.push(`/order/${route.params.id}`)
  }




};
// 取消按钮事件
const cancel = () => {
  show.value = false
};
// 自定义时间格式
const formatter = (type: string, option: any) => {
  if (type === 'hour') {
    option.text += '时';
  }
  if (type === 'minute') {
    option.text += '分';
  }
  return option;
};

onMounted(() => {
  // 存储数据到本地
  sessionStorage.setItem('startDate', StartDate.value)
  sessionStorage.setItem('endDate', EndDate.value)
  sessionStorage.setItem('days', String(Days.value))
})

</script>

<template>
  <div class="Reservation">
    <van-action-bar>
      <!-- 客服和价格 -->
      <van-action-bar-icon icon="chat-o" text="客服" color="#000000" />
      <van-action-bar-icon>
        {{HomeHouseList.SelectedS.find(item => item.id === Number(route.params.keyId))?.finalPrice || 0}}元/晚
      </van-action-bar-icon>
      <!-- 预定当前房源 -->
      <van-action-bar-button type="danger" text="预定当前房源" @click="ReservationHouse" />
    </van-action-bar>
  </div>
  <van-overlay :show="show">
    <div class="subscribe">
      <!-- 文本 -->
      <div class="title">{{HomeHouseList.SelectedS.find(item => item.id === Number(route.params.keyId))?.houseName || '无'
      }}</div>
      <!-- 日期 -->
      <div class="date">
        <div class="titles"><span>{{ StartDate }} </span>- <span>{{ EndDate }}</span></div>
        <div class="time">
          <van-time-picker v-model="currentTimeStart" visible-option-num="1" option-height="5vw" :formatter="formatter"
            :show-toolbar="false" />
          -
          <van-time-picker v-model="currentTimeEEnd" visible-option-num="1" option-height="5vw" :formatter="formatter"
            :show-toolbar="false" />
        </div>
      </div>
      <!-- 天数和总价 -->
      <div class="sky">共{{ Days }}天</div>
      <div class="price">总价: <span>{{(HomeHouseList.SelectedS.find(item => item.id ===
        Number(route.params.keyId))?.finalPrice ?? 0) * Days }}</span>元</div>
      <!-- 按钮 -->
      <div class="decision">
        <van-button type="primary" round color="#4796f2" @click="confirm">立刻预约</van-button>
        <van-button type="primary" round @click="cancel">取消预约</van-button>
      </div>
    </div>
  </van-overlay>
</template>

<style scoped lang="less">
.Reservation {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 200;

  .smile {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }
}

.subscribe {
  width: 80vw;
  height: 80vw;
  background-color: #b3d6f2;
  display: flex;
  margin: 50% auto;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  padding: 4vw;
  border-radius: 5.33vw;

  .title {
    font-size: 5.33vw;
    font-weight: 800;
  }

  .date {
    background-color: #cce3f3;
    border-radius: 5.33vw;
    width: 80%;
    height: 15vw;
    padding: 1.33vw 8vw;
    line-height: 8vw;
    font-size: 4.27vw;

    .titles {
      display: flex;
      justify-content: space-between;
      font-size: 4.6667vw;
    }

    .time {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .sky {
    font-size: 4.27vw;
    color: #000000;
  }

  .price {
    font-size: 4.8vw;

    span {
      color: #1079e7;
      font-size: 9.33vw;
      vertical-align: sub;
    }
  }

  .decision {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
  }
}

.van-icon {
  font-size: 4vw !important;
}

.van-action-bar-icon {
  margin: 0 1.3333vw !important;
  box-sizing: border-box;
}

.van-dialog {
  background-color: aqua !important;
}
</style>
