<template>
  <div class="main">
    <ProjectsPortfolio />
    <SkillsPortfolio v-if="!theme.isMobile" />
  </div>
</template>

<script setup lang="ts">
import ProjectsPortfolio from '@/components/contents/ProjectsPortfolio.vue'
import SkillsPortfolio from '@/components/contents/SkillsPortfolio.vue'
import ModalPopup from '@/components/contents/ModalPopup.vue'
import { useThemeStore } from '@/stores'

const theme = useThemeStore()
</script>

<style scoped lang="postcss">
.main {
  @apply max-w-[1080px] h-full w-full;
}
</style>
