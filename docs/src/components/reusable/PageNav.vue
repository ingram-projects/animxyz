<template>
	<div class="page-nav__wrap" :class="{ open: value }">
		<focus-lock :disabled="!value">
			<xyz-transition appear>
				<button class="nav-button" xyz="fade delay-4" @click="toggleNav(!value)">
					<div class="logo-wrap">
						<anim-xyz-logo></anim-xyz-logo>
					</div>
					<span class="nav-button__text logo-text">AnimXYZ</span>
					<span class="nav-button__text toggle-text">{{ value ? 'Close' : 'Menu' }}</span>
				</button>
			</xyz-transition>

			<xyz-transition
				appear
				xyz="ease-in-out duration-3"
				v-xyz="{ 'left-100': $mq.above('tablet'), 'down-100': $mq.below('tablet') }"
				:duration="2000"
			>
				<nav class="page-nav" v-if="value">
					<div class="nav-sections__wrap">
						<scrollactive
							tag="ul"
							class="nav-sections"
							xyz="fade left stagger-1"
							active-class="active"
							:modify-url="false"
						>
							<li
								v-for="section in sections"
								class="nav-section__item xyz-in-nested"
								@click="onSectionClick"
								:key="section.title"
							>
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
						class="github-link xyz-in-nested"
						xyz="fade delay-3 small ease-out-back"
						href="https://github.com/ingram-projects/animxyz"
						target="_blank"
					>
						<icon-github></icon-github>
						<span>View on GitHub</span>
					</a>
				</nav>
			</xyz-transition>
		</focus-lock>
	</div>
</template>

<script>
import AnimXyzLogo from '~/components/reusable/AnimXyzLogo'
import FocusLock from 'vue-focus-lock'
import IconGithub from '~/assets/icons/IconGithub.svg'

export default {
	name: 'PageNav',
	props: ['value', 'sections'],
	components: {
		AnimXyzLogo,
		FocusLock,
		IconGithub,
	},
	methods: {
		toggleNav(toggled) {
			if (this.$mq.below('large')) {
				this.$emit('input', toggled)
			}
		},
		onSectionClick() {
			this.toggleNav(false)
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
	background-color: primary-color(900, 0.95);
	z-index: 1;

	@include media('<tablet') {
		left: 0;
		right: 0;
		width: auto;
		backdrop-filter: blur(4px);
	}
}

.nav-sections__wrap {
	display: flex;
	margin-top: 5.5rem;
	flex-grow: 1;
	overflow-y: auto;

	@include media('<tablet') {
		margin-top: 0;
		order: 2;
	}
}

.nav-sections {
	width: 100%;
	margin: auto 0;
	list-style: none;

	@include media('<tablet') {
		margin: 0;
	}
}

.nav-section__header {
	color: primary-color(200);
	font-size: $fs-m;
	font-family: $font-stack-mono;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	padding: 0 $sp-l;
	margin-top: $sp-m;
}

.nav-section__item {
	font-family: $font-stack-mono;
	font-size: $fs-l;
}

.nav-section__link {
	display: flex;
	align-items: center;
	height: 2.5rem;
	padding: 0 $sp-l;
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
			transform: translateX($sp-xxs);
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
			transform: translateX($sp-s);
		}
	}
}

.link-title {
	transition: transform 0.2s $ease-in-out;
}

.link-dot__wrap {
	@include size(1.25rem);
	display: flex;
	margin-right: $sp-m;
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
	display: flex;
	align-items: center;
	position: fixed;
	top: $sp-m;
	left: $sp-m;
	z-index: 2;

	&:hover {
		.nav-button__text {
			transform: translateX($sp-xxxs);
			opacity: 1;
		}

		::v-deep {
			.cube-wrap {
				transform: scale(1.25) rotateX(60deg) rotateZ(45deg);
			}
		}
	}

	@include media('<tablet') {
		top: initial;
		left: 50%;
		bottom: $sp-l;
		margin-left: -1.25rem;
	}

	@include media('>=large') {
		pointer-events: none;
	}

	.open & {
		--logo-side-z: -3px;
	}
}

.logo-wrap {
	@include size(2.5rem);
}

.nav-button__text {
	font-family: $font-stack-mono;
	font-size: $fs-xl;
	font-weight: bold;
	margin-left: $sp-s;
	opacity: 0.85;
	transition: color 0.2s $ease-in-out, opacity 0.2s $ease-in-out, transform 0.3s $ease-out-back;

	@include media('<tablet') {
		display: none;
	}
}

.logo-text {
	color: primary-color(100);

	@include media('<large') {
		display: none;
	}
}

.toggle-text {
	color: primary-color(800);

	.open & {
		color: primary-color(100);
	}

	@include media('>=large') {
		display: none;
	}
}

.github-link {
	--icon-color: #{primary-color(200)};
	height: 3rem;
	border-radius: $br-l;
	padding: 0 $sp-s;
	margin: $sp-s;
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
		margin-right: $sp-xs;
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
