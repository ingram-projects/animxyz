<template>
	<div class="page-nav__wrap" :class="{ open }">
		<focus-lock :disabled="isMediaLarge || !open">
			<xyz-transition appear>
				<button class="nav-button" xyz="fade delay-4" @click="toggle(!open)">
					<div class="logo-wrap">
						<anim-xyz-logo></anim-xyz-logo>
					</div>
					<span class="nav-button__text logo-text">AnimXYZ</span>
					<span class="nav-button__text toggle-text">{{ open ? 'Close' : 'Menu' }}</span>
				</button>
			</xyz-transition>

			<xyz-transition
				appear
				duration="auto"
				xyz="ease-in-out duration-3"
				v-xyz="{ 'left-100': $mq.above('tablet'), 'down-100': $mq.below('tablet') }"
			>
				<nav class="page-nav" v-show="open">
					<div class="nav-list__wrap" v-scroll-lock="$mq.below('tablet') && open">
						<ul class="nav-list" xyz="fade left" style="--xyz-stagger: 0.05s">
							<li class="nav-item xyz-in-nested" :style="{ '--xyz-index': 0 }" key="home">
								<a class="nav-item__link link-home" href="/">
									<div class="link-dot__wrap">
										<span class="link-arrow">←</span>
									</div>
									<span class="link-title"> Splash Page</span>
								</a>
							</li>
							<li
								v-for="(section, index) in sections"
								class="nav-item xyz-in-nested"
								@click="onSectionClick"
								:style="{ '--xyz-index': index + 1 }"
								:key="section.title"
							>
								<h2 class="nav-item__header" v-if="section.header">{{ section.title }}</h2>

								<a
									class="nav-item__link"
									:class="{ active: section === activeSection }"
									v-if="!section.header"
									:href="`#${section.id}`"
									:ref="section === activeSection && 'activeLink'"
								>
									<div class="link-dot__wrap">
										<span class="link-dot"></span>
									</div>
									<span class="link-title">{{ section.title }}</span>
								</a>
							</li>
						</ul>
					</div>
					<a
						class="github-link xyz-in-nested"
						xyz="fade delay-3 small ease-out-back"
						href="https://github.com/ingram-projects/animxyz"
						target="_blank"
					>
						<icon-github></icon-github>
						<span>GitHub</span>
					</a>
				</nav>
			</xyz-transition>
		</focus-lock>
	</div>
</template>

<script>
import FocusLock from 'vue-focus-lock'
import AnimXyzLogo from '~/components/reusable/AnimXyzLogo'
import IconGithub from '~/assets/icons/IconGithub.svg'

export default {
	name: 'PageNav',
	props: ['open', 'sections', 'activeSection'],
	components: {
		AnimXyzLogo,
		FocusLock,
		IconGithub,
	},
	computed: {
		isMediaLarge() {
			return this.$mq.above('large')
		},
	},
	watch: {
		isMediaLarge: {
			immediate: true,
			handler() {
				if (this.isMediaLarge) {
					this.toggle(true)
				} else {
					this.toggle(false)
				}
			},
		},
		activeSection: {
			immediate: true,
			handler() {
				if (this.activeSection) {
					this.$nextTick(() => {
						if (this.$refs.activeLink) {
							this.$refs.activeLink[0].scrollIntoView({
								block: 'center',
								behavior: 'smooth',
							})
						}
					})
				}
			},
		},
	},
	methods: {
		toggle(toggled) {
			this.$emit('toggle', toggled)
		},
		onSectionClick() {
			this.toggle(false)
		},
	},
}
</script>

<style lang="scss" scoped>
.page-nav__wrap:not(.open) {
	.animxyz-logo ::v-deep {
		.side--red {
			transform: rotateY(0deg) translateZ($sp-xs);
		}

		.side--yellow {
			transform: rotateY(0deg);
		}

		.side--green {
			transform: translateZ(-$sp-xs);
		}

		.logo-sides {
			transform: rotateX(65deg) rotateZ(45deg);
		}
	}
}

.page-nav {
	position: fixed;
	display: flex;
	flex-direction: column;
	width: $desktop-menu-width;
	top: 0;
	bottom: 0;
	background-color: primary-color(900, 0.95);
	z-index: 3;

	@include media('<tablet') {
		left: 0;
		right: 0;
		width: auto;
		backdrop-filter: blur(4px);
	}
}

.nav-list__wrap {
	display: flex;
	margin-top: 5rem;
	flex-grow: 1;
	overflow-y: auto;

	@include media('<laptop') {
		margin-top: 0;
		margin-bottom: 5.5rem;
		order: 2;
	}

	@include media('<tablet') {
		display: block;
		margin-bottom: 0;
		padding-bottom: 2rem;
	}
}

.nav-list {
	width: 100%;
	margin: auto 0;
	list-style: none;

	@include media('<tablet') {
		margin: 0;
	}
}

.nav-item__header {
	color: primary-color(200);
	font-size: $fs-m;
	font-family: $font-stack-mono;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	padding: 0 $sp-l;
	margin-top: $sp-s;
	margin-bottom: $sp-xxs;
}

.nav-item {
	font-family: $font-stack-mono;
	font-size: 1.125rem;
}

.nav-item__link {
	display: flex;
	align-items: center;
	height: 2.25rem;
	padding: 0 $sp-l;
	color: primary-color(300);
	text-decoration: none;

	&:hover,
	&:focus {
		outline: none;
		color: primary-color(200);

		.link-dot {
			@include size(1.25rem);
			opacity: 0.5;
			border-radius: $br-m;
			transition-duration: 0.2s;
		}

		.link-arrow {
			transform: translateX(-0.5rem);
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

	.link-home & {
		transform: none !important;
	}
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

.link-arrow {
	font-size: 1.5rem;
	line-height: 1.25rem;
	transition: all 0.25s $ease-in-out;
}

.nav-button {
	display: flex;
	align-items: center;
	position: fixed;
	top: $sp-m;
	left: $sp-m;
	z-index: 4;

	&:hover,
	&:focus {
		.nav-button__text {
			transform: translateX($sp-xxxs);
			opacity: 1;
		}

		::v-deep {
			.logo-scene {
				--logo-scale: 1.125;

				@include media('<tablet') {
					--logo-scale: 1;
				}
			}
		}
	}

	@include media('<laptop') {
		top: initial;
		left: 2.5rem;
		bottom: 2rem;
	}

	@include media('<tablet') {
		left: initial;
		right: 2.5rem;
		bottom: 2.5rem;
	}

	@include media('>=large') {
		pointer-events: none;
	}
}

.logo-wrap {
	margin-left: $sp-s;
	margin-right: 1.25rem;

	@include media('<tablet') {
		@include size(initial);
		margin: 0;
	}
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
	z-index: 3;
	background-color: primary-color(500, 0.2);
	color: var(--icon-color);
	text-decoration: none;
	transition: 0.2s $ease-in-out;
	transition-property: background-color, box-shadow;

	svg {
		@include size(1.5rem);
		transition: transform 0.3s $ease-out-back;
		margin-right: $sp-xs;
	}

	&:hover,
	&:focus {
		--icon-color: #{primary-color(50)};
		outline: none;
		background-color: primary-color(500, 0.3);

		svg {
			transform: scale(1.15);
		}
	}

	&:focus {
		box-shadow: 0 0 0 4px primary-color(200, 0.5);
	}

	@include media('<laptop') {
		order: 1;
	}
}
</style>
