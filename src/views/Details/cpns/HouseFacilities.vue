<script setup lang="ts">

</script>

<template>
  <div class="Facilitie">
    <!-- 标题信息 -->
      <div class="BottomMessage " style="justify-content: left;">
        <slot name="top">
        </slot>
      </div>
     <!-- 内容区 -->
    <div class="Facilities">
      <slot name="center" >
      </slot>
    </div>
    <!-- 查看全部内容 -->
    <div class="BottomMessage">
      <slot name="bottom">
      </slot>
    </div>
  </div>
</template>

<style scoped lang="less">
.Facilitie{
  margin-top: 6.6667vw;
}
.Facilities {
  ::v-deep(.FacilitiesChild){
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 4.3333vw;
    margin: 5.3333vw  0;
    .basis{
     flex: 1;
     display: flex;
     flex-direction: column-reverse;
     align-items: center;
     img{
      width: 7vw;
      height: 7vw;
     }
    }
    .Child{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      flex: 2;
      div{
        width: 50%;
      }
    }

  }
}
.BottomMessage{
  display: flex;
  justify-content: right;
  font-size: 5.6667vw;
  font-weight: 600;
  cursor: pointer;
}
</style>
