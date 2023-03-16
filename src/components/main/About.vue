<template>
	<section id="about" v-if="owner?.isSiteOwner" class="eb-section">
		<div class="eb-my-profile">
			<div class="uk-container">
				<div data-uk-grid class="uk-grid-collapse uk-child-width-expand@m">
					<div>
						<div data-uk-img data-uk-lightbox data-src="/assets/img/profile.jpg" class="eb-my-profile-img uk-background-cover uk-background-norepeat uk-background-top-center">
							<a href="https://www.youtube.com/watch?v=0Xw30s5DBi4" class="eb-my-intro">
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
								<h2 v-html="owner?.getSiteOwner?.info?.about?.title" class="eb-section-title"></h2>
								<p v-html="owner?.getSiteOwner?.info?.about?.short"></p>
								<!-- <h2 class="eb-section-title">Merhaba!</h2> -->
								<!-- <p>
									Yazılım tutkumu lise i	kinci sınıftayken keşfettim; O zaman yaşamak için ne yapmak istediğim netleşti. Kariyerime, İnternet programcılığı bölümünde başladığım muhteşem Giresun Üniversitesi, Şebinkarahisar
									MYO'nda internet programcılığı devam ettim. Bir yıl sonra, kod sevgisini keşfettiğim yeni başlayanlar için bir web dersi aldım. Bundan sonra, ana dalımı Etkileşimli Tasarım'a çevirdim ve tasarıma olan
									bakışımı keskinleştirmenin yanı sıra web geliştiricisi olmanın hiç bitmeyen yolculuğuna başladım.
								</p> -->
							</div>

							<div class="eb-my-profile-desc-bottom eb-bg-soft">
								<ul class="eb-my-profile-desc-info uk-list">
									<li>
										<span>Doğum Tarihi</span>
										: {{ owner?.getSiteOwner?.birthDate }}
										<!-- 09/1993 -->
									</li>
									<!-- <li>
										<span>Skype</span>
										: ersin.biltekin
									</li> -->
									<li>
										<span>Telefon</span>
										: {{ owner?.getSiteOwner?.contacts?.phone }}
										<!-- +90-538-488-8269  -->
									</li>
									<li>
										<span>E-Posta</span>
										: {{ owner?.getSiteOwner?.contacts?.email }}
										<!-- ersin.biltekin@hotmail.com  -->
									</li>
									<li>
										<span>Web Site</span>
										: {{ owner?.getSiteOwner?.contacts?.website }}
										<!-- www.ersinbiltekin.com  -->
									</li>
									<li>
										<span>Adres</span>
										: {{ owner?.getSiteOwner?.contacts?.address?.short }}
										<!-- Başıbüyük / Maltepe / İstanbul -->
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
					<div v-for="title in owner?.getSiteOwner?.info?.titles" :key="title.icon">
						<div class="eb-box-service">
							<span :data-uk-icon="`icon: ${title.icon}; ratio: 1.5`" class="uk-icon"></span>
							<h5>{{ title.name }}</h5>
						</div>
					</div>
					<!-- <div>
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
					</div> -->
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	// import { onBeforeMount } from "@vue/runtime-core";
	import { inject } from "@vue/runtime-core";

	import { SiteInjectionKeys, TSiteOwner } from "@models/site";

	// const site = inject(SiteInjectionKeys.siteKey);
	const owner = inject<TSiteOwner>(SiteInjectionKeys.ownerKey);
	// const logo = inject(SiteInjectionKeys.logoKey);
	// const section = inject(SiteInjectionKeys.sectionKey);
	// const sections = inject(SiteInjectionKeys.sectionsKey);

	// onBeforeMount(() => {
	// 	if (!isSiteOwner.value) siteStore.get();
	// });
</script>

<style scoped></style>