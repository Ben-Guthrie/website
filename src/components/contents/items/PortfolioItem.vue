<template>
  <div
    class="item-container"
    :class="{ 'item-hovered': highlighted, 'item-small': !full, 'overflow-auto': full }"
  >
    <div
      class="item"
      :class="{ 'h-fit': full, 'h-full': !full }"
      @mouseover="full ? null : setHovered()"
      @mouseleave="full ? null : setNotHovered()"
      @click="full ? null : setActive()"
    >
      <span
        class="text-md md:text-md font-semibold"
        :class="{ 'text-xl font-bold overflow-auto': full }"
        >{{ item.name }}</span
      >

      <div class="img-container">
        <img
          :src="'img/' + item.thumbnail"
          class="thumbnail"
          :class="{ 'object-contain max-h-[40vh]': full }"
        />
      </div>

      <hr class="divider" v-show="full" />

      <span class="summary" v-show="full">{{ item.summary }}</span>

      <hr class="divider" v-show="full" />
      <div class="w-full overflow-hidden" v-if="full">
        <slot />
      </div>

      <hr class="divider" />

      <div class="footer">
        <div class="basis-1/4 flex-initial">
          <div class="footer-l" v-if="item.footers.left !== undefined">
            <StatsIcon :icon="item.footers.left.icon" />
            <span> {{ item.footers.left.text }} </span>
          </div>
        </div>
        <div class="basis-1/3 flex-initial flex justify-center">
          <button
            class="btn btn-primary"
            v-if="item.link"
            v-on:click.stop
            @click="followLink(item.link)"
          >
            <div class="link-text">
              <span class="max-lg:hidden">See </span>
              <span class="lg:hidden" v-if="full">See </span>
              <span>More</span>
            </div>
            <IconExternal class="text-dark" v-if="item.link.type === 'external'" />
          </button>
        </div>

        <div class="basis-1/4 flex-initial">
          <div class="footer-r" v-if="item.footers.right !== undefined">
            <span> {{ item.footers.right.text }}</span>
            <StatsIcon :icon="item.footers.right.icon" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Link, PortfolioItem, ProjectItem } from '@/types'
import StatsIcon from '../../icons/StatsIcon.vue'
import IconExternal from '../../icons/IconExternal.vue'
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
  if (!active.value) cs.setProjectActive(props.item.alias)
  else cs.setProjectInactive(props.item.alias)
}

function followLink(link: Link) {
  if (link.type === 'external') {
    window.location.href = link.path
  }
}
</script>

<style scoped lang="postcss">
.item-container {
  @apply border border-accent basis-[31%] flex-grow shadow cursor-pointer h-fit max-h-full;
}

.item {
  @apply w-full flex flex-col items-center bg-base-100 text-base-content p-2 gap-2;
}

.item-small {
  @apply h-64 max-w-[40%];
}

.item-hovered {
  @apply border-2 rounded border-highlight transition-all ease-in-out;
}

hr.divider {
  @apply h-[0.5px] my-1 bg-semidark border-0 w-full;
}

.img-container {
  @apply w-fit h-full;
}

.item-small .item .img-container {
  @apply w-full h-36 min-h-0;
}

img.thumbnail {
  @apply w-full h-full object-cover object-center px-2 md:px-4 lg:px-6;
}
.item-small:hover .item img.thumbnail {
  @apply object-contain;
}
.item-small:hover .item .img-container {
  @apply p-1 transition-all ease-in;
}

.footer {
  @apply flex flex-row w-full justify-between items-center;
  @apply text-dark dark:text-light;
}

.footer-l {
  @apply justify-self-start flex flex-row justify-start items-center space-x-1 pr-2;
}

.link {
  @apply w-fit flex gap-2 items-center justify-center px-1;
  @apply rounded-full bg-highlight border-4 border-highlight;
  @apply text-dark dark:text-dark dark:bg-highlight cursor-pointer;
  @apply transform hover:scale-110 hover:bg-highlight hover:text-dark;
}

.link-text {
  @apply text-nowrap;
}

.footer-r {
  @apply justify-self-end flex flex-row justify-end items-center space-x-1 pl-2;
}
</style>
