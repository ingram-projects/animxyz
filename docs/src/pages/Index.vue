<template>
	<layout>
		<main class="page-content">
			<div class="banner__wrap">
				<banner></banner>
			</div>

			<div class="landing-content">
				<section class="hero__wrap">
					<xyz-transition appear xyz="delay-4 fade small-2 duration-7 ease-out">
						<h1 class="intro-text">The first composable CSS animation toolkit.</h1>
					</xyz-transition>

					<xyz-transition appear xyz="delay-5 stagger-3 fade down small-2 ease-out" duration="auto">
						<div class="tech-logos__wrap xyz-none">
							<icon-vue class="xyz-nested"></icon-vue>
							<icon-react class="xyz-nested"></icon-react>
							<icon-sass class="xyz-nested"></icon-sass>
						</div>
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
							<a class="cta-button sandbox-link xyz-nested" href="#sandbox">
								<icon-sandbox></icon-sandbox>
								<span>Sandbox</span>
							</a>
							<a class="cta-button docs-link xyz-nested" href="/docs">
								<icon-docs></icon-docs>
								<span>Documentation</span>
							</a>
						</div>
					</xyz-transition>
				</section>

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
									Mix and match animations without writing any keyframes. Combine a spin with a scale and drop it from
									the top!
								</p>
							</div>
							<div class="feature xyz-nested">
								<h3>Performant</h3>
								<p>
									Silky smooth animations without even trying. Only <code>2.64kB</code> for base functionality and
									<code>10.9kB</code> if you include convenient shortcut utilities.
								</p>
							</div>
							<div class="feature xyz-nested">
								<h3>Customizable</h3>
								<p>
									Use our provided animation utilities or make your own. Override any animation properties with simple
									CSS variables.
								</p>
							</div>
							<div class="feature xyz-nested">
								<h3>Attributes</h3>
								<p>
									Use an <code>xyz</code> attribute selector and CSS variables to easily create inheritable animations.
								</p>
							</div>
							<div class="feature xyz-nested">
								<h3>Staggering</h3>
								<p>Staggered animation of lists of elements in both forward and reverse order.</p>
							</div>
							<div class="feature xyz-nested">
								<h3>Nested</h3>
								<p>Animate sub-elements of an item in sync with their parent to create eye-catching details.</p>
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

			<div class="sandbox__wrap">
				<sandbox v-bind="sandboxProps" id="sandbox"></sandbox>
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
import IconSass from '~/assets/icons/IconSass.svg'
import IconVue from '~/assets/icons/IconVue.svg'
import Sandbox from '~/components/reusable/Sandbox'

export default {
	components: {
		Banner,
		IconDocs,
		IconGithub,
		IconReact,
		IconSandbox,
		IconSass,
		IconVue,
		Sandbox,
	},
	data() {
		return {
			sandboxProps: {
				name: 'sandbox',
				examples: [
					{
						name: 'Sandbox',
						template: `
				      <div class="example-wrap">
				        <xyz-transition duration="auto" v-xyz="data.utilities" :style="data.variables" v-on="data.listeners">
				          <div class="square-group xyz-none" v-show="data.toggled">
				            <div class="square xyz-nested" v-for="index in 3" :key="index"></div>
				          </div>
				        </xyz-transition>
				      </div>
						`,
						code: [
							{
								language: 'html',
								content: `
				          <div class="square-group" \${data.utilitiesString && \`xyz="\${data.utilitiesString}"\`}>
				            <div class="square \${data.mode}"></div>
				            <div class="square \${data.mode}"></div>
				            <div class="square \${data.mode}"></div>
				          </div>

									\${data.variablesString && \`
				          <style>
				            .square-group { \${data.variablesString} }
				          </style>
				          \`}
								`,
							},
						],
					},
				],
				modifiers: {
					utilities: {
						defaults: ['fade'],
					},
					variables: true,
					presets: [
						{
							title: '⏬ Drop',
							utilities: ['fade', 'down-100', 'back-5'],
						},
						{
							title: '🎈 Yoink!',
							variables: ['stagger: 0.2s', 'translate-y: 400%', 'scale-x: 0', 'ease: cubic-bezier(.26,2.05,.84,.38)'],
						},
						{
							title: '📺 Click.',
							variables: ['duration: 0.6s', 'scale-x: 1.25', 'scale-y: 0'],
						},
						{
							title: `🌀 It's gone spiral!`,
							variables: ['rotate-z: 1turn', 'origin: center -200%', 'duration: 2s', 'scale-x: 0', 'scale-y: 0'],
						},
						{
							title: '💫 Engage.',
							variables: [
								'rotate-x: 90deg',
								'rotate-z: -180deg',
								'origin: -200%',
								'stagger: 0.1s',
								'duration: 0.75s',
								'perspective: 10px',
								'translate-z: 100px',
								'translate-y: 10vh',
							],
						},
					],
					groups: [
						{
							name: 'Fade',
							types: ['opacity'],
						},
						{
							name: 'Translate',
							types: ['translate'],
						},
						{
							name: 'Rotate',
							types: ['rotate'],
						},
						{
							name: 'Scale',
							types: ['scale'],
						},
						{
							name: 'Skew',
							types: ['skew'],
						},
						{
							name: 'Perspective',
							types: ['perspective'],
						},
						{
							name: 'Origin',
							types: ['origin'],
						},
						{
							name: 'Timing',
							types: ['duration', 'delay'],
						},
						{
							name: 'Ease',
							types: ['ease'],
						},
						{
							name: 'Stagger',
							types: ['stagger'],
						},
					],
				},
			},
		}
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

.hero__wrap {
	position: relative;
	margin: 0 auto;
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
	margin: 0 auto;

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

.copy__wrap {
	width: 100%;
	max-width: 44rem;
	margin: 0 auto;
}

.about-section {
	margin-bottom: $sp-xxl;
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

	@include media('<tablet') {
		grid-template-columns: 1fr;
	}

	@include media('<phone') {
		grid-gap: $sp-l;
	}
}

.created-by {
	--text-color: #{primary-color(600)};
	font-weight: 500;
	font-size: $fs-s;
	margin: 0 auto;
	margin-top: $sp-xxxl;
	margin-bottom: 2.25rem;

	@include media('<phone') {
		margin-bottom: $sp-xxxl;
	}
}

.sandbox__wrap {
	position: relative;
}

.sandbox {
	min-height: 100vh;
}
</style>
