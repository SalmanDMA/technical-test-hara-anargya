<template>
  <div class="flex flex-col items-start gap-1 relative">
    <label :for="id" class="text-[16px] sm:text-[20px] font-medium text-[#686868]">{{ label }} : </label>
    <div class="flex items-center gap-[10px]">
      <Icon :icon="icon" class="w-7 h-7 text-[#686868] absolute left-3" />
      <input
        :type="type"
        :id="id"
        :disabled="disabled"
        :value="value"
        class="text-[16px] sm:text-[20px] font-medium text-[#686868] cursor-not-allowed bg-[#F5F5F5] rounded-md pl-12 pr-4 py-2 border-b-2 border-[#686868] outline-none w-full"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['id', 'label', 'icon', 'type', 'value', 'disabled']);
</script>
