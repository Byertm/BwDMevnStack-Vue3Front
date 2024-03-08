<template>
	<PostHeader :isShowHome="true"></PostHeader>

	<main class="eb-main-content">
		<div uk-height-viewport class="uk-section uk-flex uk-flex-middle uk-animation-fade">
			<div class="uk-width-1-1">
				<div class="uk-container">
					<div uk-grid class="uk-grid-margin uk-grid uk-grid-stack">
						<div class="uk-width-1-1@m">
							<div class="uk-margin uk-width-large uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large">
								<h3 class="uk-card-title uk-text-center">Welcome back!</h3>

								<!-- <div uk-alert class="uk-alert-primary">
									<a uk-close class="uk-alert-close"></a>
									<p><strong>Username: </strong>test <strong>Password: </strong>test</p>
								</div> -->

								<Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
									<div class="uk-margin">
										<div class="uk-inline uk-width-1-1">
											<!-- <label>Email</label> -->
											<span uk-icon="icon: mail" class="uk-form-icon"></span>
											<Field name="email" type="text" placeholder="Email" class="uk-input uk-form-large" :class="{ 'uk-form-danger': errors.email }" />
										</div>
										<small class="uk-text-danger err-msg">{{ errors.email }}</small>
									</div>

									<div class="uk-margin">
										<div class="uk-inline uk-width-1-1">
											<!-- <label>Username</label> -->
											<span uk-icon="icon: user" class="uk-form-icon"></span>
											<Field name="username" type="text" placeholder="Username" class="uk-input uk-form-large" :class="{ 'uk-form-danger': errors.username }" />
										</div>
										<small class="uk-text-danger err-msg">{{ errors.username }}</small>
									</div>

									<div class="uk-margin">
										<div class="uk-inline uk-width-1-1">
											<!-- <label>FirstName</label> -->
											<span uk-icon="icon: user" class="uk-form-icon"></span>
											<Field name="firstName" type="text" placeholder="First Name" class="uk-input uk-form-large" :class="{ 'uk-form-danger': errors.firstName }" />
										</div>
										<small class="uk-text-danger err-msg">{{ errors.firstName }}</small>
									</div>

									<div class="uk-margin">
										<div class="uk-inline uk-width-1-1">
											<!-- <label>LastName</label> -->
											<span uk-icon="icon: user" class="uk-form-icon"></span>
											<Field name="lastName" type="text" placeholder="Last Name" class="uk-input uk-form-large" :class="{ 'uk-form-danger': errors.lastName }" />
										</div>
										<small class="uk-text-danger err-msg">{{ errors.lastName }}</small>
									</div>

									<div class="uk-margin">
										<div class="uk-inline uk-width-1-1">
											<!-- <label>Password</label> -->
											<span uk-icon="icon: lock" class="uk-form-icon"></span>
											<Field name="password" type="password" placeholder="Password" class="uk-input uk-form-large" :class="{ 'uk-form-danger': errors.password }" />
										</div>
										<small class="uk-text-danger err-msg">{{ errors.password }}</small>
									</div>

									<div class="uk-margin">
										<button :disabled="isSubmitting" class="uk-button uk-button-primary uk-button-large uk-width-1-1">
											<span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span> <span>Register</span>
										</button>
									</div>

									<!-- <div class="uk-text-small uk-text-center">
										Not registered? <router-link :to="{ path: '/register' }" class="uk-link-reset"><span>Create an account</span></router-link>
									</div> -->

									<div v-if="errors.apiError" uk-alert class="uk-alert-danger">
										<a uk-close class="uk-alert-close"></a>
										<p>{{ errors.apiError }}</p>
									</div>
								</Form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>

	<PostFooter></PostFooter>
</template>

<script setup lang="ts">
	import { onBeforeMount } from "@vue/runtime-core";
	import { useRoute, useRouter } from "vue-router";
	import { Form, Field } from "vee-validate";
	import { storeToRefs } from "pinia";
	import { object, string } from "yup";
	import PostHeader from "@components/PostHeader.vue";
	import PostFooter from "@components/PostFooter.vue";
	import { emailRegex } from "@models/user";
	import { useAuthStore } from "@/stores";

	const route = useRoute();
	const router = useRouter();

	const authStore = useAuthStore();
	const { isLogged } = storeToRefs(authStore);

	const schema = object().shape({
		email: string().matches(emailRegex, { message: "Lütfen bilindik bir e-posta sağlayıcısı kullanın." }).required("E-posta giriniz").email("Geçerli bir e-posta adresi giriniz."),
		firstName: string().required("Adınızı giriniz").min(3, "Adınız, minimum 3 karakter olmalıdır"),
		lastName: string().required("Soyadınızı giriniz").min(2, "Soyadınız, minimum 2 karakter olmalıdır"),
		username: string().required("Kullanıcı adınızı giriniz").min(6, "Kullanıcı adınız, minimum 6 karakter olmalıdır"),
		password: string().required("Bir parola giriniz").min(8, "Şifreniz, minimum 8 karakter olmalıdır")
	});

	function onSubmit(values: any, { setErrors, resetForm }: any) {
		const authStore = useAuthStore();
		const { email, username, firstName, lastName, password } = values;

		resetForm();
		return authStore.register(email, username, firstName, lastName, password).catch((error) => setErrors({ apiError: error }));
	}

	onBeforeMount(() => {
		if (isLogged.value) router.push((route?.query?.returnUrl as string | undefined) || authStore.returnUrl || "/");
	});
</script>

<style lang="scss" scoped>
	.uk-light {
		.uk-input,
		.uk-select,
		.uk-textarea {
			color: #333333;
			border-color: #e5e5e5;
			// border: 1px solid #e5e5e5;

			&::placeholder {
				color: #e5e5e5;
			}
		}

		.uk-form-icon {
			color: #333333;
		}
	}
</style>