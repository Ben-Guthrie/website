<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Projects from './contents/Projects.vue'
</script>

<template>
  <div class="page">
    <header>
      <div class="navbar">
        <div class="name">Ben Guthrie</div>
        <nav>
          <span>Projects</span>
          <span>Skills</span>
          <span>About</span>
        </nav>
      </div>
    </header>

    <div class="content">
      <Projects />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.page {
  @apply w-screen h-screen;
  @apply bg-stone-100;
  @apply fixed top-0 left-0;
  @apply flex flex-nowrap flex-col items-center;
}

header {
  @apply w-full h-16;
  @apply border-b-2 border-slate-800 justify-center;
  @apply flex flex-nowrap;
  @apply text-xl;
}

header .navbar {
  @apply max-w-[680px] w-full h-full;
  @apply flex flex-row items-center flex-nowrap justify-between;
}

header .name {
  @apply flex flex-nowrap;
}

nav {
  @apply flex flex-row justify-between items-center;
  @apply space-x-2 md:space-x-4 xl:space-x-6 h-full;
}

.content {
  @apply flex flex-col overflow-auto h-full;
  @apply items-center py-8;
  @apply max-w-[680px] w-full;
}
</style>
