<template>
  <div class="home-page">
    <div class="w-full flex justify-center py-1">
      <div class="badge">This site is a work in progress and is constantly being updated.</div>
    </div>
    <div class="pb-12">
      <PortfolioContent title="About Me">
        <div class="flex flex-row gap-8 max-w-[32rem] items-center">
          <img src="/img/me.jpg" class="rounded-full h-32" />
          <span class="prose text-base-content"
            >Hi, I'm Ben Guthrie. I have a PhD in Astronautics, a passion for learning and an
            unhealthy obsession with starting new projects. This site is an attempt to consolidate
            my work and allow me to keep track of the skills I have developed.</span
          >
        </div>
        <div class="flex flex-row gap-2 pt-2">
          <a href="mailto:guthrieb25@gmail.com" class="about-item"
            ><IconEmail class="pr-2" /> guthrieb25@gmail.com</a
          >
          <a href="https://github.com/Ben-Guthrie" class="about-item"
            ><IconGithub class="fill-base-content h-full" />/Ben-Guthrie</a
          >
          <a href="https://linkedin.com/in/ben-guthrie25" class="about-item"
            ><IconLinkedin class="fill-base-content h-full" />/Ben-Guthrie25</a
          >
        </div>
      </PortfolioContent>
    </div>
    <div class="pb-12">
      <PortfolioContent title="Recent Projects">
        <ProjectsList :preview="true" />
      </PortfolioContent>
    </div>
    <div>
      <PortfolioContent title="Recent Blog Posts">
        <div class="blog-preview">
          <BlogList :posts="contents.blogPosts.slice(0, 2)" size="sm" />
          <RouterLink to="/blog" class="btn">View all posts <IconArrowRight /></RouterLink>
        </div>
      </PortfolioContent>
    </div>
  </div>
</template>

<script setup lang="ts">
import BlogList from '@/components/contents/BlogList.vue'
import PortfolioContent from '@/components/contents/PortfolioContent.vue'
import ProjectsList from '@/components/contents/ProjectsList.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconEmail from '@/components/icons/IconEmail.vue'
import IconGithub from '@/components/icons/IconGithub.vue'
import IconLinkedin from '@/components/icons/IconLinkedin.vue'
import router from '@/router'
import { useContentsStore } from '@/stores'

const contents = useContentsStore()
</script>

<style scoped lang="postcss">
.home-page {
  @apply text-base-content max-w-[1080px];
}
.blog-preview {
  @apply flex flex-row justify-center items-center gap-2 p-2;
}
.about-item {
  @apply border rounded-full border-neutral px-2 py-1 flex flex-row flex-nowrap text-nowrap h-7 text-sm items-center;
}
</style>
