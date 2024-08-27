import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isMobile = ref(window.innerWidth <= 760)
  const showHeader = ref(true)
  const lastScrollPosition = ref(0)

  function handleResizeWindow() {
    if (window.innerWidth <= 760 && !isMobile.value) isMobile.value = true
    else if (window.innerWidth > 760 && isMobile.value) isMobile.value = false
  }

  function handleScroll() {
    // Get the current scroll position
    const currentScrollPosition = window.scrollY || document.documentElement.scrollTop
    // Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
    if (currentScrollPosition < 0) {
      return
    }
    // Wait for it to get past an offset
    if (Math.abs(currentScrollPosition - lastScrollPosition.value) < 60) {
      return
    }
    // Determine whether we need to show or hide the navbar
    showHeader.value = currentScrollPosition < lastScrollPosition.value
    // Set the current scroll position as the last scroll position
    lastScrollPosition.value = currentScrollPosition
  }

  const darkMode = computed(() => {
    // If a preferred mode is set, use that
    if (preferredDarkMode.value !== undefined) return preferredDarkMode.value
    // Otherwise use system preference
    else return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const preferredDarkMode: Ref<boolean | undefined> = ref(undefined)

  function toggleDarkMode() {
    preferredDarkMode.value = !darkMode.value
  }

  return { isMobile, darkMode, showHeader, toggleDarkMode, handleResizeWindow, handleScroll }
})
