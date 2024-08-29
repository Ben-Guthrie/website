<template>
  <div class="h-full w-full" ref="mapContainer" />
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores'
import { Map } from 'mapbox-gl'
import { onMounted, onUnmounted, ref, watch, type Ref } from 'vue'

const CENTER = [0, 0]
const ZOOM = 1
const STYLE_LIGHT = 'mapbox://styles/bengu3/cm0ebpn3200y901psej22gyjn'
const STYLE_DARK = 'mapbox://styles/bengu3/cm0eia9t800x201rbfk0ma0cj'

const theme = useThemeStore()

const mapContainer: Ref<HTMLElement | null> = ref(null)
const map: Ref<Map | undefined> = ref(undefined)

onMounted(() => {
  console.log('mounted')
  console.log(map.value)
  /* Create a new Map and assign it to the provided HTML Element */
  if (!map.value) {
    map.value = new Map({
      container: mapContainer.value as HTMLElement,
      style: theme.darkMode ? STYLE_DARK : STYLE_LIGHT,
      center: CENTER as [number, number],
      zoom: ZOOM,
      interactive: false,
      projection: 'naturalEarth',
      accessToken:
        'pk.eyJ1IjoiYmVuZ3UzIiwiYSI6ImNseGFqZGNleDA0ZDMyanM4NTAyZzBhdnMifQ.Ffn0umUDjtQ4dL8tb37C2A'
    })

    watch(
      () => theme.darkMode,
      (darkMode) => map.value?.setStyle(darkMode ? STYLE_DARK : STYLE_LIGHT)
    )

    map.value.on('load', () => {
      console.log('loaded')
      map.value?.resize()
    })
  }
})

onUnmounted(() => {
  map.value?.remove()
})
</script>
