<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
  items: {
    id: number;
    title: string;
    url: string;
    StartTime: string;
    EndTime: string;
    totalPrice: number;
    Overall: number;
    houseId: number;
    StartTimeWeek: string;
    StartTimeTime: string;
    EndTimeWeek: string;
    EndTimeTime: string;
    time: number;
  }
}>();
// 控制支付提示显示
const show = ref(false)

// 支付提示
const payment = () => {
  show.value = true;
  emit('payment', show.value,props?.items?.houseId);
}
// emit
const emit = defineEmits(['payment']);
</script>

<template>
  <div class="orderCore">
    <!-- 头部信息 -->
    <div class="Head ">
      <span> {{ items.title }}</span>
      <span>{{ items.Overall == 1 ? '已支付' : '待支付' }}</span>
    </div>
    <!-- 日期以及图片信息 -->
    <div class="content">
      <img :src="items.url" alt="">
      <div class="contents">
        <div class="DateContent">
          <div class="StartDate">
            <div>{{ items.StartTime }}</div>
            <div>{{ items.StartTimeWeek }} {{ items.StartTimeTime }}</div>
          </div>
          <div class="Direction">
            <div class="left"> <img src="../../../assets/img/arrow_l.svg" alt=""></div>
            <div class="right"><img src="../../../assets/img/arrow_r.svg" alt=""></div>
          </div>
          <div class="EndDate">
            <div>{{ items.EndTime }}</div>
            <div>{{ items.EndTimeWeek }} {{ items.EndTimeTime }}</div>
          </div>
        </div>
        <div class="TotalPrice">
          <div>支付总价</div>
          <div style="color: yellow;">¥ {{ items.totalPrice }}</div>
        </div>
      </div>
    </div>
    <!-- 底部支付 -->
    <div class="Foot" v-if="items.Overall == 1 ? false : true">
      <div><van-icon name="clock-o" color="#607d8b" /> <i>{{ items?.time }}分</i>后订单自动取消</div>
      <div>
        <van-button type="success" size="small" style="margin-right: 4vw;">联系房东</van-button>
        <van-button color="#ffc107" type="success" size="small" @click="payment">去支付</van-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.orderCore {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: 90vw;
  margin: 2vw auto;
  padding: 0 1vw;
  background-color: rgb(252, 246, 246);

  .Head {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 3vw;
    margin: 2.6667vw 0;

    span:first-child {
      flex: 8;
    }

    span:last-child {
      color: #ff1100;
      font-weight: 800;
      flex: 1;
    }
  }

  .content {
    position: relative;
    width: 100%;
    height: 45vw;
    background-size: 100% 100%;

    img {
      width: 100%;
      height: 100%;
    }

    .contents {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 15vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;

      .DateContent {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-right: 0.5vw solid rgb(185, 185, 185);
        padding: 0 2.6667vw;
        flex: 2;


        .StartDate {
          div {
            font-size: 3vw;
          }

          div:first-child {
            margin-bottom: 2vw;
          }
        }

        .Direction {
          .left {
            img {
              width: 6.3333vw;
              height: 6.3333vw;
            }
          }

          .right {
            img {
              width: 6.3333vw;
              height: 6.3333vw;
            }
          }

        }

        .EndDate {
          div {
            font-size: 3vw;
          }

          div:first-child {
            margin-bottom: 2vw;
          }

        }

      }

      .TotalPrice {
        flex: 1;

        div {
          font-size: 3vw;
          text-align: right;
          margin-right: 1vw;

        }

        div:first-child {
          margin-bottom: 2vw;
        }
      }
    }


  }

  .Foot {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 3vw;
    margin: 1.6667vw 0;

    div:first-child {
      display: flex;
      justify-content: space-around;
      align-items: center;

      &>i {
        color: #f70000;
        margin-left: 1.3333vw;
      }
    }
  }
}
</style>
