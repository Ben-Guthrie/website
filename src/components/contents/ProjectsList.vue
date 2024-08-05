<template>
  <div class="container" :class="{ '!max-h-full h-full': theme.isMobile }">
    <div class="text-base-content">Filter by type of project</div>
    <div class="filters">
      <button
        class="btn"
        :class="{ 'btn-active': cs.isFilterActive(filter.tag) }"
        @click="setFilter(filter.tag)"
        v-for="filter in projectTags"
        :key="filter.tag"
      >
        {{ filter.name }}
      </button>
    </div>
    <div v-if="!theme.isMobile" class="portfolio">
      <ProjectPortfolioItem
        v-for="project in cs.projects"
        :key="project.alias"
        :full="false"
        :item="project"
        v-show="isItemVisible(project.alias)"
      />
    </div>
    <div
      v-else
      class="carousel carousel-center bg-neutral rounded-box max-w-md space-x-2 p-4 h-full flex items-center"
    >
      <div
        class="carousel-item relative w-fit h-full flex justify-center"
        v-for="(alias, index) in cs.visibleProjects"
        :key="alias"
      >
        <ProjectPortfolioItem
          class="min-w-[80%] w-[80%]"
          :item="cs.projectsDict[alias]"
          :full="true"
          :id="alias"
        />
        <div
          class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"
        >
          <a
            :href="
              '#' + cs.visibleProjects[index - 1 >= 0 ? index - 1 : cs.visibleProjects.length - 1]
            "
            class="btn btn-circle"
            >❮</a
          >
          <a
            :href="'#' + cs.visibleProjects[index + 1 < cs.visibleProjects.length ? index + 1 : 0]"
            class="btn btn-circle"
            >❯</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProjectPortfolioItem from '@/components/contents/items/ProjectPortfolioItem.vue'
import { useThemeStore } from '@/stores'
import { projectTags, useContentsStore } from '@/stores/contents'

const cs = useContentsStore()
const theme = useThemeStore()

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

.active {
  @apply bg-highlight border-highlight text-dark;
}

.portfolio {
  @apply overflow-auto flex flex-row flex-wrap;
  @apply justify-around gap-2 overflow-y-auto h-full;
  @apply w-full p-6;
}
</style>
