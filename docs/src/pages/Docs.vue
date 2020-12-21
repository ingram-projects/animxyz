<template>
	<Layout :class="`tab--${activeTab}`">
		<PageNav :sections="sections" :active-section="activeSection" :open="navOpen" @toggle="toggleNav"></PageNav>

		<main class="page-content" :class="{ 'nav-open': navOpen }" @click="toggleNav(false)">
			<XyzTransitionGroup
				tag="section"
				class="sections__wrap"
				:class="{ active: activeTab === 'docs' }"
				appear
				xyz="fade down delay-1"
			>
				<div v-for="section in sections" :key="section.id">
					<h1 class="section-group__header" v-if="section.header" :id="section.id">{{ section.title }}</h1>
					<DocsSection
						v-if="!section.header"
						:section="section"
						:class="{ active: section === activeSection }"
						ref="sections"
					></DocsSection>
				</div>
			</XyzTransitionGroup>

			<section class="sandbox__wrap" :class="{ active: activeTab === 'examples' }">
				<a class="back-to-docs" :href="`/docs#${activeSection && activeSection.id}`">
					Back to {{ activeSection && activeSection.title }}
				</a>
				<XyzTransition appear xyz="fade" mode="out-in">
					<Sandbox
						v-if="hasSandbox && ($mq.above('laptop') || activeTab === 'examples')"
						v-bind="sandboxProps"
						v-scroll-lock="$mq.below('laptop') && activeTab === 'examples'"
						:key="activeSection.id"
					></Sandbox>
					<div class="no-examples" v-if="!hasSandbox" key="no-example">
						<IconSandbox></IconSandbox>
						There are no examples<br />for this section.
					</div>
				</XyzTransition>
			</section>
		</main>
	</Layout>
</template>

<page-query>
{
  sections: allSection {
    edges {
      node {
				id
        title
				quote
				content
				examples {
					name
					component
					template
					code {
						name
						content
					}
				}
				modifiers {
					utilities {
						hide
						defaults
					}
					variables {
						hide
						defaults
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
import { openGraphMeta } from '~/utils'

export default {
	components: {
		DocsSection,
		PageNav,
		Sandbox,
	},
	data() {
		return {
			navOpen: false,
			activeSectionId: null,
			activeTab: 'docs',
			sectionDefinitions: [
				{ header: true, title: 'Getting Started', id: 'getting-started' },
				'installation',
				'the-basics',
				'how-it-works',
				'practical-examples',
				{ header: true, title: 'Composing Animations', id: 'composing-animations' },
				'contexts',
				'utilities',
				'variables',
				'defaults',
				{ header: true, title: 'Triggering Animations', id: 'triggering-animations' },
				'active-classes',
				'nesting',
				{ header: true, title: 'Animations', id: 'animations' },
				'fade',
				'transform',
				'perspective',
				'origin',
				'timing',
				'stagger',
				'iterate',
				{ header: true, title: 'Vue Integration', id: 'vue-integration' },
				'vue-installation',
				'vue-xyz-transition',
				'vue-xyz-transition-group',
				'vue-v-xyz',
				{ header: true, title: 'React Integration', id: 'react-integration' },
				'react',
			],
		}
	},
	computed: {
		sections() {
			const sectionsObj = {}
			this.$page.sections.edges.forEach((sectionEdge) => {
				sectionsObj[sectionEdge.node.id] = sectionEdge.node
			})

			return this.sectionDefinitions.map((sectionDefinition) => {
				if (sectionDefinition.header) {
					return sectionDefinition
				}

				return sectionsObj[sectionDefinition]
			})
		},
		activeSection() {
			return this.sections.find((section) => {
				return section.id === this.activeSectionId
			})
		},
		hasSandbox() {
			return this.activeSection && this.activeSection.examples.length
		},
		sandboxProps() {
			if (this.hasSandbox) {
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
			const { hash } = this.$route
			if (hash === `#${oldVal}`) {
				this.$router.replace({
					...this.$route,
					hash: null,
					query: null,
				})
			}
		},
		$route() {
			this.onRouteChange()
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
		onRouteChange() {
			const { query } = this.$route
			if (query.tab) {
				this.setTab(query.tab)
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
		this.onRouteChange()
		this.onWindowScroll()
		window.addEventListener('scroll', this.onWindowScroll)
		window.addEventListener('resize', this.onWindowScroll)
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.onWindowScroll)
		window.removeEventListener('resize', this.onWindowScroll)
	},
	metaInfo: {
		...openGraphMeta({
			title: 'Docs | AnimXYZ',
			url: 'https://animxyz.com/docs',
		}),
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
	padding-top: 4rem;
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

.section-group__header {
	text-align: center;
	color: primary-color(600);
	font-size: 2.5rem;
	font-weight: 720;
	padding: 2vw $sp-m;

	@include media('>=laptop') {
		padding: 0;
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
		overflow-y: auto;
	}

	@include media('<laptop') {
		width: 100vw;
		transform: translateX(100vw);
		transition: transform 0.3s $ease-in-out;

		.sandbox {
			border-top: 1px solid primary-color(800);
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
	transition: 0.3s $ease-out;
	transition-property: background-color, color;

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
