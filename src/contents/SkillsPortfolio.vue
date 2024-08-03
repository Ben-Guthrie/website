<script setup lang="ts">
import { useContentsStore } from '@/stores/contents'
import PortfolioContent from '../components/PortfolioContent.vue'
import VueWordCloud from 'vuewordcloud'
import { ref, watch, type Ref } from 'vue'

const cs = useContentsStore()

function onWordClick(word: string) {
  console.log(word)
}
function onWordHover(word: string) {
  cs.setHoveredSkill(word)
  visibleTooltip.value = word
}
async function onWordLeave(word: string) {
  cs.unsetHoveredSkill(word)
  // When mouse leaves, wait 0.5 seconds and close the tooltip if nothing has been hovered since the mouse left
  let closeTooltip = true
  const unwatch = watch(
    () => cs.isSkillHovered(word),
    () => (closeTooltip = false)
  )
  await new Promise((resolve) => {
    setTimeout(resolve, 500)
  }).then(() => {
    unwatch()
    if (closeTooltip && visibleTooltip.value === word) visibleTooltip.value = undefined
  })
}
function isWordActive(word: string) {
  return cs.visibleSkills.includes(word)
}

const visibleTooltip: Ref<string | undefined> = ref(undefined)
</script>

<template>
  <PortfolioContent title="Skills">
    <VueWordCloud class="wordcloud" style="width: 640px; height: 128px" :words="cs.skillWords">
      <template v-slot="{ text, weight, word }">
        <div
          class="word"
          :class="[isWordActive(word[0]) ? 'word-active' : 'word-inactive']"
          :title="weight"
          @click="onWordClick(word[0])"
          @mouseover="onWordHover(word[0])"
          @mouseleave="onWordLeave(word[0])"
        >
          {{ text }}
          <div
            class="tooltip"
            v-if="visibleTooltip === word[0]"
            @mouseover="onWordHover(word[0])"
            @mouseleave="onWordLeave(word[0])"
          >
            Tooltip
          </div>
        </div>
      </template>
    </VueWordCloud>
  </PortfolioContent>
</template>

<style scoped lang="postcss">
.wordcloud {
  @apply h-[320px] w-[320px] !z-0;
}
.word {
  @apply cursor-pointer relative !z-0 !flex;
}
.tooltip {
  @apply absolute !z-[100] bottom-0 left-[105%] text-sm bg-white;
}
.word-active {
  @apply text-black;
}
.word-inactive {
  @apply text-slate-400;
}
</style>
