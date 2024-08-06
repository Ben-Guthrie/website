import { createRouter, createWebHistory } from 'vue-router'
import ProjectsView from '../views/ProjectsView.vue'
import BlogHome from '../views/BlogHome.vue'
import BlogDetail from '@/views/BlogDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProjectsView
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

router.afterEach((to, from) => {
  if (to.name === 'home') to.meta.transition = 'slide-left'
  else {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    to.meta.transition = toDepth < fromDepth ? 'slide-left' : 'slide-right'
  }
  console.log(to.meta.transition)
})

export default router
