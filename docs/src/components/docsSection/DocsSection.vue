<template>
	<section class="docs-section">
		<h1 class="section-title">{{ section.title }}</h1>
		<div class="section-content">
			<div class="section-column text-column" v-if="!mobile || column === 'text'">
				<div class="column-content text-content" v-html="section.content"></div>
			</div>
			<div class="section-column examples-column" v-if="section.examples.length && (!mobile || column === 'examples')">
				<div class="column-content examples-content">
					<section-examples
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
	props: ['section', 'mobile', 'column'],
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

.section-content {
	display: flex;
	align-items: flex-start;
	justify-content: center;
}

.section-column {
	width: 50%;
	flex-shrink: 0;

	@include media('<tablet') {
		width: 100%;
		margin: 0 auto;
	}
}

.column-content {
	margin: 0 auto;
	max-width: 36rem;
}

.section-title {
	font-size: 6rem;
	font-family: $font-stack-mono;
	margin-bottom: $spacing-m;
	color: primary-color(600, 0.4);
}

.text-column {
	padding: 0 $spacing-m;
}

.examples-column {
	display: flex;
	position: sticky;
	padding: 0 $spacing-xs;
	top: 0;
}

.examples-content {
	width: 100%;
}

.text-content {
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
