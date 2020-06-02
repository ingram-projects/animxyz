<template>
	<Layout>
		<div class="banner__wrap">
			<banner></banner>
		</div>
		<content-section :section="section.node" v-for="(section, index) in $page.sections.edges" :key="index"></content-section>
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
					file
				}
      }
    }
  }
}
</page-query>

<script>
import Banner from '~/components/banner/Banner'
import ContentSection from '~/components/contentSection/ContentSection'

export default {
	components: {
		Banner,
		ContentSection,
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
