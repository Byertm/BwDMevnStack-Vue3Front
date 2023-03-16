<template>
	<div v-if="isPosts" class="eb-sidebar-item">
		<h6 class="uk-text-bold uk-heading-line">
			<router-link :to="{ path: '/blog' }" class="uk-link-heading"><span>Okunması Gereken Makaleler</span></router-link>
		</h6>

		<ul class="uk-list uk-list-divider">
			<li v-for="p in posts" :key="p.id">
				<router-link :to="{ path: `/blog/${p.slug}` }" class="eb-text-small uk-link-reset">
					<div class="uk-flex">
						<div class="eb-width-1">
							<img v-if="p.image" :src="p.image" :alt="p.title" crossorigin="anonymous" class="uk-border-rounded" />
							<img v-else src="/assets/img/blog/01.jpg" :alt="p.title" class="uk-border-rounded" />
						</div>

						<div class="uk-width-expand uk-margin-small-left">
							<div class="uk-text-bold">{{ p.title }}</div>
							<span class="uk-text-muted">{{ p.date }}</span>
						</div>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
	import { storeToRefs } from "pinia";
	import { ref } from "@vue/reactivity";
	import { RouterLink } from "vue-router";
	import { onMounted, watch } from "@vue/runtime-core";
	import type { Article } from "@plugins/mixins";
	import { formatPost } from "@plugins/mixins";
	import { usePostStore } from "@/stores";

	const postStore = usePostStore();

	const { getPosts, isEmptyPosts, isErrorPosts, isPosts } = storeToRefs(postStore);

	const posts = ref<Article[]>([]);

	const setPostsData = () => {
		posts.value = getPosts.value?.map((post: any) => formatPost(post)) || [];
	};

	watch([() => getPosts.value, () => isPosts.value], () => setPostsData());

	onMounted(async () => {
		if (isEmptyPosts.value) await postStore.getAll();

		setPostsData();
	});
</script>

<style lang="scss" scoped></style>