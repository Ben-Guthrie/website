<template>
  <div class="container">
    <div>Filter by type of project</div>
    <div class="filters">
      <div
        class="filter-item"
        :class="{ active: isFilterActive(filter.tag) }"
        @click="setFilter(filter.tag)"
        v-for="filter in categories"
      >
        {{ filter.name }}
      </div>
    </div>
    <div class="portfolio">
      <PortfolioItem
        v-for="project in projectsJson"
        :item="project"
        v-show="isItemShown(project.tags)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import PortfolioItem from '../components/PortfolioItem.vue'
import projectsJson from '../data/projects.json'

const filters: Ref<string[]> = ref([])

const categories = [
  { tag: 'data', name: 'Data Analysis' },
  { tag: 'web', name: 'Web Design' }
]

function isFilterActive(tag: string) {
  return filters.value.includes(tag)
}

function setFilter(tag: string) {
  if (isFilterActive(tag)) {
    filters.value.splice(filters.value.indexOf(tag), 1)
  } else {
    filters.value.push(tag)
  }
  console.log(filters.value)
}

function isItemShown(tags: string[]) {
  if (filters.value.length == 0) return true
  if (tags.some((tag) => filters.value.includes(tag))) return true
  return false
}
</script>

<style scoped lang="postcss">
.container {
  @apply w-full max-h-[680px];
}

.filters {
  @apply flex flex-row p-2 space-x-2 flex-nowrap overflow-auto;
}

.filter-item {
  @apply cursor-pointer p-2;
  @apply rounded-lg border-2 border-slate-400;
}

.active {
  @apply border-green-600 border-4;
}

.portfolio {
  @apply overflow-auto flex flex-row justify-center;
}
</style>
