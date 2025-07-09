<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
defineProps({
  item: {
    type: Object,
    default: () => { }
  }
})

</script>

<template>
  <div class="list">
    <!-- 左侧用户消息 -->
    <template v-if="Number(item.userid) !== Number(route.params.oppositeId)">
      <div class="left">
        <!-- 用户头像 -->
        <img src="../../../assets/img/xjiang.jpg" alt="">
        <!-- 内容 -->
        <div class="contents">
          <div></div>
          <span>{{ item.Message }}</span>
        </div>
      </div>
    </template>
    <!-- 右侧用户消息 -->
    <template v-else>
      <div class="right">
        <!-- 内容 -->
        <div class="contents">
          <span>{{ item.Message }}</span>
          <div></div>
        </div>
        <!-- 用户头像 -->
        <img src="../../../assets/img/xjiang.jpg" alt="">
      </div>
    </template>
  </div>
</template>

<style scoped lang="less">
.list {
  position: relative;
  width: 100%;
  height: 5vh;
  margin-top: 4vh;

  .left,
  .right {
    display: flex;
    justify-content: left;
    align-items: center;

    img {
      width: 10vw;
      height: 10vw;
      border-radius: 50%;
    }

    .contents {
      display: flex;
      justify-content: left;
      align-items: center;

      span {
        display: inline-block;
        font-size: 5vw;
        text-align: center;
        line-height: 5vh;
        border-radius: 2vw;
        background-color: #bababa;
      }
    }
  }

  .left {
    position: absolute;
    left: 0;

    .img {
      margin-right: 2vw;
    }

    .contents {
      div {
        width: 0;
        height: 0;
        border-top: 2vw solid transparent;
        border-bottom: 2vw solid transparent;
        border-right: 4vw solid #bababa;
      }
    }
  }

  .right {
    position: absolute;
    right: 0;

    .img {
      margin-left: 2vw;
    }

    .contents {
      div {
        width: 0;
        height: 0;
        border-top: 2vw solid transparent;
        border-bottom: 2vw solid transparent;
        border-left: 4vw solid #bababa;
      }
    }
  }
}
</style>
