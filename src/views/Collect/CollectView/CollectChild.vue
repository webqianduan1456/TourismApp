<script setup lang="ts">
// 类型
import type { CollectChild } from '../type/CollectChild';


// 获取父传子数据
defineProps({
  CopyDate: {
    type: Object as () => CollectChild,
  }
})


</script>

<template>
  <div class="HouseProduct">
    <div class="ImgContent">
      <!-- 轮播图 -->
      <van-swipe style="height: 100%;">
        <template v-for="items in CopyDate?.houseKeyimg" :key="items.orderIndex">
          <template v-for="ite in items.houseimg" :key="ite.id" >
            <van-swipe-item>
              <img style="width: 100%; height: 100%;" :src="ite.url" alt="">
            </van-swipe-item>
          </template>
        </template>
        <template #indicator="{ active, total }">
          <div class="custom-left">{{ CopyDate?.commentScore }} <span>{{ CopyDate?.Suggestion }}</span>
          </div>
          <div class="custom-right">{{ active + 1 }}/{{ total }}</div>
        </template>
      </van-swipe>
      <!-- 商家用户信息 -->
      <div class="UserMessage">
        <img src="../../../assets/img/xjiang.jpg" alt="">
        <van-icon name="like" size="7.6667vw !important" style="margin: 5vw 0;" />
        <div>
          <van-icon name="comment-o" size="7.6667vw !important" color="#f9f4ec !important" />
          <span>{{ CopyDate?.Comment }}</span>
        </div>
      </div>
    </div>
    <!-- 收藏或历史内容展示区域(文字) -->
    <div class="content">
      <div><span>{{ CopyDate?.location }}</span><span>{{ CopyDate?.summaryText }}</span></div>
      <div>{{ CopyDate?.houseName }}</div>
      <div><span>{{ CopyDate?.Discount }}</span><span>{{ CopyDate?.Discount1 }}</span><span>{{
        CopyDate?.Discount2
      }}</span>
      </div>
      <div><span> ￥ <i>{{ CopyDate?.finalPrice }}</i></span> <span>￥{{ CopyDate?.productPrice }}</span>
        <span><van-icon name="volume" size="3vw !important" /><i style=" margin-left: 1.6667vw;">{{
          CopyDate?.DiscountMessage
        }}</i></span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.HouseProduct {
  display: flex;
  flex-direction: column;
  margin: 3.3333vw;
  box-sizing: border-box;
  border-radius: 1.3333vw;
  background-color: #dddddd;

  .ImgContent {
    position: relative;
    height: 58vw;

    img {
      width: 100%;
      height: 100%;
    }

    .UserMessage {
      position: absolute;
      top: 22vw;
      display: flex;
      transform: translateY(-50%);
      align-items: center;
      justify-content: space-around;
      flex-direction: column;
      right: 3.3333vw;

      img {
        width: 10.6667vw;
        height: 10.6667vw;
        border-radius: 50%;
      }

      &>div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 7vh;

        &>span {
          font-size: 3.5vw;
        }
      }
    }
  }

  .content {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    font-size: 3.6667vw;

    div {
      margin-top: 4.3333vw;
    }

    div:first-child {
      span:first-child {
        color: #fff;
        background-color: #000;
        padding: .6667vw;
      }

      span:nth-child(2) {
        margin-left: 1.3333vw;
      }
    }

    div:nth-child(2) {
      font-weight: 600;
    }

    div:nth-child(3) {
      span {
        color: rgb(255, 5, 88);
        margin-left: 2.6667vw;
      }
    }

    div:nth-child(4) {
      margin-bottom: 1.6667vw;

      span:first-child {
        font-size: 2.8vw;
        color: #ff9645;

        i {
          display: inline-block;
          font-size: 3.8vw;
        }
      }

      span:nth-child(2) {
        font-size: 2.8vw;
        text-decoration: line-through;
      }

      span:nth-child(3) {
        border-radius: 2.6667vw;
        background-color: #fab9a5;
        padding: 0.8667vw 2vw;
      }

    }
  }
}

.custom-right {
  position: absolute;
  right: 2.6667vw;
  bottom: 2.6667vw;
  padding: 0.8333vw;
  font-size: 4vw;
  color: rgb(255, 238, 0);
}

.custom-left {
  position: absolute;
  left: 3.6667vw;
  bottom: 2.6667vw;
  padding: 1.8333vw;
  font-size: 3vw;
  font-weight: 600;
  border-radius: 3.3333vw;
  background: rgb(255 255 255 / 50%);
  color: #000000;

  span {
    margin-left: 1.6667vw;
  }
}
</style>
