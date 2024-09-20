<template>
  <div class="timeline-container">
    <div class="form-control pb-2" v-if="!isPreview">
      <label class="label cursor-pointer space-x-4">
        <span class="label-text">Show details</span>
        <input type="checkbox" class="toggle" v-model="showDetails" />
      </label>
    </div>
    <div v-if="!isPreview" class="flex flex-row font-semibold text-xl">
      <div class="basis-[45%] text-end">Education and Certifications</div>
      <div class="basis-[10%]" />
      <div class="basis-[45%]">Work Experience</div>
    </div>
    <ul
      class="timeline"
      :class="[
        !isPreview || useThemeStore().isMobile ? 'timeline-vertical' : '',
        !isPreview ? 'timeline-snap-icon' : ''
      ]"
    >
      <li v-for="(item, index) in items" :key="item.title" class="timeline-item">
        <hr v-if="index != 0" />
        <div
          class="flex flex-col px-1"
          :class="{
            'timeline-start items-end':
              (item.type == 'education' && !isPreview) || (item.type == 'experience' && isPreview),
            'timeline-end items-start':
              (item.type == 'education' && isPreview) || (item.type == 'experience' && !isPreview),
            'items-center timeline-box': isPreview,
            'pb-2': !isPreview
          }"
        >
          <DateRange v-if="!isPreview" class="italic text-sm" :from="item.from" :to="item.to" />
          <div class="font-semibold">{{ isPreview ? item.shortTitle : item.title }}</div>
          <div>{{ item.company }}</div>
          <div
            class="prose"
            v-if="showDetails && !isPreview"
            :class="[item.type == 'education' ? 'text-end' : 'text-start']"
          >
            <PortableText :value="item.description" />
          </div>
        </div>
        <div class="timeline-middle" :class="[!isPreview ? 'timeline-icon' : '']">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            fill="currentColor"
            class="h-3 w-3"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>
        </div>
        <hr v-if="index < items.length - 1" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useContentsStore, useThemeStore } from '@/stores'
import { computed, ref, watch } from 'vue'
import DateRange from './DateRange.vue'
import { PortableText } from '@portabletext/vue'

const props = defineProps<{
  isPreview: boolean
}>()

const contents = useContentsStore()
const items = computed(() =>
  contents.resumeItems.filter((item) => (props.isPreview ? item.showInPreview : true))
)

const showDetails = ref(true)
watch(showDetails, (newVal) => console.log(newVal))
</script>

<style scoped lang="postcss">
.timeline-container {
  @apply overflow-x-auto max-w-3xl pt-2 flex flex-col items-center;
}

.timeline-item:hover .timeline-icon {
  @apply text-highlight;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.timeline-container::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.timeline-container {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.timeline-container:hover::-webkit-scrollbar {
  display: auto;
}

.timeline-container:hover {
  -ms-overflow-style: auto; /* IE and Edge */
  scrollbar-width: auto; /* Firefox */
}
</style>
