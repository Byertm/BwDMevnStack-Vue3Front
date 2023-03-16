<template>
	<!-- main section -->
	<main class="eb-main-content">
		<!-- about section -->
		<SAbout></SAbout>
		<!-- end about section -->

		<!-- resume section -->
		<SResume></SResume>
		<!-- end resume section -->

		<!-- portfolio section -->
		<SPortfolio></SPortfolio>
		<!-- end portfolio section -->

		<!-- blog section -->
		<SBlog></SBlog>
		<!-- end blog section -->

		<!-- contact section -->
		<SContact></SContact>
		<!-- end contact section -->
	</main>
	<!-- end main section -->
</template>

<script setup lang="ts">
	import SAbout from "@components/main/About.vue";
	import SResume from "@components/main/Resume.vue";
	import SBlog from "@components/main/Blog.vue";
	import SPortfolio from "@components/main/Portfolio.vue";
	import SContact from "@components/main/Contact.vue";
	import { inject, onBeforeMount } from "@vue/runtime-core";
	// import { useSectionStore } from "@/stores";
	// import { storeToRefs } from "pinia";

	import { SiteInjectionKeys } from "@models/site";

	const sections = inject(SiteInjectionKeys.sectionsKey);

	// const sectionStore = useSectionStore();
	// const { getSection } = storeToRefs(sectionStore);

	onBeforeMount(() => {
		console.log("sections", sections);
	});
</script>