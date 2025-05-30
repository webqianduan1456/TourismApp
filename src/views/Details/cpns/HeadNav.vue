<script setup lang="ts">
import { ref } from 'vue';
const trigger = ref(0)
const emit = defineEmits(['getEmit'])
// 顶部导航切换滚动指定位置
const cut = (index: number) => {
  trigger.value = index
  emit('getEmit', index)
}
defineProps({
  HeadData: {
    type: Object as () => Record<string, HTMLElement>
  },
})
// 对外暴露属性
defineExpose({
  trigger,
})


</script>

<template>
  <div class="heads">
    <div class="head">
      <template v-for="(item, key, index) in HeadData" :key="index">
        <div :class="{ headactive: index == trigger }" @click="cut(index)">
          {{ key }}
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.heads {
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgb(255, 255, 255);
  z-index: 999;
}

.head {
  display: flex;
  width: 100vw;
  font-size: 5vw;
  justify-content: space-around;

  div {
    padding-bottom: 1vw;
    margin: 1.0667vw 0;
    cursor: pointer;
  }
}

.headactive {
  color: red;
  border-bottom: 0.667vw solid red;
}
</style>
