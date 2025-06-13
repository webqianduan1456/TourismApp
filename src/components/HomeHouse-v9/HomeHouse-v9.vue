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
  <div class="HomeHouse-v9">
    <div class="image-container">
      <!-- 显示房屋图片 -->
      <img :src="itemData?.url" alt="">
      <div class="info-overlay">
        <!-- 房屋名称 -->
        <div class="title">{{ itemData?.houseName }}</div>
        <!-- 底部信息，包括评分和价格 -->
        <div class="bottom">

          <!-- 星级评分 -->
          <van-rate :model-value="itemData?.commentScore ? Number(itemData?.commentScore) : 0" allow-half readonly
            icon="star" size="3.3333vw"  />
          <!-- 房屋价格 -->
          <div class="price">¥{{ itemData?.productPrice }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.HomeHouse-v9 {
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
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .info-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 8.6667vw;
      padding: 1.6667vw;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      transition: background 0.3s ease;

      .title {
        font-weight: bold;
        font-size: 2.9333vw;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 2.2vw;

        .price {
          font-size: 3.2vw;
          font-weight: bold;
          color: red;
        }
      }
    }
  }
}
</style>
