<template>
  <PortfolioItem :item="item" :full="full">
    <div class="skills">
      <div class="skills-container" :class="{ 'overflow-hidden text-ellipsis': !full }">
        <div class="skill" v-for="skill in skills" :key="skill.skill">
          <div class="min-w-0">{{ skill.skill }}</div>
          <LevelIcon class="min-w-0" :level="skill.level" />
        </div>
      </div>
    </div>
  </PortfolioItem>
</template>

<script setup lang="ts">
import type { ProjectItem } from '@/types'
import PortfolioItem from './PortfolioItem.vue'
import LevelIcon from './icons/LevelIcon.vue'
import { computed } from 'vue'

const props = defineProps<{
  item: ProjectItem
  full: boolean
}>()

const skills = computed(() => (props.full ? props.item.skills : props.item.skills.slice(0, 3)))
</script>

<style scoped lang="postcss">
.skills {
  @apply flex flex-col items-center w-full;
}
.skills-container {
  @apply flex flex-row flex-wrap w-full;
}
.skill {
  @apply flex flex-row p-2 min-w-0 min-h-0 flex-shrink;
}
</style>
