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
	  path: '/newgroup',
	  name: 'group',
	  component: () => import("../pages/FormGroup.vue")
	}
  ]
})

export default router