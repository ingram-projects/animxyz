<template>
	<div>
		<page-nav :sections="sections"></page-nav>
		<main class="page-content">
			<a
				class="github-link xyz-in"
				xyz="fade small up turn-ccw duration-4 ease-out-back"
				href="https://github.com/ingram-projects/animxyz"
				target="_blank"
			>
				<span class="screen-reader-only">View on GitHub</span>
				<icon-github></icon-github>
			</a>

			<div class="banner__wrap">
				<banner></banner>
			</div>

			<div class="intro__wrap xyz-in" xyz="fade small-2 duration-7 ease-out-back">
				<p class="intro-text">
					The first truly composable CSS animation library. Built for Vue, React, SCSS, and CSS, AnimXYZ will bring your
					website to life.
				</p>
			</div>

			<xyz-transition-group appear xyz="duration-5" tag="div" class="sections__wrap">
				<docs-section
					:section="section"
					:mobile="mobile"
					v-for="section in sections"
					:key="section.title"
				></docs-section>
			</xyz-transition-group>
		</main>
	</div>
</template>

<page-query>
{
  sections: allSection {
    edges {
      node {
        title
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
import IconGithub from '@/components/icons/IconGithub.svg'
import PageNav from '~/components/reusable/PageNav'

export default {
	components: {
		Banner,
		DocsSection,
		IconGithub,
		PageNav,
	},
	data() {
		return {
			mobile: true,
			sectionNames: [
				'Installation',
				'Fade',
				'Transform',
				'Origin',
				'Timing',
				'Stagger',
				'Composition',
				'Variables',
				'Nesting',
			],
		}
	},
	computed: {
		sections() {
			const sectionsObj = {}
			this.$page.sections.edges.forEach((sectionEdge) => {
				sectionsObj[sectionEdge.node.title] = sectionEdge.node
			})

			return this.sectionNames.map((sectionName) => {
				return sectionsObj[sectionName]
			})
		},
	},
	methods: {
		initMediaQuery() {
			const mediaQuery = window.matchMedia('(max-width: 1024px)')
			const onMediaQuery = (mq) => {
				if (mq.matches) {
					this.mobile = true
				} else {
					this.mobile = false
				}
			}
			onMediaQuery(mediaQuery)
			mediaQuery.addListener(onMediaQuery)
		},
	},
	mounted() {
		this.initMediaQuery()
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
}

.github-link {
	--xyz-delay: 1.4s;
	@include size(2.5rem);
	display: block;
	position: fixed;
	top: $spacing-m;
	right: $spacing-m;

	svg {
		@include size(100%);
		transition: transform 0.3s $ease-out-back;
	}

	&:hover {
		svg {
			transform: scale(1.2);
		}
	}
}

.intro__wrap {
	--xyz-duration: 0.7s;
	--xyz-delay: 1.2s;
	margin: 0 auto;
	margin-bottom: $spacing-xxl;
	text-align: center;
}

.intro-text {
	padding: 0 $spacing-l;
	font-size: $fs-large;
	font-weight: 500;
	line-height: 1.75;
	max-width: 56ch;

	@include media('<phone') {
		font-size: $fs-medium;
	}
}

.banner__wrap {
	margin: $spacing-xxl auto;
	padding: 0 $spacing-m;
	width: 100%;
	max-width: 80rem;

	@include media('<phone') {
		margin: $spacing-l auto;
		max-width: 80vw;
	}
}

.sections__wrap {
	margin: 0 auto;
	width: 100%;
	max-width: 80rem;
}
</style>
