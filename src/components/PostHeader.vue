<template>
	<header id="main-header" class="eb-main-header">
		<!-- main menu -->
		<nav id="main-menu" class="eb-main-menu">
			<div data-uk-navbar class="uk-container">
				<div class="uk-navbar-left">
					<router-link :to="{ path: '/' }" class="eb-logo uk-navbar-item uk-logo"><span>EBiltekin</span></router-link>
					<!-- <a class="eb-logo uk-navbar-item uk-logo" href="light-index.html"><span>EBiltekin</span></a> -->
				</div>

				<div class="uk-navbar-right uk-hidden@m">
					<a id="btn-menu-toggle" href="#" class="uk-navbar-toggle">
						<span data-uk-navbar-toggle-icon class="eb-icon-menu"></span>
						<span data-uk-icon="close" class="eb-icon-close"></span>
					</a>
				</div>

				<div id="menucollapse" class="eb-menu-toggle-wrapper">
					<div class="uk-navbar-center">
						<ul class="uk-navbar-nav">
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
							<li class="--uk-active">
								<router-link :to="{ path: '/blog' }" class="eb-inner-link">Blog</router-link>
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
</template>

<script setup lang="ts">
	import { RouterLink } from "vue-router";
	import { onMounted } from "@vue/runtime-core";
	import { init_menu_toggle, init_inner_link } from "@plugins/app-plugins";
	import AuthNav from "./layout/AuthNav.vue";

	const name = "Register";

	onMounted(() => {
		init_menu_toggle();

		init_inner_link();
	});
</script>

<style lang="scss" scoped></style>