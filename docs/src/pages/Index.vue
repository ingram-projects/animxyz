<template>
	<Layout>
		<div class="banner__wrap">
			<banner></banner>
		</div>
		<docs-section :section="section.node" v-for="(section, index) in $page.sections.edges" :key="index"></docs-section>
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
						lang
						content
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

export default {
	components: {
		Banner,
		DocsSection,
	},
	metaInfo() {
		return {
			title: 'AnimXYZ',
		}
	},
}
</script>

<style lang="scss" scoped>
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
