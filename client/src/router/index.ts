import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
	{
	  path: '/',
	  name: 'timeTable',
	  component: () => import("../views/TimeTable.vue")
	},
	{
	  path: '/registration',
	  name: 'registration',
	  component: () => import("../views/Registration-user.vue")
	},
  ]
})

export default router
