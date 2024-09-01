import { ref, computed, type ComputedRef, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { BlogPost, ProjectItem } from '@/types'
import { createClient } from '@sanity/client'

export const useContentsStore = defineStore('contents', () => {
  // Set up Sanity CMS client
  const sanity = createClient({
    projectId: 'ew0zmfl8',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-08-29'
  })

  // Fetch travel data from Sanity
  const travelQuery = `*[_type == "travel"]{
 _id,
 tripId,
 tripName,
 from,
 to,
 "images": images.images[].asset->url,
 highlights
 }`
  const loadingTravel = ref(true)
  const trips: Ref<{ [tripId: string]: any }> = ref({})
  sanity.fetch(travelQuery).then(
    (data: any[]) => {
      loadingTravel.value = false
      trips.value = data.reduce(
        (dict, trip) => {
          dict[trip.tripId as string] = trip
          return dict
        },
        {} as { [tripId: string]: any }
      )
    },
    (error) => {
      console.error(error)
    }
  )

  /* ----------- Projects ---------- */
  const loadingProjects = ref(true)
  // Fetch project categories from Sanity
  const categoryQuery = `*[_type == "category"]`
  const categories = ref([] as { id: string; title: string; description: string }[])
  sanity.fetch(categoryQuery).then((data) => (categories.value = data))

  // Fetch project data from Sanity
  const projects: Ref<Array<ProjectItem>> = ref([])
  const skills: Ref<{
    [skill: string]: {
      experience: { project: string; level: 1 | 2 | 3 }[]
      total: number | null
    }
  }> = ref({})

  const projectsQuery = `*[_type == "project"] | order(date desc){
  _id,
  title,
  "slug": slug.current,
  "tags": tags[]->,
  summary,
  "thumbnail": thumbnail.asset->url,
  skills,
  footers,
  link
  }`
  sanity.fetch(projectsQuery).then(
    (data) => {
      projects.value = data

      // Create dict of all skills mentioned in projects
      skills.value = projects.value?.reduce(
        (accumulator, project) => {
          project.skills.forEach((skill) => {
            if (!Object.keys(accumulator).includes(skill.skill)) {
              accumulator[skill.skill] = { experience: [], total: null }
            }
            accumulator[skill.skill].experience.push({ project: project.slug, level: skill.level })
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
      // compute the total experience for each skill
      Object.values(skills.value!).forEach((value) => {
        value.total = value.experience.reduce((total, experience) => (total += experience.level), 0)
      })

      loadingProjects.value = false
      console.log(projects.value)
    },
    (error) => {
      console.error(error)
    }
  )

  // dictionary matching slug to project
  const projectsDict: ComputedRef<{ [slug: string]: ProjectItem }> = computed(() =>
    projects.value?.reduce(
      (dict, project) => {
        dict[project.slug] = project
        return dict
      },
      {} as { [slug: string]: ProjectItem }
    )
  )

  // make array of [word, weight] for the wordcloud
  const skillWords = computed(() => {
    if (!skills.value) return []
    return Object.entries(skills.value).reduce(
      (accumulator, [name, skill]) => {
        accumulator.push([name, skill.total || 0])
        return accumulator
      },
      [] as Array<[string, number]>
    )
  })

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
    if (!projects.value) return []
    const projectSlugs = projects.value.map((project) => project.slug)
    // if nothing is filtered, return all
    if (filters.value.length === 0) {
      return projectSlugs
    }
    // otherwise check if tag is in filters
    return projectSlugs?.filter((_, index) =>
      projects.value![index].tags.some((tag) => isFilterActive(tag.id))
    )
  })

  const activeProject: Ref<string | undefined> = ref()

  function setProjectActive(slug: string) {
    activeProject.value = slug
  }

  function setProjectInactive(slug: string) {
    if (activeProject.value === slug) activeProject.value = undefined
  }

  function isProjectActive(slug: string) {
    return activeProject.value === slug
  }

  const hoveredProjects: Ref<Array<string>> = ref([])

  function setHoveredProject(slug: string) {
    hoveredProjects.value = [slug]
  }

  function unsetHoveredProject(slug: string) {
    if (hoveredProjects.value.includes(slug))
      hoveredProjects.value.splice(hoveredProjects.value.indexOf(slug), 1)
  }

  function isProjectHovered(slug: string) {
    return hoveredProjects.value.includes(slug)
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
    if (hoveredSkill.value && skills.value) {
      return skills.value[hoveredSkill.value].experience.map((exp) => exp.project)
    }
    return []
  })

  const visibleSkills = computed(() => {
    if (!skills.value) return []
    // All skills listed in visible projects
    return Object.keys(skills.value).filter((skill) =>
      skills.value![skill].experience.some((exp) => visibleProjects.value.includes(exp.project))
    )
  })

  function moveProjectToStart(project: string) {
    // Move a project to the start of the list
    if (projects.value)
      projects.value.sort((a, b) => {
        if (a.slug === project) return -1
        if (b.slug === project) return 1
        return 0
      })
  }

  /* ------------ Blog ------------ */
  const blogPosts = ref([] as BlogPost[])

  fetch(
    `https://api.buttercms.com/v2/posts/?exclude_body=true&auth_token=${import.meta.env.VITE_READ_API_TOKEN}`
  )
    .then((res) => res.json())
    .then((data) => {
      blogPosts.value = data.data
    })

  return {
    projects,
    categories,
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
    isSkillHovered,
    blogPosts,
    trips
  }
})
