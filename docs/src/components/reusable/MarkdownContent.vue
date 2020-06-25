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
	font-size: 1.125rem;

	@include media('<phone') {
		font-size: $fs-m;
	}

	::v-deep {
		p:not(:last-child) {
			margin-bottom: $sp-m;
		}

		pre[class*='language-'] {
			background: primary-color(900);
			margin: 0 (-$sp-s);
			border-radius: $br-l;
		}

		blockquote {
			background-color: primary-color(600, 0.05);
			border-left: 8px solid primary-color(500);
			padding: $sp-s;
			border-radius: $br-m;
		}
	}
}
</style>
