<template>
	<div class="eb-margin-bottom-1">
		<h3 class="uk-heading-line eb-section-title">
			<span>Lütfen bir cevap bırakın</span>
		</h3>

		<Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting, resetForm, meta }" class="uk-form-stacked">
			<input id="i_isNotAuth" name="isNotAuth" v-model="isNotAuth" type="hidden" />

			<div class="uk-margin">
				<label for="i_comment" class="uk-form-label">Yorum*</label>
				<Field id="i_comment" name="comment" as="textarea" type="textarea" placeholder="Yorumunuzu buraya girebilirsiniz..." class="eb-input uk-textarea uk-border-rounded" rows="5" :class="{ 'uk-form-danger': errors.comment }" />
				<small class="uk-text-danger err-msg">{{ errors.comment }}</small>
			</div>

			<template v-if="isNotAuth">
				<div data-uk-grid="" class="uk-child-width-1-2 uk-grid-small uk-grid">
					<div class="uk-first-column">
						<div class="uk-margin">
							<label for="i_name" class="uk-form-label">Adınız*</label>
							<Field id="i_name" name="name" type="text" placeholder="Adınız" class="eb-input uk-input uk-border-rounded" :class="{ 'uk-form-danger': errors.name }" />
							<small class="uk-text-danger err-msg">{{ errors.name }}</small>
						</div>
					</div>

					<div>
						<div class="uk-margin">
							<label for="i_email" class="uk-form-label">E-Posta*</label>
							<Field id="i_email" name="email" type="text" placeholder="E-Posta adresiniz" class="eb-input uk-input uk-border-rounded" :class="{ 'uk-form-danger': errors.email }" />
							<small class="uk-text-danger err-msg">{{ errors.email }}</small>
						</div>
					</div>
				</div>

				<div class="uk-margin">
					<label for="i_web" class="uk-form-label">Web Site</label>
					<Field id="i_web" name="website" type="text" placeholder="Web site adresiniz" class="eb-input uk-input uk-border-rounded" :class="{ 'uk-form-danger': errors.website }" />
					<small class="uk-text-danger err-msg">{{ errors.website }}</small>
				</div>

				<div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
					<label class="uk-text-small">
						<Field id="i_remember" name="remember" type="checkbox" :value="true" class="uk-checkbox" />
						<small class="uk-margin-small-left">Bir dahaki sefere yorum yaptığımda kullanılmak üzere adımı, e-postamı ve web sitemi bu tarayıcıya kaydet.</small>
					</label>
					<small class="uk-text-danger err-msg">{{ errors.remember }}</small>
				</div>
			</template>

			<div class="uk-margin-top uk-text-right">
				<button v-if="meta.touched" type="reset" id="btn-contact-form-reset" data-text-reset="Temizle" @click="resetForm()" class="uk-button uk-button-danger uk-button-large eb-btn uk-margin-small-right">
					<span data-uk-icon="trash" class="uk-icon"></span>
					<span class="uk-margin-small-left btn-text-wrap">Temizle</span>
				</button>

				<button type="submit" id="btn-contact-form" data-text-reset="Yorumunu Gönder" :disabled="isSubmitting" class="uk-button uk-button-primary uk-button-large eb-btn">
					<span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
					<span class="uk-margin-small-right btn-text-wrap">Yorumunu Gönder</span>
					<span data-uk-icon="arrow-right" class="uk-icon"></span>
				</button>
			</div>
		</Form>
	</div>
</template>

<script setup lang="ts">
	import { storeToRefs } from "pinia";
	import { bool, object, string } from "yup";
	import { Form, Field } from "vee-validate";
	import { computed } from "@vue/reactivity";
	import { useAuthStore, useCommentStore, usePostStore } from "@/stores";
	import { IComment } from "@models/comment";
	import { emailRegex } from "@models/user";

	export interface Props {
		commentId?: string;
	}

	const authStore = useAuthStore();
	const commentStore = useCommentStore();
	const postStore = usePostStore();

	const { isNotAuth } = storeToRefs(authStore);
	const { getPostId } = storeToRefs(postStore);

	const props = withDefaults(defineProps<Props>(), { commentId: undefined });

	const emit = defineEmits<{ (e: "close"): void }>();

	const schema = object().shape({
		comment: string().required("Yorumunuzu giriniz").min(10, "Yorumunuz, minimum 10 karakter olmalıdır"),
		isNotAuth: bool().default(isNotAuth.value),
		name: string().when("isNotAuth", {
			is: true,
			then: (schema) => schema.min(5).required("Ad alanı gereklidir"),
			otherwise: (schema) => schema.min(0).nullable().optional().default("")
		}),
		email: string().when("isNotAuth", {
			is: true,
			then: (schema) => schema.required("E-posta alanı gereklidir").email("Geçerli bir e-posta adresi giriniz.").matches(emailRegex, { message: "Lütfen bilindik bir e-posta sağlayıcısı kullanın." }),
			otherwise: (schema) => schema.nullable().optional().default("")
		}),
		website: string().when("isNotAuth", {
			is: true,
			then: (schema) => schema.min(5).required("Web site alanı gereklidir"),
			otherwise: (schema) => schema.min(0).nullable().optional().default("")
		}),
		remember: bool().when("isNotAuth", {
			is: true,
			then: (schema) => schema.nullable().required().default(true),
			otherwise: (schema) => schema.nullable().optional().default(false)
		})
	});

	const postId = computed(() => getPostId.value);

	const onSubmit = async (values: any, { resetForm }: any) => {
		const { comment, name, email, website, remember } = values;

		console.log({ values });

		// Note: Burada kayıt yaptırılabilir.
		if (!isNotAuth.value) console.log({ name, email, website, remember });

		const newComment: Partial<IComment> = { comment, postId: postId.value, parentId: props.commentId };
		await commentStore.newComment(newComment);
		resetForm();
		emit("close");
	};
</script>

<style lang="scss" scoped></style>