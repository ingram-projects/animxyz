<template>
	<layout>
		<page-nav :sections="sections" :open="navOpen" @toggle="toggleNav"></page-nav>

		<main class="page-content" :class="{ 'nav-open': navOpen }" @click="toggleNav(false)">
			<xyz-transition-group tag="section" class="sections__wrap" appear xyz="fade down">
				<docs-section v-for="section in mainSections" :section="section" :key="section.title"></docs-section>
			</xyz-transition-group>
			<section class="sandbox__wrap">
				<sandbox></sandbox>
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
					anchor: section.title
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
	},
	methods: {
		toggleNav(toggled) {
			if (toggled || this.$mq.below('large')) {
				this.navOpen = toggled
			}
		},
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
	flex-direction: column;
	justify-content: center;
	transition: transform 0.3s $ease-in-out;

	&.nav-open {
		transform: translateX($desktop-menu-width);

		@include media('<tablet') {
			transform: initial;
		}

		@include media('>=large') {
			transform: initial;
			padding-left: $desktop-menu-width;
		}
	}
}

$sandbox-padding: $sp-l;

.sections__wrap {
	margin: $sp-xxxl 0;
	padding-right: calc(40vw + #{$sandbox-padding});
	width: 100%;
}

.docs-section {
	max-width: 48rem;
	padding: 0 $sandbox-padding;
}

.sandbox__wrap {
	position: fixed;
	width: 40vw;
	top: $sandbox-padding;
	right: $sandbox-padding;
	bottom: $sandbox-padding;

	.sandbox {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
}
</style>
