<template>
	<layout>
		<main class="page-content">
			<div class="banner__wrap">
				<banner></banner>
			</div>

			<div class="landing-content">
				<xyz-transition appear xyz="delay-4 fade small-2 duration-7 ease-out">
					<h1 class="intro-text">The first composable CSS animation framework.</h1>
				</xyz-transition>

				<xyz-transition appear xyz="delay-5 stagger-3 fade down small-2 ease-out" duration="auto">
					<div class="links__wrap xyz-none">
						<a
							class="cta-button github-link xyz-nested"
							href="https://github.com/ingram-projects/animxyz"
							target="_blank"
						>
							<icon-github></icon-github>
							<span>GitHub</span>
						</a>
						<!-- <a class="cta-button sandbox-link xyz-nested" href="#sandbox">
							<icon-sandbox></icon-sandbox>
							<span>Sandbox</span>
						</a> -->
						<a class="cta-button docs-link xyz-nested" href="/docs">
							<icon-docs></icon-docs>
							<span>Docs</span>
						</a>
					</div>
				</xyz-transition>

				<xyz-transition appear xyz="delay-5 stagger-3 fade down small-2 ease-out" duration="auto">
					<div class="tech-logos__wrap xyz-none">
						<icon-vue class="xyz-nested"></icon-vue>
						<icon-react class="xyz-nested"></icon-react>
						<icon-sass class="xyz-nested"></icon-sass>
					</div>
				</xyz-transition>

				<div class="copy__wrap copy-content">
					<section class="about-section">
						<xyz-transition appear xyz="delay-5 fade down ease-out">
							<div class="about-text">
								<p>
									AnimXYZ helps you create, customize, and compose animations for your website with simple HTML
									attributes attributes and CSS utilities. Instead of writing similar keyframes over and over, or
									relying on libraries that are limited to a specific set, use AnimXYZ to save you time and give you
									complete control over how your elements move. Built for Vue, React, SCSS, and CSS, AnimXYZ will bring
									your website to life.
								</p>
							</div>
						</xyz-transition>
					</section>

					<xyz-transition appear xyz="delay-5 fade down stagger-3 ease-out" duration="auto">
						<section class="features-section xyz-none">
							<div class="feature xyz-nested">
								<h3>Composable</h3>
								<p>
									AnimXYZ helps you create, customize, and compose animations for your website with simple HTML
									attributes and CSS utilities.
								</p>
							</div>
							<div class="feature xyz-nested">
								<h3>Performant</h3>
								<p>
									AnimXYZ helps you create, customize, and compose animations for your website with simple HTML
									attributes and CSS utilities.
								</p>
							</div>
							<div class="feature xyz-nested">
								<h3>Customizable</h3>
								<p>
									AnimXYZ helps you create, customize, and compose animations for your website with simple HTML
									attributes and CSS utilities.
								</p>
							</div>
							<div class="feature xyz-nested">
								<h3>Attributes</h3>
								<p>
									AnimXYZ helps you create, customize, and compose animations for your website with simple HTML
									attributes and CSS utilities.
								</p>
							</div>
						</section>
					</xyz-transition>
				</div>
			</div>

			<xyz-transition appear xyz="delay-5 fade down ease-out">
				<footer class="created-by copy-content" style="--xyz-delay: 0.6s">
					<p>
						Created by <a href="https://milesingram.me/" target="_blank">Miles Ingram</a> and
						<a href="https://mattaningram.com" target="_blank">Mattan Ingram</a>.
					</p>
				</footer>
			</xyz-transition>
		</main>
	</layout>
</template>

<script>
import Banner from '~/components/banner/Banner'
import IconDocs from '~/assets/icons/IconDocs.svg'
import IconGithub from '~/assets/icons/IconGithub.svg'
import IconReact from '~/assets/icons/IconReact.svg'
// import IconSandbox from '~/assets/icons/IconSandbox.svg'
import IconSass from '~/assets/icons/IconSass.svg'
import IconVue from '~/assets/icons/IconVue.svg'

export default {
	components: {
		Banner,
		IconDocs,
		IconGithub,
		IconReact,
		// IconSandbox,
		IconSass,
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

.landing-content {
	max-width: 90%;
	margin: 0 auto;
}

.copy__wrap {
	width: 100%;
	max-width: 44rem;
	margin: 0 auto;
	margin-bottom: $sp-xxxl;
}

.about-section {
	margin-bottom: $sp-xxl;
}

.intro-text {
	--xyz-duration: 0.7s;
	color: primary-color(800);
	font-size: $fs-xxxl;
	font-weight: 600;
	line-height: 1.35;
	max-width: 48rem;
	text-align: center;

	@include media('<phone') {
		font-size: $fs-xl;
	}
}

.tech-logos__wrap {
	display: flex;
	justify-content: center;
	margin: $sp-l 0;

	.icon-svg {
		@include size(3rem);
	}

	.icon-svg + .icon-svg {
		margin-left: $sp-m;
	}
}

.about-text {
	--text-color: #{primary-color(700)};
	font-size: $fs-l;
	font-weight: 400;

	@include media('<phone') {
		font-size: 1.125rem;
	}
}

.features-section {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: $sp-xl;

	p {
		font-size: $fs-m;
		line-height: 1.75;
		color: primary-color(700);
	}
}

.links__wrap {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: $sp-l auto;
}

.cta-button {
	--icon-color: #{primary-color(600)};
	background-color: primary-color(100);
	border-bottom: 3px solid primary-color(300);
	color: primary-color(600);
	height: 3rem;
	width: 16rem;
	border-radius: $br-l;
	padding: 0 $sp-s;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	font-weight: 600;
	font-size: 1.125rem;
	text-decoration: none;
	transition: 0.2s $ease-in-out;
	transition-property: background-color, box-shadow, border;

	& + & {
		margin-left: $sp-s;
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

.created-by {
	--text-color: #{primary-color(600)};
	font-weight: 500;
	font-size: $fs-s;
	margin-top: $sp-xxl;
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
}
</style>
