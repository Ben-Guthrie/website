<template>
  <div class="portfolio-content" :class="{ '!h-full': useThemeStore().isMobile }">
    <h1>{{ title }}</h1>
    <slot> </slot>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores'

defineProps<{
  title: String
}>()
</script>

<style scoped lang="postcss">
.portfolio-content {
  @apply flex flex-col items-center h-fit w-full pt-2;
}
h1 {
  @apply font-bold text-3xl pb-3 text-dark dark:text-highlight;
  @apply underline underline-offset-8 decoration-dark;
}
.portfolio-content:hover h1 {
  @apply decoration-highlight;
}
</style>
