<template>
	<div class="docs-section__wrap" :id="section.id">
		<article class="docs-section">
			<header class="section-header">
				<div class="section-title__wrap">
					<h1 class="section-title">{{ section.title }}</h1>
					<a :href="`#${section.id}`" class="section-anchor">
						<icon-link></icon-link>
						<span class="screen-reader-only">Link to {{ section.title }}</span>
					</a>
				</div>
				<span class="section-quote" v-if="section.quote">{{ section.quote }}</span>
			</header>
			<markdown-content :content="section.content"></markdown-content>
		</article>
	</div>
</template>

<script>
import IconLink from '~/assets/icons/IconLink.svg'
import MarkdownContent from '~/components/reusable/MarkdownContent'

export default {
	name: 'DocsSection',
	props: ['section'],
	components: {
		IconLink,
		MarkdownContent,
	},
}
</script>

<style lang="scss" scoped>
$active-border-width: 0.5rem;

.docs-section__wrap {
	display: flex;
	position: relative;
	padding: 6vw $sp-l;
	min-height: 60vh;

	@include media('>=laptop') {
		padding: 4rem $sp-m;
	}

	@include media('>=desktop') {
		padding: 4rem $sp-m;
	}
}

.docs-section {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: 48rem;
	width: 100%;
	padding: $sp-l;
	margin: auto;
	transition: background-color 1s $ease-out, box-shadow 0.5s $ease-out;

	.active & {
		background-color: white;
		border-radius: 1rem;
	}

	@include media('>=laptop') {
		padding: $sp-xl $sp-l;
	}

	@include media('>=x-large') {
		padding: $sp-xl;
	}
}

.section-header {
	margin-bottom: $sp-m;
}

.section-title__wrap {
	display: inline-flex;
	position: relative;
	padding: 0 $sp-s;
	margin-left: -$sp-s;

	&:hover {
		.section-anchor {
			background-color: primary-color(700, 0.15);
			opacity: 1;
			transform: translate(0, -50%);
		}
	}

	.section-anchor {
		&:hover,
		&:focus {
			background-color: primary-color(700);

			svg {
				--icon-color: #{$white};
			}
		}
	}
}

.section-anchor {
	@include circle(1.75rem);
	display: flex;
	position: absolute;
	left: 100%;
	top: 50%;
	background-color: primary-color(700, 0);
	opacity: 0;
	transform: translate(-$sp-s, -50%);
	transition: opacity 0.2s $ease-in-out, background-color 0.2s $ease-in-out, transform 0.2s $ease-in-out;

	svg {
		--icon-color: #{primary-color(700)};
		height: 1rem;
		width: auto;
		margin: auto;
	}
}

.section-title {
	font-size: 2.5rem;
	line-height: 1;
	font-weight: 640;
	color: primary-color(700);

	@include media('<phone') {
		font-size: 2rem;
	}
}

.section-quote {
	display: block;
	font-size: 1.125rem;
	font-weight: 500;
	color: primary-color(600);
	margin-top: $sp-s;
	margin-left: $sp-l;

	@include media('<phone') {
		margin-top: $sp-xs;
		font-size: 1rem;
	}
}
</style>
