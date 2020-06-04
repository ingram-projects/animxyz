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
		<div class="intro-wrap xyz-in" xyz="fade small-2 duration-7 ease-out-back">
			<p class="intro-text">
				The first truly composable CSS animation library. Built for Vue, React, SCSS, and CSS, AnimXYZ will bring your
				website to life.
			</p>
		</div>
		<xyz-transition-group appear xyz="fade left stagger duration-5 delay-20" tag="div" class="docs-sections__wrap">
			<docs-section
				:section="section.node"
				v-for="(section, index) in $page.sections.edges"
				:key="index"
			></docs-section>
		</xyz-transition-group>
	</Layout>
</template>

<page-query>
{
  sections: allSection (sortBy: "order", order: ASC) {
    edges {
      node {
				order
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

.intro-wrap {
	--xyz-duration: 0.7s;
	--xyz-delay: 1.2s;
	margin: 0 auto;
	margin-bottom: $spacing-xxl;
	width: 80ch;
	text-align: center;
}

.intro-text {
	font-size: $fs-large;
	font-weight: 500;
	line-height: 1.75;
}

.banner__wrap {
	padding: 10vh $spacing-l;

	@include media('<phone') {
		padding: $spacing-s;
	}
}

.banner {
	margin: 0 auto;
}

.docs-sections__wrap {
	--xyz-stagger: 0.1s;
}
</style>
