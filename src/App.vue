<script setup lang="ts">
import TabBar from '@/components/tabbar/tabbarView.vue'
import { useRoute } from 'vue-router';
import LoadingView from '@/views/Loading/LoadingView.vue'


const route = useRoute()



</script>

<template>
  <div class="app">
    <router-view />
    <TabBar v-if="!route.meta.isHide"></TabBar>
    <LoadingView ></LoadingView>
  </div>
</template>

<style scoped lang="less"></style>
