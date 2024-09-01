<template>
  <div class="h-full w-full" ref="mapContainer" />
  <div class="popup" v-if="activeTripId">
    <h1 class="title">{{ activeTrip.tripName }}</h1>
    <span class="date">{{ activeTrip.from }} - {{ activeTrip.to }}</span>
    <div class="divider" />
    <div
      class="carousel carousel-center w-full space-x-4 py-2"
      @scroll="() => (scrolling = true)"
      @scrollend="() => (scrolling = false)"
    >
      <div
        class="carousel-item relative w-full h-64"
        v-for="(image, index) in activeTrip.images"
        :key="index"
        :id="'image' + index"
      >
        <div class="w-full items-center flex justify-center">
          <img :src="image" class="rounded-box max-w-full max-h-full w-fit h-fit object-contain" />
        </div>
        <div
          class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"
        >
          <div
            class="btn btn-circle self-start"
            v-if="!scrolling && index - 1 >= 0"
            @click="
              () =>
                handleCarouselButtonClick(
                  'image' + (index - 1 >= 0 ? index - 1 : activeTrip.images.length - 1)
                )
            "
          >
            ❮
          </div>
          <div v-else />
          <div
            class="btn btn-circle self-end"
            v-if="!scrolling && index + 1 < activeTrip.images.length"
            @click="
              () =>
                handleCarouselButtonClick(
                  'image' + (index + 1 < activeTrip.images.length ? index + 1 : 0)
                )
            "
          >
            ❯
          </div>
        </div>
      </div>
    </div>
    <div class="highlights">
      <h2 class="w-full text-lg font-semibold text-center">Highlights</h2>
      <div class="flex flex-row justify-evenly gap-2 flex-wrap">
        <div class="border p-2 text-nowrap" v-for="hl in activeTrip.highlights" :key="hl">
          {{ hl }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useContentsStore, useThemeStore } from '@/stores'
import { Map, type FeatureSelector } from 'mapbox-gl'
import { computed, onMounted, onUnmounted, ref, watch, type Ref } from 'vue'

const CENTER = [0, 0]
const ZOOM = 1
const MAXZOOM = 3
const MINZOOM = 0.7
const STYLE_LIGHT = import.meta.env.VITE_MAPBOX_STYLE_LIGHT
const STYLE_DARK = import.meta.env.VITE_MAPBOX_STYLE_DARK

const theme = useThemeStore()
const contents = useContentsStore()

const scrolling = ref(false)

const mapContainer: Ref<HTMLElement | null> = ref(null)
const map: Ref<Map | undefined> = ref(undefined)

const tripFeatures = ref({} as { [tripId: string]: FeatureSelector[] })
const hoveredTripId: Ref<string | undefined> = ref(undefined)
const activeTripId: Ref<string | undefined> = ref(undefined)
const activeTrip = computed(() =>
  activeTripId.value ? contents.trips[activeTripId.value] : undefined
)

onMounted(() => {
  /* Create a new Map and assign it to the provided HTML Element */
  if (!map.value) {
    map.value = new Map({
      container: mapContainer.value as HTMLElement,
      style: theme.darkMode ? STYLE_DARK : STYLE_LIGHT,
      center: CENTER as [number, number],
      zoom: ZOOM,
      maxZoom: MAXZOOM,
      minZoom: MINZOOM,
      projection: 'naturalEarth',
      accessToken: import.meta.env.VITE_MAPBOX_API_KEY
    })

    watch(
      () => theme.darkMode,
      (darkMode) => map.value?.setStyle(darkMode ? STYLE_DARK : STYLE_LIGHT)
    )

    map.value.on('load', () => {
      getAllFeaturesPerTrip()
      map.value?.resize()

      map.value?.on('mousemove', ['points', 'lines'], (event) => {
        if (event.features && event.features.length > 0) {
          if (hoveredTripId.value !== event.features[0].properties?.tripId) {
            // If we've moved from one feature to another
            if (hoveredTripId.value !== undefined) {
              // Set the hover state for the old feature to false
              unsetHoveredFeature()
            }
            // Set the hover state for the currently hovered feature to true
            setHoveredFeature(event.features[0].properties?.tripId)
          }
          // Set cursor to pointer
          map.value!.getCanvas().style.cursor = 'pointer'
        }
      })

      map.value?.on('mouseleave', ['points', 'lines'], () => {
        // Set the hover state for the previously hovered feature to false
        unsetHoveredFeature()
        // Set cursor back to default
        map.value!.getCanvas().style.cursor = ''
      })

      map.value?.on('click', (event) => {
        // Unset the current active feature if it exists
        unsetActiveFeature()
        // If the user clicked on a feature, get its information.
        const features = map.value!.queryRenderedFeatures(event.point, {
          layers: ['lines', 'points']
        })
        // If they didn't click on a feature, do not set a new active feature
        if (features.length == 0) return

        // If they did click on a feature, set it as active
        setActiveFeature(features[0].properties?.tripId)
        // Zoom to the feature location
        map.value?.easeTo({ center: event.lngLat, zoom: MAXZOOM, offset: [-100, 0] })
      })
    })
  }
})

function setHoveredFeature(tripId: string) {
  // set feature state to hovered=true for the feature under the mouse.
  hoveredTripId.value = tripId
  getFeaturesByTripId(hoveredTripId.value || '')?.forEach((feature) => {
    map.value?.setFeatureState(feature, { hover: true })
  })
}

function unsetHoveredFeature() {
  // Set the feature state to hovered=false
  if (hoveredTripId.value !== undefined) {
    getFeaturesByTripId(hoveredTripId.value)?.forEach((feature) => {
      map.value?.setFeatureState(feature, { hover: false })
    })
  }
  hoveredTripId.value = undefined
}

function unsetActiveFeature() {
  if (activeTripId.value !== undefined) {
    getFeaturesByTripId(activeTripId.value)?.forEach((feature) => {
      map.value?.setFeatureState(feature, { click: false })
    })

    activeTripId.value = undefined

    // Return to the default map view
    map.value?.easeTo({ center: CENTER as [number, number], zoom: ZOOM })
  }
}

function setActiveFeature(tripId: string) {
  activeTripId.value = tripId
  getFeaturesByTripId(tripId)?.forEach((feature) => {
    map.value?.setFeatureState(feature, { click: true })
  })
}

function getFeaturesByTripId(tripId: string) {
  return tripFeatures.value[tripId]
}

function getAllFeaturesPerTrip() {
  // Query all features in the source and return an object containing a list of features for each tripId
  const featureMap = {} as { [tripId: string]: FeatureSelector[] }
  map.value
    ?.querySourceFeatures('composite', {
      sourceLayer: 'lines'
    })
    .map((feature) => ({ ...feature, sourceLayer: 'lines' }))
    .concat(
      map.value
        ?.querySourceFeatures('composite', {
          sourceLayer: 'points'
        })
        .map((feature) => ({ ...feature, sourceLayer: 'points' }))
    )
    .forEach((feature) => {
      if (Object.keys(featureMap).includes(feature.properties?.tripId))
        featureMap[feature.properties?.tripId as string].push({
          id: feature.id as number,
          source: 'composite',
          sourceLayer: feature.sourceLayer
        })
      else
        featureMap[feature.properties?.tripId as string] = [
          { id: feature.id as number, source: 'composite', sourceLayer: feature.sourceLayer }
        ]
    })
  tripFeatures.value = featureMap
}

onUnmounted(() => {
  map.value?.remove()
})

async function handleCarouselButtonClick(scrollToId: string) {
  const element = document.getElementById(scrollToId)
  element?.scrollIntoView({
    block: 'start',
    behavior: 'smooth'
  })
}
</script>

<style scoped lang="postcss">
.popup {
  @apply absolute top-6 right-6 bg-base-100 shadow-lg w-[45%];
  @apply flex flex-col items-center justify-center p-4;
  @apply text-base-content border-dark dark:border-primary border;
}
.popup .title {
  @apply text-xl font-bold dark:text-primary;
}
.carousel-item .btn {
  @apply opacity-0;
}
.carousel-item:hover .btn {
  @apply opacity-100;
}

.popup .highlights {
  @apply w-full flex flex-col py-4 space-y-2;
}
</style>
