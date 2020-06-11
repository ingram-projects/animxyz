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
		font-size: $fs-normal;
	}

	::v-deep {
		p {
			margin-bottom: $spacing-m;
		}

		pre[class*='language-'] {
			background: primary-color(900);
			margin: 0 (-$spacing-s);
			border-radius: $br-l;
		}
	}
}
</style>
