<script setup lang="ts">
// 定义组件的 props，接收 itemData 对象作为输入数据
defineProps({
  itemData: {
    type: Object,
    required: true
  }
})


</script>

<template>
  <div class="HomeHouse-v3">
    <div class="image-container">
      <!-- 显示房屋图片 -->
      <img class="imgs" :src="itemData?.image?.url" alt="">
      <div class="info-overlay">
        <!-- 房屋名称 -->
        <!-- 位置 -->
        <div class="location">
          <img  src="@/assets/img/Location1.svg" alt="">
          <span>{{ itemData?.location }}</span>
        </div>
        <div class="title">{{ itemData?.houseName }}</div>
        <!-- 底部信息，包括评分和价格 -->
        <div class="bottom">
          <!-- 房屋价格 -->
          <div class="price">¥{{ itemData?.finalPrice }}</div>
          <!-- 过去价格 -->
          <div class="old-price">¥{{ itemData?.productPrice }}</div>
          <!-- 最新价格 -->
          <div class="new-price">{{ itemData?.priceTipBadge?.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.HomeHouse-v3 {
  width: 100%;
  aspect-ratio: 1 / 1;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 1.6667vw 3.3333vw rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }

  .image-container {
    width: 100%;
    height: 0;
    padding-top: 100%;

    .imgs {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .info-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 13.3333vw;
      padding: 1.6667vw;
      background:#9E9E9E;
      color: #fff;
      transition: background 0.3s ease;

      .location {
        display: flex;
        align-items: center;
        margin-bottom: 0.6667vw;
        font-size: 1.8667vw;

        img {
          width: 2.6667vw;
          height: 2.6667vw;
        }

        span {
          display: block;
          padding-left: 0.6667vw;
        }
      }

      .title {
        font-weight: bold;
        font-size: 2.9333vw;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .bottom {
        display: flex;
        align-items: center;
        margin-top: 2.2vw;

        .price {
          font-size: 3.2vw;
          font-weight: bold;
          color: red;
        }

        .old-price {
          font-size: 2.4vw;
          text-decoration: line-through;
          margin-left: 1vw;
        }

        .new-price {
          font-size: 2.4vw;
          color: #fff;
          background: linear-gradient(90deg, #ff7875, #ff4d4f);
          padding: 0.4vw 1vw;
          border-radius: 1vw;
          margin-left: 1vw;
        }
      }
    }
  }
}
</style>
