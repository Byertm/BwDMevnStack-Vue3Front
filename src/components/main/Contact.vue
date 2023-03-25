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

						<form id="contact-form" @submit.prevent="contact" class="uk-form-stacked">
							<div class="uk-grid uk-grid-small uk-child-width-1-2@s">
								<div>
									<div class="uk-margin">
										<label for="f_fullname" class="uk-form-label">Adınız Soyadınız*</label>
										<div class="uk-form-controls uk-inline uk-width-1-1">
											<span data-uk-icon="icon: user" class="uk-form-icon"></span>
											<input type="text" v-model="contactForm.name" id="f_fullname" name="f_fullname" placeholder="Adınızı ve soyadınızı giriniz..." class="eb-input uk-input uk-border-rounded" />
										</div>
										<small class="uk-text-danger err-msg" id="f_fullname_error"></small>
									</div>
								</div>

								<div>
									<div class="uk-margin">
										<label for="f_email" class="uk-form-label">E-Posta*</label>
										<div class="uk-form-controls uk-inline uk-width-1-1">
											<span data-uk-icon="icon: user" class="uk-form-icon"></span>
											<input type="email" v-model="contactForm.email" id="f_email" name="f_email" placeholder="E-Posta adresinizi giriniz..." class="eb-input uk-input uk-border-rounded" />
										</div>
										<small class="uk-text-danger err-msg" id="f_email_error"></small>
									</div>
								</div>

								<div>
									<div class="uk-margin">
										<label for="f_phone" class="uk-form-label">Telefon*</label>
										<div class="uk-form-controls uk-inline uk-width-1-1">
											<span data-uk-icon="icon: phone" class="uk-form-icon"></span>
											<input type="text" v-model="contactForm.phone" id="f_phone" name="f_phone" placeholder="Telefon numaranızı giriniz..." class="eb-input uk-input uk-border-rounded" />
										</div>
										<small class="uk-text-danger err-msg" id="f_phone_error"></small>
									</div>
								</div>
							</div>

							<div class="uk-margin">
								<label class="uk-form-label">Konu*</label>
								<div class="uk-form-controls uk-grid-small uk-child-width-auto uk-grid">
									<label>
										<input type="radio" v-model="contactForm.subject" name="f_subject" value="Genel" checked class="uk-radio" />
										Genel
									</label>
									<label>
										<input type="radio" v-model="contactForm.subject" name="f_subject" value="Proje Gözden Geçirmek" class="uk-radio" />
										Proje Gözden Geçirmek
									</label>
									<label>
										<input type="radio" v-model="contactForm.subject" name="f_subject" value="Sadece Tanışmak" class="uk-radio" />
										Sadece Tanışmak
									</label>
								</div>
							</div>

							<div class="uk-margin">
								<label for="f_message" class="uk-form-label">Mesaj*</label>
								<div class="uk-form-controls">
									<textarea id="f_message" v-model="contactForm.message" name="f_message" rows="7" placeholder="Mesajınızı yazınız..." class="eb-input uk-textarea uk-border-rounded"></textarea>
								</div>
								<small id="f_message_error" class="uk-text-danger err-msg"></small>
							</div>

							<div class="uk-margin-top">
								<button type="submit" id="btn-contact-form" data-textreset="Şimdi Gönder" class="uk-button uk-button-primary uk-button-large eb-btn">
									<span class="uk-margin-small-right btn-text-wrap">Şimdi Gönder</span>
									<span data-uk-icon="arrow-right" class="uk-icon"></span>
								</button>
							</div>
						</form>
					</div>
				</div>

				<div class="uk-width-1-4@m eb-section-padding eb-contact-right">
					<p class="uk-margin-medium-bottom uk-visible@m">
						<img
							ref="target"
							src="/assets/img/empty.png"
							data-src="/assets/img/profile2.jpg"
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
	import { ref, reactive, computed } from "@vue/reactivity";
	// import { onMounted } from "@vue/runtime-core";
	import { useMouseInElement } from "@vueuse/core";
	// import { init_contact_form } from "@plugins/app-plugins";
	import { ContactFormValues } from "@models/site";
	import { useAuthStore } from "@/stores";
	import toast from "@plugins/toast";

	const target = ref(null);
	const authStore = useAuthStore();
	const contactForm = reactive<ContactFormValues>({ name: "", email: "", phone: "", subject: "", message: "" });
	const { elementX, elementY, isOutside, elementHeight, elementWidth } = useMouseInElement(target);

	// Todo: Bunu generic hale nasıl getiririz düşünülecek.
	const cardTransform = computed(() => {
		const MAX_ROTATION = 26;
		const rX = (MAX_ROTATION / 2 - (elementY.value / elementHeight.value) * MAX_ROTATION).toFixed(2);
		const rY = ((elementX.value / elementWidth.value) * MAX_ROTATION - MAX_ROTATION / 2).toFixed(2);
		return isOutside.value ? "" : `perspective(${elementWidth.value}px) rotateX(${rX}deg) rotateY(${rY}deg)`;
	});

	const contact = () => {
		let resObj = { contactForm: JSON.stringify(contactForm, null, 2), error: "" };
		authStore
			.contact(contactForm)
			.then((data: unknown) => {
				console.log(JSON.stringify(data, null, 2));
				toast({ message: `<span uk-icon='icon: check'></span> Formunuz başarıyla gönderildi, kısa zamanda bir cevap yazacağım. Sağlıcakla kalın. :)`, status: "success" });
			})
			.catch((error) => {
				if (error) {
					resObj.error = JSON.stringify(error, null, 2);
					alert(resObj);
					toast({ message: `<span uk-icon='icon: refresh'></span> E-Posta gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.`, status: "danger" });
				}
			})
			.finally(() => {
				console.log(resObj);
			});
	};

	// onMounted(async () => {
	// 	init_contact_form();
	// });
</script>

<style scoped></style>