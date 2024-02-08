<script setup>
import pathData from '../../utils/pathData';
const props = defineProps(['sidebarOpen']);
</script>

<template>
  <aside
    :class="props.sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
    class="w-[250px] sm:w-[281px] pl-[36px] py-[32px] pr-[11px] fixed inset-y-0 left-0 z-30 overflow-y-auto transition duration-300 transform lg:translate-x-0 lg:static lg:inset-0 shadow-md bg-white"
  >
    <RouterLink to="/dashboard" class="text-[30px] text-[#152544] font-bold">heylink.</RouterLink>
    <nav class="mt-[32px]">
      <ul class="pl-[5px]">
        <li
          v-for="path in pathData"
          :key="path.id"
          class="flex items-center gap-[10px] mb-[12px] py-[13px] pl-[8px] pr-[74px] rounded-lg"
          :class="{ 'bg-[#E3F2FD]': $route.path === path.route }"
        >
          <img :src="path.icon" :alt="path.alt" />
          <span class="text-[16px] font-medium text-[#424242]">
            <RouterLink :to="path.route">{{ path.name }}</RouterLink>
          </span>
        </li>
      </ul>
    </nav>
  </aside>
</template>
