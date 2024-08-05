<template>
  <div v-if="item !== undefined" class="mask" @click="cs.setProjectInactive(item.alias)">
    <ProjectPortfolioItem v-on:click.stop class="popup" :item="item" :full="true" />
  </div>
</template>

<script setup lang="ts">
import ProjectPortfolioItem from '@/components/contents/items/ProjectPortfolioItem.vue'
import { useContentsStore } from '@/stores/contents'
import { computed } from 'vue'

const cs = useContentsStore()
const item = computed(() =>
  cs.activeProject !== undefined ? cs.projectsDict[cs.activeProject] : undefined
)
</script>

<style scoped lang="postcss">
.mask {
  @apply h-screen w-screen z-10 backdrop-blur-md flex items-center justify-center;
}
.popup {
  @apply cursor-auto max-h-[90%] max-w-96;
}
</style>
