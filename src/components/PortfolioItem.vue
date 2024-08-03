<template>
  <div
    class="item"
    :class="{ 'item-hovered': highlighted, 'item-small': !full }"
    @mouseover="full ? null : setHovered()"
    @mouseleave="full ? null : setNotHovered()"
    @click="full ? null : setActive()"
  >
    <span class="text-md md:text-md font-semibold" :class="{ 'text-xl font-bold': full }">{{
      item.name
    }}</span>

    <div class="img-container">
      <img :src="'img/' + item.thumbnail" class="thumbnail" />
    </div>

    <hr class="divider" v-show="full" />

    <span class="summary" v-show="full">{{ item.summary }}</span>

    <hr class="divider" v-show="full" />
    <div class="w-full overflow-hidden" v-if="full">
      <slot />
    </div>

    <hr class="divider" />

    <div class="footer">
      <div class="basis-1/4">
        <div class="footer-l" v-if="item.footers.left !== undefined">
          <StatsIcon :icon="item.footers.left.icon" />
          <span> {{ item.footers.left.text }} </span>
        </div>
      </div>
      <div class="link" v-if="item.link" v-show="full">
        <div>See More</div>
      </div>

      <div class="basis-1/4">
        <div class="footer-r" v-if="item.footers.right !== undefined">
          <span> {{ item.footers.right.text }}</span>
          <StatsIcon :icon="item.footers.right.icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PortfolioItem, ProjectItem } from '@/types'
import StatsIcon from './icons/StatsIcon.vue'
import { computed, ref } from 'vue'
import { useContentsStore } from '@/stores/contents'

const props = defineProps<{
  item: PortfolioItem | ProjectItem
  full: boolean
}>()

const cs = useContentsStore()

const hovered = ref(false)

const highlighted = computed(() => cs.highlightedProjects.includes(props.item.alias))

const active = computed(() => cs.isProjectActive(props.item.alias))

function setHovered() {
  hovered.value = true
  cs.setHoveredProject(props.item.alias)
}

function setNotHovered() {
  hovered.value = false
  cs.unsetHoveredProject(props.item.alias)
}

function setActive() {
  console.log(active.value)
  if (!active.value) cs.setProjectActive(props.item.alias)
  else cs.setProjectInactive(props.item.alias)
}
</script>

<style scoped lang="postcss">
.item {
  @apply border border-semidark basis-[31%] shadow rounded p-2 cursor-pointer;
  @apply flex flex-col items-center gap-2;
  @apply bg-light dark:bg-dark dark:text-highlight;
}
.item-small {
  @apply max-h-[280px] h-fit;
}

.item-hovered {
  @apply border-2 border-highlight transition-all ease-in-out;
}

hr.divider {
  @apply h-[0.5px] my-2 bg-semidark border-0 w-full;
}

.img-container {
  @apply w-full h-full;
}

.item-small .img-container {
  @apply w-full h-[200px] min-h-0;
}

img.thumbnail {
  @apply w-full h-full object-cover object-center;
}
.item-small:hover img.thumbnail {
  @apply object-contain;
}
.item-small:hover .img-container {
  @apply p-1 transition-all ease-in;
}

.footer {
  @apply flex flex-row w-full justify-between items-center;
  @apply text-dark dark:text-light;
}

.footer-l {
  @apply justify-self-start flex flex-row justify-start items-center space-x-2;
}

.link {
  @apply justify-self-center basis-1/3 flex items-center justify-center;
}

.footer-r {
  @apply justify-self-end flex flex-row justify-end items-center space-x-2;
}
</style>
