<script setup>
import { ref } from 'vue';

import Overlay from '../Overlay.vue';
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';

const sidebarOpen = ref(false);
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};
</script>

<template>
  <div class="flex h-screen bg-[#F7F8FA]">
    <Overlay :isOpen="sidebarOpen" @handleToggle="toggleSidebar" classZIndex="z-20" />
    <Sidebar :sidebarOpen="sidebarOpen" />

    <section class="flex flex-col flex-1 overflow-hidden">
      <Navbar @toggleSidebar="toggleSidebar" />
      <slot />
    </section>
  </div>
</template>

<style scoped></style>
