<template>
	<router-view />
</template>

<script setup lang="ts">
	import { RouterView } from "vue-router";
	import { onMounted, onUnmounted } from "@vue/runtime-core";
	import { is_scroll, is_resize, my_scroll, my_resize, init_full_height, init_update_uikit, init_scroll } from "@plugins/app-plugins";

	let isScroll: boolean = false;
	let isResize: boolean = false;
	let myScroll: number, myResize: number;

	// Run function when window on scroll
	const onHandleScroll = () => {
		init_scroll();
		isScroll = true;
		clearTimeout(myScroll);
		myScroll = setTimeout(function () {
			isScroll = false;
			init_update_uikit();
		}, 300);
	};

	// Run function when window on resize
	const onHandleResize = () => {
		isResize = true;
		clearTimeout(myResize);
		myResize = setTimeout(function () {
			isResize = false;
			init_full_height();
			init_scroll();
		}, 300);
	};

	// Run function when document ready
	onMounted(() => {
		init_full_height();

		isScroll = is_scroll;
		isResize = is_resize;
		myScroll = my_scroll;
		myResize = my_resize;

		// Run function when window on scroll
		window.addEventListener("scroll", onHandleScroll);

		// Run function when window on resize
		window.addEventListener("resize", onHandleResize);
	});

	onUnmounted(() => {
		//Remove function when window on scroll
		window.removeEventListener("scroll", onHandleScroll);

		//Remove function when window on resize
		window.removeEventListener("resize", onHandleResize);
	});
</script>

<style lang="scss" scoped></style>