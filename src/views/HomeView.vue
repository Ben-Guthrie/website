<template>
  <div class="home-page">
    <div class="pb-8">
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
    <div class="pb-8">
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
  <div class="divider" />
  <div class="blurb">
    This page was built using Vue and Typescript, implementing a custom
    <a href="sanity.io">Sanity</a> CMS, and using tailwind CSS and
    <a href="daisyui.com">DaisyUI</a> for styling. You can view the source code
    <a href="https://github.com/Ben-Guthrie/website">here</a>.
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
import { useContentsStore } from '@/stores'

const contents = useContentsStore()
</script>

<style scoped lang="postcss">
.home-page {
  @apply text-base-content max-w-[1080px] w-full;
}
.blog-preview {
  @apply flex flex-row justify-center items-center gap-2 p-2 overflow-x-auto;
}
.about-item {
  @apply border rounded-full border-neutral px-2 py-1 flex flex-row flex-nowrap text-nowrap h-7 text-sm items-center;
}
.blurb {
  @apply prose max-w-[90%] pb-2;
}
</style>
