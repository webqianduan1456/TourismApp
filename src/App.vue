<script setup lang="ts">
import TabBar from '@/components/tabbar/tabbarView.vue'
import { useRoute } from 'vue-router';
import LoadingView from '@/views/Loading/LoadingView.vue'

const route = useRoute()
</script>

<template>
  <div id="app">
    <!-- 保持活跃 -->
    <router-view v-slot="{ Component }">
      <keep-alive :include="['HomeView', 'SearchNav']" :exclude="['DetailsView']" :max="5">
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <TabBar v-show="!route.meta.isHide"></TabBar>
    <LoadingView></LoadingView>


  </div>
</template>

<style scoped lang="less"></style>
