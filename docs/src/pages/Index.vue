<template>
	<div :class="{ 'xyz-xray': xRayToggled }">
		<page-nav :sections="sections" :open="navOpen" @toggle="toggleNav"></page-nav>

		<button class="xray-toggle" @click="toggleXRay(!xRayToggled)">
			<span class="xray-toggle__text">XYZ-Ray {{ xRayToggled ? 'Off' : 'On' }}</span>
		</button>

		<xyz-transition xyz="duration-15">
			<div class="xray-overlay" v-if="xRayToggled"></div>
		</xyz-transition>

		<main class="page-content" :class="{ 'nav-open': navOpen }" @click="toggleNav(false)">
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

			<section class="sections__wrap">
				<docs-section v-for="section in mainSections" :section="section" :key="section.title"></docs-section>
			</section>
		</main>
	</div>
</template>

<page-query>
{
  sections: allSection {
    edges {
      node {
        title
				quote
				content
				examples {
					name
					template
					code {
						language
						content
					}
				}
				modifiers {
					utilities {
						hide
						multiple
						default
					}
					variables {
						hide
					}
					groups {
						name
						types
					}
				}
      }
    }
  }
}
</page-query>

<script>
import Banner from '~/components/banner/Banner'
import DocsSection from '~/components/docsSection/DocsSection'
import PageNav from '~/components/reusable/PageNav'

export default {
	components: {
		Banner,
		DocsSection,
		PageNav,
	},
	data() {
		return {
			navOpen: false,
			xRayToggled: false,
			sectionDefinitions: [
				'About',
				'Installation',
				{ header: true, title: 'Animations' },
				'Fade',
				'Transform',
				'Origin',
				'Timing',
				'Stagger',
				'Composition',
				'Variables',
				{ header: true, title: 'Concepts' },
				'Contexts',
				'Inheritance',
				'Nesting',
				'Modes',
				{ header: true, title: 'Customizations' },
				'Defaults',
				'Utilities',
				'Keyframes',
				{ header: true, title: 'Integrations' },
				'Vue',
				'React',
			],
		}
	},
	computed: {
		isMediaLarge() {
			return this.$mq.above('large')
		},
		sections() {
			const sectionsObj = {}
			this.$page.sections.edges.forEach((sectionEdge) => {
				sectionsObj[sectionEdge.node.title] = sectionEdge.node
			})

			return this.sectionDefinitions.map((sectionDefinition) => {
				if (sectionDefinition.header) {
					return sectionDefinition
				}

				const section = sectionsObj[sectionDefinition]
				return {
					...section,
					anchor: section.title.trim().toLowerCase().replace(/\s/g, '-'),
				}
			})
		},
		mainSections() {
			return this.sections.filter((section) => !section.header)
		},
	},
	watch: {
		isMediaLarge: {
			immediate: true,
			handler() {
				if (this.isMediaLarge) {
					this.toggleNav(true)
				} else {
					this.toggleNav(false)
				}
			},
		},
	},
	methods: {
		toggleNav(toggled) {
			if (toggled || this.$mq.below('large')) {
				this.navOpen = toggled
			}
		},
		toggleXRay(toggled) {
			this.xRayToggled = toggled
		},
	},
	metaInfo() {
		return {
			title: 'AnimXYZ',
		}
	},
}
</script>

<style lang="scss" scoped>
.page-content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	transition: transform 0.3s $ease-in-out;

	&.nav-open {
		transform: translateX(20rem);

		@include media('<tablet') {
			transform: initial;
		}

		@include media('>=large') {
			transform: initial;
			padding-left: 20rem;
		}
	}
}

.xray-toggle {
	position: fixed;
	top: $sp-m;
	right: $sp-m;
	z-index: 1;

	.xray-toggle__text {
		font-family: $font-stack-mono;
		font-size: $fs-xl;
		font-weight: bold;
		margin-left: $sp-s;
	}
}

.xray-overlay {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	pointer-events: none;
	z-index: 99999;
	--xyz-keyframes: xray-scan;

	&::after {
		display: none !important;
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

.sections__wrap {
	margin: 0 auto;
	margin-bottom: $sp-xxxl;
	width: 100%;
	max-width: 80rem;
}
</style>
