<template>
	<!-- main header -->
	<PostHeader></PostHeader>
	<!-- end main header -->

	<!-- main section -->
	<PostSingle></PostSingle>
	<!-- end main section -->

	<!-- main footer -->
	<PostFooter></PostFooter>
	<!-- end main footer -->
</template>

<script setup lang="ts">
	// import { onMounted } from "@vue/runtime-core";
	import PostHeader from "@components/PostHeader.vue";
	import PostSingle from "@components/PostSingle.vue";
	import PostFooter from "@components/PostFooter.vue";
	// import { gp } from "@plugins/globalProps";

	// onMounted(() => {
	// 	gp()?.$bus.$emit("test", "yeni data");
	// });
</script>

<style lang="scss" scoped></style>