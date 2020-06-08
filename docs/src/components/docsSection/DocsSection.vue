<template>
	<section class="docs-section">
		<h1 class="section-title">{{ section.title }}</h1>
		<div class="docs-section__content">
			<div class="section-column text-column">
				<div class="column-content text-content" v-html="section.content"></div>
			</div>
			<div class="section-column examples-column">
				<div class="column-content examples-content">
					<section-examples
						v-if="section.examples.length"
						:examples="section.examples"
						:utilities="section.utilities"
						:variables="section.variables"
					></section-examples>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import SectionExamples from '~/components/docsSection/SectionExamples'

export default {
	name: 'DocsSection',
	props: ['section'],
	components: {
		SectionExamples,
	},
}
</script>

<style lang="scss" scoped>
.docs-section {
	max-width: 80rem;
	margin: $spacing-xxxl auto;
}

.docs-section__content {
	display: flex;
	align-items: flex-start;
}

.section-column {
	width: 50%;
	padding: $spacing-xs;
}

.column-content {
	margin: 0 auto;
	max-width: 36rem;
}

.section-title {
	font-size: 8rem;
	font-family: $font-stack-mono;
	width: 100%;
	margin-bottom: $spacing-m;
	color: primary-color(600, 0.4);
}

.examples-column {
	display: flex;
	position: sticky;
	top: 0;
}

.examples-content {
	width: 100%;
}

.text-column {
	::v-deep {
		p {
			font-size: 1.125rem;
			margin-bottom: $spacing-m;
		}

		pre[class*='language-'] {
			margin: 0 (-$spacing-s);
		}
	}
}
</style>
