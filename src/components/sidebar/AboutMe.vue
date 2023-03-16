<template>
	<div class="eb-sidebar-item">
		<h6 class="uk-text-bold uk-heading-line"><router-link :to="{ path: '/', hash: '#about' }" class="uk-link-heading"><span>Hakkımda</span></router-link></h6>

		<div data-uk-grid class="uk-child-width-1-1@m uk-child-width-1-2@s uk-child-width-1-1 uk-flex-middle">
			<div>
				<img src="/assets/img/empty.png" data-src="/assets/img/profile.jpg" data-uk-img alt="" class="uk-border-rounded" />
			</div>

			<div class="uk-margin-remove">
				<div class="eb-text-small uk-margin-small-top">Meh synth Schlitz, tempor duis single-origin coffee ea next level ethnic fingerstache fanny pack nostrud. about me...</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>