<template>
	<div class="eb-sidebar-item">
		<form @submit.prevent="searchFn" class="uk-search uk-search-default uk-width-1-1">
			<span data-uk-search-icon></span>
			<input type="search" v-model="search" placeholder="Ara..." class="uk-search-input" />
		</form>
	</div>
</template>

<script setup lang="ts">
	// import { storeToRefs } from "pinia";
	import { ref } from "@vue/reactivity";
	import { onMounted, watch } from "@vue/runtime-core";
	// import { formatCategory } from "@plugins/mixins";
	// import { useCategoryStore } from "@/stores";

	// const categoryStore = useCategoryStore();

	// const { getCategories, isCategories } = storeToRefs(categoryStore);

	// const categories = ref<any[]>([]);
	const search = ref<string>("");

	// watch([() => getCategories.value, () => isCategories.value], () => {
	// 	categories.value = getCategories.value?.map((post: any) => formatCategory(post)) || [];
	// });

	const searchFn = () => {
		alert(search.value);
	};

	onMounted(async () => {
		// if(!isCategories.value) await categoryStore.getAll();
	});
</script>

<style lang="scss" scoped></style>