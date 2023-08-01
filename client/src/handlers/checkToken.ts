import { type RouteLocationNormalized, type NavigationGuardNext } from 'vue-router';

export async function isToken(to: RouteLocationNormalized,from: RouteLocationNormalized, next: NavigationGuardNext) {
	const restrictedPages = ['/', '/registration']
	const token = localStorage.getItem('token');

	if (token && restrictedPages.includes(to.path)) {
		next('/main')
	} else {
		next()
	}
}