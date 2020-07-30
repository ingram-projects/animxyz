<template>
	<layout>
		<page-nav :sections="sections" :open="navOpen" @toggle="toggleNav"></page-nav>

		<main class="page-content" :class="{ 'nav-open': navOpen }" @click="toggleNav(false)">
			<xyz-transition-group tag="section" class="sections__wrap" appear xyz="fade down">
				<docs-section v-for="section in mainSections" :section="section" :key="section.title"></docs-section>
			</xyz-transition-group>
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

export default {
	components: {
		DocsSection,
		PageNav,
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
				'Inheritance',
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

.sections__wrap {
	margin: $sp-xxxl auto;
	width: 100%;
	max-width: 80rem;
}
</style>
