<template>
	<div class="eb-margin-bottom-1">
		<h3 class="uk-heading-line eb-section-title">
			<span>Lütfen bir cevap bırakın</span>
		</h3>

		<form @submit.prevent="comment" class="uk-form-stacked">
			<div class="uk-margin">
				<label for="i_comment" class="uk-form-label">Yorum*</label>
				<textarea id="i_comment" v-model="commentForm.comment" rows="5" placeholder="Yorumunuzu buraya girebilirsiniz..." required class="uk-textarea uk-border-rounded"></textarea>
			</div>

			<template v-if="isNotAuth">
				<div data-uk-grid="" class="uk-child-width-1-2 uk-grid-small uk-grid">
					<div class="uk-first-column">
						<div class="uk-margin">
							<label for="i_name" class="uk-form-label">Adınız*</label>
							<input id="i_name" v-model="commentForm.name" type="text" placeholder="Adınız" required class="uk-input uk-border-rounded" />
						</div>
					</div>

					<div>
						<div class="uk-margin">
							<label for="i_email" class="uk-form-label">E-Posta*</label>
							<input id="i_email" v-model="commentForm.email" type="text" placeholder="E-Posta adresiniz" required class="uk-input uk-border-rounded" />
						</div>
					</div>
				</div>

				<div class="uk-margin">
					<label for="i_web" class="uk-form-label">Web Site</label>
					<input id="i_web" v-model="commentForm.website" type="text" placeholder="Web site adresiniz" required class="uk-input uk-border-rounded" />
				</div>

				<div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
					<label class="uk-text-small">
						<input v-model="commentForm.remember" type="checkbox" class="uk-checkbox" />
						<small class="uk-margin-small-left">Bir dahaki sefere yorum yaptığımda kullanılmak üzere adımı, e-postamı ve web sitemi bu tarayıcıya kaydet.</small>
					</label>
				</div>
			</template>

			<div>
				<button class="uk-button uk-button-large uk-button-primary eb-btn">
					<span class="uk-margin-small-right uk-margin-small-left">Yorumunu Gönder</span>
					<span data-uk-icon="arrow-right"></span>
				</button>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
	import { computed, reactive } from "@vue/reactivity";
	// import { useRoute } from "vue-router";
	import { useAuthStore, useCommentStore, usePostStore } from "@/stores";
	import { storeToRefs } from "pinia";
	import { IComment } from "@models/comment";

	export interface Props {
		commentId?: string;
	}

	const authStore = useAuthStore();
	const commentStore = useCommentStore();
	const postStore = usePostStore();

	const { isNotAuth } = storeToRefs(authStore);
	// const { isNewComment } = storeToRefs(commentStore);
	const { getPostId } = storeToRefs(postStore);

	const props = withDefaults(defineProps<Props>(), { commentId: undefined });

	const emit = defineEmits<{ (e: "close"): void }>();

	// const route = useRoute();

	// export interface IComment extends IDocument {
	// 	comment: string;
	// 	postId: number;
	// 	createUserId: number;
	// 	updateUserId: number;
	// 	isBanned: boolean;
	// 	isHidden: boolean;
	// 	isActive: boolean;
	// }

	const postId = computed(() => getPostId.value);

	const initialCommentFormStandart = { comment: "", parentId: props.commentId };
	const initialCommentFormExtras = { name: "", email: "", website: "", remember: false };
	const initialCommentForm = isNotAuth.value ? { ...initialCommentFormStandart, ...initialCommentFormExtras } : { ...initialCommentFormStandart, ...initialCommentFormExtras };

	const commentForm = reactive({ ...initialCommentForm });

	const comment = async () => {
		const newComment: Partial<IComment> = { comment: commentForm.comment, postId: postId.value, parentId: props.commentId };
		await commentStore.newComment(newComment);
		commentForm.comment = "";
		commentForm.parentId = props.commentId;
		emit("close");
	};
</script>

<style lang="scss" scoped></style>