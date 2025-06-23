<script setup lang="ts">
import { onMounted } from 'vue';
import { AMapLoader } from '@amap/amap-jsapi-loader';

const props = defineProps({
  positionMaps: {
    type: Object,
  }
})

// 地图生成
const mapInit = () => {
  AMapLoader.load({
    "key": "8bad3703411fe57fa4826e8ea14ef988",   // 申请好的Web端开发者Key，首次调用 load 时必填
    "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    "plugins": []  //插件列表
  }).then((AMap) => {
    // MapContent 指定的容器id
    const map = new AMap.Map('MapContent', {
      center: [props.positionMaps?.longitude, props.positionMaps?.latitude], //地图中心点
      zoom: 13
    });
    const trafficLayer = new AMap.TileLayer.Traffic({
      zIndex: 2
    });
    map.add(trafficLayer);//添加图层到地图
  }).catch(e => {
    console.log(e);
  })
}

onMounted(() => {
  mapInit();
})

</script>

<template>

  <div class="MapDisplay">
    <div>
      <h1>地图周边</h1>
      <div id="MapContent">
      </div>
      <div class="MapText">
        <span>查看更多周边信息 ></span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.MapDisplay {
  border-top: 1px solid #000;
  padding-top: 2.6667vw;
  margin-top: 2.6667vw;

  &>h1 {
    font-size: 4.7777vw;
  }

  #MapContent {
    height: 53.3333vw;
    margin: 3.6667vw 0;
  }

  .MapText {
    display: flex;
    justify-content: right;

    &>span {
      font-size: 5.6667vw;
    }
  }
}
</style>
