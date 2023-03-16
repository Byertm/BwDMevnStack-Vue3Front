<template>
	<section v-if="isShowResume" id="resume" class="eb-section">
		<div class="eb-section-point-wrapper">
			<div class="uk-container">
				<div class="eb-section-point">
					<sup>03</sup>
					<span>Özgeçmiş</span>
				</div>
			</div>
		</div>

		<div v-if="isShowSections" class="uk-container">
			<div data-uk-grid class="uk-grid-divider">
				<div class="uk-width-1-4@s uk-visible@s uk-margin-large-bottom eb-section-padding-top" id="resume-nav-wrapper">
					<div data-uk-sticky="bottom: #resume-nav-wrapper; offset: 100; media: 650">
						<ul data-uk-scrollspy-nav="closest: li; scroll: false; offset: 120" class="eb-nav-left uk-tab-left uk-tab">
							<li v-if="isEducations" class="uk-active">
								<a href="#education" data-offset="120" class="eb-inner-link">
									<span data-uk-icon="minus"></span>
									Eğitim
								</a>
							</li>
							<li v-if="isExperiences">
								<a href="#experience" data-offset="120" class="eb-inner-link">
									<span data-uk-icon="minus"></span>
									Deneyim
								</a>
							</li>
							<li v-if="isSkills">
								<a href="#skills" data-offset="120" class="eb-inner-link">
									<span data-uk-icon="minus"></span>
									Yetenekler
								</a>
							</li>
							<li v-if="isShowAwwards">
								<a href="#awwwards" data-offset="120" class="eb-inner-link">
									<span data-uk-icon="minus"></span>
									Sertifika ve Ödüller
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div class="uk-width-expand@s eb-section-padding-top">
					<div v-if="isEducations">
						<h2 id="education" class="eb-section-title uk-heading-line">
							<span>Eğitim</span>
						</h2>
						<div class="eb-resume-list">
							<ul class="uk-list uk-list-large uk-list-divider">
								<li v-for="education in educationList" :key="education.id">
									<div class="eb-resume-item">
										<div class="eb-resume-item-date">
											<div class="eb-resume-item-date-icon"><span data-uk-icon="calendar"></span></div>
											<div class="eb-resume-item-date-text">
												<span>{{ education.start_date }} - {{ education.finish_date }}</span>
											</div>
										</div>

										<h4 class="eb-section-title">{{ education.school }}</h4>

										<strong>{{ education.section }}</strong>

										<div class="uk-text-small">
											<p>{{ education.description }}</p>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>

					<div v-if="isExperiences">
						<h2 id="experience" class="eb-section-title uk-heading-line">
							<span>Deneyim</span>
						</h2>

						<div class="eb-resume-list">
							<ul class="uk-list uk-list-large uk-list-divider">
								<li v-for="experience in experienceList" :key="experience.id">
									<div class="eb-resume-item">
										<div class="eb-resume-item-date">
											<div class="eb-resume-item-date-icon"><span data-uk-icon="calendar"></span></div>
											<div class="eb-resume-item-date-text">
												<span>{{ experience.start_date }} - {{ experience.finish_date }}</span>
											</div>
										</div>

										<h4 class="eb-section-title">{{ experience.section }}</h4>

										<strong>{{ experience.company }}</strong>

										<div class="uk-text-small">
											<p v-html="experience.description"></p>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>

					<div v-if="isSkills">
						<h2 id="skills" class="eb-section-title uk-heading-line">
							<span>Yetenekler</span>
						</h2>
						<div class="eb-margin-top-1 eb-margin-bottom-2">
							<div v-if="isMainSkills" data-uk-grid class="uk-grid-collapse uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-text-center">
								<div v-for="(ms, msIndex) in getMainSkills" :key="ms.id" :class="{ 'eb-bg-soft': isSkillIndex(msIndex) }">
									<div :id="ms.id" class="eb-progress-bar-wrapper">
										<div class="eb-progress-bar" :class="ms.name.toLowerCase()" :style="`--value: ${ms.ratio}`">
											<progress :id="ms.name.toLowerCase()" min="0" max="100" :value="ms.ratio"></progress>
										</div>

										<label :for="ms.name.toLowerCase()" v-text="ms.name" class="eb-progress-bar-title"></label>
									</div>
								</div>
							</div>

							<div v-if="isSpecialSkills || isLanguageSkills" data-uk-grid class="uk-child-width-1-2">
								<div v-if="isSpecialSkills">
									<h4 class="eb-section-title">Özel Yetenekler</h4>
									<ul class="uk-list uk-list-large uk-list-divider">
										<li v-for="ss in getSpecialSkills" :key="ss.id">
											<div class="eb-resume-skill-item">
												<h5>
													{{ ss.name }}
													<small class="uk-float-right uk-text-bold uk-visible@s">{{ ss.ratio }}%</small>
												</h5>

												<progress :value="ss.ratio" max="100" class="uk-progress"></progress>
											</div>
										</li>
									</ul>
								</div>

								<div v-if="isLanguageSkills">
									<h4 class="eb-section-title">Dil</h4>
									<ul class="uk-list uk-list-large uk-list-divider">
										<li v-for="ls in getLanguageSkills" :key="ls.id">
											<div class="eb-resume-skill-item">
												<h5>
													{{ ls.name }}
													<small class="uk-float-right uk-text-bold uk-visible@s">{{ ls.ratio }}%</small>
												</h5>
												<progress :value="ls.ratio" max="100" class="uk-progress"></progress>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>

					<div v-if="isShowAwwards">
						<h2 id="awwwards" class="eb-section-title uk-heading-line">
							<span>Sertifika ve Ödüller</span>
						</h2>

						<div class="eb-resume-list">
							<ul class="uk-list uk-list-large uk-list-divider">
								<li v-for="awward in awwardList" :key="awward.id">
									<div class="eb-resume-item">
										<div class="eb-resume-item-date">
											<div class="eb-resume-item-date-icon"><span data-uk-icon="calendar"></span></div>
											<div class="eb-resume-item-date-text">
												<span>{{ awward.start_date }} - {{ awward.finish_date }}</span>
											</div>
										</div>

										<h4 class="eb-section-title">{{ awward.title }}</h4>

										<strong>{{ awward.company }}</strong>

										<div class="uk-text-small">
											<p v-html="awward.description"></p>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-if="isShowExtension" data-uk-parallax="bgy: -200" data-src="/assets/img/bg/bg2.jpg" data-uk-img class="eb-section eb-section-padding uk-background-cover uk-background-fixed">
			<div class="eb-overlay-primary uk-position-cover"></div>
			<div class="uk-container uk-text-center uk-position-relative">
				<div data-uk-grid class="uk-grid-small uk-flex-center">
					<div>
						<a href="#" class="eb-btn uk-button uk-button-primary uk-button-large">CV (Pdf) Dosyasını İndir</a>
					</div>

					<div>
						<router-link :to="{ path: '/', hash: '#contact' }" class="eb-inner-link eb-btn uk-button uk-button-danger uk-button-large">İletişime Geç</router-link>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { storeToRefs } from "pinia";
	import { RouterLink } from "vue-router";
	import { ref, computed } from "@vue/reactivity";
	import { onMounted, watch } from "@vue/runtime-core";
	import { Education, awwardList as awwardListData, Experience, formatEducation, formatExperience } from "@plugins/mixins";
	import { useEducationStore, useExperienceStore, useSkillStore } from "@/stores";
	import { ISkill } from "@models/skill";

	const educationStore = useEducationStore();
	const experienceStore = useExperienceStore();
	const skillStore = useSkillStore();

	const { getEducations, isEducations } = storeToRefs(educationStore);
	const { getExperiences, isExperiences } = storeToRefs(experienceStore);
	const { getSkills, getMainSkills, getLanguageSkills, getSpecialSkills, isSkills, isMainSkills, isLanguageSkills, isSpecialSkills } = storeToRefs(skillStore);

	const educationList = ref<Education[]>([]);

	const experienceList = ref<Experience[]>([]);

	const allSkillList = ref<ISkill[]>([]);
	const languageSkillList = ref<ISkill[]>([]);
	const specialSkillList = ref<ISkill[]>([]);
	const mainSkillList = ref<ISkill[]>([]);

	const awwardList = ref<Experience[]>([]); //awwardListData

	const isShowAwwards = ref<boolean>(awwardList?.value?.length > 0 && false);

	const isShowExtension = computed(() => !!isEducations.value);
	const isShowResume = computed(() => !!(isShowSections.value || isShowExtension.value));
	const isShowSections = computed(() => !!(isEducations.value || isExperiences.value || isShowAwwards.value || isSkills.value));

	const isSkillIndex = (skillIndex: number) => [1, 3, 4, 6, 9, 11].includes(skillIndex);

	const setEducationsData = () => {
		educationList.value = getEducations.value?.map((education: any) => formatEducation(education)) || [];
	};

	const setExperiencesData = () => {
		experienceList.value = getExperiences.value?.map((experience: any) => formatExperience(experience)) || [];
	};

	const setLanguagesData = () => {
		languageSkillList.value = getLanguageSkills.value;
	};

	const setSpecialSkillsData = () => {
		specialSkillList.value = getSpecialSkills.value;
	};

	const setMainSkillsData = () => {
		mainSkillList.value = getMainSkills.value;
	};

	const setAllSkillsData = () => {
		allSkillList.value = getSkills.value;
	};

	watch([() => getEducations.value, () => isEducations.value], () => setEducationsData());

	watch([() => getExperiences.value, () => isExperiences.value], () => setExperiencesData());

	watch([() => getLanguageSkills.value, () => isLanguageSkills.value], () => setLanguagesData());

	watch([() => getSpecialSkills.value, () => isSpecialSkills.value], () => setSpecialSkillsData());

	watch([() => getMainSkills.value, () => isMainSkills.value], () => setMainSkillsData());

	watch([() => getSkills.value, () => isSkills.value], () => setAllSkillsData());

	onMounted(async () => {
		// init_chart_circle();

		if (!isEducations.value) await educationStore.getAll();
		if (!isExperiences.value) await experienceStore.getAll();
		if (!isSkills.value) await skillStore.getAll();

		setEducationsData();
		setExperiencesData();
		setLanguagesData();
		setSpecialSkillsData();
		setMainSkillsData();
		setAllSkillsData();
	});
</script>

<style lang="scss" scoped>
	@property --eb-progress-value {
		syntax: "<integer>";
		inherits: false;
		initial-value: 0;
	}

	@keyframes eb-progress {
		to {
			--eb-progress-value: var(--value);
		}
	}

	.eb-bg-soft {
		.eb-progress-bar {
			--inner-bg: #f2f2f2;
		}
	}

	.eb-progress-bar {
		--size: 4rem;
		--inner-bg: #ffffff;
		--primary-color: #1e87f0;
		--secondary-color: #dae9f7;

		display: flex;
		justify-content: center;
		align-items: center;
		width: var(--size);
		height: var(--size);
		font-size: calc(var(--size) / 5);
		color: var(--primary-color);
		background: radial-gradient(closest-side, var(--inner-bg) 79%, transparent 80% 100%), conic-gradient(var(--primary-color) calc(var(--eb-progress-value) * 1%), var(--secondary-color) 0);
		border-radius: 50%;

		&-wrapper {
			display: grid;
			place-items: center;
			gap: 0.5rem;
			padding: 1rem;
		}

		&,
		&::before {
			animation: eb-progress 2s 1 forwards;
		}

		&::before {
			counter-reset: percentage var(--eb-progress-value);
			content: counter(percentage) "%";
		}

		&-title {
			font-size: inherit;
			text-align: center;
			font-weight: 500;
			color: inherit;
		}

		progress {
			visibility: hidden;
			width: 0;
			height: 0;
		}
	}
</style>