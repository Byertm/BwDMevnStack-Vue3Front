<template>
	<div class="eb-sidebar-item">
		<h6 class="uk-text-bold uk-heading-line"><span>Etiketler</span></h6>

		<div v-if="isTags" class="eb-sidebar-tags">
			<template v-for="(tag, tIndex) in tags" :key="tag._id">
				<router-link :to="{ path: `/tag/${tag.slug}` }" :data-index="tIndex" class="uk-link-reset">{{ tag.name }}</router-link>
			</template>
		</div>

		<div v-if="isEmptyTags">Etiket bulunamadı</div>
	</div>
</template>

<script setup lang="ts">
	import { storeToRefs } from "pinia";
	import { ref } from "@vue/reactivity";
	import { RouterLink } from "vue-router";
	import { onMounted, watch } from "@vue/runtime-core";
	import { formatTag } from "@plugins/mixins";
	import { useTagStore } from "@/stores";

	const tagStore = useTagStore();

	const { getTags, isTags, isEmptyTags } = storeToRefs(tagStore);

	const tags = ref<any[]>([]);

	const setTagsData = () => {
		tags.value = getTags.value?.map((post: any) => formatTag(post)) || [];
	};

	watch([() => getTags.value, () => isTags.value], () => setTagsData());

	onMounted(async () => {
		if (isEmptyTags.value) await tagStore.getAll();

		setTagsData();
	});
</script>

<style lang="scss" scoped></style>