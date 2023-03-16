<template>
	<section v-if="!isEmptyPosts && !isErrorPosts" id="blog" class="eb-section eb-section-padding">
		<div class="eb-section-point-wrapper">
			<div class="uk-container">
				<div class="eb-section-point">
					<sup>05</sup>
					<span>Blog</span>
				</div>
			</div>
		</div>

		<div class="uk-container">
			<h2 class="eb-section-title uk-heading-line"><span>Son Haberler</span></h2>

			<div data-uk-grid class="uk-grid-medium eb-margin-top-1 eb-margin-bottom-2">
				<div v-for="(post, pIndex) in posts" :key="post.id" :class="{ 'uk-width-2-3@m': pIndex === 0, 'uk-width-1-3@m uk-width-1-2@s': pIndex !== 0 }">
					<Item :post="post" :index="pIndex" :is-list="true"></Item>
				</div>
			</div>

			<h5 class="uk-heading-line uk-text-right uk-text-bold">
				<router-link :to="{ path: '/blog' }" class="uk-link-heading">
					<span>Daha Fazla Gör </span>
					<span data-uk-icon="icon: arrow-right; ratio: 2;"></span>
				</router-link>
			</h5>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { storeToRefs } from "pinia";
	import { RouterLink } from "vue-router";
	import { ref } from "@vue/reactivity";
	import { onMounted, watch } from "@vue/runtime-core";
	import type { Article } from "@plugins/mixins";
	import { formatPost } from "@plugins/mixins";
	import Item from "@components/post/Item.vue";
	import { usePostStore } from "@/stores";

	const postStore = usePostStore();

	const { getPosts, isEmptyPosts, isErrorPosts, isPosts } = storeToRefs(postStore);

	const posts = ref<Article[]>([]);

	const setPostsData = () => {
		posts.value = getPosts.value?.map((post: any) => formatPost(post)) || [];
	};

	watch([() => getPosts.value, () => isPosts.value], () => setPostsData());

	onMounted(async () => {
		if (isEmptyPosts.value) postStore.getAll();

		setPostsData();
	});
</script>

<style scoped></style>