<template>
	<!-- main section -->
	<main class="eb-main-content">
		<section>
			<div class="eb-section-point-wrapper">
				<div class="uk-container">
					<div class="eb-section-point">
						<span>Blog</span>
					</div>
				</div>
			</div>

			<div class="uk-container">
				<div data-uk-grid class="uk-grid-divider">
					<div class="uk-width-3-4@m eb-section-padding">
						<h1 class="eb-section-title uk-heading-line">
							<span>{{ title }}</span>
						</h1>

						<div data-uk-grid class="uk-grid-medium uk-child-width-1-2@s uk-margin-medium-top">
							<div v-for="(article, aIndex) in articles" :key="article.id" :class="{ 'uk-width-1-1': aIndex === 0, 'uk-width-2-3@m': aIndex === 0, 'uk-width-1-3@m uk-width-1-2@s': aIndex !== 0 }">
								<Item :post="article" :index="aIndex" :is-list="true"></Item>
							</div>
						</div>

						<div v-if="false" class="uk-margin-bottom uk-margin-large-top">
							<ul class="eb-paggination uk-pagination uk-flex-center">
								<li>
									<a href="#"><span data-uk-pagination-previous></span></a>
								</li>
								<li class="uk-active"><a href="#">1</a></li>
								<li><a href="#">2</a></li>
								<li><a href="#">3</a></li>
								<li><a href="#">4</a></li>
								<li class="uk-disabled"><span>. . .</span></li>
								<li><a href="#">24</a></li>
								<li>
									<a href="#"><span data-uk-pagination-next></span></a>
								</li>
							</ul>
						</div>
					</div>

					<CS_Sidebar></CS_Sidebar>
				</div>
			</div>
		</section>
	</main>
	<!-- end main section -->
</template>

<script setup lang="ts">
	import { storeToRefs } from "pinia";
	import { useRoute } from "vue-router";
	import { computed, ref } from "@vue/reactivity";
	import { onMounted, watch } from "@vue/runtime-core";
	import Item from "@components/post/Item.vue";
	import CS_Sidebar from "@/components/sidebar/Sidebar.vue";
	import type { Article } from "@plugins/mixins";
	import { formatPost } from "@plugins/mixins";
	import { usePostStore } from "@/stores";

	const route = useRoute();
	const postStore = usePostStore();

	const { getTagPosts, isTagPosts } = storeToRefs(postStore);

	const articles = ref<Article[]>([]);

	const title = computed(() => `"${route.params.slug}" ile ilgili son makaleler`);

	const setPostsData = () => {
		articles.value = getTagPosts.value?.map((post: any) => formatPost(post)) || [];
	};

	watch([() => getTagPosts.value, () => isTagPosts.value], () => setPostsData());

	onMounted(async () => {
		if (isTagPosts.value) {
			await postStore.getAllByTag(<string>route?.params?.slug);

			setPostsData();
		}
	});
</script>

<style lang="scss" scoped></style>