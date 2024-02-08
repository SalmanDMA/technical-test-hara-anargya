<script setup></script>
<template>
  <header class="pl-[36px] pt-[26px] pb-[13px] bg-white shadow-md">
    <div class="flex items-center gap-5">
      <button @click="$emit('toggleSidebar')" class="text-gray-500 focus:outline-none lg:hidden">
        <Icon icon="mdi:menu" class="w-7 h-7" />
      </button>

      <h3 class="text-[#080808] font-semibold text-[17px]">Conversion</h3>
    </div>
  </header>
</template>
