<script setup lang="ts">
import { userHomeStore } from '@/stores/modules/home';
import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';
const userHomeStoreData = userHomeStore()
const { HomeHouseList } = storeToRefs(userHomeStoreData)

defineProps({
  Detail: {
    type: Object,
    default: () => { }
  }
})
// 刷新获取当前数据
onBeforeMount(async () => {
  await userHomeStoreData.fetchAllHomeHouseList()
})
</script>

<template>
  <div class="container">
    <h1>{{ HomeHouseList?.SelectedS[0 + 1]?.houseName }}</h1>
    <!-- 地理位置优势描述 -->
    <div class="Description">
      <!-- 描述 -->
      <template v-for="(item, index) in Detail?.houseText1" :key="index">
        <span>{{ item?.Recruitment }}</span>
        <template v-for="ite in item.houseText" :key="ite">
          <span :class="{ blueKey:ite?.text.startsWith('有')   }">{{ ite?.text }}</span>
        </template>
      </template>
    </div>
    <!-- 评价 -->
    <div class="Evaluation1">
      <div class="EvaluationMessage">
        <span style="font-size:5.7777vw ;">{{ HomeHouseList?.SelectedS[0 + 1]?.commentScore }}</span>
        <i>{{ Detail?.housMessage[0].scoreTitle }}</i>
        <i style="color: #8e8484;">{{ Detail?.housMessage[0].commentBrief }}</i>
      </div>
      <span class="Direction">{{ Detail?.housMessage[0].totalCount }}条评论 ></span>
    </div>
    <!-- 地址 -->
    <div class="Evaluation2">
      <i>{{ Detail?.housMessage[0].address }}</i>
      <span class="Direction">地图•周边 ></span>
    </div>
  </div>
</template>

<style scoped lang="less">
@FontSize: 3.7777vw;

.container {

  .Description {
    display: flex;
    justify-content: left;
    font-size: @FontSize;
    flex-wrap: wrap;
    margin: 2.6667vw 0;

    span {
      border-radius: 1.3333vw;
      margin: 0 .6667vw;
    }

    span:first-child {
      border-radius: none;
      color: #ffeb3b;
      font-family: "楷体";
      background-color: rgb(0, 0, 0);
    }

    span {
      color: orange;
      background-color: #ffe0a7;
    }

    .blueKey {
      color: #2196f3;
      background-color: #c1ecff;
    }
  }

  .Evaluation1 {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .EvaluationMessage {
      display: flex;
      align-items: center;
      font-size: @FontSize;

      i {
        font-weight: 600;
        margin-left: 1.4vw;
      }
    }

    .Direction {
      color: orange;
    }

    span {
      font-size: @FontSize;
    }
  }

  .Evaluation2 {
    display: flex;
    justify-content: space-between;
    font-size: @FontSize;
    margin: 2.6667vw 0;

    .Direction {
      color: orange;
    }

    i {
      font-weight: 600;
    }
  }

  h1 {
    font-size: 5.3333vw;
  }
}
</style>
