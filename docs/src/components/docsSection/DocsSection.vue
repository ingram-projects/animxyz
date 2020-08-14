<template>
	<article
		class="docs-section"
		:id="section.id"
	>
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
.docs-section {
	position: relative;
	max-width: 48rem;
	padding: 6vw $sp-l;

	@include media('>=desktop') {
		padding: 4rem $sp-l;
	}

	&.active {
		&::after {
			content: '';
			position: absolute;
			right: -2px;
			top: $sp-xl;
			bottom: $sp-xl;
			width: 6px;
			border-radius: 3px;
			background-color: $cyan;
			z-index: 1;
		}
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
