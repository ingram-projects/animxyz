<template>
	<layout>
		<main class="page-content">
			<div class="banner__wrap">
				<banner></banner>
			</div>

			<xyz-transition appear>
				<div class="intro__wrap" xyz="fade small-2 duration-7 ease-out-back">
					<p class="intro-text">
						The first truly composable CSS animation toolkit. Built for Vue, React, SCSS, and CSS, AnimXYZ will bring
						your website to life.
					</p>
				</div>
			</xyz-transition>

			<xyz-transition appear xyz="delay-4 stagger-3 fade down small-2 ease-out-back" duration="auto">
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
						<icon-github></icon-github>
						<span>Sandbox</span>
					</a>
					<a class="cta-button docs-link xyz-nested" href="/docs">
						<icon-github></icon-github>
						<span>Docs</span>
					</a>
				</div>
			</xyz-transition>
		</main>
	</layout>
</template>

<script>
import Banner from '~/components/banner/Banner'
import IconGithub from '~/assets/icons/IconGithub.svg'

export default {
	components: {
		Banner,
		IconGithub,
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
	margin: $sp-xxl auto;
	padding: 0 $sp-m;
	width: 100%;
	max-width: 80rem;

	@include media('<phone') {
		margin: $sp-l auto;
		max-width: 80vw;
	}
}

.intro__wrap {
	--xyz-duration: 0.7s;
	--xyz-delay: 1.2s;
	margin: 0 auto;
	margin-bottom: $sp-xxl;
	text-align: center;
}

.intro-text {
	padding: 0 $sp-l;
	font-size: $fs-xl;
	font-weight: 500;
	line-height: 1.75;
	max-width: 56ch;

	@include media('<phone') {
		font-size: $fs-l;
	}
}

.links__wrap {
	display: grid;
	grid-gap: $sp-l;
	grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
	max-width: 100%;
	padding: 0 $sp-m;
	margin: 0 auto;
	margin-bottom: $sp-xxl;

	@include media('<tablet') {
		grid-template-columns: 1fr;
		grid-gap: $sp-s;
		width: 24rem;
	}
}

.cta-button {
	--icon-color: #{primary-color(600)};
	height: 3rem;
	border-radius: $br-l;
	padding: 0 $sp-s;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	border: 2px solid primary-color(500);
	color: primary-color(600);
	font-weight: 600;
	font-size: 1.125rem;
	text-decoration: none;
	transition: background-color 0.2s $ease-in-out, box-shadow 0.2s $ease-in-out;

	svg {
		@include size(1.5rem);
		transition: transform 0.3s $ease-out-back;
		margin-right: $sp-xs;
	}

	&:hover,
	&:focus {
		--icon-color: #{primary-color(700)};
		color: primary-color(700);
		outline: none;
		background-color: primary-color(500, 0.15);

		svg {
			transform: scale(1.15);
		}
	}

	&:focus {
		box-shadow: 0 0 0 4px primary-color(500, 0.5);
	}
}

.docs-link {
	--icon-color: #{primary-color(100)};
	border: none;
	background-color: primary-color(700);
	color: primary-color(100);

	&:hover,
	&:focus {
		--icon-color: #{primary-color(50)};
		color: primary-color(50);
		outline: none;
		background-color: primary-color(800);
	}

	&:focus {
		box-shadow: 0 0 0 4px primary-color(600, 0.5);
	}
}

.sections__wrap {
	margin: 0 auto;
	margin-bottom: $sp-xxxl;
	width: 100%;
	max-width: 80rem;
}
</style>
