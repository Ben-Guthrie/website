import { ref, computed, type ComputedRef, type Ref } from 'vue'
import { defineStore } from 'pinia'
import projectsJson from '../data/projects.json'
import type { ProjectItem } from '@/types'

export const projectTags = [
  { tag: 'data', name: 'Data Analysis' },
  { tag: 'web', name: 'Web Design' },
  { tag: 'backend', name: 'Backend' },
  { tag: 'ml', name: 'Machine Learning' }
]

export const useContentsStore = defineStore('contents', () => {
  // list of all projects
  const projects = ref(projectsJson as ProjectItem[])

  // dictionary matching alias to project
  const projectsDict: ComputedRef<{ [alias: string]: ProjectItem }> = computed(() =>
    projects.value.reduce(
      (dict, project) => {
        dict[project.alias] = project
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
          if (!Object.keys(accumulator).includes(skill.skill)) {
            accumulator[skill.skill] = { experience: [], total: null }
          }
          accumulator[skill.skill].experience.push({ project: project.alias, level: skill.level })
        })

        return accumulator
      },
      {} as {
        [skill: string]: {
          experience: { project: string; level: 1 | 2 | 3 }[]
          total: number | null
        }
      }
    )
  )

  // compute the total experience for each skill
  Object.values(skills.value).forEach((value) => {
    value.total = value.experience.reduce((total, experience) => (total += experience.level), 0)
  })

  // make array of [word, weight] for the wordcloud
  const skillWords = computed(() =>
    Object.entries(skills.value).reduce(
      (accumulator, [name, skill]) => {
        accumulator.push([name, skill.total || 0])
        return accumulator
      },
      [] as Array<[string, number]>
    )
  )

  const filters: Ref<Array<string>> = ref([])

  function isFilterActive(tag: string) {
    return filters.value.includes(tag)
  }

  function setFilter(tag: string) {
    if (isFilterActive(tag)) {
      filters.value.splice(filters.value.indexOf(tag), 1)
    } else {
      filters.value.push(tag)
    }
  }

  function clearFilter() {
    filters.value = []
  }

  const visibleProjects = computed(() => {
    const projectAliases = projects.value.map((project) => project.alias)
    // if nothing is filtered, return all
    if (filters.value.length === 0) {
      return projectAliases
    }
    // otherwise check if tag is in filters
    return projectAliases.filter((_, index) =>
      projects.value[index].tags.some((tag) => isFilterActive(tag))
    )
  })

  console.log(visibleProjects)

  const activeProject: Ref<string | undefined> = ref()

  function setProjectActive(alias: string) {
    activeProject.value = alias
  }

  function setProjectInactive(alias: string) {
    if (activeProject.value === alias) activeProject.value = undefined
  }

  function isProjectActive(alias: string) {
    return activeProject.value === alias
  }

  const hoveredProjects: Ref<Array<string>> = ref([])

  function setHoveredProject(alias: string) {
    hoveredProjects.value = [alias]
  }

  function unsetHoveredProject(alias: string) {
    if (hoveredProjects.value.includes(alias))
      hoveredProjects.value.splice(hoveredProjects.value.indexOf(alias), 1)
  }

  function isProjectHovered(alias: string) {
    return hoveredProjects.value.includes(alias)
  }

  const hoveredSkill: Ref<string | undefined> = ref()

  function setHoveredSkill(skill: string) {
    hoveredSkill.value = skill
  }

  function unsetHoveredSkill(skill: string) {
    if (hoveredSkill.value === skill) hoveredSkill.value = undefined
  }

  function isSkillHovered(skill: string) {
    return hoveredSkill.value === skill
  }

  const highlightedProjects = computed(() => {
    // If a project is hovered, highlight it
    if (hoveredProjects.value.length > 0) {
      return hoveredProjects.value
    }
    // If a skill is hovered, highlight all associated projects
    if (hoveredSkill.value) {
      return skills.value[hoveredSkill.value].experience.map((exp) => exp.project)
    }
    return []
  })

  const visibleSkills = computed(() => {
    // All skills listed in visible projects
    return Object.keys(skills.value).filter((skill) =>
      skills.value[skill].experience.some((exp) => visibleProjects.value.includes(exp.project))
    )
  })

  function moveProjectToStart(project: string) {
    // Move a project to the start of the list
    projects.value.sort((a, b) => {
      if (a.alias === project) return -1
      if (b.alias === project) return 1
      return 0
    })
  }

  return {
    projects,
    skills,
    skillWords,
    projectsDict,
    visibleProjects,
    highlightedProjects,
    visibleSkills,
    filters,
    activeProject,
    moveProjectToStart,
    isFilterActive,
    setFilter,
    clearFilter,
    setProjectActive,
    setProjectInactive,
    isProjectActive,
    setHoveredProject,
    unsetHoveredProject,
    isProjectHovered,
    setHoveredSkill,
    unsetHoveredSkill,
    isSkillHovered
  }
})
