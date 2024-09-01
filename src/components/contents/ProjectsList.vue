<template>
  <div class="drawer min-h-0">
    <input id="filter-drawer" class="drawer-toggle" type="checkbox" />
    <div class="drawer-content min-h-full grid justify-center">
      <div class="container" :class="{ '!max-h-full h-full': theme.isMobile }">
        <div class="text-base-content" v-if="!theme.isMobile && !preview">
          Filter by type of project
        </div>
        <div class="filters" v-if="!theme.isMobile && !preview">
          <button
            class="btn btn-sm"
            :class="{ 'btn-active': cs.isFilterActive(filter.id) }"
            @click="setFilter(filter.id)"
            v-for="filter in cs.categories"
            :key="filter.id"
          >
            {{ filter.title }}
          </button>
        </div>

        <div v-if="!theme.isMobile" class="portfolio">
          <ProjectPortfolioItem
            v-for="slug in projectsToList"
            :key="slug"
            :full="false"
            :item="cs.projectsDict[slug]"
          />
          <div class="see-more" v-if="preview">
            <RouterLink class="btn" to="/projects">
              View all projects <IconArrowRight />
            </RouterLink>
          </div>
        </div>
        <div
          v-else
          class="carousel carousel-center bg-neutral rounded-box max-w-md gap-4 p-4 h-full flex items-center"
          @scroll="() => (scrolling = true)"
          @scrollend="() => (scrolling = false)"
        >
          <div
            class="carousel-item relative w-full h-fit max-h-full flex justify-center overflow-auto"
            v-for="(slug, index) in projectsToList"
            :key="slug"
          >
            <ProjectPortfolioItem
              class="min-w-[80%] w-[80%] h-fit"
              :item="cs.projectsDict[slug]"
              :full="true"
              :id="slug"
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
                      projectsToList[index - 1 >= 0 ? index - 1 : projectsToList.length - 1]
                    )
                "
              >
                ❮
              </div>
              <div v-else />
              <div
                class="btn btn-circle self-end"
                v-if="!scrolling && index + 1 < projectsToList.length"
                @click="
                  () =>
                    handleCarouselButtonClick(
                      projectsToList[index + 1 < projectsToList.length ? index + 1 : 0]
                    )
                "
              >
                ❯
              </div>
            </div>
          </div>
          <div class="see-more carousel-item see-more-carousel" v-if="preview">
            <RouterLink class="btn" to="/projects">
              View all projects <IconArrowRight />
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="indicator fixed bottom-8 right-12">
        <span class="indicator-item badge badge-accent" v-if="cs.filters.length > 0"></span>
        <label
          for="filter-drawer"
          v-if="theme.isMobile && !preview"
          class="btn btn-primary drawer-button"
          ><IconFilter
        /></label>
      </div>
    </div>

    <div class="drawer-side" v-if="theme.isMobile && !preview">
      <label for="filter-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <!-- Sidebar content here -->
        <li
          v-for="filter in cs.categories"
          :key="filter.id"
          :class="{ active: cs.isFilterActive(filter.id) }"
          @click="setFilter(filter.id)"
        >
          <a>
            {{ filter.title }}
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
import { useContentsStore } from '@/stores/contents'
import { computed, ref } from 'vue'
import IconArrowRight from '../icons/IconArrowRight.vue'

const props = defineProps<{
  preview?: boolean
}>()

const cs = useContentsStore()
const theme = useThemeStore()

const scrolling = ref(false)

const projectsToList = computed(() => {
  if (!cs.projects) return []
  if (!props.preview) return cs.visibleProjects
  else return cs.projects.slice(0, 2).map((proj) => proj.slug)
})

function setFilter(tag: string) {
  console.log(tag)
  cs.setFilter(tag)
  console.log(cs.filters)
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

.see-more {
  @apply flex items-center justify-start;
}
.see-more-carousel {
  @apply justify-center;
}
</style>
