<script setup lang="ts">

// props
defineProps({
  note: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <div class="ReserveNotice">
    <template v-for="(item, index) in note?.checkInRules" :key="index">
      <h1>{{ item.title }}</h1>
    </template>
    <i></i>
    <div>
      <!-- 须知内容 -->
      <template v-for="(item, index) in note?.orderRules" :key="index">
        <div class="notice">
          <!-- 内容区 -->
          <div class="notice-item">
            <span>{{ item.title }}</span>
            <span>{{ item.introduction }}</span>
          </div>
          <!-- 查看说明导航 -->
          <span class="nav" v-if="item?.tips">
            查看说明
          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.ReserveNotice {
  &>h1 {
    font-weight: 500;
    font-size: 4.7777vw;
    font-weight: 600;
    color: #333;
    margin: 0 0 10px 0;
  }

  &>i {
    width: 100%;
    height: .1333vw;
    background-color: aqua;
  }

  &>div {
    padding: 1.3333vw 0;
    border-bottom: .1333vw solid #eee;
    font-size: 3.7777vw;
    color: #666;
  }

  &>div>span {
    color: #666;
    cursor: pointer;

    &:hover {
      color: #03a9f4;
    }
  }

  &>div>.notice-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: #666;
    cursor: pointer;

  }

  .nav {
    font-weight: 600;
    color: #000;
  }

  .notice-item>span:nth-child(2) {
    margin-left: 2.6667vw;
  }

  .notice {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: #666;
    cursor: pointer;
    margin-top: 2.6667vw;


  }
}
</style>
