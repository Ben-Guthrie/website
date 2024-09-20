<template>
  <div
    class="bg-primary rounded-full py-2 px-[0.7rem] text-primary-content font-jaro text-2xl"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <div>B</div>
    <Transition name="icon-fade">
      <div class="w-7 overflow-hidden" v-if="hovered">en</div>
    </Transition>
    <div>G</div>
    <Transition name="icon-fade">
      <div class="w-[3.75rem] overflow-hidden" v-if="hovered">uthrie</div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const hovered = ref(false)
</script>

<style scoped>
.icon-fade-enter-active,
.icon-fade-leave-active {
  transition:
    width 0.5s ease-in-out,
    opacity 0.3s ease-in-out 0.3s;
}

.icon-fade-enter-from,
.icon-fade-leave-to {
  width: 0;
  max-width: 0;
  opacity: 0;
}
</style>
