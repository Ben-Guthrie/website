<template>
  <div class="main">
    <ProjectsPortfolio />
    <SkillsPortfolio />
  </div>
</template>

<script setup lang="ts">
import ProjectsPortfolio from '@/contents/ProjectsPortfolio.vue'
import SkillsPortfolio from '@/contents/SkillsPortfolio.vue'
</script>

<style scoped lang="postcss">
.main {
  @apply max-w-[1080px] h-full w-max;
}
</style>
