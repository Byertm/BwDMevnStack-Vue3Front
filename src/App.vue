<template>
	<PageLoader></PageLoader>

	<router-view v-slot="{ Component, route }">
		<transition name="slide" mode="default">
			<div :key="route.path">
				<component :is="Component" />
			</div>
		</transition>
	</router-view>
</template>

<script setup lang="ts">
	import { RouterView } from "vue-router";
	import PageLoader from "@components/PageLoader.vue";
	import { onMounted, onUnmounted } from "@vue/runtime-core";
	import { is_scroll, is_resize, my_scroll, my_resize, init_full_height, init_update_uikit, init_scroll } from "@plugins/app-plugins";
	import { useApiStore } from "@/stores";
	import { ref } from "@vue/reactivity";
	import { storeToRefs } from "pinia";

	defineOptions({ name: "BwDMevnStackApp", inheritAttrs: false });

	const apiStore = useApiStore();
	const { getApi, isApi, getApiCheck, isApiCheck, getApiHealth, isApiHealth } = storeToRefs(apiStore);

	const isScroll = ref<boolean>(false);
	const isResize = ref<boolean>(false);
	const myScroll = ref<number>(0);
	const myResize = ref<number>(0);

	// Run function when window on scroll
	const onHandleScroll = () => {
		init_scroll();
		isScroll.value = true;
		clearTimeout(myScroll.value);
		myScroll.value = setTimeout(function () {
			isScroll.value = false;
			init_update_uikit();
		}, 300);
	};

	// Run function when window on resize
	const onHandleResize = () => {
		isResize.value = true;
		clearTimeout(myResize.value);
		myResize.value = setTimeout(function () {
			isResize.value = false;
			init_full_height();
			init_scroll();
		}, 300);
	};

	// Run function when document ready
	onMounted(() => {
		init_full_height();

		if (!isApiCheck.value) apiStore.check();
		if (!isApiHealth.value) apiStore.health();

		isScroll.value = is_scroll;
		isResize.value = is_resize;
		myScroll.value = my_scroll;
		myResize.value = my_resize;

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

<style lang="scss" scoped>
	.slide-enter-active,
	.slide-leave-active {
		transition: all 500ms ease-in-out;
	}

	.slide-enter {
		&-to,
		&-from {
			position: absolute;
		}

		&-to {
			right: 0;
		}

		&-from {
			right: -100%;
		}
	}

	.slide-leave {
		&-to,
		&-from {
			position: absolute;
		}

		&-to {
			left: -100%;
		}

		&-from {
			left: 0;
		}
	}

	.scale-slide-enter-active,
	.scale-slide-leave-active {
		position: absolute;
		transition: scale 500ms ease;
	}

	.scale-slide-enter {
		&-from {
			left: -100%;
		}

		&-to {
			left: 0%;
		}
	}

	.scale-slide-leave {
		&-from {
			scale: 1;
		}

		&-to {
			scale: 0.8;
		}
	}
</style>