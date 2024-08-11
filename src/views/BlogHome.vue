<template>
  <div class="pt-2">
    <div class="input input-bordered flex items-center gap-2">
      <input type="text" class="grow" placeholder="Search blog posts" v-model="searchValue" />
      <IconSearch />
    </div>

    <p v-if="!filtered.length" class="noBlogPost">No blog post available</p>
    <BlogList v-else :posts="filtered" size="lg" class="grid-cols-2" />
  </div>
</template>

<script setup lang="ts">
import IconSearch from '@/components/icons/IconSearch.vue'
import { computed, ref } from 'vue'
import { useContentsStore } from '@/stores'
import BlogList from '@/components/contents/BlogList.vue'

const contents = useContentsStore()

const searchValue = ref('')
const filtered = computed(() => {
  if (searchValue.value.length === 0) return contents.blogPosts
  else
    return contents.blogPosts.filter((post) =>
      post.title.toLowerCase().includes(searchValue.value.toLowerCase())
    )
})
</script>

<style scoped lang="postcss">
.noBlogPost {
  @apply pt-4 text-center;
}
</style>
