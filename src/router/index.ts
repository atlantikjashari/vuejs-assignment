import { createRouter, createWebHistory } from 'vue-router'
import SetupView from '../views/SetupView.vue'

const routes = [
  { path: '/', component: SetupView },
  { path: '/welcome', component: () => import('../views/WelcomeView.vue') },
  { path: '/question', component: () => import('../views/QuestionView.vue') },
  { path: '/result', component: () => import('../views/ResultView.vue') },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
