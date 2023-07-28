import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
	{
	  path: '/',
	  name: 'login',
	  component: () => import("../views/Login-user.vue")
	},
	{
	  path: '/registration',
	  name: 'registration',
	  component: () => import("../views/Registration-user.vue")
	},
  ]
})

export default router
