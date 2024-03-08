<template>
	<div class="eb-margin-bottom-2">
		<h3 class="uk-heading-line eb-section-title">
			<span>{{ commentList.length }} Yorum</span>
		</h3>

		<ul v-if="isComments" class="uk-comment-list">
			<li v-for="comment in commentList" :key="comment.id">
				<Comment :comment="comment"></Comment>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
	import { storeToRefs } from "pinia";
	import { ref } from "@vue/reactivity";
	import { onMounted, watch } from "@vue/runtime-core";
	import { useCommentStore, usePostStore } from "@/stores";
	import Comment from "@components/post/Comment.vue";
	import { IComment } from "@models/comment";

	const commentStore = useCommentStore();
	const postStore = usePostStore();

	const { getComments, isComments } = storeToRefs(commentStore);
	const { post, getPost, isPost } = storeToRefs(postStore);

	const commentList = ref<IComment[]>([]);

	watch([() => getPost.value, () => isPost.value], () => {
		if (!!isPost.value) commentStore.getAllByPostId(post.value.data!.id);
	});

	watch([() => getComments.value, () => isComments.value], () => {
		commentList.value = getComments.value || []; //?.map((post: any) => formatPost(post))
	});

	onMounted(async () => {
		if (!!isPost.value) await commentStore.getAllByPostId(post.value.data!.id);
	});
</script>

<style lang="scss" scoped></style>