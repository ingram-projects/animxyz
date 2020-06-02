<template>
	<Layout>
		<banner></banner>
	</Layout>
</template>

<page-query>
{
  sections: allSection (sortBy: "order", order: ASC) {
    edges {
      node {
				order
        title
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

export default {
	components: {
		Banner,
	},
	metaInfo() {
		return {
			title: 'AnimXYZ',
		}
	},
}
</script>

<style lang="scss" scoped></style>
