<template>
	<div class="uk-width-1-4@m eb-section-padding">
		<CS_Search></CS_Search>

		<CS_AboutMe></CS_AboutMe>

		<CS_MRA></CS_MRA>

		<CS_Categories></CS_Categories>

		<CS_Tags></CS_Tags>

		<CS_Subcribe></CS_Subcribe>
	</div>
</template>

<script setup lang="ts">
	import CS_Search from "@/components/sidebar/Search.vue";
	import CS_AboutMe from "@/components/sidebar/AboutMe.vue";
	import CS_MRA from "@/components/sidebar/MustReadArticles.vue";
	import CS_Categories from "@/components/sidebar/Categories.vue";
	import CS_Tags from "@/components/sidebar/Tags.vue";
	import CS_Subcribe from "@/components/sidebar/Subcribe.vue";
</script>

<style scoped></style>