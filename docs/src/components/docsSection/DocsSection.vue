<template>
	<section class="docs-section" :id="section.anchor">
		<div class="section-column section-text xyz-nested" xyz="fade left">
			<div class="section-column__content">
				<h1 class="section-title">{{ section.title }}</h1>
				<markdown-content :content="section.content"></markdown-content>
			</div>
		</div>
		<div class="section-column section-sandbox xyz-nested" xyz="fade up" v-if="section.examples.length">
			<div class="section-column__content">
				<sandbox :modifiers="section.modifiers" :examples="section.examples"></sandbox>
			</div>
		</div>
	</section>
</template>

<script>
import MarkdownContent from '~/components/reusable/MarkdownContent'
import Sandbox from '~/components/reusable/Sandbox'

export default {
	name: 'DocsSection',
	props: ['section'],
	components: {
		MarkdownContent,
		Sandbox,
	},
}
</script>

<style lang="scss" scoped>
.docs-section {
	display: flex;
	align-items: flex-start;
	justify-content: center;
	margin: 0 auto;

	& + & {
		margin-top: 12vw;

		@include media('>=desktop') {
			margin-top: 8rem;
		}
	}

	@include media('<laptop') {
		flex-direction: column;
		align-items: center;
	}
}

.section-title {
	margin-bottom: $sp-m;
	font-size: 4rem;
	font-family: $font-stack-mono;
	color: primary-color(600, 0.7);

	@include media('<phone') {
		font-size: 3rem;
	}
}

.section-column {
	width: 50%;
	max-width: 40rem;

	&:only-child {
		width: 100%;
	}

	@include media('<laptop') {
		width: 100%;
	}
}

.section-column__content {
	margin: 0 auto;
	width: 100%;
}

.section-text {
	padding: 0 $sp-m;
}

.section-sandbox {
	position: sticky;
	padding: 0 $sp-m;
	top: $sp-m;

	@include media('<laptop') {
		margin-top: $sp-l;
	}

	@include media('<phone') {
		width: 100vw;
		padding: 0;
	}
}

.sandbox {
	@include media('<laptop') {
		margin: 0 (-$sp-s);
	}

	@include media('<phone') {
		border-radius: 0;
		margin: 0;
	}
}
</style>
