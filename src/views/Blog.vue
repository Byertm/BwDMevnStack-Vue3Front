<template>
	<!-- main header -->
	<!-- <MainHeader :isShowHome="false"></MainHeader> -->
	<PostHeader></PostHeader>
	<!-- end main header -->

	<!-- main section -->
	<PostList></PostList>
	<!-- end main section -->

	<!-- main footer -->
	<!-- <MainFooter></MainFooter> -->
	<PostFooter></PostFooter>
	<!-- end main footer -->
</template>

<script setup lang="ts">
	// import MainHeader from "@components/MainHeader.vue";
	import PostHeader from "@components/PostHeader.vue";
	import PostList from "@components/PostList.vue";
	import PostFooter from "@components/PostFooter.vue";
	// import MainFooter from '@components/PostFooter.vue';
</script>

<style lang="scss" scoped></style>