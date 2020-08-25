<template>
	<layout>
		<page-nav :sections="sections" :active-section="activeSection" :open="navOpen" @toggle="toggleNav"></page-nav>

		<main class="page-content" :class="{ 'nav-open': navOpen }" @click="toggleNav(false)">
			<xyz-transition-group
				tag="section"
				class="sections__wrap"
				:class="{ active: activeTab === 'docs' }"
				appear
				xyz="fade down delay-1"
			>
				<docs-section
					v-for="section in mainSections"
					:section="section"
					:class="{ active: section === activeSection }"
					:key="section.title"
					ref="sections"
				></docs-section>
			</xyz-transition-group>

			<section class="sandbox__wrap" :class="{ active: activeTab === 'examples' }">
				<a class="back-to-docs" :href="`/docs#${activeSection && activeSection.id}`">Back to docs</a>
				<xyz-transition appear xyz="fade" mode="out-in">
					<sandbox v-if="sandboxProps" v-bind="sandboxProps" v-scroll-lock="$mq.below('laptop') && activeTab === 'examples'" :key="activeSection.id"></sandbox>
					<div class="no-examples" v-if="!sandboxProps" key="no-example">
						<icon-sandbox></icon-sandbox>
						There are no examples<br />for this section.
					</div>
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
import IconSandbox from '~/assets/icons/IconSandbox.svg'
import PageNav from '~/components/reusable/PageNav'
import Sandbox from '~/components/reusable/Sandbox'

export default {
	components: {
		DocsSection,
		IconSandbox,
		PageNav,
		Sandbox,
	},
	data() {
		return {
			navOpen: false,
			activeSectionId: null,
			activeTab: 'docs',
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
		activeSection() {
			return this.sections.find((section) => {
				return section.id === this.activeSectionId
			})
		},
		sandboxProps() {
			if (this.activeSection && this.activeSection.examples.length) {
				return {
					name: this.activeSectionId,
					examples: this.activeSection.examples,
					modifiers: this.activeSection.modifiers,
				}
			}
			return null
		},
	},
	watch: {
		activeSectionId(newVal, oldVal) {
			const { hash, pathname } = this.$location
			if (hash === `#${oldVal}`) {
				window.history.replaceState(null, null, pathname)
			}
		},
		$location() {
			this.onLocationChange()
		},
	},
	methods: {
		toggleNav(toggled) {
			if (toggled || this.$mq.below('large')) {
				this.navOpen = toggled
			}
		},
		setTab(tab) {
			this.activeTab = tab
		},
		onLocationChange() {
			const { params } = this.$location
			if (params.tab) {
				this.setTab(params.tab)
			} else {
				this.setTab('docs')
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
			this.activeSectionId = activeSectionId
		},
	},
	mounted() {
		this.onLocationChange()
		this.onWindowScroll()
		window.addEventListener('scroll', this.onWindowScroll)
		window.addEventListener('resize', this.onWindowScroll)
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.onWindowScroll)
		window.removeEventListener('resize', this.onWindowScroll)
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
		transform: translateX(-100vw);
		transition: transform 0.3s $ease-in-out;

		&.active {
			transform: none;
		}
	}
}

.sandbox__wrap {
	display: flex;
	flex-direction: column;
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
		transform: translateX(100vw);
		transition: transform 0.3s $ease-in-out;

		.sandbox {
			border-top: 1px solid primary-color(800);
			overflow-y: auto;
		}

		&.active {
			transform: none;
		}
	}
}

.back-to-docs {
	position: relative;
	z-index: 1;
	height: 2.5rem;
	display: flex;
	align-items: center;
	align-self: flex-start;
	flex-shrink: 0;
	padding: 0 $sp-xxs;
	border-radius: $br-m;
	color: primary-color(300);
	text-decoration: none;
	font-weight: 500;
	font-size: $fs-s;
	transition: background-color 0.3s $ease-out, color 0.3s $ease-out;

	&::before {
		display: inline-block;
		content: '←';
		margin-right: $sp-xxxs;
		transition: transform 0.2s $ease-out-back;
	}

	&:hover,
	&:focus {
		color: primary-color(200);

		&::before {
			transform: translateX(-0.75rem);
		}
	}

	@include media('>laptop') {
		display: none;
	}
}

.no-examples {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	color: primary-color(200);
	font-size: $fs-l;
	line-height: 1.5;
	padding: $sp-m;
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;

	.icon-sandbox {
		--icon-color: #{primary-color(300)};
		@include size(3rem);
		margin-bottom: $sp-m;
	}
}
</style>
