<script setup lang="ts">
import TabBar from '@/components/tabbar/tabbarView.vue'
import { useRoute } from 'vue-router';
const route = useRoute()
</script>

<template>
   <div class="app">
    <router-view />
    <TabBar v-if="!route.meta.isHide"></TabBar>
   </div>
</template>

<style scoped>

</style>
