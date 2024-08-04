import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const darkMode = computed(() => {
    if (preferredDarkMode.value !== undefined) return preferredDarkMode.value
    else return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  console.log(window.matchMedia('(prefers-color-scheme:dark)'))

  const preferredDarkMode: Ref<boolean | undefined> = ref(undefined)

  function toggleDarkMode() {
    preferredDarkMode.value = !darkMode.value
  }

  return { darkMode, toggleDarkMode }
})
