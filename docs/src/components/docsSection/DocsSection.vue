<template>
	<section class="docs-section">
		<h1 class="section-title">{{ section.title }}</h1>
		<div class="section-columns">
			<div class="section-column section-text" v-if="!mobile || column === 'text'">
				<div class="section-column__content">
					<markdown-content :content="section.content"></markdown-content>
				</div>
			</div>
			<div class="section-column section-examples" v-if="section.examples.length && (!mobile || column === 'examples')">
				<div class="section-column__content">
					<examples-sandbox
						:examples="section.examples"
						:utilities="section.utilities"
						:variables="section.variables"
					></examples-sandbox>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import MarkdownContent from '~/components/reusable/MarkdownContent'
import ExamplesSandbox from '~/components/reusable/ExamplesSandbox'

export default {
	name: 'DocsSection',
	props: ['section', 'mobile', 'column'],
	components: {
		MarkdownContent,
		ExamplesSandbox,
	},
}
</script>

<style lang="scss" scoped>
.docs-section {
	margin: $spacing-xxxl auto;
}

.section-title {
	padding-left: $spacing-m;
	font-size: 6rem;
	font-family: $font-stack-mono;
	margin-bottom: $spacing-m;
	color: primary-color(600, 0.4);
}

.section-columns {
	display: flex;
}

.section-column {
	width: 100%;
}

.section-text {
	padding: 0 $spacing-m;
}

.section-examples {
	display: flex;
	position: sticky;
	padding: 0 $spacing-xs;
	top: 0;
}

.section-column__content {
	margin: 0 auto;
	width: 100%;
	max-width: 66ch; // Ideal line width
}
</style>
