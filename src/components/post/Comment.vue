<template>
	<div class="eb-margin-bottom-1">
		<article tabindex="-1" class="uk-comment uk-visible-toggle">
			<header class="uk-comment-header uk-position-relative">
				<div data-uk-grid="" class="uk-grid-medium uk-flex-middle uk-grid">
					<div class="uk-width-auto uk-first-column">
						<img src="/assets/img/people/01.jpg" width="80" height="80" alt="" class="uk-comment-avatar uk-border-circle" />
					</div>

					<div class="uk-width-expand">
						<h4 class="uk-comment-title uk-margin-remove">
							<router-link to="/#" class="uk-link-reset">{{ comment.author?.name }}</router-link>
						</h4>

						<p class="uk-comment-meta uk-margin-remove-top">
							<router-link to="/#" class="uk-link-reset">{{ comment.createdAt }}</router-link>
						</p>
					</div>
				</div>

				<div class="uk-position-top-right uk-position-small uk-hidden-hover">
					<a @click.prevent="showAnswerComment" class="uk-link-muted">Cevap ver</a>
				</div>
			</header>

			<div class="uk-comment-body">
				<p>{{ comment.comment }}</p>
			</div>
		</article>

		<template v-if="isShowNewComment">
			<NewComment :comment-id="comment.id" @close="hideAnswerComment" class="uk-width-5-6 uk-margin-auto-left"></NewComment>
		</template>

		<template v-if="isChildren">
			<ul class="uk-comment-list">
				<li v-for="childComment in comment.children" :key="comment.id">
					<Comment :comment="childComment"></Comment>
				</li>
			</ul>
		</template>
	</div>
</template>

<script setup lang="ts">
	import { computed, ref } from "@vue/reactivity";
	import { IComment } from "@models/comment";
	import NewComment from "@components/post/NewComment.vue";

	const props = defineProps<{ comment: IComment }>();

	const isChildren = computed(() => props.comment?.children?.length);

	const isShowNewComment = ref(false);

	const showAnswerComment = () => {
		isShowNewComment.value = !isShowNewComment.value;
	};

	const hideAnswerComment = () => {
		isShowNewComment.value = false;
	};
</script>

<style lang="scss" scoped></style>