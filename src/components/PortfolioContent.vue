<template>
  <h1>{{ title }}</h1>
  <slot> </slot>
</template>

<script setup lang="ts">
defineProps<{
  title: String
}>()
</script>

<style scoped lang="postcss">
h1 {
  @apply font-bold text-3xl pb-4;
}
</style>
