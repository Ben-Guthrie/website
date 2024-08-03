<script setup lang="ts">
import HomeView from './views/HomeView.vue'
</script>

<template>
  <div class="page">
    <header>
      <div class="navbar">
        <div class="name">Ben Guthrie</div>
        <nav>
          <div class="nav-option">Projects</div>
          <div class="nav-option">Skills</div>
          <div class="nav-option">About</div>
        </nav>
      </div>
    </header>

    <div class="content">
      <HomeView />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.page {
  @apply w-screen h-screen;
  @apply bg-stone-100;
  @apply fixed top-0 left-0;
  @apply flex flex-nowrap flex-col items-center text-dark;
}

header {
  @apply w-full h-16;
  @apply border-b-2 border-slate-800 justify-center;
  @apply flex flex-nowrap;
  @apply text-xl text-dark;
}

header .navbar {
  @apply max-w-[680px] w-full h-full;
  @apply flex flex-row items-center flex-nowrap justify-between;
}

header .name {
  @apply flex flex-nowrap pl-2;
}

nav {
  @apply flex flex-row items-center pr-2;
  @apply space-x-2 md:space-x-4 xl:space-x-6 h-full;
}

nav .nav-option {
  @apply h-full px-2 hover:bg-highlight content-center cursor-pointer;
}

.content {
  @apply flex flex-col overflow-auto h-full;
  @apply items-center relative;
  @apply w-full;
}
</style>
