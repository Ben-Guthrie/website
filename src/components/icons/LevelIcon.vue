<template>
  <div>
    <IconFire
      class="default"
      :class="{ 'level-1': level === 1, 'level-2': level === 2, 'level-3': level === 3 }"
    />
  </div>
</template>

<script setup lang="ts">
import IconFire from './IconFire.vue'

defineProps<{
  level: number
}>()
</script>

<style lang="postcss" scoped>
.default {
  @apply h-8 w-8 text-slate-400;
}
.level-1 {
  @apply h-8 w-8 text-yellow-600;
}
.level-2 {
  @apply h-10 w-10 text-orange-600;
}
.level-3 {
  @apply h-12 w-12 text-red-600;
}
</style>
