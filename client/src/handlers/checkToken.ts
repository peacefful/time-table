import { type RouteLocationNormalized, type NavigationGuardNext } from 'vue-router';

export async function isAuth(to: RouteLocationNormalized,from: RouteLocationNormalized, next: NavigationGuardNext) {
	const token:boolean = Boolean(localStorage.getItem('token'))
	return token ? next("/main") : next()
}