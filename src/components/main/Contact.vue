<template>
	<section id="contact" class="eb-section eb-border-top">
		<div class="eb-section-point-wrapper">
			<div class="uk-container">
				<div class="eb-section-point">
					<sup>06</sup>
					<span>İletişim</span>
				</div>
			</div>
		</div>

		<div class="uk-container">
			<div data-uk-grid class="uk-grid-divider">
				<div class="eb-section-padding eb-contact-left uk-width-3-4@m">
					<div>
						<h2 class="eb-section-title uk-heading-line">
							<span>İletişime Geç</span>
						</h2>

						<p class="uk-text-bold">Benimle iletişime geçmekten çekinmeyin</p>

						<div id="contact-form-alert"></div>

						<Form id="contact-form" @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting, resetForm, meta }" class="uk-form-stacked">
							<div class="uk-grid uk-grid-small uk-child-width-1-2@s">
								<div>
									<div class="uk-margin">
										<label for="f_fullname" class="uk-form-label">Adınız Soyadınız *</label>
										<div class="uk-form-controls uk-inline uk-width-1-1">
											<span data-uk-icon="icon: user" class="uk-form-icon"></span>
											<Field id="f_fullname" name="name" type="text" class="eb-input uk-input uk-border-rounded" :class="{ 'uk-form-danger': errors.name }" />
										</div>
										<small class="uk-text-danger err-msg">{{ errors.name }}</small>
									</div>
								</div>

								<div>
									<div class="uk-margin">
										<label for="f_email" class="uk-form-label">E-Posta *</label>
										<div class="uk-form-controls uk-inline uk-width-1-1">
											<span data-uk-icon="icon: google" class="uk-form-icon"></span>
											<Field id="f_email" name="email" type="text" class="eb-input uk-input uk-border-rounded" :class="{ 'uk-form-danger': errors.email }" />
										</div>
										<small class="uk-text-danger err-msg">{{ errors.email }}</small>
									</div>
								</div>

								<div>
									<div class="uk-margin">
										<label for="f_phone" class="uk-form-label">Telefon *</label>
										<div class="uk-form-controls uk-inline uk-width-1-1">
											<span data-uk-icon="icon: receiver" class="uk-form-icon"></span>
											<Field id="f_phone" name="phone" type="text" class="eb-input uk-input uk-border-rounded" :class="{ 'uk-form-danger': errors.phone }" />
										</div>
										<small class="uk-text-danger err-msg">{{ errors.phone }}</small>
									</div>
								</div>
							</div>

							<div class="uk-margin">
								<label class="uk-form-label">Konu *</label>
								<div class="uk-form-controls uk-grid-small uk-child-width-auto uk-grid">
									<label for="iSubjectGeneral">
										<Field id="iSubjectGeneral" name="subject" type="radio" value="Genel" class="uk-radio" />
										Genel
									</label>
									<label for="iSubjectProject">
										<Field id="iSubjectProject" name="subject" type="radio" value="Proje Gözden Geçirmek" class="uk-radio" />
										Proje Gözden Geçirmek
									</label>
									<label for="iSubjectFriend">
										<Field id="iSubjectFriend" name="subject" type="radio" value="Sadece Tanışmak" class="uk-radio" />
										Sadece Tanışmak
									</label>
								</div>
								<small class="uk-text-danger err-msg">{{ errors.subject }}</small>
							</div>

							<div class="uk-margin">
								<label for="f_message" class="uk-form-label">Mesaj*</label>
								<div class="uk-form-controls">
									<Field id="f_message" name="message" as="textarea" type="textarea" class="eb-input uk-textarea uk-border-rounded" rows="7" :class="{ 'uk-form-danger': errors.message }" />
								</div>
								<small class="uk-text-danger err-msg">{{ errors.message }}</small>
							</div>

							<div class="uk-margin-top uk-text-right">
								<button v-if="meta.touched" type="reset" id="btn-contact-form-reset" data-textreset="Temizle" @click="resetForm()" class="uk-button uk-button-danger uk-button-large eb-btn uk-margin-small-right">
									<span data-uk-icon="trash" class="uk-icon"></span>
									<span class="uk-margin-small-left btn-text-wrap">Temizle</span>
								</button>

								<button type="submit" id="btn-contact-form" data-textreset="Şimdi Gönder" :disabled="isSubmitting" class="uk-button uk-button-primary uk-button-large eb-btn">
									<span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
									<span class="uk-margin-small-right btn-text-wrap">Şimdi Gönder</span>
									<span data-uk-icon="arrow-right" class="uk-icon"></span>
								</button>
							</div>
						</Form>
					</div>
				</div>

				<div class="uk-width-1-4@m eb-section-padding eb-contact-right">
					<p class="uk-margin-medium-bottom uk-visible@m">
						<!-- src="/assets/img/empty.png" -->
						<img
							ref="target"
							:src="getApiImageByImageUrl(owner?.getSiteOwner.info?.about?.imageUrl || null)"
							:data-src="getApiImageByImageUrl(owner?.getSiteOwner.info?.about?.imageUrl || null)"
							crossorigin="anonymous"
							width="500"
							height="500"
							data-uk-img
							alt=""
							class="uk-border-circle"
							:style="{ transform: cardTransform, transition: 'transform 0.25s ease-out' }" />
					</p>

					<ul class="uk-list uk-list-divider uk-text-small eb-contact-mini">
						<li class="uk-flex uk-flex-middle">
							<span data-uk-icon="mail" class="uk-flex-none uk-text-primary"></span>
							<span>ersin.biltekin@hotmail.com</span>
						</li>
						<li class="uk-flex uk-flex-middle">
							<span data-uk-icon="phone" class="uk-flex-none uk-text-primary"></span>
							<span>+90-538-488-8269</span>
						</li>
						<li class="uk-flex uk-flex-middle">
							<span data-uk-icon="location" class="uk-flex-none uk-text-primary"></span>
							<span>Başıbüyük / Maltepe / İstanbul</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { object, string } from "yup";
	import { Form, Field } from "vee-validate";
	import { inject } from "@vue/runtime-core";
	import { ref, computed } from "@vue/reactivity";
	import { useMouseInElement } from "@vueuse/core";
	import { ContactFormValues, SiteInjectionKeys, TSiteLogo, TSiteOwner } from "@models/site";
	import { getApiImageByImageUrl } from "@plugins/mixins";
	import { emailRegex } from "@models/user";
	import { useAuthStore } from "@/stores";
	import toast from "@plugins/toast";

	const owner = inject<TSiteOwner>(SiteInjectionKeys.ownerKey);
	const logo = inject<TSiteLogo>(SiteInjectionKeys.logoKey);

	const schema = object().shape({
		name: string().required("Ad ve soyad giriniz"),
		email: string().matches(emailRegex, { message: "Lütfen bilindik bir e-posta sağlayıcısı kullanın." }).required("E-posta giriniz").email("Geçerli bir e-posta adresi giriniz."),
		phone: string().required("Telefon numarası giriniz"),
		subject: string().required("Konu seçiniz"),
		message: string().required("Mesajınızı giriniz").min(10, "Mesajınız, minimum 10 karakter olmalıdır")
	});

	const target = ref(null);
	const authStore = useAuthStore();
	const { elementX, elementY, isOutside, elementHeight, elementWidth } = useMouseInElement(target);

	// Todo: Bunu generic hale nasıl getiririz düşünülecek.
	const cardTransform = computed(() => {
		const MAX_ROTATION = 26;
		const rX = (MAX_ROTATION / 2 - (elementY.value / elementHeight.value) * MAX_ROTATION).toFixed(2);
		const rY = ((elementX.value / elementWidth.value) * MAX_ROTATION - MAX_ROTATION / 2).toFixed(2);
		return isOutside.value ? "" : `perspective(${elementWidth.value}px) rotateX(${rX}deg) rotateY(${rY}deg)`;
	});

	const onSubmit = (values: any, { resetForm }: any) => {
		authStore
			.contact(values as ContactFormValues)
			.then((data: unknown) => {
				console.log(JSON.stringify(data, null, 2));
				toast({ message: `<span uk-icon='icon: check'></span> Formunuz başarıyla gönderildi, kısa zamanda bir cevap yazacağım. Sağlıcakla kalın. :)`, status: "success" });
			})
			.catch((error) => error && toast({ message: `<span uk-icon='icon: refresh'></span> E-Posta gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.`, status: "danger" }))
			.finally(() => resetForm());
	};
</script>

<style scoped></style>