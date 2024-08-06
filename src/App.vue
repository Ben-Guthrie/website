<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import DarkModeIcon from './components/icons/DarkModeIcon.vue'
import { useThemeStore } from './stores'
import BenGuthrie from './components/icons/BenGuthrie.vue'
import { RouterView } from 'vue-router'

const theme = useThemeStore()

onMounted(() => window.addEventListener('resize', theme.handleResizeWindow))
onUnmounted(() => window.removeEventListener('resize', theme.handleResizeWindow))
</script>

<template>
  <div
    class="page"
    :class="{ dark: theme.darkMode }"
    :data-theme="theme.darkMode ? 'dark' : 'light'"
  >
    <header>
      <div class="navbar">
        <RouterLink to="/">
          <BenGuthrie class="name"></BenGuthrie>
        </RouterLink>
        <div class="w-full" />
        <nav>
          <RouterLink to="/projects" class="nav-option">Projects</RouterLink>
          <div class="nav-option text-neutral cursor-auto">Travel</div>
          <div class="nav-option text-neutral cursor-auto">Blog</div>
        </nav>
        <DarkModeIcon class="dark-mode-selector" :size="32" />
      </div>
    </header>

    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.page {
  @apply w-screen h-screen bg-base-100;
  @apply fixed top-0 left-0;
  @apply flex flex-nowrap flex-col items-center text-dark;
}

header {
  @apply w-full h-16;
  @apply border-b-2 border-dark dark:border-highlight justify-center;
  @apply flex flex-nowrap;
  @apply text-xl text-dark dark:text-highlight;
}

header .navbar {
  @apply max-w-[680px] w-full h-full;
  @apply flex flex-row items-center flex-nowrap px-2;
}

header .name {
  @apply inline text-nowrap justify-self-start flex;
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
