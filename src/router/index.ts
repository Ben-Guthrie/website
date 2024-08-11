import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import BlogHome from '../views/BlogHome.vue'
import BlogDetail from '@/views/BlogDetail.vue'
import { useThemeStore } from '@/stores'

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
      path: '/blog',
      name: 'blog',
      component: BlogHome
    },
    {
      path: '/blog/:slug',
      name: 'blog-detail',
      component: BlogDetail
    }
  ]
})

router.beforeEach(() => {
  // Show header before changing route
  useThemeStore().showHeader = true
})

router.afterEach((to, from) => {
  // Determine whether to transition left or right, depending on route depth
  if (to.name === 'home') to.meta.transition = 'slide-left'
  else {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    to.meta.transition = toDepth < fromDepth ? 'slide-left' : 'slide-right'
  }
})

export default router
