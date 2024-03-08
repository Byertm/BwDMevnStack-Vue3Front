<template>
	<MainHeader :isShowHome="false"></MainHeader>

	<div id="notfound" class="uk-container uk-container-center">
		<div class="uk-grid">
			<div class="uk-width-large-8-10 uk-padding uk-text-center error-404 image404">
				<h1 v-if="!!props?.title">{{ props?.title }}</h1>

				<h2 v-if="!!props?.subTitle">{{ props?.subTitle }}</h2>

				<router-link v-if="!!props?.imageUrl" :to="{ path: '/' }" title="" class="eb-inner-link uk-display-block">
					<img :src="props?.imageUrl" width="500" height="500" data-uk-img :data-src="props?.imageUrl" alt="not found" class="uk-transition-scale-up uk-transition-opaque" />
				</router-link>

				<div v-if="!!props?.backButton?.isVisible" class="uk-margin-bottom">
					<router-link :to="{ path: '/', hash: props?.backButton?.urlHash }" class="eb-inner-link eb-btn uk-button uk-button-primary uk-button-large">{{ props?.backButton?.text }}</router-link>
					<!-- <router-link :to="{ path: '/' }" title="" class="eb-inner-link uk-display-inline-block">Back to the home page</router-link> -->
				</div>
			</div>
		</div>
	</div>

	<MainFooter></MainFooter>
</template>

<script setup lang="ts">
	import { RouterLink } from "vue-router";
	import { provide } from "@vue/runtime-core";
	import { IErrorPage } from "@models/index";
	import { SiteInjectionKeys } from "@models/site";
	import MainHeader from "@components/MainHeader.vue";
	import MainFooter from "@components/MainFooter.vue";
	import { useSiteStore } from "@/stores";

	const siteStore = useSiteStore();

	provide(SiteInjectionKeys.ownerKey, { getSiteOwner: siteStore.getSiteOwner, isSiteOwner: siteStore.isSiteOwner });
	provide(SiteInjectionKeys.logoKey, { getSiteLogo: siteStore.getSiteLogo, isSiteLogo: siteStore.isSiteLogo });

	export interface IErrorPageProps extends IErrorPage {
		id?: string;
	}

	const props = withDefaults(defineProps<Partial<IErrorPageProps>>(), {
		id: "nothingPage",
		title: "404",
		subTitle: "Aradığınız sayfa bulunamadı!",
		imageUrl: "/assets/img/errors/error-404.svg",
		backButton: (_props) => {
			return { text: "İletişime Geç", urlHash: "#contact", isVisible: true };
		}
	});
</script>

<style lang="scss" scoped></style>