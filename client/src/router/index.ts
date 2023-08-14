import { createRouter, createWebHistory } from 'vue-router'
import { isAuth } from "../handlers/checkToken"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
	{
	  path: '/',
	  name: 'login',
	  component: () => import("../pages/Login-user.vue"),
	  beforeEnter: isAuth
	},
	{
	  path: '/registration',
	  name: 'registration',
	  component: () => import("../pages/Registration-user.vue"),
	  beforeEnter: isAuth
	},
	{
	  path: '/main',
	  name: 'main',
	  component: () => import("../pages/Main-page.vue")
	},
	{
	  path: '/groups',
	  name: 'groups',
	  component: () => import("../pages/Groups.vue")
	},
	{
	  path: '/profile',
	  name: 'profile',
	  component: () => import("../pages/Profile-user.vue")
	},
	{
	  path: '/students',
	  name: 'students',
	  component: () => import("../pages/Students.vue")
	},
	{
	  path: '/schedule',
	  name: 'schedule',
	  component: () => import("../pages/Schedule.vue")
	},
	{
	  path: '/newinstitution/:form',
	  name: 'newinstitution',
	  component: () => import("../pages/Add-enterprises-institutions.vue"),
	  props: true
	},
	{
	  path: '/newgroup/:form',
	  name: 'newgroup',
	  component: () => import("../pages/Add-enterprises-institutions.vue"),
	  props: true
	}
  ]
})

export default router