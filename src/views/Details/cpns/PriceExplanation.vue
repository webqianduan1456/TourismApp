<script setup lang="ts">
defineProps({
  Price:{
    type: Object,
    default: () => {
      return {}
    }
  }
})
</script>

<template>
  <div class="PriceExplanation">
    <h1>{{Price?.title  }}</h1>
    <div>{{ Price?.introduction }}</div>
  </div>
</template>

<style scoped lang="less">
.PriceExplanation{
  margin:20px ;
  &>h1{
    font-size: 4.6667vw;

  }
  &>div{
    margin:  2.6667vw 0;
    font-size: 3.6667vw;
    color: #333;
  }
}
</style>
