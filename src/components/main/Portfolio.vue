<template>
	<section v-if="isPortfolio" id="portfolio" class="eb-section eb-border-bottom uk-overflow-hidden">
		<div class="eb-section-point-wrapper">
			<div class="uk-container">
				<div class="eb-section-point">
					<sup>04</sup>
					<span>Portföy</span>
				</div>
			</div>
		</div>

		<div class="uk-container">
			<div data-uk-grid class="uk-grid-divider">
				<div id="portfolio-nav-wrapper" class="uk-width-1-4@s uk-visible@s uk-margin-large-bottom eb-section-padding-top">
					<div data-uk-sticky="bottom: #portfolio-nav-wrapper; offset: 100; media: 650">
						<ul data-uk-scrollspy-nav="closest: li; scroll: false; offset: 120" class="eb-nav-left uk-tab-left uk-tab">
							<li v-if="isProjects" class="uk-active">
								<a href="#myworks" data-offset="120" class="eb-inner-link">
									<span data-uk-icon="minus"></span>
									Çalışmalarım
								</a>
							</li>
							<li v-if="isPricing">
								<a href="#pricing" data-offset="120" class="eb-inner-link">
									<span data-uk-icon="minus"></span>
									Ücretlendirme
								</a>
							</li>
							<li v-if="isTestimonials">
								<a href="#testi" data-offset="120" class="eb-inner-link">
									<span data-uk-icon="minus"></span>
									Geri Bildirim
								</a>
							</li>
							<li v-if="isCustomer">
								<a href="#client" data-offset="120" class="eb-inner-link">
									<span data-uk-icon="minus"></span>
									Müşteriler
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div class="uk-width-expand@s eb-section-padding-top">
					<div v-if="isProjects">
						<h2 id="myworks" class="eb-section-title uk-heading-line"><span>Çalışmalarım</span></h2>
						<div data-uk-filter="target: .js-filter" class="eb-margin-top-1 eb-margin-bottom-1">
							<ul class="eb-nav-filter uk-subnav uk-subnav-pill">
								<li><a data-uk-filter-control>Hepsi</a></li>
								<li><a data-uk-filter-control=".data-web">Html & Css & Js</a></li>
								<li><a data-uk-filter-control=".data-brand">Html & Css</a></li>
								<li><a data-uk-filter-control=".data-design">JavaScript</a></li>
							</ul>

							<ul data-uk-grid data-uk-lightbox="animation: fade;  toggle: .eb-lightbox" class="js-filter uk-child-width-1-2 uk-grid-small">
								<li v-for="(project, pIndex) in projectList" :key="project.id" class="data-web" :class="{ 'data-brand': pIndex % 3 === 0, 'data-design': pIndex % 2 === 1 }">
									<div class="eb-work-item uk-transition-toggle">
										<div class="eb-work-item-img-wrap">
											<div class="eb-work-item-img">
												<img
													:src="project.imageUrl"
													width="383"
													height="574"
													:alt="project.name"
													data-uk-img
													:data-src="project.imageUrl"
													crossorigin="anonymous"
													class="uk-transition-scale-up uk-transition-opaque" />
											</div>

											<div class="eb-work-item-overlay uk-transition-fade uk-position-cover uk-position-small uk-overlay uk-flex uk-flex-center uk-flex-middle">
												<div>
													<a
														:href="project.imageUrl"
														data-attrs="crossorigin: anonymous; width: 1920; height: 1080;"
														crossorigin="anonymous"
														:data-caption="project.name"
														class="eb-lightbox uk-transition-slide-left">
														<span data-uk-icon="icon:plus; ratio:1.2"></span>
													</a>

													<!-- <a href="/templates/project/project-details-01.html" class="uk-transition-slide-right show-portfolio"> -->
													<a @click="() => showProjectsDetail(project.id)" class="uk-transition-slide-right show-portfolio">
														<span data-uk-icon="icon:link; ratio:1.2"></span>
													</a>
												</div>
											</div>
										</div>

										<!-- <a href="/templates/project/project-details-01.html" class="show-portfolio"> -->
										<a @click="() => showProjectsDetail(project.id)" class="show-portfolio">
											<div class="eb-work-item-title">
												<h5>{{ project.name }}</h5>
												<span>{{ project.categoryId }}</span>
											</div>
										</a>
									</div>
								</li>
							</ul>

							<div ref="elShowPortfolioDetail" id="show-portofolio-details" data-uk-modal class="uk-modal-full">
								<div class="uk-modal-dialog">
									<button type="button" data-uk-close class="uk-modal-close-full uk-close-large"></button>
									<div ref="elPortfolioDetail" id="portofolio-details" data-uk-height-viewport class="uk-animation-toggle uk-overflow-hidden"></div>
								</div>
							</div>
						</div>
					</div>

					<div v-if="isPricing" id="pricing">
						<h2 class="eb-section-title uk-heading-line"><span>Ücretlendirme</span></h2>
						<div class="eb-margin-top-1 eb-margin-bottom-2">
							<div data-uk-grid class="uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-1 uk-grid-medium">
								<div>
									<div class="eb-pricing-item">
										<div class="uk-card">
											<div class="uk-card-header">
												<h4>Front-End Developer</h4>
												<div class="eb-pricing-item-price">
													<strong>$ 40</strong>
													<span>/h</span>
												</div>
											</div>

											<div class="uk-card-body">
												<small class="uk-text-muted">Details:</small>
												<ul class="uk-list uk-list-divider uk-text-small">
													<li>
														<span class="uk-float-right uk-text-muted" data-uk-icon="check"></span>
														HTML5
													</li>
													<li>
														<span class="uk-float-right uk-text-muted" data-uk-icon="check"></span>
														CSS3
													</li>
													<li>
														<span class="uk-float-right uk-text-muted" data-uk-icon="check"></span>
														Angular
													</li>
													<li>
														<span class="uk-float-right uk-text-muted" data-uk-icon="check"></span>
														Vue Js
													</li>
													<li>
														<span class="uk-float-right uk-text-muted" data-uk-icon="check"></span>
														React Js
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>

								<div>
									<div class="eb-pricing-item">
										<div class="uk-card">
											<div class="uk-card-header">
												<h4>Back-End Developer</h4>
												<div class="eb-pricing-item-price">
													<strong>$ 60</strong>
													<span>/h</span>
												</div>
											</div>

											<div class="uk-card-body">
												<small class="uk-text-muted">Details:</small>
												<ul class="uk-list uk-list-divider uk-text-small">
													<li>
														<span class="uk-float-right uk-text-muted" data-uk-icon="check"></span>
														Node Js
													</li>
													<li>
														<span class="uk-float-right uk-text-muted" data-uk-icon="check"></span>
														C#
													</li>
													<li>
														<span class="uk-float-right uk-text-muted" data-uk-icon="check"></span>
														tRPC
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>

								<div>
									<div class="eb-pricing-item">
										<div class="uk-card">
											<div class="uk-card-header">
												<h4>Full-Stact Developer</h4>
												<div class="eb-pricing-item-price">
													<strong>$ 80</strong>
													<span>/h</span>
												</div>
											</div>

											<div class="uk-card-body">
												<small class="uk-text-muted">Details:</small>
												<ul class="uk-list uk-list-divider uk-text-small">
													<li>
														<span class="uk-float-right uk-text-muted" data-uk-icon="check"></span>
														<strong>Included</strong>
														Front-End Developer
													</li>
													<li>
														<span class="uk-float-right uk-text-muted" data-uk-icon="check"></span>
														<strong>Included</strong>
														Back-End Developer
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div v-if="isTestimonials">
						<h2 id="testi" class="eb-section-title uk-heading-line"><span>Geri Bildirim</span></h2>
						<div data-uk-slider>
							<div class="eb-margin-top-1 eb-margin-bottom-2">
								<div data-uk-grid class="uk-grid-small">
									<div class="uk-width-expand">
										<div class="uk-slider-container">
											<ul class="eb-slider-items uk-slider-items uk-child-width-1-1">
												<li v-for="testimonial in testimonialList" :key="testimonial.id">
													<div class="eb-testi-item">
														<div class="eb-testi-item-desc">
															<h4>{{ testimonial.title }}</h4>
															{{ testimonial.content }}
														</div>
														<div class="eb-testi-item-img">
															<div data-uk-grid class="uk-flex-middle uk-grid-small">
																<div>
																	<img src="/assets/img/empty.png" width="300" height="300" data-src="/assets/img/people/01.jpg" alt="" data-uk-img />
																</div>
																<div class="uk-text-bold uk-text-small">
																	<span>{{ testimonial.author }}</span>
																	<span data-uk-icon="minus"></span>
																	<span>Bwd</span>
																</div>
															</div>
														</div>
													</div>
												</li>
												<!-- <li>
													<div class="eb-testi-item">
														<div class="eb-testi-item-desc">
															<h4>Nice Design</h4>
															For the first time I see such high-quality work, everything is just fine. The design is incredible, a lot of features and ready-made solutions.
														</div>
														<div class="eb-testi-item-img">
															<div data-uk-grid class="uk-flex-middle uk-grid-small">
																<div>
																	<img src="/assets/img/empty.png" width="300" height="300" data-src="/assets/img/people/01.jpg" alt="" data-uk-img />
																</div>
																<div class="uk-text-bold uk-text-small">
																	<span>Ben</span>
																	<span data-uk-icon="minus"></span>
																	<span>Envato User</span>
																</div>
															</div>
														</div>
													</div>
												</li>
												<li>
													<div class="eb-testi-item">
														<div class="eb-testi-item-desc">
															<h4>Top Expectation</h4>
															For the first time I see such high-quality work, everything is just fine. The design is incredible, a lot of features and ready-made solutions.
														</div>
														<div class="eb-testi-item-img">
															<div data-uk-grid class="uk-flex-middle uk-grid-small">
																<div>
																	<img src="/assets/img/empty.png" width="300" height="300" data-src="/assets/img/people/02.jpg" alt="" data-uk-img />
																</div>
																<div class="uk-text-bold uk-text-small">
																	<span>Ben</span>
																	<span data-uk-icon="minus"></span>
																	<span>Envato User</span>
																</div>
															</div>
														</div>
													</div>
												</li>
												<li>
													<div class="eb-testi-item">
														<div class="eb-testi-item-desc">
															<h4>Wonderfull Work</h4>
															For the first time I see such high-quality work, everything is just fine. The design is incredible, a lot of features and ready-made solutions.
														</div>
														<div class="eb-testi-item-img">
															<div data-uk-grid class="uk-flex-middle uk-grid-small">
																<div>
																	<img src="/assets/img/empty.png" width="300" height="300" data-src="/assets/img/people/03.jpg" alt="" data-uk-img />
																</div>
																<div class="uk-text-bold uk-text-small">
																	<span>Ben</span>
																	<span data-uk-icon="minus"></span>
																	<span>Envato User</span>
																</div>
															</div>
														</div>
													</div>
												</li> -->
											</ul>
										</div>
									</div>

									<div class="uk-width-auto">
										<div class="eb-testi-nav">
											<a href="#" data-uk-slider-item="next">
												<span data-uk-icon="arrow-right"></span>
											</a>

											<a href="#" data-uk-slider-item="previous">
												<span data-uk-icon="arrow-left"></span>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div v-if="isCustomer">
						<h2 id="client" class="eb-section-title uk-heading-line"><span>Müşteriler</span></h2>
						<div class="eb-margin-top-1 eb-margin-bottom-2">
							<div data-uk-grid class="uk-child-width-1-6@m uk-child-width-1-3">
								<div>
									<div class="eb-client-item">
										<img src="/assets/img/empty.png" width="300" height="300" data-src="/assets/img/client/01.png" alt="" class="uk-border-rounded" data-uk-img />
									</div>
								</div>
								<div>
									<div class="eb-client-item">
										<img src="/assets/img/empty.png" width="300" height="300" data-src="/assets/img/client/02.png" alt="" class="uk-border-rounded" data-uk-img />
									</div>
								</div>
								<div>
									<div class="eb-client-item">
										<img src="/assets/img/empty.png" width="300" height="300" data-src="/assets/img/client/03.png" alt="" class="uk-border-rounded" data-uk-img />
									</div>
								</div>
								<div>
									<div class="eb-client-item">
										<img src="/assets/img/empty.png" width="300" height="300" data-src="/assets/img/client/04.png" alt="" class="uk-border-rounded" data-uk-img />
									</div>
								</div>
								<div>
									<div class="eb-client-item">
										<img src="/assets/img/empty.png" width="300" height="300" data-src="/assets/img/client/05.png" alt="" class="uk-border-rounded" data-uk-img />
									</div>
								</div>
								<div>
									<div class="eb-client-item">
										<img src="/assets/img/empty.png" width="300" height="300" data-src="/assets/img/client/06.png" alt="" class="uk-border-rounded" data-uk-img />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-if="isPastJobs" class="eb-border-top">
			<div class="uk-container">
				<div data-uk-grid class="eb-box-services uk-child-width-1-4@l uk-child-width-1-2 uk-text-center uk-grid-divider">
					<div>
						<div class="eb-box-fact">
							<div class="eb-box-fact-count uk-h3">57</div>
							<span class="eb-box-fact-desc">İş Tamamlandı</span>
						</div>
					</div>
					<div>
						<div class="eb-box-fact">
							<div class="eb-box-fact-count uk-h3">100%</div>
							<span class="eb-box-fact-desc">Önerildi</span>
						</div>
					</div>
					<div>
						<div class="eb-box-fact">
							<div class="eb-box-fact-count uk-h3">34</div>
							<span class="eb-box-fact-desc">Tekrar Gelen Müşteri</span>
						</div>
					</div>
					<div>
						<div class="eb-box-fact">
							<div class="eb-box-fact-count uk-h3">99%</div>
							<span class="eb-box-fact-desc">Mutlu Müşteri</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { storeToRefs } from "pinia";
	import { computed, ref, toRaw } from "@vue/reactivity";
	import { onMounted, watch } from "@vue/runtime-core";
	import { init_portfolio_details, portfolio_detail_string } from "@plugins/app-plugins";
	import { formatProject } from "@plugins/mixins";
	import { useProjectStore, useTestimonialStore } from "@/stores";
	import UIkit from "uikit";
	import { IProject } from "@models/project";

	const projectStore = useProjectStore();
	const testimonialStore = useTestimonialStore();

	const { getProjects, isProjects, getProject, isProject } = storeToRefs(projectStore);
	const { getTestimonials, isTestimonials } = storeToRefs(testimonialStore);

	const elShowPortfolioDetail = ref<any>(null);
	const elPortfolioDetail = ref<HTMLDivElement | null>(null);
	const projectList = ref<any[]>([]);
	const testimonialList = ref<any[]>([]);
	const isPricing = ref<boolean>(false);
	const isCustomer = ref<boolean>(false);
	const isPastJobs = ref<boolean>(false);
	const isPortfolio = computed(() => !!(isProjects.value || isTestimonials.value || isPricing.value || isCustomer.value || isPastJobs.value));

	const showProjectsDetail = async (id: string) => {
		await projectStore.getById(id);

		const project: IProject = getProject.value as IProject;
		if (project?.name) {
			const htmlRaw: string = await portfolio_detail_string(project);
			if (elPortfolioDetail?.value) elPortfolioDetail.value.innerHTML = toRaw(htmlRaw);
			if (elShowPortfolioDetail?.value) UIkit.modal(elShowPortfolioDetail?.value).show();
		}
	};

	const setProjectsData = () => {
		projectList.value = getProjects.value?.map((project: any) => formatProject(project)) || [];
		// init_portfolio_details();
	};

	const setTestimonialsData = () => {
		testimonialList.value = getTestimonials.value || []; // ?.map((testimonial: any) => formatProject(testimonial))
	};

	watch([() => getProjects.value, () => isProjects.value], () => {
		setProjectsData();
	});

	watch([() => getTestimonials.value, () => isTestimonials.value], () => {
		setTestimonialsData();
	});

	onMounted(async () => {
		if (!isProjects.value) await projectStore.getAll();
		if (!isTestimonials.value) await testimonialStore.getAll();

		setProjectsData();
		setTestimonialsData();
		// init_portfolio_details();
	});
</script>

<style scoped></style>