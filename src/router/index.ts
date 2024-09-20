import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import BlogHome from '../views/BlogHome.vue'
import BlogDetail from '@/views/BlogDetail.vue'
import { useThemeStore } from '@/stores'
import TravelView from '@/views/TravelView.vue'
import ResumeView from '@/views/ResumeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView
    },
    {
      path: '/travel',
      name: 'travel',
      component: TravelView
    },
    {
      path: '/resume',
      name: 'resume',
      component: ResumeView
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogHome
    },
    {
      path: '/blog/:slug',
      name: 'blog-detail',
      component: BlogDetail
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(() => {
  // Show header before changing route
  useThemeStore().showHeader = true
})

router.afterEach((to, from) => {
  // Determine the animation to use when changing view
  // If we aren't coming from an internal route, don't animate
  if (from.name === undefined) to.meta.transition = undefined
  // If we're going back to home, slide left
  else if (to.name === 'home') to.meta.transition = 'slide-left'
  // If we're going somewhere from home, slide right
  else if (from.name === 'home') to.meta.transition = 'slide-right'
  // If we're changing route depth, slide right for deeper and left for shallower
  else {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    if (toDepth < fromDepth) to.meta.transition = 'slide-left'
    else if (toDepth > fromDepth) to.meta.transition = 'slide-right'
    // If we aren't changing route depth, don't animate the transition
  }
})

export default router
