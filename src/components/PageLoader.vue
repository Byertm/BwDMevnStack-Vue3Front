<template>
	<!-- page loader -->
	<div id="pageLoader" class="eb-pageloader-wrapper">
		<div class="uk-position-center uk-text-center">
			<div data-uk-spinner></div>
		</div>
	</div>
	<!-- end page loader -->
</template>

<script setup lang="ts">
	import { onMounted } from "@vue/runtime-core";
	import { init_page_loader } from "@plugins/app-plugins";

	onMounted(() => {
		init_page_loader();
	});
</script>