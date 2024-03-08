<template>
	<main v-if="isPost && !!post" class="eb-main-content">
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
	import { watch, onMounted } from "@vue/runtime-core";
	import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
	import RecommendedPost from "@components/post/RecommendedPost.vue";
	import CS_Sidebar from "@/components/sidebar/Sidebar.vue";
	import NewComment from "@components/post/NewComment.vue";
	import Comments from "@components/post/Comments.vue";
	import Detail from "@components/post/Detail.vue";
	import type { Article } from "@plugins/mixins";
	import { formatPost } from "@plugins/mixins";
	import { usePostStore, useSiteStore } from "@/stores";
	// import { SiteInjectionKeys } from "@models/site";

	const route = useRoute();
	const router = useRouter();

	const postStore = usePostStore();
	const siteStore = useSiteStore();

	const { post: postAllInfo, getPost, isPost, isEmptyPost, getPosts, isPosts, getRecommendedPosts, isRecommendedPosts } = storeToRefs(postStore);
	const { getSiteWebAddress, isSiteWebAddress } = storeToRefs(siteStore);

	const post = ref<Article | null>(null);
	const posts = ref<Article[]>([]);
	const recommendedPosts = ref<Article[]>([]);

	// const siteWebAddress = inject<any>(SiteInjectionKeys.siteWebAddressKey);

	let slug: string = "";

	watch([() => getPost.value, () => isPost.value], () => {
		// console.log({ getPost: getPost.value, isPost: isPost.value });
		if (!!isPosts.value && !isEmptyPost.value) post.value = formatPost(getPost.value) || null;
	});

	watch([() => getPosts.value, () => isPosts.value], () => {
		posts.value = getPosts.value?.map((post: any) => formatPost(post)) || [];
	});

	watch([() => getRecommendedPosts.value, () => isRecommendedPosts.value], () => {
		recommendedPosts.value = getRecommendedPosts.value?.map((post: any) => formatPost(post)) || [];
	});

	onBeforeRouteLeave(async (to, from) => {
		// console.log({ to, from, getSiteWebAddress: getSiteWebAddress.value });
		if (to.params.slug && to.params.slug !== from.params.slug) {
			slug = <string>to?.params?.slug;
			if (!!slug) await postStore.getBySlug(slug);
		}
		// else if (!to.params.slug && getSiteWebAddress.value?.startsWith?.(location.origin)) {
		// 	// && !to.fullPath.startsWith(location.origin)
		// 	const answer = window.confirm("Do you really want to leave? you have unsaved changes!");
		// 	// Cancel the navigation and stay on the same page
		// 	if (!answer) return false;
		// }
	});

	onBeforeRouteUpdate(async (to, from) => {
		if (to.params.slug !== from.params.slug) {
			slug = <string>to?.params?.slug;
			if (!!slug) await postStore.getBySlug(slug);
		}
	});

	onMounted(async () => {
		slug = <string>route?.params?.slug;
		await postStore.getBySlug(slug);

		if (!isSiteWebAddress.value) siteStore.setSiteWebAddress();

		// if (!isPost.value) router.push({ path: "/error" });
		if (!isPost.value) router.push({ name: "error", params: { title: "test", subTitle: "test test" } });
	});
</script>

<style lang="scss" scoped></style>