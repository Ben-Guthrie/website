<template>
  <div class="drawer min-h-0">
    <input id="filter-drawer" class="drawer-toggle" type="checkbox" />
    <div class="drawer-content min-h-full grid justify-center">
      <div class="container" :class="{ '!max-h-full h-full': theme.isMobile }">
        <div class="text-base-content" v-if="!theme.isMobile">Filter by type of project</div>
        <div class="filters" v-if="!theme.isMobile">
          <button
            class="btn btn-sm"
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
          class="carousel carousel-center bg-neutral rounded-box max-w-md gap-4 p-4 h-full flex items-center"
          @scroll="() => (scrolling = true)"
          @scrollend="() => (scrolling = false)"
        >
          <div
            class="carousel-item relative w-full h-fit max-h-full flex justify-center overflow-auto"
            v-for="(alias, index) in cs.visibleProjects"
            :key="alias"
          >
            <ProjectPortfolioItem
              class="min-w-[80%] w-[80%] h-fit"
              :item="cs.projectsDict[alias]"
              :full="true"
              :id="alias"
            />
            <div
              class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"
            >
              <div
                class="btn btn-circle self-start"
                v-if="!scrolling && index - 1 >= 0"
                @click="
                  () =>
                    handleCarouselButtonClick(
                      cs.visibleProjects[index - 1 >= 0 ? index - 1 : cs.visibleProjects.length - 1]
                    )
                "
              >
                ❮
              </div>
              <div v-else />
              <div
                class="btn btn-circle self-end"
                v-if="!scrolling && index + 1 < cs.visibleProjects.length"
                @click="
                  () =>
                    handleCarouselButtonClick(
                      cs.visibleProjects[index + 1 < cs.visibleProjects.length ? index + 1 : 0]
                    )
                "
              >
                ❯
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="indicator fixed bottom-8 right-12">
        <span class="indicator-item badge badge-accent" v-if="cs.filters.length > 0"></span>
        <label for="filter-drawer" v-if="theme.isMobile" class="btn btn-primary drawer-button"
          ><IconFilter
        /></label>
      </div>
    </div>

    <div class="drawer-side" v-if="theme.isMobile">
      <label for="filter-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <!-- Sidebar content here -->
        <li
          v-for="filter in projectTags"
          :key="filter.tag"
          :class="{ active: cs.isFilterActive(filter.tag) }"
          @click="setFilter(filter.tag)"
        >
          <a>
            {{ filter.name }}
          </a>
        </li>
        <li @click="cs.clearFilter()" class="text-info">
          <a> Clear All </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProjectPortfolioItem from '@/components/contents/items/ProjectPortfolioItem.vue'
import IconFilter from '@/components/icons/IconFilter.vue'
import { useThemeStore } from '@/stores'
import { projectTags, useContentsStore } from '@/stores/contents'
import { ref } from 'vue'

const cs = useContentsStore()
const theme = useThemeStore()

const scrolling = ref(false)

function setFilter(tag: string) {
  cs.setFilter(tag)
}

function isItemVisible(alias: string) {
  return cs.visibleProjects.includes(alias)
}

async function handleCarouselButtonClick(scrollToId: string) {
  const element = document.getElementById(scrollToId)
  element?.scrollIntoView({
    block: 'start',
    behavior: 'smooth'
  })
}
</script>

<style scoped lang="postcss">
.container {
  @apply w-full max-h-[480px] overflow-auto;
  @apply flex flex-col items-center;
}

.filters {
  @apply flex flex-row p-2 gap-2 max-w-[50%];
  @apply overflow-x-auto overflow-y-clip;
  @apply flex-nowrap items-center;
}

.active {
  @apply bg-highlight border-highlight text-dark;
}

.portfolio {
  @apply overflow-auto grid grid-cols-3;
  @apply justify-around gap-2 overflow-y-auto h-full;
  @apply w-full p-6;
}
</style>
