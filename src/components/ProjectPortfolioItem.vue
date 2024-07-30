<template>
  <PortfolioItem :item="item">
    <div class="skills">
      <div class="skills-container">
        <div class="skill" v-for="skill in item.skills" :key="skill.skill">
          <div>{{ skill.skill }}</div>
          <LevelIcon :level="skill.level" />
        </div>
      </div>
    </div>
  </PortfolioItem>
</template>

<script setup lang="ts">
import type { ProjectItem } from '@/types'
import PortfolioItem from './PortfolioItem.vue'
import LevelIcon from './icons/LevelIcon.vue'

defineProps<{
  item: ProjectItem
}>()
</script>

<style scoped lang="postcss">
.skills {
  @apply flex flex-col items-center w-full;
}
.skills-container {
  @apply flex flex-row w-full;
}
.skill {
  @apply flex flex-row p-2;
}
</style>
