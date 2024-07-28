<template>
  <div class="item">
    <span>{{ item.name }}</span>

    <img :src="'img/' + item.thumbnail" class="thumbnail" />

    <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

    <div class="footer">
      <div class="footer-l">
        <StatsIcon :icon="item.footers.left.icon" />
        <span> {{ item.footers.left.text }} </span>
      </div>
      <div class="link" />

      <div class="footer-r">
        <span> {{ item.footers.right.text }}</span>
        <StatsIcon :icon="item.footers.right.icon" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PortfolioItem, ProjectItem } from '@/types'
import StatsIcon from './icons/StatsIcon.vue'

defineProps<{
  item: PortfolioItem | ProjectItem
}>()
</script>

<style scoped lang="postcss">
.item {
  @apply basis-1/2;
}

img.thumbnail {
  @apply w-full p-4;
}

.footer {
  @apply flex flex-row w-full justify-between items-center;
}

.footer-l {
  @apply justify-self-start flex flex-row basis-1/4 justify-start items-center space-x-2;
}

.link {
  @apply justify-self-center basis-1/3;
}

.footer-r {
  @apply justify-self-end flex flex-row basis-1/4 justify-end items-center space-x-2;
}
</style>
