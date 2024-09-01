<template>
  <div class="travel">
    <TravelMap />
  </div>
</template>

<script setup lang="ts">
import TravelMap from '@/components/contents/travel/TravelMap.vue'
</script>

<style scoped lang="postcss">
.travel {
  @apply shrink-0 grow w-full absolute;
  height: -webkit-fill-available;
}
</style>
