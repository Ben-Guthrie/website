import { ref, computed, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import projectsJson from '../data/projects.json'
import type { ProjectItem } from '@/types'

export const useContentsStore = defineStore('contents', () => {
  // list of all projects
  const projects = ref(projectsJson as ProjectItem[])

  // dictionary matching alias to project
  const projectsDict: ComputedRef<{ [alias: string]: ProjectItem }> = computed(() =>
    projects.value.reduce(
      (dict, project) => {
        dict['a'] = project
        return dict
      },
      {} as { [alias: string]: ProjectItem }
    )
  )

  // dictionary matching skill name with experience
  const skills = ref(
    projects.value.reduce(
      (accumulator, project) => {
        project.skills.forEach((skill) => {
          if (!(skill.skill in Object.keys(accumulator))) {
            accumulator[skill.skill] = { experience: [], total: null }
          }
          accumulator[skill.skill].experience.push({ project: project.alias, level: skill.level })
        })

        return accumulator
      },
      {} as {
        [skill: string]: {
          experience: { project: string; level: 1 | 2 | 3 }[]
          total: ComputedRef<number> | null
        }
      }
    )
  )

  // compute the total experience for each skill
  Object.values(skills.value).forEach((value) => {
    value.total = computed(() =>
      value.experience.reduce((total, experience) => (total += experience.level), 0)
    )
  })

  const activeContent = ref('')

  function moveProjectToStart(project: string) {
    projects.value.sort((a, b) => {
      if (a.alias === project) return -1
      if (b.alias === project) return 1
      return 0
    })
  }

  return { projects, skills, projectsDict, activeContent, moveProjectToStart }
})
