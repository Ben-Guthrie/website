<template>
  <div class="blogList">
    <BlogCard
      v-for="post in posts"
      :key="post.slug"
      :slug="post.slug"
      :image="post.featured_image"
      :date="new Date(post.created).toISOString().split('T')[0]"
      :title="post.title"
      :summary="post.summary"
      :authorImage="post.author.profile_image"
      :authorName="post.author.first_name + ' ' + post.author.last_name"
      :size="size"
    />
  </div>
</template>

<script setup lang="ts">
import type { BlogPost } from '@/types'
import BlogCard from './items/BlogCard.vue'

defineProps<{
  posts: BlogPost[]
  size: 'sm' | 'md' | 'lg'
}>()
</script>

<style scoped lang="postcss">
.blogList {
  @apply grid pt-4 gap-2 place-content-center auto-cols-fr;
  grid-template-columns: repeat(auto-fill, 350px);
}
</style>
