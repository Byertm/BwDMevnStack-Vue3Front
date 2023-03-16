<template>
	<div v-if="isRecommendedPosts" class="eb-margin-bottom-2">
		<h3 class="uk-heading-line eb-section-title">
			<span>Okumak İsterseniz</span>
		</h3>

		<div data-uk-grid class="uk-grid-medium uk-child-width-1-2@s">
			<div v-for="(rPost, rIndex) in recommendedPosts" :key="rPost.id">
				<Item :post="rPost" :index="rIndex" :is-list="false"></Item>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { storeToRefs } from "pinia";
	import { ref } from "@vue/reactivity";
	import { onMounted, watch } from "@vue/runtime-core";
	import type { Article } from "@plugins/mixins";
	import { formatPost } from "@plugins/mixins";
	import { usePostStore } from "@/stores";
	import Item from "./Item.vue";

	const postStore = usePostStore();

	const { getRecommendedPosts, isRecommendedPosts } = storeToRefs(postStore);

	const recommendedPosts = ref<Article[]>([]);

	const setPostsData = () => {
		recommendedPosts.value = getRecommendedPosts.value?.map((post: any) => formatPost(post)) || [];
	};

	watch([() => getRecommendedPosts.value, () => isRecommendedPosts.value], () => setPostsData());

	onMounted(() => {
		postStore.getAllRecommendedPosts();

		setPostsData();
	});
</script>

<style lang="scss" scoped></style>