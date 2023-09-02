import { createRouter, createWebHistory } from 'vue-router'
import { isAuth } from "../utils/checkToken"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
	{
	  path: '/',
	  name: 'login',
	  component: () => import("../pages/LoginUser.vue"),
	  beforeEnter: isAuth
	},
	{
	  path: '/registration',
	  name: 'registration',
	  component: () => import("../pages/RegistrationUser.vue"),
	  beforeEnter: isAuth
	},
	{
	  path: '/main',
	  name: 'main',
	  component: () => import("../pages/MainPage.vue")
	},
	{
	  path: '/groups',
	  name: 'groups',
	  component: () => import("../pages/Groups.vue")
	},
	{
	  path: '/profile',
	  name: 'profile',
	  component: () => import("../pages/ProfileUser.vue")
	},
	{
	  path: '/students',
	  name: 'students',
	  component: () => import("../pages/Students.vue")
	},
	{
	  path: '/schedule',
	  name: 'schedule',
	  component: () => import("../pages/ScheduleTable.vue")
	},
	{
	  path: '/newinstitution/:form',
	  name: 'newinstitution',
	  component: () => import("../pages/AddEnterprisesInstitutions.vue"),
	  props: true
	},
	{
	  path: '/newgroup/:form',
	  name: 'newgroup',
	  component: () => import("../pages/AddEnterprisesInstitutions.vue"),
	  props: true
	},
	{
	  path: '/newschedule/:form',
	  name: 'newschedule',
	  component: () => import("../pages/AddEnterprisesInstitutions.vue"),
	  props: true
	},
	{
	  path: '/showschedule/:form',
	  name: 'showschedule',
	  component: () => import("../pages/AddEnterprisesInstitutions.vue"),
	  props: true
	},
	{
	  path: '/updateschedule/:form',
	  name: 'updateschedule',
	  component: () => import("../pages/AddEnterprisesInstitutions.vue"),
	  props: true
	}
  ]
})

export default router