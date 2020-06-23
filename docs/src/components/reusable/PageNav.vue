<template>
	<div class="page-nav__wrap" :class="{ open: value }">
		<button class="nav-button xyz-in" xyz="fade duration-5 ease-out" @click="toggleNav(!value)">
			<div class="logo-wrap">
				<anim-xyz-logo></anim-xyz-logo>
			</div>
			<span class="nav-button__text">{{ value ? 'Close' : 'Menu' }}</span>
		</button>

		<nav class="page-nav">
			<div class="nav-sections__wrap">
				<scrollactive tag="ul" class="nav-sections" active-class="active" :modify-url="false" xyz="fade left">
					<li v-for="section in sections" class="nav-section__item" :class="{ 'xyz-in': value }" :key="section.title">
						<a :href="`#${section.anchor}`" class="nav-section__link scrollactive-item">
							<div class="link-dot__wrap">
								<span class="link-dot"></span>
							</div>
							<span class="link-title">{{ section.title }}</span>
						</a>
					</li>
				</scrollactive>
			</div>
			<a
				class="github-link xyz-in"
				xyz="fade small up turn-ccw duration-4 ease-out-back"
				href="https://github.com/ingram-projects/animxyz"
				target="_blank"
			>
				<icon-github></icon-github>
				<span>View on GitHub</span>
			</a>
		</nav>
	</div>
</template>

<script>
import AnimXyzLogo from '~/components/reusable/AnimXyzLogo'
import IconGithub from '~/assets/icons/IconGithub.svg'

export default {
	name: 'PageNav',
	props: ['value', 'sections'],
	components: {
		AnimXyzLogo,
		IconGithub,
	},
	methods: {
		toggleNav(toggled) {
			this.$emit('input', toggled)
		},
	},
}
</script>

<style lang="scss" scoped>
.page-nav {
	position: fixed;
	display: flex;
	flex-direction: column;
	width: 20rem;
	top: 0;
	height: 100vh;
	background-color: primary-color(900);
	z-index: 1;
	transform: translateX(-100%);
	transition: transform 0.3s $ease-in-out;

	.open & {
		transform: translateX(0);
		@include media('<tablet') {
			top: 100vh;
			transform: translateY(-100vh);
		}
	}

	@include media('<tablet') {
		top: 100vh;
		left: 0;
		right: 0;
		width: auto;
		transform: initial;
	}
}

.nav-sections__wrap {
	display: flex;
	align-items: center;
	margin-top: 5.5rem;
	flex-grow: 1;
	overflow-y: auto;
}

.nav-sections {
	width: 100%;
	margin: auto 0;
	list-style: none;
	--xyz-stagger: 0.075s;

	@include media('<tablet') {
		margin-top: 0;
		order: 2;
	}
}

.nav-section__item {
	font-family: $font-stack-mono;
	font-size: $fs-large;
}

.nav-section__link {
	display: flex;
	align-items: center;
	height: 3rem;
	padding: 0 $spacing-l;
	color: primary-color(300);
	text-decoration: none;

	&:hover {
		.link-dot {
			@include size(1.25rem);
			opacity: 0.5;
			border-radius: $br-m;
			transition-duration: 0.2s;
		}

		.link-title {
			transform: translateX($spacing-xxs);
		}
	}

	&.active {
		.link-dot {
			@include size(1.25rem);
			opacity: 1;
			background-color: $cyan;
			border-radius: $br-m;
			transform: none;
			transition: all 0.25s $ease-out-back;
		}

		.link-title {
			font-weight: bold;
			color: primary-color(100);
			transform: translateX($spacing-s);
		}
	}
}

.link-title {
	transition: transform 0.2s $ease-in-out;
}

.link-dot__wrap {
	@include size(1.25rem);
	display: flex;
	margin-right: $spacing-m;
}

.link-dot {
	@include circle(0.25rem);
	margin: auto;
	opacity: 0.2;
	background-color: primary-color(100);
	transform: rotate(-0.125turn);
	transition: all 0.25s $ease-in-out;
}

.nav-button {
	--xyz-delay: 0.4s;
	display: flex;
	align-items: center;
	position: fixed;
	top: $spacing-m;
	left: $spacing-m;
	z-index: 2;

	@include media('<tablet') {
		top: initial;
		left: 50%;
		bottom: $spacing-s;
		margin-left: -1.25rem;
	}
}

.logo-wrap {
	@include size(2.5rem);
}

.nav-button__text {
	color: primary-color(800);
	font-family: $font-stack-mono;
	font-size: $fs-large;
	font-weight: bold;
	margin-left: $spacing-s;
	transition: color 0.2s $ease-in-out;

	.open & {
		color: primary-color(100);
	}

	@include media('<tablet') {
		display: none;
	}
}

.github-link {
	--xyz-delay: 1.4s;
	--icon-color: #{primary-color(200)};
	height: 3rem;
	border-radius: $br-l;
	padding: 0 $spacing-s;
	margin: $spacing-s;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	z-index: 2;
	background-color: primary-color(500, 0.2);
	color: var(--icon-color);
	text-decoration: none;
	transition: background-color 0.2s $ease-in-out;

	svg {
		@include size(1.5rem);
		transition: transform 0.3s $ease-out-back;
		margin-right: $spacing-xs;
	}

	&:hover,
	&:focus {
		--icon-color: #{primary-color(50)};
		background-color: primary-color(500, 0.3);

		svg {
			transform: scale(1.15);
		}
	}

	@include media('<tablet') {
		order: 1;
	}
}
</style>
