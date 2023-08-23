<template>
	<PageLoader></PageLoader>
	<MainHeader :isShowHome="true"></MainHeader>
	<MainSection></MainSection>
	<MainFooter></MainFooter>
</template>

<script setup lang="ts">
	// import { onMounted, onBeforeMount } from "@vue/runtime-core";
	import { onBeforeMount, provide, watch } from "@vue/runtime-core";
	import PageLoader from "@components/PageLoader.vue";
	import MainHeader from "@components/MainHeader.vue";
	import MainSection from "@components/MainSection.vue";
	import MainFooter from "@components/MainFooter.vue";
	// import { gp } from "@plugins/globalProps";
	import { useSiteStore, useSectionStore } from "@/stores";
	import { SiteInjectionKeys } from "@models/site";
	import { storeToRefs } from "pinia";

	// const route = useRoute();
	const siteStore = useSiteStore();
	const sectionStore = useSectionStore();
	const { isSite, isSiteOwner, isSiteLogo, isSiteWebAddress, getSite, getSiteOwner, getSiteLogo, getSiteWebAddress } = storeToRefs(siteStore);
	const { isSection, isSections, getSection, getSections } = storeToRefs(sectionStore);

	watch([() => getSiteWebAddress.value, () => isSiteWebAddress.value], async () => {
		if (!getSiteWebAddress.value) await siteStore.setSiteWebAddress();
		provide(SiteInjectionKeys.siteWebAddressKey, { data: siteStore.getSiteWebAddress });
	});

	watch([() => getSite.value, () => isSite.value], () => {
		provide(SiteInjectionKeys.siteKey, { data: siteStore.getSite });
	});

	watch([() => getSiteOwner.value, () => isSiteOwner.value], () => {
		provide(SiteInjectionKeys.ownerKey, { data: siteStore.getSiteOwner });
	});

	watch([() => getSiteLogo.value, () => isSiteLogo.value], () => {
		provide(SiteInjectionKeys.logoKey, { data: siteStore.getSiteLogo });
	});

	watch([() => getSection.value, () => isSection.value], () => {
		provide(SiteInjectionKeys.sectionKey, { data: sectionStore.getSection });
	});

	watch([() => getSections.value, () => isSections.value], () => {
		provide(SiteInjectionKeys.sectionsKey, { data: sectionStore.getSections });
	});

	const sections: any = [
		{
			key: "hero",
			name: "Hero",
			isVisible: true
		},
		{
			key: "about",
			name: "About",
			isVisible: true
		},
		{
			key: "resume",
			name: "Resume",
			isVisible: true,
			sections: [
				{
					key: "education",
					name: "Education",
					isVisible: true
				},
				{
					key: "experience",
					name: "Experience",
					isVisible: true
				},
				{
					key: "skill",
					name: "Skill",
					isVisible: true
				}
			]
		},
		{
			key: "resume-bar",
			name: "Resume Bar",
			isVisible: true
		},
		{
			key: "portfolio",
			name: "Portfolio",
			isVisible: true,
			sections: [
				{
					key: "work",
					name: "My Works",
					isVisible: true
				},
				{
					key: "pricing",
					name: "Pricing",
					isVisible: false
				},
				{
					key: "testimonial",
					name: "Testimonial",
					isVisible: true
				},
				{
					key: "client",
					name: "Client",
					isVisible: true
				}
			]
		},
		{
			key: "work-bar",
			name: "Work Bar",
			isVisible: true
		},
		{
			key: "blog",
			name: "Blog",
			isVisible: true
		},
		{
			key: "contact",
			name: "Contact",
			isVisible: true
		}
	];

	onBeforeMount(() => {
		if (!isSite.value) siteStore.get();
		if (!isSections.value) sectionStore.get();
		if (!isSiteWebAddress.value) siteStore.setSiteWebAddress();

		provide(SiteInjectionKeys.siteWebAddressKey, { getSiteWebAddress: siteStore.getSiteWebAddress, isSiteWebAddress: siteStore.isSiteWebAddress });
		// provide(SiteInjectionKeys.siteWebAddressKey, siteStore.getSiteWebAddress);
		provide(SiteInjectionKeys.siteKey, { getSite: siteStore.getSite, isSite: siteStore.isSite });
		provide(SiteInjectionKeys.ownerKey, { getSiteOwner: siteStore.getSiteOwner, isSiteOwner: siteStore.isSiteOwner });
		provide(SiteInjectionKeys.logoKey, { getSiteLogo: siteStore.getSiteLogo, isSiteLogo: siteStore.isSiteLogo });
		provide(SiteInjectionKeys.sectionKey, { getSection: sectionStore.getSection, isSection: sectionStore.isSection });
		provide(SiteInjectionKeys.sectionsKey, { getSections: sectionStore.getSections, isSections: sectionStore.isSections });

		console.log("isSite", isSite.value);
		console.log("isSections", isSections.value);
		console.log("isSiteWebAddress", isSiteWebAddress.value);

		// 	gp()?.$bus.$off("event", () => {});
	});

	// onMounted(() => {
	// 	gp()?.$bus.$on("test", (data: any) => {
	// 		alert(data);
	// 	});
	// });
</script>

<style lang="scss" scoped></style>