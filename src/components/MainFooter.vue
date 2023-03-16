<template>
	<!-- main footer -->
	<footer class="eb-main-footer-wrapper">
		<div class="waveHorizontals">
			<div id="waveHorizontal1" data-uk-img data-src="/assets/img/bg/wave1.svg" class="waveHorizontal"></div>
			<div id="waveHorizontal2" data-uk-img data-src="/assets/img/bg/wave2.svg" class="waveHorizontal"></div>
			<div id="waveHorizontal3" data-uk-img data-src="/assets/img/bg/wave3.svg" class="waveHorizontal"></div>
		</div>

		<!-- <a href="#app" data-uk-totop class="uk-visible@s eb-totop eb-inner-link"></a> -->
		<router-link :to="{ path: `/#app` }" data-uk-totop class="uk-visible@s eb-totop eb-inner-link"></router-link>

		<div class="eb-main-footer">
			<div class="uk-container">
				<div data-uk-grid class="uk-child-width-1-2@s">
					<div class="uk-margin-remove uk-text-left@s">&copy; 2023 EBiltekin.</div>

					<div class="uk-margin-remove uk-text-right@s">
						<div class="eb-footer-social">
							<router-link :to="{ path: `/` }" class="-eb-inner-link"><span data-uk-icon="icon: facebook" class="uk-icon"></span><span aria-hidden="true" class="uk-hidden">Facebook</span></router-link>
							<router-link :to="{ path: `/` }" class="-eb-inner-link"><span data-uk-icon="icon: instagram" class="uk-icon"></span><span aria-hidden="true" class="uk-hidden">Instagram</span></router-link>
							<router-link :to="{ path: `/` }" class="-eb-inner-link"><span data-uk-icon="icon: twitter" class="uk-icon"></span><span aria-hidden="true" class="uk-hidden">Twitter</span></router-link>
							<router-link :to="{ path: `/` }" class="-eb-inner-link"><span data-uk-icon="icon: github" class="uk-icon"></span><span aria-hidden="true" class="uk-hidden">GitHub</span></router-link>
							<router-link :to="{ path: `/` }" class="-eb-inner-link uk-hidden"><span data-uk-icon="icon: gitlab" class="uk-icon"></span><span aria-hidden="true" class="uk-hidden">GitLab</span></router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</footer>
	<!-- end main footer -->
</template>

<script setup lang="ts">
	import { RouterLink } from "vue-router";
</script>