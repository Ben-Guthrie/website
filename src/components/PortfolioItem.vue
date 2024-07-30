<template>
  <div class="item" @mouseover="hovered = true" @mouseleave="hovered = false">
    <span class="text-md md:text-md font-semibold" :class="{ 'text-xl font-bold': hovered }">{{
      item.name
    }}</span>

    <img :src="'img/' + item.thumbnail" class="thumbnail" />

    <hr class="divider" v-show="hovered" />

    <span class="summary" v-show="hovered">{{ item.summary }}</span>

    <hr class="divider" v-show="hovered" />
    <div v-show="hovered">
      <slot />
    </div>

    <hr class="divider" />

    <div class="footer">
      <div class="footer-l">
        <StatsIcon :icon="item.footers.left.icon" />
        <span> {{ item.footers.left.text }} </span>
      </div>
      <div class="link" v-if="item.link">
        <div>See More</div>
      </div>

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
import { ref } from 'vue'

defineProps<{
  item: PortfolioItem | ProjectItem
}>()

const hovered = ref(false)
</script>

<style scoped lang="postcss">
.item {
  @apply border border-slate-200 basis-2/5 shadow hover:shadow-lg rounded p-2 cursor-pointer;
  @apply flex flex-col items-center;
}

.item:hover {
  @apply basis-1/2;
}

hr.divider {
  @apply h-px my-2 bg-gray-200 border-0 dark:bg-gray-700 w-full;
}

img.thumbnail {
  @apply max-w-full p-4 max-h-96;
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
