<template>
	<layout>
		<page-nav :sections="sections" :active-section="activeSection" :open="navOpen" @toggle="toggleNav"></page-nav>

		<main class="page-content" :class="{ 'nav-open': navOpen }" @click="toggleNav(false)">
			<xyz-transition xyz="fade small">
				<nav class="mobile-view-toggles">
					<button class="view-toggle active">Docs</button>
					<button class="view-toggle">Examples</button>
				</nav>
			</xyz-transition>
			<xyz-transition-group tag="section" class="sections__wrap" appear xyz="fade down delay-1">
				<docs-section
					v-for="section in mainSections"
					:section="section"
					:class="{ active: section === activeSection }"
					:key="section.title"
					ref="sections"
				></docs-section>
			</xyz-transition-group>

			<section class="sandbox__wrap">
				<xyz-transition appear xyz="fade">
					<sandbox v-if="sandboxProps" v-bind="sandboxProps" :key="activeSection.id"></sandbox>
				</xyz-transition>
			</section>
		</main>
	</layout>
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
						defaults
					}
					variables {
						hide
						defaults {
							name
							value
						}
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
import DocsSection from '~/components/docsSection/DocsSection'
import PageNav from '~/components/reusable/PageNav'
import Sandbox from '~/components/reusable/Sandbox'

export default {
	components: {
		DocsSection,
		PageNav,
		Sandbox,
	},
	data() {
		return {
			navOpen: false,
			activeSection: null,
			sectionDefinitions: [
				{ header: true, title: 'Getting Started' },
				'Installation',
				'The Basics',
				{ header: true, title: 'Core Concepts' },
				'Contexts',
				'Modes',
				'Composition',
				'Variables',
				'Nesting',
				'How it Works',
				{ header: true, title: 'Animations' },
				'Fade',
				'Transform',
				'Origin',
				'Timing',
				'Stagger',
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
					id: section.title
						.trim()
						.toLowerCase()
						.replace(/\s/g, '-')
						.replace(/[^\w-]/g, ''),
				}
			})
		},
		mainSections() {
			return this.sections.filter((section) => !section.header)
		},
		sandboxProps() {
			if (this.activeSection && this.activeSection.examples) {
				return {
					examples: this.activeSection.examples,
					modifiers: this.activeSection.modifiers,
				}
			}
			return null
		},
	},
	methods: {
		toggleNav(toggled) {
			if (toggled || this.$mq.below('large')) {
				this.navOpen = toggled
			}
		},
		onWindowScroll() {
			let activeSectionId
			let maxCoverage = 0
			this.$refs.sections.forEach((sectionRef) => {
				const { top, bottom } = sectionRef.$el.getBoundingClientRect()
				const viewportCoverage = Math.min(bottom, window.innerHeight) - Math.max(top, 0)
				if (viewportCoverage > maxCoverage) {
					activeSectionId = sectionRef.$el.id
					maxCoverage = viewportCoverage
				}
			})
			this.activeSection = this.sections.find((section) => {
				return section.id === activeSectionId
			})
		},
	},
	mounted() {
		this.onWindowScroll()
		window.addEventListener('scroll', this.onWindowScroll)
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.onWindowScroll)
	},
	metaInfo() {
		return {
			title: 'Docs',
		}
	},
}
</script>

<style lang="scss" scoped>
.page-content {
	display: flex;

	&.nav-open {
		@include media('>=large') {
			padding-left: $desktop-menu-width;
		}
	}
}

.sections__wrap {
	padding-right: 40vw;
	width: 100%;

	@include media('<laptop') {
		padding-right: 0;
	}
}

.sandbox__wrap {
	position: fixed;
	width: 40vw;
	right: 0;
	top: 0;
	bottom: 0;
	background-color: primary-color(900);

	.sandbox {
		width: 100%;
		height: 100%;
	}

	@include media('<laptop') {
		width: 100vw;
		left: 100%;
	}
}

.mobile-view-toggles {
	position: fixed;
	left: 50%;
	transform: translateX(-50%);
	bottom: 1.75rem;
	background-color: primary-color(100);
	padding: $sp-xxxs;
	border-radius: $br-l;
	z-index: 10;
}

.view-toggle {
	height: 2rem;
	width: 10rem;
	border-radius: $br-m;
	font-weight: 500;
	color: primary-color(600);
	transition: background-color 0.2s $ease-out, color 0.2s $ease-out;

	&:hover,
	&:focus {
		background-color: primary-color(50);
	}

	&.active {
		background-color: white;
		font-weight: 700;
		color: primary-color(700);
	}

	& + & {
		margin-left: $sp-xxxs;
	}
}
</style>
