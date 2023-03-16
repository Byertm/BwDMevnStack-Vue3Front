<template>
	<PageLoader></PageLoader>
	<MainHeader :isShowHome="false"></MainHeader>

	<div id="notfound" class="uk-container uk-container-center">
		<div class="uk-grid">
			<div class="uk-width-large-8-10 uk-padding uk-text-center error-404 image404">
				<!-- <h2>The page your looking for don't exists</h2> -->
				<h2>Aradığınız sayfa bulunamadı!</h2>

				<h1>404</h1>

				<router-link :to="{ path: '/' }" title="" class="eb-inner-link uk-display-block">
					<img src="/assets/img/errors/error-404.svg" width="500" height="500" data-uk-img data-src="/assets/img/errors/error-404.svg" alt="not found" class="uk-transition-scale-up uk-transition-opaque" />
				</router-link>

				<div class="uk-margin-bottom">
					<router-link :to="{ path: '/', hash: '#contact' }" class="eb-inner-link eb-btn uk-button uk-button-primary uk-button-large">İletişime Geç</router-link>
					<!-- <router-link :to="{ path: '/' }" title="" class="eb-inner-link uk-display-inline-block">Back to the home page</router-link> -->
				</div>
			</div>
		</div>
	</div>

	<MainFooter></MainFooter>
</template>

<script setup lang="ts">
	import PageLoader from "@components/PageLoader.vue";
	import MainHeader from "@components/MainHeader.vue";
	import MainFooter from "@components/MainFooter.vue";
	import { RouterLink } from "vue-router";
</script>

<style lang="scss" scoped></style>