<template>
	<div class="copy-content" v-html="content"></div>
</template>

<script>
export default {
	name: 'MarkdownContent',
	props: {
		content: String,
	},
}
</script>

<style lang="scss" scoped></style>
