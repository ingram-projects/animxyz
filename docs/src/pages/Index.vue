<template>
	<layout>
		<main class="page-content">
			<div class="banner__wrap">
				<banner></banner>
			</div>

			<div class="about__wrap">
				<xyz-transition appear xyz="delay-5 stagger-3 fade down small-2 ease-out" duration="auto">
					<div class="links__wrap">
						<a
							class="cta-button github-link xyz-nested"
							href="https://github.com/ingram-projects/animxyz"
							target="_blank"
						>
							<icon-github></icon-github>
							<span>GitHub</span>
						</a>
						<a class="cta-button sandbox-link xyz-nested" href="#sandbox">
							<icon-sandbox></icon-sandbox>
							<span>Sandbox</span>
						</a>
						<a class="cta-button docs-link xyz-nested" href="/docs">
							<icon-docs></icon-docs>
							<span>Docs</span>
						</a>
					</div>
				</xyz-transition>

				<section class="about-section">
					<xyz-transition appear>
						<div class="intro__wrap" xyz="delay-4 fade small-2 duration-7 ease-out">
							<p class="intro-text">
								The first composable CSS animation framework.
							</p>
						</div>
					</xyz-transition>

					<xyz-transition appear xyz="delay-5 stagger-3 fade down small-2 ease-out" duration="auto">
						<div class="tech-logos__wrap">
							<icon-vue class="xyz-nested"></icon-vue>
							<icon-react class="xyz-nested"></icon-react>
						</div>
					</xyz-transition>

					<xyz-transition appear xyz="delay-5 fade down">
						<div class="about-text xyz-nested">
							<p>
								AnimXYZ helps you create, customize, and compose animations for your website with simple HTML attributes
								and CSS utilities. Instead of writing similar keyframes over and over, or relying on libraries that are
								limited limited to a specific set, use AnimXYZ to save you time and give you complete control over how
								your elements move. Built for Vue, React, SCSS, and CSS, AnimXYZ will bring your website to life.
							</p>
						</div>
					</xyz-transition>
				</section>
			</div>
		</main>
	</layout>
</template>

<script>
import Banner from '~/components/banner/Banner'
import IconDocs from '~/assets/icons/IconDocs.svg'
import IconGithub from '~/assets/icons/IconGithub.svg'
import IconReact from '~/assets/icons/IconReact.svg'
import IconSandbox from '~/assets/icons/IconSandbox.svg'
import IconVue from '~/assets/icons/IconVue.svg'

export default {
	components: {
		Banner,
		IconDocs,
		IconGithub,
		IconReact,
		IconSandbox,
		IconVue,
	},
	metaInfo() {
		return {
			title: '',
		}
	},
}
</script>

<style lang="scss" scoped>
.page-content {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.banner__wrap {
	margin: 12vh auto;
	padding: 0 $sp-m;
	width: 100%;
	max-width: 64rem;

	@include media('<phone') {
		margin: $sp-l auto;
		max-width: 80vw;
	}
}

.about__wrap {
	display: flex;
	max-width: 90%;
	margin: 0 auto;

	@include media('<tablet') {
		display: block;
	}
}

.tech-logos__wrap {
	display: flex;
	margin-bottom: $sp-m;

	.icon-svg {
		@include size(3rem);
		margin-right: $sp-m;
	}
}

.about-section {
	width: 100%;
	max-width: 44rem;
	margin-bottom: $sp-xxxl;
}

.intro__wrap {
	--xyz-duration: 0.7s;
	margin-bottom: $sp-s;
}

.intro-text {
	font-size: $fs-xxl;
	font-weight: 550;
	line-height: 1.5;
	max-width: 48rem;

	@include media('<phone') {
		font-size: $fs-xl;
	}
}

.key-text {
	color: primary-color(500);
}

.about-text {
	font-size: $fs-l;
	font-weight: 400;

	@include media('<phone') {
		font-size: 1.125rem;
	}
}

.links__wrap {
	width: 16rem;
	flex-grow: 1;
	flex-shrink: 0;
	margin-left: $sp-xl;
	order: 2;

	@include media('<tablet') {
		display: flex;
		align-items: center;
		margin-left: 0;
		margin-bottom: $sp-l;
		width: 100%;
	}
}

.cta-button {
	--icon-color: #{primary-color(600)};
	background-color: primary-color(100);
	border-bottom: 3px solid primary-color(300);
	color: primary-color(600);
	height: 3rem;
	border-radius: $br-l;
	padding: 0 $sp-s;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	font-weight: 600;
	font-size: 1.125rem;
	text-decoration: none;
	transition: background-color 0.2s $ease-in-out, box-shadow 0.2s $ease-in-out, border 0.2s $ease-in-out;

	& + & {
		margin-top: $sp-s;
	}

	svg {
		@include size(1.5rem);
		transition: transform 0.3s $ease-out-back;
		margin-right: $sp-xs;
	}

	&:hover,
	&:focus {
		--icon-color: #{primary-color(700)};
		border-color: primary-color(400);
		color: primary-color(700);
		outline: none;
		background-color: primary-color(200, 0.75);

		svg {
			transform: scale(1.15);
		}
	}

	&:focus {
		box-shadow: 0 0 0 4px transparentize($cyan, 0.5);
	}

	@include media('<tablet') {
		flex: 1;

		& + & {
			margin-top: 0;
			margin-left: $sp-xs;
		}
	}

	@include media('<phone') {
		flex-direction: column;
		padding: $sp-xxs;
		height: auto;
		font-size: $fs-s;

		svg {
			margin-right: 0;
			margin-bottom: $sp-xxxs;
			flex-shrink: 0;
		}
	}
}

.docs-link {
	--icon-color: #{primary-color(100)};
	border-color: primary-color(700);
	background-color: primary-color(600);
	color: primary-color(100);

	&:hover,
	&:focus {
		--icon-color: #{primary-color(50)};
		color: primary-color(50);
		border-color: primary-color(800);
		outline: none;
		background-color: primary-color(700);
	}

	// &:focus {
	// 	box-shadow: 0 0 0 4px transparentize($cyan, 0.25);
	// }
}
</style>
