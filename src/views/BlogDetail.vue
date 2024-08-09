<template>
  <article v-if="Object.keys(blogPost).length > 0" class="blogDetail prose prose-stone">
    <h1 class="dark:text-primary">{{ blogPost.title }}</h1>
    <div class="flex justify-between">
      <span>{{ blogPost.author.first_name + ' ' + blogPost.author.last_name }}</span>
      <span>{{ new Date(blogPost.created).toISOString().split('T')[0] }}</span>
    </div>
    <img :src="blogPost.featured_image" />
    <div class="blogDetail__body" v-html="blogPost.body"></div>
  </article>
</template>

<script setup lang="ts">
import type { BlogPost } from '@/types'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug
const blogPost = ref({} as BlogPost)

fetch(
  `https://api.buttercms.com/v2/posts/${slug}/?auth_token=${import.meta.env.VITE_READ_API_TOKEN}`
)
  .then((res) => res.json())
  .then((data) => {
    blogPost.value = data.data
  })
</script>

<style scoped lang="postcss"></style>
