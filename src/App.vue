<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import DarkModeIcon from './components/icons/DarkModeIcon.vue'
import { useThemeStore } from './stores'
import BenGuthrie from './components/icons/BenGuthrie.vue'
import { RouterView } from 'vue-router'
import router from './router'
import ModalPopup from './components/contents/ModalPopup.vue'

const theme = useThemeStore()

onMounted(() => {
  window.addEventListener('resize', theme.handleResizeWindow)
  document.getElementById('content')?.addEventListener('scroll', theme.handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('resize', theme.handleResizeWindow)
  document.getElementById('content')?.removeEventListener('scroll', theme.handleScroll)
})
</script>

<template>
  <div
    class="page"
    :class="{ dark: theme.darkMode }"
    :data-theme="theme.darkMode ? 'dark' : 'light'"
  >
    <header v-show="theme.showHeader">
      <div class="navbar">
        <BenGuthrie @click="router.replace('/')" class="name cursor-pointer"></BenGuthrie>
        <div class="w-full" />
        <nav>
          <RouterLink to="/projects" class="nav-option" active-class="nav-option-active"
            >Projects</RouterLink
          >
          <div class="nav-option text-neutral cursor-auto">Travel</div>
          <RouterLink to="/blog" class="nav-option" active-class="nav-option-active"
            >Blog</RouterLink
          >
        </nav>
        <DarkModeIcon class="dark-mode-selector" :size="32" />
      </div>
    </header>

    <div class="content" id="content">
      <RouterView v-slot="{ Component, route }">
        <Transition :name="route.meta.transition as string">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>
  </div>

  <ModalPopup class="fixed top-0 left-0 right-0 bottom-0" />
</template>

<style lang="postcss" scoped>
.page {
  @apply bg-base-100 h-screen w-full min-h-screen;
  @apply flex flex-nowrap flex-col items-center text-dark;
}

header {
  @apply w-full h-16 fixed transition bg-base-100 z-10;
  @apply border-b-2 border-dark dark:border-highlight justify-center;
  @apply flex flex-nowrap;
  @apply text-xl text-dark dark:text-highlight;
}

header .navbar {
  @apply max-w-[600px] w-[90vw] h-full;
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

nav .nav-option-active {
  @apply underline underline-offset-8 decoration-highlight decoration-4;
}

.dark-mode-selector {
  @apply w-fit text-highlight justify-self-end cursor-pointer;
}

.content {
  @apply flex flex-col h-full pt-16;
  @apply items-center relative;
  @apply w-full overflow-auto;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.5s ease-out;
}

.slide-right-enter-to,
.slide-left-leave-from {
  position: absolute;
  right: 0;
}

.slide-right-enter-from,
.slide-left-leave-to {
  position: absolute;
  right: -100%;
}

.slide-right-leave-to,
.slide-left-enter-from {
  position: absolute;
  left: -100%;
}

.slide-right-leave-from,
.slide-left-enter-to {
  position: absolute;
  left: 0;
}
</style>
