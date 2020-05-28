<template>
	<Layout>
		{{ $page.example }}
	</Layout>
</template>

<page-query>
query Example ($path: String!) {
  example (path: $path) {
    title
    description
    content
  }
}
</page-query>

<script>
export default {
	metaInfo() {
		return {
			title: this.$page.example.title,
			meta: [
				{
					name: 'description',
					content: this.$page.example.description,
				},
			],
		}
	},
}
</script>

<style lang="scss" scoped></style>
