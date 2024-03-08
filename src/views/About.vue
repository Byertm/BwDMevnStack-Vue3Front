<template>

	<MainHeader :isShowHome="false"></MainHeader>

	<About></About>

	<!-- main section -->
	<!-- about section -->
	<!-- <main class="eb-main-content">
		<section id="about" class="eb-section">
			<div class="eb-my-profile">
				<div class="uk-container">
					<div data-uk-grid class="uk-grid-collapse uk-child-width-expand@m">
						<div>
							<div class="eb-my-profile-img uk-background-cover uk-background-norepeat uk-background-top-center" data-src="/assets/img/profile.jpg" data-uk-img data-uk-lightbox>
								<a href="https://www.youtube.com/watch?v=uQBL7pSAXR8" class="eb-my-intro">
									<span data-uk-icon="icon: play; ratio: 2"></span>
									<span class="eb-my-intro-text">Giriş</span>
								</a>
							</div>
						</div>
						<div>
							<div class="eb-my-profile-desc">
								<div class="eb-section-point-wrapper">
									<div class="eb-section-point right">
										<sup>02</sup>
										<span>Hakkımda</span>
									</div>
								</div>

								<div class="eb-my-profile-desc-top">
									<h2 class="eb-section-title">Merhaba!</h2>
									<p>
										Yazılım tutkumu lise ikinci sınıftayken keşfettim; O zaman yaşamak için ne yapmak istediğim netleşti. Kariyerime, İnternet programcılığı bölümünde başladığım muhteşem Giresun Üniversitesi,
										Şebinkarahisar MYO'nda internet programcılığı devam ettim. Bir yıl sonra, kod sevgisini keşfettiğim yeni başlayanlar için bir web dersi aldım. Bundan sonra, ana dalımı Etkileşimli Tasarım'a çevirdim
										ve tasarıma olan bakışımı keskinleştirmenin yanı sıra web geliştiricisi olmanın hiç bitmeyen yolculuğuna başladım.
									</p>
								</div>

								<div class="eb-my-profile-desc-bottom eb-bg-soft">
									<ul class="eb-my-profile-desc-info uk-list">
										<li>
											<span>Doğum Tarihi</span>
											: 09/1993
										</li>
										<li>
											<span>Skype</span>
											: ersin.biltekin
										</li>
										<li>
											<span>Telefon</span>
											: +90-538-488-8269
										</li>
										<li>
											<span>E-Posta</span>
											: ersin.biltekin@hotmail.com
										</li>
										<li>
											<span>Web Site</span>
											: www.ersinbiltekin.com
										</li>
										<li>
											<span>Adres</span>
											: Başıbüyük / Maltepe / İstanbul
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="eb-border-top eb-border-bottom">
				<div class="uk-container">
					<div data-uk-grid class="eb-box-services uk-child-width-1-4@l uk-child-width-1-2 uk-text-center uk-grid-divider">
						<div>
							<div class="eb-box-service">
								<span class="uk-icon" data-uk-icon="icon: laptop; ratio: 1.5"></span>
								<h5>Web Developer</h5>
							</div>
						</div>
						<div>
							<div class="eb-box-service">
								<span class="uk-icon" data-uk-icon="icon: paint-bucket; ratio: 1.5"></span>
								<h5>Web Designer</h5>
							</div>
						</div>
						<div>
							<div class="eb-box-service">
								<span class="uk-icon" data-uk-icon="icon: world; ratio: 1.5"></span>
								<h5>Web Marketer</h5>
							</div>
						</div>
						<div>
							<div class="eb-box-service">
								<span class="uk-icon" data-uk-icon="icon: settings; ratio: 1.5"></span>
								<h5>Web Tester</h5>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main> -->
	<!-- end about section -->
	<!-- end main section -->
</template>

<script setup lang="ts">
	import MainHeader from "@components/MainHeader.vue";
	import About from "@components/main/About.vue";

	import { useSiteStore } from "@/stores";
	import { SiteInjectionKeys } from "@models/site";
	import { provide } from "@vue/runtime-core";

	const siteStore = useSiteStore();

	provide(SiteInjectionKeys.logoKey, { getSiteLogo: siteStore.getSiteLogo, isSiteLogo: siteStore.isSiteLogo });
	provide(SiteInjectionKeys.ownerKey, { getSiteOwner: siteStore.getSiteOwner, isSiteOwner: siteStore.isSiteOwner });
</script>

<style lang="scss" scoped></style>