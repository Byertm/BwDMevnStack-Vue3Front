<template>
	<router-link :to="{ path: `/blog/${post.slug}` }" class="eb-inner-link">
		<div v-if="false" data-uk-img :data-src="post.image + '?not-from-cache-please'" data-attrs="crossorigin: anonymous; width: 1920; height: 1080;" crossorigin="anonymous" class="eb-blog-item uk-background-cover"></div>
		<div class="eb-blog-item">
			<img
				v-if="post.image"
				alt=""
				:src="post.image"
				:width="isList && index === 0 ? '1920' : '760'"
				:height="isList && index === 0 ? '1080' : '640'"
				crossorigin="anonymous"
				class="uk-position-cover uk-height-1-1"
				style="object-fit: cover"
				:style="{ aspectRatio: isList && index === 0 ? '1920 / 1080' : '760 / 640' }" />

			<div class="uk-overlay uk-position-cover"></div>

			<div class="uk-overlay uk-position-top">
				<span v-html="post.category" class="uk-badge"></span>
			</div>

			<div class="uk-overlay uk-position-bottom">
				<h5 class="eb-blog-item-title uk-text-truncate">{{ post.title }}</h5>

				<div class="eb-blog-item-meta">
					<div>
						<span>{{ post.date }}</span>
					</div>

					<div><span data-uk-icon="user"></span> {{ post?.author }}</div>

					<div><span data-uk-icon="comment"></span> {{ post.comment }}</div>

					<!-- <div><span data-uk-icon="heart"></span> {{ post.like }}</div> -->
				</div>
			</div>
		</div>
	</router-link>
</template>

<script setup lang="ts">
	import { IPost } from "@models/post";
	import { Article } from "@plugins/index";
	import { RouterLink } from "vue-router";

	// Note: Article IPost İle değiştirilecek.
	const props = withDefaults(defineProps<{ post: Article; index: number; isList: boolean }>(), { index: 0, isList: false });
</script>

<style scoped></style>