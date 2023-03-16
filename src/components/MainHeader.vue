<template>
	<!-- main header -->
	<header id="main-header" class="eb-main-header">
		<!-- home section -->
		<div id="home" v-if="isHome" class="eb-full-height">
			<section class="eb-profile-desc">
				<div class="eb-section-point-wrapper" data-uk-parallax="opacity: 1, 0;">
					<div class="uk-container">
						<div class="eb-section-point">
							<sup>01</sup>
							<span>hoşgeldiniz</span>
						</div>
					</div>
				</div>

				<div class="eb-graphics">
					<div class="eb-graphic-1" data-uk-parallax="blur: 0,30;"></div>
					<div class="eb-graphic-2" data-uk-parallax="blur: 0,30;"></div>
				</div>

				<div class="uk-container uk-text-center eb-profile-desc-wrap uk-position-relative">
					<img src="/assets/img/x1.png" alt="" width="60" />

					<h1 class="uk-text-bold eb-gradient-text">
						<span>{{ owner?.getSiteOwner?.firstName }}</span> <span>{{ owner?.getSiteOwner?.lastName }}</span>
					</h1>

					<div class="uk-text-bold eb-myjob">Im a <span id="typed" class="typed"></span></div>
				</div>
			</section>
		</div>
		<!-- end home section -->

		<!-- main menu -->
		<nav id="main-menu" class="eb-main-menu">
			<div class="uk-container" data-uk-navbar>
				<div class="uk-navbar-left">
					<router-link :to="{ path: '/' }" class="eb-logo uk-navbar-item uk-logo">
						<span>{{ logo?.getSiteLogo?.text }}</span>
					</router-link>
				</div>

				<div class="uk-navbar-right uk-hidden@m">
					<a id="btn-menu-toggle" href="#" class="uk-navbar-toggle">
						<span data-uk-navbar-toggle-icon class="eb-icon-menu"></span>
						<span data-uk-icon="close" class="eb-icon-close"></span>
					</a>
				</div>

				<div id="menucollapse" class="eb-menu-toggle-wrapper">
					<div class="uk-navbar-center">
						<ul data-uk-scrollspy-nav="closest: li; scroll: false; offset: 79" class="uk-navbar-nav">
							<li>
								<router-link :to="{ path: '/', hash: '#home' }" class="eb-inner-link">Anasayfa</router-link>
							</li>
							<li>
								<router-link :to="{ path: '/', hash: '#about' }" class="eb-inner-link">Hakkımda</router-link>
							</li>
							<li>
								<router-link :to="{ path: '/', hash: '#resume' }" class="eb-inner-link">Özgeçmiş</router-link>
							</li>
							<li>
								<router-link :to="{ path: '/', hash: '#portfolio' }" class="eb-inner-link">Portföy</router-link>
							</li>
							<li>
								<router-link :to="{ path: '/', hash: '#blog' }" class="eb-inner-link">Blog</router-link>
							</li>
							<li>
								<router-link :to="{ path: '/', hash: '#contact' }" class="eb-inner-link">İletişim</router-link>
							</li>
						</ul>
					</div>

					<div class="uk-navbar-right">
						<AuthNav></AuthNav>
					</div>
				</div>
			</div>
		</nav>
		<!-- end main menu -->
	</header>
	<!-- end main header -->
</template>

<script setup lang="ts">
	import { RouterLink } from "vue-router";
	import { ref, toRefs } from "@vue/reactivity";
	import { inject, onMounted, onUnmounted } from "@vue/runtime-core";
	import { init_menu_toggle, init_inner_link, init_typed } from "@plugins/app-plugins";
	import { TSiteLogo, SiteInjectionKeys, TSiteOwner } from "@models/site";
	import AuthNav from "./layout/AuthNav.vue";
	import type Typed from "typed.js";

	// const site = inject(SiteInjectionKeys.siteKey);
	const owner = inject<TSiteOwner>(SiteInjectionKeys.ownerKey);
	const logo = inject<TSiteLogo>(SiteInjectionKeys.logoKey);

	const props = defineProps<{ isShowHome: boolean }>();

	const isTyped = ref<Typed | null>(null);

	const { isShowHome: isHome } = toRefs(props);

	onMounted(() => {
		const typedData: Array<string> = [...(owner?.getSiteOwner?.info?.titles?.filter((title) => !!title.name).map((title) => title.name!) || [])];
		if (isHome.value) isTyped.value = init_typed(typedData);

		init_menu_toggle();

		init_inner_link();
	});

	onUnmounted(() => {
		if (!!isTyped.value) isTyped?.value?.destroy?.();
	});
</script>

<style lang="scss" scoped></style>