<template>
	<section class="docs-section">
		<div class="section-column examples-column">
			<div class="column-content examples-content">
				<h1 class="section-title">{{section.title}}</h1>
				<section-examples v-if="section.examples.length" :examples="section.examples"></section-examples>
			</div>
		</div>
		<div class="section-column text-column">
			<div class="column-content text-content" v-html="section.content"></div>
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
	display: flex;
	align-items: flex-start;
	max-width: 80rem;
	margin: $spacing-xxxl auto;
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
	text-align: center;
	font-size: $fs-xlarge;
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
	p {
		font-size: 1.125rem;
	}
}
</style>
