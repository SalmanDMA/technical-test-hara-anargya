<script setup>
const props = defineProps(['isOpen', 'classZIndex']);
</script>
<template>
  <div
    :class="[props.isOpen ? 'block' : 'hidden', props.classZIndex]"
    @click="$emit('handleToggle')"
    class="fixed inset-0 transition-opacity bg-black opacity-50 cursor-pointer"
  ></div>
</template>
