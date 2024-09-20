<template>
  <div>{{ dateRange }}</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  from: Date
  to: Date | undefined
}>()

const dateRange = computed(() => {
  if (props.to === undefined) {
    return props.from.toLocaleString('default', { month: 'short', year: 'numeric' }) + ' - Present'
  }
  // If from and to are in the same year, return e.g. Jan-Aug 2012
  else if (props.from.getFullYear() === props.to.getFullYear()) {
    // If under 1 month duration, just return e.g. Aug 2012
    if (props.from.getMonth() === props.to.getMonth()) {
      return props.from.toLocaleString('default', { month: 'short', year: 'numeric' })
    }
    return (
      props.from.toLocaleString('default', { month: 'short' }) +
      ' - ' +
      props.to.toLocaleString('default', { month: 'short', year: 'numeric' })
    )
  }
  return (
    props.from.toLocaleString('default', { month: 'short', year: 'numeric' }) +
    ' - ' +
    props.to.toLocaleString('default', { month: 'short', year: 'numeric' })
  )
})
</script>
