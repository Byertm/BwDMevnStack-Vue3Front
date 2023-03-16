<template>
	<!-- page loader -->
	<div id="pageloader" class="eb-pageloader-wrapper">
		<div class="uk-position-center uk-text-center">
			<div data-uk-spinner></div>
		</div>
	</div>
	<!-- end page loader -->
</template>

<script setup lang="ts">
	import { onMounted } from "@vue/runtime-core";
	import { init_pageloader } from "@plugins/app-plugins";

	onMounted(() => {
		init_pageloader();
	});
</script>