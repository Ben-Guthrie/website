<template>
  <div class="resume">
    <ResumeTimeline :isPreview="false" />
  </div>
</template>

<script setup lang="ts">
import ResumeTimeline from '@/components/contents/ResumeTimeline.vue'
import { useThemeStore } from '@/stores'

const theme = useThemeStore()
</script>

<style scoped lang="postcss">
.resume {
  @apply max-w-[1080px] h-full w-full flex justify-center;
}
</style>
