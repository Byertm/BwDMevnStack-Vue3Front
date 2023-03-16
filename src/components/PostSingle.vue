<template>
	<main class="eb-main-content">
		<section>
			<div class="eb-section-point-wrapper">
				<div class="uk-container">
					<div class="eb-section-point">
						<span v-if="postAllInfo.loading">Blog Detail</span>
						<span v-if="!postAllInfo.loading">{{ post.title }}</span>
					</div>
				</div>
			</div>

			<div class="uk-container">
				<div data-uk-grid class="uk-grid-divider">
					<div v-if="!postAllInfo.loading && isPost" class="uk-width-3-4@m eb-section-padding">
						<Detail :post="post"></Detail>

						<Comments></Comments>

						<NewComment></NewComment>

						<RecommendedPost></RecommendedPost>
					</div>

					<CS_Sidebar></CS_Sidebar>
				</div>
			</div>
		</section>
	</main>
</template>

<script setup lang="ts">
	import { storeToRefs } from "pinia";
	import { ref } from "@vue/reactivity";
	import { onMounted, watch } from "@vue/runtime-core";
	import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from "vue-router";
	import CS_Sidebar from "@/components/sidebar/Sidebar.vue";
	import RecommendedPost from "./post/RecommendedPost.vue";
	import NewComment from "@components/post/NewComment.vue";
	import Comments from "@components/post/Comments.vue";
	import Detail from "@components/post/Detail.vue";
	import type { Article } from "@plugins/mixins";
	import { formatPost } from "@plugins/mixins";
	import { usePostStore } from "@/stores";

	const route = useRoute();

	const postStore = usePostStore();

	const { post: postAllInfo, getPost, isPost, getPosts, isPosts, getRecommendedPosts, isRecommendedPosts } = storeToRefs(postStore);

	const post = ref<Article>({} as Article);
	const posts = ref<Article[]>([]);
	const recommendedPosts = ref<Article[]>([]);

	let slug: string = "";

	watch([() => getPost.value, () => isPost.value], () => {
		post.value = formatPost(getPost.value) || ({} as Article);
	});

	watch([() => getPosts.value, () => isPosts.value], () => {
		posts.value = getPosts.value?.map((post: any) => formatPost(post)) || [];
	});

	watch([() => getRecommendedPosts.value, () => isRecommendedPosts.value], () => {
		recommendedPosts.value = getRecommendedPosts.value?.map((post: any) => formatPost(post)) || [];
	});

	onBeforeRouteLeave(async (to, from) => {
		if (to.params.slug && to.params.slug !== from.params.slug) {
			slug = <string>route?.params?.slug;
			await postStore.getBySlug(slug);
		}
		// else if (!to.params.slug && !to.fullPath.startsWith(location.origin)) {
		// 	const answer = window.confirm("Do you really want to leave? you have unsaved changes!");
		// 	// Cancel the navigation and stay on the same page
		// 	if (!answer) return false;
		// }
	});

	onBeforeRouteUpdate(async (to, from) => {
		if (to.params.slug !== from.params.slug) {
			slug = <string>route?.params?.slug;
			// if (typeof postAllInfo?.value?.loading === "boolean")
			await postStore.setDefaultPost();
			await postStore.getBySlug(slug);
		}
	});

	onMounted(async () => {
		slug = <string>route?.params?.slug;
		await postStore.getBySlug(slug);
	});
</script>

<style lang="scss" scoped></style>