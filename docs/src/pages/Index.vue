<template>
	<Layout>
		<main class="page-content">
			<div class="banner__wrap">
				<Banner></Banner>
			</div>

			<div class="landing-content">
				<section class="hero__wrap">
					<XyzTransition appear xyz="delay-4 fade small-2 duration-7 ease-out">
						<h1 class="intro-text">The first composable<br />CSS animation toolkit.</h1>
					</XyzTransition>

					<XyzTransition appear xyz="delay-5 stagger-3 fade down small-2 ease-out" duration="auto">
						<div class="tech-logos__wrap xyz-none">
							<IconVue class="xyz-nested"></IconVue>
							<IconReact class="xyz-nested"></IconReact>
							<IconSass class="xyz-nested"></IconSass>
						</div>
					</XyzTransition>

					<XyzTransition appear xyz="delay-5 stagger-3 fade down small-2 ease-out" duration="auto">
						<div class="links__wrap xyz-none">
							<a
								class="cta-button github-link xyz-nested"
								href="https://github.com/ingram-projects/animxyz"
								target="_blank"
							>
								<IconGithub></IconGithub>
								<span>GitHub</span>
							</a>
							<a class="cta-button sandbox-link xyz-nested" href="#sandbox">
								<IconSandbox></IconSandbox>
								<span>Try it out</span>
							</a>
							<a class="cta-button docs-link xyz-nested" href="/docs">
								<IconDocs></IconDocs>
								<span>Documentation</span>
							</a>
						</div>
					</XyzTransition>
				</section>

				<div class="copy__wrap copy-content">
					<section class="about-section">
						<XyzTransition appear xyz="delay-5 fade down ease-out">
							<div class="about-text">
								<p>
									AnimXYZ helps you create, customize, and compose animations for your website. Powered by CSS variables
									to allow a nearly limitless number of unique animations without writing a single keyframe. Save time
									and have complete control over how your elements move. Built for Vue, React, SCSS, and CSS, AnimXYZ
									will bring your website to life.
								</p>
							</div>
						</XyzTransition>
					</section>

					<XyzTransition appear xyz="delay-5 fade down stagger-3 ease-out" duration="auto">
						<section class="features-section xyz-none">
							<div class="feature xyz-nested">
								<h3>Composable</h3>
								<p>
									Making an animation is as simple as describing it in words. Combine a fade with a scale and drop it
									from the top! <code class="text--nowrap">xyz="fade small up"</code>
								</p>
							</div>
							<div class="feature xyz-nested">
								<h3>Performant</h3>
								<p>
									Silky smooth animations out of the box. Only <code>2.64kB</code> for base functionality and
									<code>11.7kB</code> if you include convenient utilities.
								</p>
							</div>
							<div class="feature xyz-nested">
								<h3>Customizable</h3>
								<p>
									Use our provided animation utilities or make your own. Override any animation properties with simple
									CSS variables. <code class="text--nowrap">--xyz-translate-y: 42%;</code>
								</p>
							</div>
							<div class="feature xyz-nested">
								<h3>Nest &amp; Stagger</h3>
								<p>
									Stagger lists of elements in both forward and reverse order, while animating nested items in sync with
									their parents.
								</p>
							</div>
						</section>
					</XyzTransition>
				</div>
			</div>

			<XyzTransition appear xyz="fade down ease-out" style="--xyz-delay: 0.6s">
				<section class="used-by copy-content">
					<h3>AnimXYZ is used by:</h3>
					<ul class="used-by__list">
						<li class="used-by__item">
							<a href="https://yaherd.co/" target="_blank">
								<GImage
									src="@/assets/images/yaherd-logo.svg"
									alt="Yaherd Logo"
									width="240"
									height="54"
									:immediate="true"
								/>
								<span class="screen-reader-only">YaHerd</span>
							</a>
						</li>
					</ul>
				</section>
			</XyzTransition>

			<XyzTransition appear xyz="fade down ease-out" style="--xyz-delay: 0.7s">
				<footer class="created-by copy-content">
					<p>
						Created by <a href="https://milesingram.me/" target="_blank">Miles Ingram</a> and
						<a href="https://mattaningram.com" target="_blank">Mattan Ingram</a>.
					</p>
				</footer>
			</XyzTransition>

			<div class="sandbox__wrap">
				<Sandbox v-bind="sandboxProps" id="sandbox"></Sandbox>
			</div>
		</main>
	</Layout>
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
	<XyzTransition duration="auto" v-xyz="data.utilities" :style="data.variables" v-on="data.listeners">
		<div class="square-group xyz-none" v-show="data.toggled">
			<div class="square xyz-nested" v-for="index in 3" :key="index"></div>
		</div>
	</XyzTransition>
</div>
						`,
						code: [
							{
								name: 'HTML',
								content: `
##html
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
							{
								name: 'Vue',
								content: `
##vue
<XyzTransitionGroup class="square-group" \${data.utilitiesString && \`xyz="\${data.utilitiesString}"\`}>
	<div class="square" v-show="\${data.toggled}"></div>
	<div class="square" v-show="\${data.toggled}"></div>
	<div class="square" v-show="\${data.toggled}"></div>
</XyzTransitionGroup>

\${data.variablesString && \`
##html
<style>
	.square-group { \${data.variablesString} }
</style>
\`}
								`,
							},
							{
								name: 'React',
								content: `
##jsx
<XyzTransitionGroup className="square-group" \${data.utilitiesString && \`xyz="\${data.utilitiesString}"\`}>
	{\${data.toggled} && <div className="square" />}
	{\${data.toggled} && <div className="square" />}
	{\${data.toggled} && <div className="square" />}
</XyzTransitionGroup>

\${data.variablesString && \`
##html
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
	font-weight: 650;
	line-height: 1.35;
	max-width: 48rem;
	text-align: center;
	margin: 0 auto;

	@include media('<tablet') {
		font-size: 2.5rem;
	}

	@include media('<phone') {
		font-size: 1.75rem;
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

		& + & {
			margin-top: 0;
			margin-left: $sp-xxs;
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

	p {
		line-height: 1.65;
	}

	@include media('<phone') {
		font-size: 1.125rem;
	}
}

.features-section {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: $sp-xl;
	margin-bottom: $sp-xxl;

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

.used-by {
	margin: 0 auto;

	h3 {
		text-align: center;
	}
}

.used-by__list {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	list-style: none;
	margin-top: $sp-m;
}

.used-by__item {
	margin-bottom: $sp-s;
	padding: 0 $sp-s;

	a {
		display: block;

		&::before {
			display: none;
		}

		&:focus {
			outline: 2px auto $cyan;
		}
	}

	img {
		display: block;
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
