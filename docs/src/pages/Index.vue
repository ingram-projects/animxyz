<template>
	<Layout>
		<main class="page-content">
			<div class="banner__wrap">
				<Banner></Banner>
			</div>

			<div class="landing-content">
				<section class="hero__wrap">
					<XyzTransition appear-visible xyz="fade small-2 duration-7 ease-out delay-1">
						<h1 class="intro-text">The first composable<br />CSS animation toolkit.</h1>
					</XyzTransition>

					<XyzTransition appear-visible xyz="fade down small-2 stagger-3 ease-out delay-2" duration="auto">
						<div class="tech-logos__wrap xyz-none">
							<IconVue class="xyz-nested"></IconVue>
							<IconReact class="xyz-nested"></IconReact>
							<IconSass class="xyz-nested"></IconSass>
						</div>
					</XyzTransition>

					<XyzTransitionGroup
						class="links__wrap"
						appear-visible
						xyz="fade narrow-100% stagger-3 ease-out delay-3"
						duration="auto"
					>
						<a
							class="cta-button github-link"
							href="https://github.com/ingram-projects/animxyz"
							target="_blank"
							key="github"
						>
							<div class="cta-content xyz-nested" xyz="fade big-100% ease-out delay-5">
								<IconGithub></IconGithub>
								<span>GitHub</span>
							</div>
						</a>
						<a class="cta-button sandbox-link" href="#sandbox" key="sandbox">
							<div class="cta-content xyz-nested" xyz="fade big-100% ease-out delay-5">
								<IconSandbox></IconSandbox>
								<span>Try it out</span>
							</div>
						</a>
						<a class="cta-button docs-link" href="/docs" key="documentation">
							<div class="cta-content xyz-nested" xyz="fade big-100% ease-out delay-5">
								<IconDocs></IconDocs>
								<span>Documentation</span>
							</div>
						</a>
					</XyzTransitionGroup>
				</section>

				<div class="copy__wrap copy-content">
					<XyzTransition appear-visible xyz="fade down ease-out delay-2">
						<section class="about-section">
							<div class="about-text">
								<p>
									AnimXYZ helps you create, customize, and compose animations for your website. Powered by CSS variables
									to allow a nearly limitless number of unique animations without writing a single keyframe. Save time
									and have complete control over how your elements move. Built for Vue, React, SCSS, and CSS, AnimXYZ
									will bring your website to life.
								</p>
							</div>
						</section>
					</XyzTransition>

					<XyzTransition appear-visible xyz="fade front-1 stagger-2 ease-out delay-2" duration="auto">
						<section class="features-section xyz-none">
							<div class="feature feature-composable xyz-nested">
								<h3>Composable</h3>
								<p>
									Making an animation is as simple as describing it in words. Combine a fade with a scale and drop it
									from the top! <code class="text--nowrap">xyz="fade small up"</code>
								</p>
								<Shine></Shine>
							</div>
							<div class="feature feature-customizable xyz-nested">
								<h3>Customizable</h3>
								<p>
									Out-of-the-box utilities not enough? Fine-tune any animation with CSS variables to your heart's
									content. Simple as: <code class="text--nowrap">--xyz-translate-y: 42%;</code>
								</p>
								<Shine></Shine>
							</div>
							<div class="feature feature-plug-play xyz-nested">
								<h3>Plug & Play</h3>
								<p>
									Works with HTML and CSS, or use our <a href="/docs#vue-installation">Vue</a> and
									<a href="/docs#react-installation">React</a> integrations for even more power.
								</p>
								<Shine></Shine>
							</div>
							<div class="feature feature-nest-stagger xyz-nested">
								<h3>Nest & Stagger</h3>
								<p>
									Stagger lists of elements in both forward and reverse order, while animating nested items in sync with
									their parents.
								</p>
								<Shine></Shine>
							</div>
							<div class="feature feature-performant xyz-nested">
								<h3>Performant</h3>
								<p>
									Silky smooth animations out of the box. Only <code>2.68kB</code> for base functionality and
									<code>11.4kB</code> if you include convenient utilities.
								</p>
								<Shine></Shine>
							</div>
							<div class="feature feature-less-code xyz-nested">
								<h3>Less Code</h3>
								<p>
									Powerful CSS animations without custom keyframes for every subtle animation need. Less fuss = more
									fun.
								</p>
								<Shine></Shine>
							</div>
						</section>
					</XyzTransition>
				</div>
			</div>

			<XyzTransition appear-visible xyz="fade down ease-out delay-2">
				<section class="used-by copy-content">
					<h3>AnimXYZ is used by:</h3>
					<ul class="used-by__list">
						<li class="used-by__item">
							<a href="https://yaherd.co/" target="_blank">
								<GImage
									src="@/assets/images/yaherd-logo.svg"
									alt="Yaherd Logo"
									width="690"
									height="156"
									:immediate="true"
								/>
								<span class="screen-reader-only">YaHerd</span>
							</a>
						</li>
						<li class="used-by__item">
							<a href="https://visible.page/" target="_blank">
								<GImage
									src="@/assets/images/visible-logo.svg"
									alt="Visible Logo"
									width="247"
									height="64"
									:immediate="true"
								/>
								<span class="screen-reader-only">Visible</span>
							</a>
						</li>
					</ul>
				</section>
			</XyzTransition>

			<XyzTransition appear-visible xyz="fade down ease-out delay-2">
				<footer class="created-by copy-content">
					<p>
						Created by <a href="https://milesingram.me/" target="_blank">Miles Ingram</a> and
						<a href="https://mattaningram.com" target="_blank">Mattan Ingram</a>
						<a href="https://twitter.com/mattaningram" class="social-link" target="_blank">
							<IconTwitter></IconTwitter><span class="screen-reader-only">Twitter</span>
						</a>
					</p>
					<p>
						Built with <a href="https://vuejs.org/" target="_blank">Vue</a>,
						<a href="https://gridsome.org/" target="_blank">Gridsome</a>, and AnimXYZ. Hosted on
						<a href="https://www.netlify.com/" target="_blank">Netlify</a>.
					</p>
				</footer>
			</XyzTransition>

			<XyzTransition appear-visible xyz="fade duration-10 delay-2">
				<div class="sandbox__wrap">
					<Sandbox v-bind="sandboxProps" id="sandbox"></Sandbox>
				</div>
			</XyzTransition>

			<XyzTransition appear-visible xyz="fade duration-10 delay-2">
				<DarkModeToggle></DarkModeToggle>
			</XyzTransition>
		</main>
	</Layout>
</template>

<script>
import Banner from '~/components/banner/Banner'
import DarkModeToggle from '~/components/reusable/DarkModeToggle'
import Sandbox from '~/components/reusable/Sandbox'
import Shine from '~/components/reusable/Shine'

export default {
	components: {
		Banner,
		DarkModeToggle,
		Sandbox,
		Shine,
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
		<div class="item-group xyz-none" v-if="data.toggled">
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
<div class="item-group" \${data.utilitiesString && \`xyz="\${data.utilitiesString}"\`}>
	<div class="square \${data.mode}"></div>
	<div class="square \${data.mode}"></div>
	<div class="square \${data.mode}"></div>
</div>

\${data.variablesString && \`
<style>
	.item-group { \${data.variablesString} }
</style>
\`}
								`,
							},
							{
								name: 'Vue',
								content: `
##vue
<XyzTransitionGroup class="item-group" \${data.utilitiesString && \`xyz="\${data.utilitiesString}"\`}>
	<div class="square" v-if="\${data.toggled}"></div>
	<div class="square" v-if="\${data.toggled}"></div>
	<div class="square" v-if="\${data.toggled}"></div>
</XyzTransitionGroup>

\${data.variablesString && \`
##html
<style>
	.item-group { \${data.variablesString} }
</style>
\`}
								`,
							},
							{
								name: 'React',
								content: `
##jsx
<XyzTransitionGroup className="item-group" \${data.utilitiesString && \`xyz="\${data.utilitiesString}"\`}>
	{\${data.toggled} && <div className="square" />}
	{\${data.toggled} && <div className="square" />}
	{\${data.toggled} && <div className="square" />}
</XyzTransitionGroup>

\${data.variablesString && \`
##html
<style>
	.item-group { \${data.variablesString} }
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
							title: '🎓 Drop out',
							utilities: ['fade', 'down-100%', 'back-5'],
						},
						{
							title: '🌪 Spinny',
							utilities: ['fade', 'down-5', 'rotate-right-50%', 'stagger'],
						},
						{
							title: '⤵️ Flippy',
							utilities: ['fade', 'flip-up', 'flip-left'],
						},
						{
							title: '💾 Floppy',
							utilities: ['fade', 'front-3', 'flip-down-50%', 'duration-10', 'stagger-5'],
						},
						{
							title: '🎈 Yoink!',
							utilities: ['stagger-2', 'narrow-100%'],
							variables: ['translate-y: -350%', 'ease: cubic-bezier(0.5,-1.5,0.5,1.5)'],
						},
						{
							title: '📺 Click',
							utilities: ['duration-6', 'short-100%', 'wide-25%'],
						},
						{
							title: `🌀 It's gone spiral!`,
							variables: ['rotate-z: 1turn', 'origin: center -200%', 'duration: 2s', 'scale-x: 0', 'scale-y: 0'],
						},
						{
							title: '💫 Engage',
							variables: [
								'rotate-x: 90deg',
								'rotate-z: -180deg',
								'origin: -200%',
								'stagger: 0.1s',
								'duration: 0.75s',
								'perspective: 100px',
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
						{
							name: 'Iterate',
							types: ['iterate'],
						},
						{
							name: 'Direction',
							types: ['direction'],
						},
					],
				},
			},
		}
	},
}
</script>

<style lang="scss" scoped>
.page__wrap {
	overflow-x: hidden;
}

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
	width: 100%;
	max-width: 48rem;
	padding: 0 $sp-s;
	margin: 0 auto;

	@include media('<phone') {
		padding: 0 $sp-xs;
	}
}

.hero__wrap {
	position: relative;
	margin: 0 auto;
	margin-bottom: $sp-xxl;
}

.intro-text {
	font-size: $fs-xxxl;
	font-weight: 650;
	line-height: 1.35;
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
	color: primary-color(600);
	border-bottom: 3px solid primary-color(300);
	height: 3rem;
	width: 16rem;
	overflow: hidden;
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

	@include dark-mode {
		--icon-color: #{primary-color(200)};
		background-color: primary-color(700);
		color: primary-color(200);
		border-color: primary-color(800);
	}

	& + & {
		margin-left: $sp-xs;
	}

	svg {
		@include size(1.5rem);
		transition: transform 0.3s $ease-out-back;
	}

	&:hover,
	&:focus {
		--icon-color: #{primary-color(700)};
		background-color: primary-color(300);
		color: primary-color(700);
		border-color: primary-color(400);
		outline: none;

		@include dark-mode {
			--icon-color: #{primary-color(100)};
			background-color: primary-color(600);
			color: primary-color(100);
			border-color: primary-color(700);
		}

		svg {
			transform: scale(1.15);
		}
	}

	&:focus {
		box-shadow: 0 0 0 2px $cyan;
	}

	@include media('<tablet') {
		flex: 1;
		font-size: 1rem;

		& + & {
			margin-top: 0;
			margin-left: $sp-xs;
		}
	}

	@include media('<phone') {
		padding: $sp-xxs;
		height: auto;
		font-size: $fs-s;

		svg {
			flex-shrink: 0;
		}

		& + & {
			margin-top: 0;
			margin-left: $sp-xxs;
		}
	}
}

.cta-content {
	display: flex;
	align-items: center;
	gap: $sp-xs;

	@include media('<phone') {
		flex-direction: column;
		gap: $sp-xxxs;
	}
}

.docs-link {
	--icon-color: #{primary-color(100)};
	background-color: primary-color(600);
	color: primary-color(100);
	border-color: primary-color(700);

	@include dark-mode {
		--icon-color: #{primary-color(800)};
		background-color: primary-color(300);
		color: primary-color(800);
		border-color: primary-color(500);
	}

	&:hover,
	&:focus {
		--icon-color: #{primary-color(50)};
		background-color: primary-color(700);
		color: primary-color(50);
		border-color: primary-color(800);
		outline: none;

		@include dark-mode {
			--icon-color: #{primary-color(800)};
			background-color: primary-color(200);
			color: primary-color(800);
			border-color: primary-color(500);
		}
	}
}

.copy__wrap {
	width: 100%;
	margin: 0 auto;
}

.about-section {
	margin-bottom: $sp-xxl;
}

.about-text {
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
	grid-template-columns: repeat(6, 1fr);
	grid-gap: $sp-xs;
	margin-bottom: $sp-xxl;
	perspective: 1000px;

	p {
		font-size: $fs-s;

		line-height: 1.75;
	}

	@include media('<tablet') {
		grid-template-columns: 1fr;
	}
}

.feature {
	box-shadow: inset 0 0 0 4px primary-color(500, 0.15);
	padding: $sp-m;
	border-radius: $br-m;
	position: relative;
	grid-column: span 3;

	&:nth-child(even) {
		top: $sp-m;
	}

	h3 {
		position: relative;
	}

	@include media('<tablet') {
		grid-column: span 1;
		&:nth-child(even) {
			top: initial;
		}
	}

	.shine {
		--shine-size: 75%;
		--shine-strength: 0.5;
		--shine-diffuse: 0.25;
		position: absolute;
		inset: 0;
		box-shadow: inset 0 0 0 4px $cyan;
		border-radius: $br-m;
		pointer-events: none;
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
	margin-top: $sp-xl;
	gap: $sp-m;
}

.used-by__item {
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
		height: 3.5rem;
		width: auto;
	}
}

.created-by {
	--text-color: #{primary-color(600)};
	text-align: center;
	font-weight: 500;
	font-size: $fs-s;
	padding: 0 $sp-m;
	margin: 0 auto;
	margin-top: $sp-xxxl;
	margin-bottom: 2.25rem;

	@include media('<phone') {
		margin-bottom: $sp-xxxl;
	}

	@include dark-mode {
		--text-color: #{primary-color(400)};
	}
}

.social-link {
	--icon-color: #{primary-color(400)};
	display: inline-block;
	vertical-align: middle;
	margin-left: $sp-xxxs;

	svg {
		@include size(1.125rem);
	}

	&::before {
		display: none;
	}

	&:hover {
		--icon-color: #{primary-color(700)};
	}
}

.sandbox__wrap {
	position: relative;
}

.sandbox {
	min-height: 100vh;
}

.dark-mode-toggle {
	position: absolute;
	top: $sp-m;
	right: $sp-m;

	@include media('<phone') {
		top: $sp-s;
		right: $sp-s;
	}
}
</style>
