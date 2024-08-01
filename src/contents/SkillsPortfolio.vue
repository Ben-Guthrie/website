<script setup lang="ts">
import { useContentsStore } from '@/stores/contents'
import PortfolioContent from '../components/PortfolioContent.vue'
import VueWordCloud from 'vuewordcloud'

const cs = useContentsStore()

function onWordClick(word: string) {
  console.log(word)
  console.log(cs.visibleProjects)
  console.log(cs.visibleSkills)
}
function onWordHover(word: string) {
  console.log(word, 'hovered')
}
function onWordLeave(word: string) {
  console.log(word, 'left')
}
function isWordActive(word: string) {
  return cs.visibleSkills.includes(word)
}
</script>

<template>
  <PortfolioContent title="Skills">
    <VueWordCloud :words="cs.skillWords">
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
        </div>
      </template>
    </VueWordCloud>
  </PortfolioContent>
</template>

<style scoped lang="postcss">
.word {
  @apply cursor-pointer;
}
.word-active {
  @apply text-black;
}
.word-inactive {
  @apply text-slate-400;
}
</style>
