<template>
  <div>
    <IconUp class="icon" v-if="icon === StatsIconType.upvotes" />
    <IconShare class="icon" v-if="icon === StatsIconType.shares" />
  </div>
</template>

<script setup lang="ts">
import { StatsIconType } from '@/types'
import IconShare from './IconShare.vue'
import IconUp from './IconUp.vue'

defineProps<{
  icon: StatsIconType
}>()
</script>

<style lang="postcss" scoped>
.icon {
  @apply h-8 w-8 text-slate-400;
}
</style>
