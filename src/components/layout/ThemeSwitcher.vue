<template>
	<label title="Toggle Dark Mode" :color-mode="colorMode" class="theme-switcher-wrapper">
		<button @click="toggleDark()" class="switcher switcher-appearance" type="button" role="switch" aria-checked="true">
			<span class="check">
				<span class="icon">
					<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 24 24" class="sun">
						<path d="M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z"></path>
						<path d="M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z"></path>
						<path d="M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z"></path>
						<path d="M5.6,6.6c-0.3,0-0.5-0.1-0.7-0.3L3.5,4.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C6.2,6.5,5.9,6.6,5.6,6.6z"></path>
						<path d="M19.8,20.8c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C20.3,20.7,20,20.8,19.8,20.8z"></path>
						<path d="M3,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S3.6,13,3,13z"></path>
						<path d="M23,13h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S23.6,13,23,13z"></path>
						<path d="M4.2,20.8c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C4.7,20.7,4.5,20.8,4.2,20.8z"></path>
						<path d="M18.4,6.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C18.9,6.5,18.6,6.6,18.4,6.6z"></path>
					</svg>
					<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 24 24" class="moon">
						<path
							d="M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22zM9.3,4.4c-2.9,1-5,3.6-5.2,6.8c-0.4,4.4,2.8,8.3,7.2,8.7c2.1,0.2,4.2-0.4,5.8-1.8c1.1-0.9,1.9-2.1,2.4-3.4c-2.5,0.9-5.3,0.5-7.5-1.1C9.2,11.4,8.1,7.7,9.3,4.4z"></path>
					</svg>
				</span>
			</span>
		</button>
	</label>
</template>

<script setup lang="ts">
	import { useColorMode, useDark, useToggle } from "@vueuse/core";

	const colorMode = useColorMode({ selector: "html", attribute: "theme", modes: { dim: "dim", cafe: "cafe" } });
	const isDark = useDark({ selector: "body", attribute: "class", valueDark: "eb-dark-skin uk-light custom-dark", valueLight: "eb-light-skin uk-dark custom-light" });
	const toggleDark = useToggle(isDark);
</script>

<style lang="scss" scoped>
	.theme-switcher-wrapper {
		--i-bg-color: #f6f6f7;
		--i-border-color: rgba(60, 60, 67, 0.29);
		--i-hover-border-color: #8e8e93;
		--i-switch-bg-color: #f6f6f7;
		--c-neutral-inverse: #ffffff;
		--c-text: rgba(60, 60, 67);
		--c-text-2: rgba(56 56 56 / 70%);
		--shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
		--shadow-2: 0 3px 12px rgba(0, 0, 0, 0.07), 0 1px 4px rgba(0, 0, 0, 0.07);

		align-self: center;

		* {
			pointer-events: auto;
		}

		.switcher {
			position: relative;
			border-radius: 11px;
			display: block;
			width: 40px;
			height: 22px;
			flex-shrink: 0;
			border: 1px solid var(--i-border-color);
			background-color: var(--i-switch-bg-color);
			transition: border-color 0.25s;
			cursor: pointer;

			&:hover {
				border-color: var(--i-hover-border-color);
			}

			.check {
				position: absolute;
				top: 1px;
				left: 1px;
				width: 18px;
				height: 18px;
				border-radius: 50%;
				background-color: var(--c-neutral-inverse);
				box-shadow: var(--shadow);
				transition: transform 0.25s;

				.icon {
					position: relative;
					display: block;
					width: 18px;
					height: 18px;
					border-radius: 50%;
					overflow: hidden;

					svg {
						position: absolute;
						top: 3px;
						left: 3px;
						width: 12px;
						height: 12px;
						fill: var(--c-text-2);
					}
				}
			}
		}

		&.dark .icon svg {
			fill: var(--c-text);
			transition: opacity 0.25s;
		}

		.sun {
			opacity: 1;
		}

		.moon,
		&.dark .sun {
			opacity: 0;
		}

		&.dark {
			.moon {
				opacity: 1;
			}

			.switcher-appearance .check {
				transform: translate(18px);
			}
		}
	}

	.dark {
		.theme-switcher-wrapper {
			--i-border-color: rgba(82, 82, 89, 0.68);
			--i-bg-color: #161618;
			--i-hover-border-color: #8e8e93;
			--i-switch-bg-color: #313136;
			--c-neutral-inverse: #000000;
			--c-text: rgba(255, 255, 245, 0.86);
			--c-text-2: rgba(235, 235, 235, 0.6);
		}
	}
</style>