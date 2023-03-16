<template>
	<div class="eb-sidebar-item">
		<h6 class="uk-text-bold uk-heading-line"><span>Kategoriler</span></h6>

		<div v-if="isCategories" data-uk-form-custom="target: > * > span:first-child" class="uk-width-1-1">
			<select v-model="selectedCategory" @change="changeCategory" class="uk-select">
				<option :value="-1" :disabled="true">Kategori Seç</option>
				<template v-for="(category, cIndex) in categories" :key="category.id">
					<option :data-index="cIndex" :value="category.slug">{{ category.name }}</option>
				</template>
			</select>

			<button type="button" tabindex="-1" class="uk-button uk-button-default uk-width-1-1">
				<span></span>
				<span data-uk-icon="icon: chevron-down"></span>
			</button>
		</div>

		<div v-if="isEmptyCategories">Etiket bulunamadı</div>
	</div>
</template>

<script setup lang="ts">
	import { storeToRefs } from "pinia";
	import { ref } from "@vue/reactivity";
	import { onMounted, watch } from "@vue/runtime-core";
	import { formatCategory } from "@plugins/mixins";
	import { useCategoryStore } from "@/stores";
	import { useRouter } from "vue-router";

	const categoryStore = useCategoryStore();

	const { getCategories, isCategories, isEmptyCategories } = storeToRefs(categoryStore);

	const categories = ref<any[]>([]);
	const selectedCategory = ref<string>("");
	const router = useRouter();

	const changeCategory = () => {
		if (!!selectedCategory.value) router.push(`/category/${selectedCategory.value}`);
	};

	const setCategoriessData = () => {
		categories.value = getCategories.value?.map((post: any) => formatCategory(post)) || [];
	};

	watch([() => getCategories.value, () => isCategories.value], () => setCategoriessData());

	onMounted(async () => {
		if (isEmptyCategories.value) await categoryStore.getAll();

		setCategoriessData();
	});
</script>

<style lang="scss" scoped></style>