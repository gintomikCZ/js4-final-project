import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: () => import('../views/WelcomePage.vue')
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/ProjectsPage.vue')
  },
  {
    path: '/project/:id',
    name: 'projectDetail',
    component: () => import('../views/ProjectDetailPage.vue')
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import('../views/TasksPage.vue')
  },
  {
    path: '/task/:id',
    name: 'taskDetail',
    component: () => import('../views/TaskDetailPage.vue')
  },
  {
    path: '/persons',
    name: 'persons',
    component: () => import('../views/PersonsPage.vue')
  },
  {
    path: '/person/:id',
    name: 'personDetail',
    component: () => import('../views/PersonDetailPage.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
