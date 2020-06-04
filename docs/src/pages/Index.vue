<template>
	<Layout>
		<a
			class="github-link xyz-in"
			xyz="fade small up duration-4 delay-5 turn-ccw ease-out-back"
			href="https://github.com/ingram-projects/animxyz"
			target="_blank"
		>
			<span class="screen-reader-only">View on GitHub</span>
			<icon-github></icon-github>
		</a>
		<div class="banner__wrap">
			<banner></banner>
		</div>
		<xyz-transition-group appear xyz="fade down stagger">
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
					defaults
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

.banner__wrap {
	padding: 10vh $spacing-l;

	@include media('<phone') {
		padding: $spacing-s;
	}
}

.banner {
	margin: 0 auto;
}
</style>
