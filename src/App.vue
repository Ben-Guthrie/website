<script setup lang="ts">
import DarkModeIcon from './components/icons/DarkModeIcon.vue'
import { useThemeStore } from './stores'
import HomeView from './views/HomeView.vue'

const theme = useThemeStore()
</script>

<template>
  <div class="page" :class="{ dark: theme.darkMode }">
    <header>
      <div class="navbar">
        <div class="name">Ben Guthrie</div>
        <div class="w-full" />
        <nav>
          <div class="nav-option">Projects</div>
          <div class="nav-option">Skills</div>
          <div class="nav-option">About</div>
        </nav>
        <DarkModeIcon class="dark-mode-selector" :size="32" />
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
  @apply bg-light dark:bg-dark;
  @apply fixed top-0 left-0;
  @apply flex flex-nowrap flex-col items-center text-dark;
  @apply dark:bg-dark dark:text-light;
}

header {
  @apply w-full h-16;
  @apply border-b-2 border-dark dark:border-highlight justify-center;
  @apply flex flex-nowrap;
  @apply text-xl text-dark dark:text-highlight;
}

header .navbar {
  @apply max-w-[680px] w-full h-full;
  @apply flex flex-row items-center flex-nowrap;
}

header .name {
  @apply text-nowrap pl-2 justify-self-start;
}

nav {
  @apply flex flex-row items-center pr-2 justify-self-end;
  @apply space-x-2 md:space-x-4 xl:space-x-6 h-full;
}

nav .nav-option {
  @apply h-full px-2 hover:bg-highlight dark:hover:text-dark content-center cursor-pointer;
}

.dark-mode-selector {
  @apply w-fit text-highlight justify-self-end cursor-pointer;
}

.content {
  @apply flex flex-col overflow-auto h-full;
  @apply items-center relative;
  @apply w-full;
}
</style>
