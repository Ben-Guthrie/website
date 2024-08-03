<template>
  <div class="portfolio-content">
    <h1>{{ title }}</h1>
    <slot> </slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: String
}>()
</script>

<style scoped lang="postcss">
.portfolio-content {
  @apply flex flex-col items-center h-fit w-full;
}
h1 {
  @apply font-bold text-3xl pb-4;
  @apply underline underline-offset-8 decoration-dark;
}
.portfolio-content:hover h1 {
  @apply decoration-highlight;
}
</style>
