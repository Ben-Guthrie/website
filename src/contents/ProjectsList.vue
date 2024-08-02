<template>
  <div class="container">
    <div>Filter by type of project</div>
    <div class="filters">
      <div
        class="filter-item"
        :class="{ active: cs.isFilterActive(filter.tag) }"
        @click="setFilter(filter.tag)"
        v-for="filter in projectTags"
        :key="filter.tag"
      >
        {{ filter.name }}
      </div>
    </div>
    <div class="portfolio">
      <ProjectPortfolioItem
        v-for="project in cs.projects"
        :key="project.alias"
        :item="project"
        v-show="isItemVisible(project.alias)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProjectPortfolioItem from '@/components/ProjectPortfolioItem.vue'
import { projectTags, useContentsStore } from '@/stores/contents'

const cs = useContentsStore()

function setFilter(tag: string) {
  cs.setFilter(tag)
}

function isItemVisible(alias: string) {
  return cs.visibleProjects.includes(alias)
}
</script>

<style scoped lang="postcss">
.container {
  @apply w-full max-h-[540px] overflow-auto;
  @apply flex flex-col items-center;
}

.filters {
  @apply flex flex-row p-4 space-x-2;
  @apply overflow-x-auto overflow-y-clip;
  @apply flex-nowrap items-center;
}

.filter-item {
  @apply cursor-pointer p-2 h-fit;
  @apply rounded-lg border-2 border-slate-400;
}

.active {
  @apply border-green-600;
}

.portfolio {
  @apply overflow-auto flex flex-row flex-wrap;
  @apply justify-around gap-2 overflow-y-auto h-full;
  @apply w-full p-6;
}
</style>
