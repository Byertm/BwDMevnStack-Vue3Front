<template>
	<div>
		<h1 class="eb-section-title">{{ post.title }}</h1>

		<small class="eb-blog-item-meta uk-margin-bottom uk-text-muted uk-text-right">
			<div>
				<span>{{ post.date }}</span>
			</div>

			<div>
				<span>in, {{ post.category }}</span>
			</div>

			<div><span data-uk-icon="user"></span> {{ post?.author }}</div>

			<div><span data-uk-icon="comment"></span> {{ post.comment }}</div>

			<div><span data-uk-icon="heart"></span> {{ post.like }}</div>
		</small>

		<div>
			<img v-if="post.image" :src="post.image" alt="" crossorigin="anonymous" class="eb-img-featured" />
			<img v-else src="/assets/img/blog/02.jpg" alt="" class="eb-img-featured" />
		</div>

		<div class="uk-position-relative">
			<div class="eb-blog-content eb-margin-bottom-2">
				<h3 class="uk-text-bold">{{ post.title }}</h3>

				<div v-html="post.content"></div>
			</div>

			<div class="eb-blog-share">
				<div class="uk-margin-bottom uk-text-muted eb-text-small">Paylaş</div>

				<div>
					<a data-uk-icon="twitter" @click.prevent="social" class="uk-icon-button"></a>
				</div>

				<div>
					<a data-uk-icon="facebook" @click.prevent="social" class="uk-icon-button"></a>
				</div>

				<div>
					<a data-uk-icon="pinterest" @click.prevent="social" class="uk-icon-button"></a>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	// import { IPost } from "@plugins/mixins";
	import { Article } from "@plugins/index";

	const props = defineProps<{ post: Article }>();

	const social = () => {};
</script>

<style scoped></style>