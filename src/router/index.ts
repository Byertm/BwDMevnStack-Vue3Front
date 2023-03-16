import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '@stores/auth.store';

const routes = [
	{ path: '/', name: 'main', component: () => import('@views/Main.vue') },
	{ path: '/about', name: 'about', component: () => import('@views/About.vue') },
	{ path: '/blog/:slug', name: 'post', component: () => import('@views/BlogPost.vue') },
	{ path: '/category/:slug', name: 'category', component: () => import('@views/Category.vue') },
	{ path: '/tag/:slug', name: 'tag', component: () => import('@views/Tag.vue') },
	{ path: '/blog', name: 'blog', component: () => import('@views/Blog.vue') },
	{ path: '/login', name: 'login', component: () => import('@views/Login.vue') },
	{ path: '/register', name: 'register', component: () => import('@views/Register.vue') },
	{ path: '/:path(.*)', component: () => import('@views/NotFound.vue') }
];

const router = createRouter({
	routes,
	history: createWebHistory(),
	scrollBehavior(to, _from, savedPosition) {
		// Always Scroll To Top
		if (savedPosition) return savedPosition;
		if (to.hash) return { el: to.hash, behavior: 'smooth' };
		else return { top: 0, behavior: 'smooth' };
	}
});

router.beforeEach(async (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
	const publicPages = ['/', '/blog', '/login', '/register'];
	const authRequired = !publicPages.includes(to.path);
	const authStore = await useAuthStore();

	// if (to.meta.requiresAuth && !authStore.isLogged) return '/login';
	if (authRequired && !authStore.isLogged) {
		authStore.returnUrl = to.path;
		next({ path: '/login', query: { returnUrl: to.path } }); // to.href
	} else next();
});

export { routes, router };

export default router;