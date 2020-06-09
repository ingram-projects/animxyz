<template>
	<Layout>
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

		<div class="sections__wrap">
			<xyz-transition-group appear xyz="fade left stagger duration-5 delay-20" tag="div" class="docs-sections__wrap">
				<docs-section
					:section="section"
					:mobile="mobile"
					:column="column"
					v-for="(section, index) in sections"
					:key="section.title"
				></docs-section>
			</xyz-transition-group>
		</div>
	</Layout>
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
				utilities {
					names
					multiple
					default
				}
				variables
      }
    }
  }
}
</page-query>

<script>
import Banner from '~/components/banner/Banner'
import DocsSection from '~/components/docsSection/DocsSection'
import IconGithub from '@/components/icons/IconGithub.svg'

export default {
	components: {
		Banner,
		DocsSection,
		IconGithub,
	},
	data () {
		return {
			mobile: true,
			column: 'text',
			sectionNames: [
				'Installation',
				'Fade',
				'Translate',
				'Rotate',
				'Scale',
				'Stagger',
			],
		}
	},
	computed: {
		sections () {
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
	max-width: 66ch;

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
