<template>
	<div class="markdown-content" v-html="content"></div>
</template>

<script>
export default {
	name: 'MarkdownContent',
	props: ['content'],
}
</script>

<style lang="scss" scoped>
.markdown-content {
	::v-deep {
		p {
			font-size: 1.125rem;
			margin-bottom: $spacing-m;

			@include media('<phone') {
				font-size: $fs-normal;
			}
		}

		pre[class*='language-'] {
			background: primary-color(900);
			margin: 0 (-$spacing-s);
		}
	}
}
</style>
