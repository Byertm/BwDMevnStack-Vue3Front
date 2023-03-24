<template>
	<nav class="uk-navbar-nav uk-visible@m">
		<template v-if="isLogged">
			<li>
				<a class="nav-item nav-link">Hi {{ authUser?.name }}!</a>
			</li>
			<li>
				<RouterLink to="/" @click="authStore.logout()" class="nav-item nav-link">Çıkış</RouterLink>
			</li>
		</template>
		<template v-else>
			<li>
				<RouterLink to="/login" class="nav-item nav-link">Giriş</RouterLink>
			</li>
			<li>
				<RouterLink to="/register" class="nav-item nav-link">Kayıt Ol!</RouterLink>
			</li>
		</template>
		<!-- <li>
			<router-link :to="{ path: '/' }">
				<span data-uk-icon="icon: facebook" class="uk-icon"></span>
			</router-link>
		</li> -->
	</nav>
	<nav class="uk-navbar-nav -uk-visible@s">
		<li class="uk-flex">
			<ThemeSwitcher></ThemeSwitcher>
		</li>
	</nav>
</template>

<script setup lang="ts">
	import { storeToRefs } from "pinia";
	import { useAuthStore, useUserStore } from "@/stores";
	import { useRouter } from "vue-router";
	import { RouterLink } from "vue-router";
	import ThemeSwitcher from "./ThemeSwitcher.vue";

	const router = useRouter();

	const userStore = useUserStore();
	const { isMe } = storeToRefs(userStore);

	const authStore = useAuthStore();
	const { user: authUser, isLogged } = storeToRefs(authStore);
</script>

<style scoped></style>