import { createRouter, createWebHistory } from 'vue-router'
import { isToken } from "../handlers/checkToken"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
	{
	  path: '/',
	  name: 'login',
	  component: () => import("../views/Login-user.vue"),
	  beforeEnter: isToken,
	},
	{
	  path: '/registration',
	  name: 'registration',
	  component: () => import("../views/Registration-user.vue"),
	  beforeEnter: isToken,
	},
	{
	  path: '/main',
	  name: 'main',
	  component: () => import("../views/Main-page.vue"),
	},
  ]
})

export default router