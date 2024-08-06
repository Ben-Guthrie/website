<template>
  <div>
    <form @submit.prevent="handleSearch()" class="pt-4">
      <label class="input input-bordered flex items-center gap-2">
        <input type="text" class="grow" placeholder="Search blog posts" v-model="searchValue" />
        <IconSearch />
      </label>
    </form>

    <p v-if="!filtered.length" class="noBlogPost">No blog post available</p>
    <div v-else class="blogList">
      <BlogCard
        v-for="post in filtered"
        :key="post.slug"
        :slug="post.slug"
        :image="post.featured_image"
        :date="new Date(post.created).toISOString().split('T')[0]"
        :title="post.title"
        :summary="post.summary"
        :authorImage="post.author.profile_image"
        :authorName="post.author.first_name + ' ' + post.author.last_name"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import IconSearch from '@/components/icons/IconSearch.vue'
import BlogCard from '@/components/contents/items/BlogCard.vue'
import { ref, watch, type Ref } from 'vue'
import type { BlogPost } from '@/types'

const searchValue = ref('')
const blogPosts: Ref<BlogPost[]> = ref([])
const filtered: Ref<BlogPost[]> = ref([])

watch(blogPosts, (newData) => {
  filtered.value = newData
})

fetch(
  `https://api.buttercms.com/v2/posts/?exclude_body=true&auth_token=${import.meta.env.VITE_READ_API_TOKEN}`
)
  .then((res) => res.json())
  .then((data) => {
    blogPosts.value = data.data
  })

const handleSearch = () => {
  const result = blogPosts.value.filter(
    (post) =>
      searchValue.value === '' || post.title.toLowerCase().includes(searchValue.value.toLowerCase())
  )
  filtered.value = result
}

watch(searchValue, handleSearch)
</script>

<style scoped lang="postcss">
.blogList {
  @apply grid pt-4 gap-2 place-content-center auto-cols-fr;
  grid-template-columns: repeat(auto-fill, 350px);
}

.noBlogPost {
  @apply pt-4 text-center;
}
</style>
