<template>
	<!-- main header -->
	<MainHeader :isShowHome="false"></MainHeader>
	<!-- <PostHeader></PostHeader> -->
	<!-- end main header -->

	<!-- main section -->
	<!-- <main class="eb-main-content">
		<section v-if="isCategoryPosts">
			<div class="eb-section-point-wrapper">
				<div class="uk-container">
					<div class="eb-section-point">
						<span v-if="postAllInfo.loading">Blog Detail</span>
						<span v-if="!postAllInfo.loading">{{ post.title }}</span>
					</div>
				</div>
			</div>

			<div class="uk-container">
				Category

				{{ isCategoryPosts }}

				{{ getCategoryPosts }}

				{{ route.params }}
			</div>
		</section>
	</main> -->
	<PostCategoryList></PostCategoryList>
	<!-- end main section -->

	<!-- main footer -->
	<MainFooter></MainFooter>
	<!-- end main footer -->
</template>

<script setup lang="ts">
	import MainHeader from "@components/MainHeader.vue";
	import MainFooter from "@components/PostFooter.vue";
	import PostCategoryList from "@components/PostCategoryList.vue";
</script>

<style lang="scss" scoped></style>