<script setup>
const props = defineProps(['src', 'alt', 'name', 'email', 'phone']);
</script>

<template>
  <div class="flex items-center justify-center flex-wrap gap-[31px]">
    <img :src="src" :alt="alt" class="w-[150px] h-[150px] rounded-full object-cover" />
    <div class="flex flex-col gap-[2px]">
      <h2 class="text-[24px] sm:text-[40px] font-medium text-[#080808]">
        {{ name }}
      </h2>
      <p class="text-[16px] sm:text-[20px] font-medium text-[#080808]">{{ email }}</p>
      <p class="text-[16px] sm:text-[20px] font-medium text-[#080808]">{{ phone }}</p>
    </div>
  </div>
</template>
