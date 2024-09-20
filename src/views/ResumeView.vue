<template>
  <div class="resume">
    <PortfolioContent title="Work History">
      <ResumeTimeline :isPreview="false" />
    </PortfolioContent>
  </div>
</template>

<script setup lang="ts">
import PortfolioContent from '@/components/contents/PortfolioContent.vue'
import ResumeTimeline from '@/components/contents/ResumeTimeline.vue'
</script>

<style scoped lang="postcss">
.resume {
  @apply max-w-[860px] h-full w-full flex justify-center;
}
</style>
