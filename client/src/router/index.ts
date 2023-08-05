import { createRouter, createWebHistory } from 'vue-router'
import { isAuth } from "../handlers/checkToken"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
	{
	  path: '/',
	  name: 'login',
	  component: () => import("../views/Login-user.vue"),
	  beforeEnter: isAuth
	},
	{
	  path: '/registration',
	  name: 'registration',
	  component: () => import("../views/Registration-user.vue"),
	  beforeEnter: isAuth
	},
	{
	  path: '/main',
	  name: 'main',
	  component: () => import("../views/Main-page.vue")
	},
	{
	  path: '/institution/:appellation',
	  name: 'institution',
	  component: () => import("../views/Institutions.vue")
	},
  ]
})

export default router