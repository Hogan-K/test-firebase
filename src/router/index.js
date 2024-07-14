import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/index.vue'),
    },
    {
      path: '/class',
      name: 'class',
      component: () => import('@/views/class.vue')
    },
    {
      path: '/firestore',
      name: 'firestore',
      component: () => import('@/views/firestore.vue')
    },
    {
      path: '/storage',
      name: 'storage',
      component: () => import('@/views/storage.vue')
    },
    {
      path: '/authentication',
      name: 'authentication',
      component: () => import('@/views/authentication.vue')
    }
  ]
})

export default router
