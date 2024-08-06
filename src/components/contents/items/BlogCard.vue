<template>
  <div class="card card-bordered cursor-pointer" @click="$router.push(`/blog/${slug}`)">
    <figure>
      <img :src="image" />
    </figure>
    <div class="card-body text-base-content">
      <h3 class="card-title dark:text-primary">{{ title }}</h3>
      <p class="summary">{{ summary }}</p>
      <span class="date">{{ date }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  slug: string
  image: string
  date: string
  title: string
  summary: string
  authorImage: string
  authorName: string
}>()
</script>

<style scoped lang="postcss">
.date {
  @apply text-end;
}
</style>
