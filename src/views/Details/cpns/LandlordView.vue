<script setup lang="ts">

defineProps({
  Landlord: {
    type: Object,
  }
})

</script>

<template>
  <!-- 房东介绍界面 -->
  <div class="landlord-view">
    <h1>默认标题</h1>
    <span></span>
    <div class="landlord">
      <!-- 房屋 -->
      <div class="LandlordHouse">
        <!-- 房屋图片和房屋介绍 -->
        <img :src="Landlord?.topScroll" alt="">
        <div class="landlord-house-1">
          <div class="landlord-house-2">
            <img :src="Landlord?.hotelLogo" alt="">
            <!-- 房屋信息描述 -->
            <div class="Content">
              <h1>{{ Landlord?.hotelName }}</h1>
              <div class="landlord-house-3">
                <template v-for="(item, index) in Landlord?.houseAllone" :key="index">
                  <span>{{ item.text }}</span>
                  <i v-if="index !== 3 - 1">|</i>
                </template>
              </div>
            </div>
          </div>
          <!-- 联系房东 -->
          <van-button type="primary" size="small">联系房东</van-button>
        </div>
      </div>
      <!-- 三项评价 -->
      <div class="landlord-Evaluation">
        <template v-for="item in Landlord?.houseAllone" :key="item.id">
          <div class="EvaluationChild">
            <span>{{ item.title }}</span>
            <h1>{{ item.introduction }}</h1>
            <span>{{ item.tip }}</span>
          </div>
        </template>

      </div>

    </div>
  </div>
</template>

<style scoped lang="less">
.landlord-view {
  &>span {
    display: inline-block;
    width: 100%;
    height: .1333vw;
    background-color: #03a9f4;
  }

  .landlord {
    font-size: 3.6667vw;

    .LandlordHouse {
      margin-top: 3.3333vw;

      &>img {
        width: 100%;
        height: 9.6667vw;
        border-radius: 1.3333vw;
      }
    }
  }

  &>h1 {
    font-size: 5.6667vw;
  }

  &>i {
    width: 100%;
    height: .1333vw;
    background-color: aqua;

  }
}

.landlord-house-1 {
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 25vw;
    height: 25vw;
  }

  .landlord-house-2 {
    display: flex;
    align-items: center;

    .Content {
      margin-left: .6667vw;
      flex: 1;

      &>h1 {
        margin-bottom: 4.3333vw;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .landlord-house-3 {
    display: flex;
  }
}

.van-button--small {
  font-size: 1.8667vw;
  width: 16.6vw;
  height: 8.6vw;
  margin-right: 1.3333vw;
}

.landlord-Evaluation {
  display: flex;
  justify-content: space-around;
  margin-top: 4.3333vw;

  .EvaluationChild {
    span {
      color: #515252;
      font-size: 4.3333vw;
    }
  }
}
</style>
