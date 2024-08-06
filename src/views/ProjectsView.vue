<template>
  <div class="main">
    <ProjectsPortfolio />
    <SkillsPortfolio v-if="!theme.isMobile" />
    <ModalPopup class="fixed top-0 left-0 right-0 bottom-0" />
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
