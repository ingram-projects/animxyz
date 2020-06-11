<template>
	<section class="docs-section">
		<div class="section-columns__wrap">
			<div class="section-column section-text" v-if="!mobile || column === 'text'">
				<div class="section-column__content">
					<h1 class="section-title">{{ section.title }}</h1>
					<markdown-content :content="section.content"></markdown-content>
				</div>
			</div>
			<div class="section-column section-sandbox" v-if="section.examples.length && (!mobile || column === 'sandbox')">
				<div class="section-column__content">
					<sandbox :modifiers="section.modifiers" :examples="section.examples"></sandbox>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import MarkdownContent from '~/components/reusable/MarkdownContent'
import Sandbox from '~/components/reusable/Sandbox'

export default {
	name: 'DocsSection',
	props: ['section', 'mobile', 'column'],
	components: {
		MarkdownContent,
		Sandbox,
	},
}
</script>

<style lang="scss" scoped>
.docs-section {
	margin: 0 auto;
	margin-bottom: 10vw;

	@include media('>desktop') {
		margin-bottom: 8rem;
	}
}

.section-title {
	margin-bottom: $spacing-m;
	font-size: 4rem;
	font-family: $font-stack-mono;
	color: primary-color(600, 0.4);

	@include media('<phone') {
		font-size: 3rem;
	}
}

.section-columns__wrap {
	align-items: flex-start;
	display: flex;
}

.section-column {
	width: 50%;

	&:only-child {
		width: 100%;
	}
}

.section-column__content {
	margin: 0 auto;
	width: 100%;
}

.section-text {
	padding: 0 $spacing-m;

	.section-column__content {
		max-width: 66ch;
	}
}

.section-sandbox {
	position: sticky;
	padding: 0 $spacing-m;
	top: $spacing-m;
}
</style>
