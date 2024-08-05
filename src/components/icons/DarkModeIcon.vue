<script setup lang="ts">
import { useThemeStore } from '@/stores'
import IconMoon from './IconMoon.vue'
import IconSun from './IconSun.vue'

const theme = useThemeStore()

defineProps<{
  size: number
}>()
</script>

<template>
  <div @click="theme.toggleDarkMode">
    <IconMoon :size="size" v-if="theme.darkMode" />
    <IconSun :size="size" v-else />
  </div>
</template>
