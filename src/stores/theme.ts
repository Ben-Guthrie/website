import { defineStore } from 'pinia'
import { computed, ref, watch, type Ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isMobile = ref(window.innerWidth <= 760)

  function handleResizeWindow() {
    if (window.innerWidth <= 760 && !isMobile.value) isMobile.value = true
    else if (window.innerWidth > 760 && isMobile.value) isMobile.value = false
  }

  const darkMode = computed(() => {
    if (preferredDarkMode.value !== undefined) return preferredDarkMode.value
    else return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const preferredDarkMode: Ref<boolean | undefined> = ref(undefined)

  function toggleDarkMode() {
    preferredDarkMode.value = !darkMode.value
  }

  return { isMobile, darkMode, toggleDarkMode, handleResizeWindow }
})
