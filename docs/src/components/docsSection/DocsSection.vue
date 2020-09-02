<template>
	<div class="docs-section__wrap" :id="section.id">
		<article class="docs-section">
			<header class="section-header">
				<div class="section-title__wrap">
					<h1 class="section-title">
						{{ section.title }}
					</h1>
					<a :href="`#${section.id}`" class="section-anchor">
						<icon-link></icon-link>
						<span class="screen-reader-only">Link to {{ section.title }}</span>
					</a>
				</div>
				<a class="section-examples-button" v-if="section.examples.length" :href="`?tab=examples#${section.id}`"
					>Examples</a
				>
			</header>
			<span class="section-quote" v-if="section.quote">{{ section.quote }}</span>
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
	methods: {
		goToExamples() {},
	},
}
</script>

<style lang="scss" scoped>
$active-border-width: 0.5rem;

.docs-section__wrap {
	display: flex;
	position: relative;
	padding: 6vw 0;
	min-height: 60vh;

	@include media('>=laptop') {
		padding: 4rem 0;
	}

	@include media('>=desktop') {
		padding: 4rem 0;
	}
}

.docs-section {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: 48rem;
	width: 100%;
	padding: $sp-m;
	margin: auto;
	transition: 1s $ease-out;
	transition-property: background-color, box-shadow;

	@include media('>=laptop') {
		padding: $sp-xl;

		.docs-section__wrap.active & {
			background-color: white;
			box-shadow: 0 0 1.5rem primary-color(700, 0.15);
		}
	}

	@include media('>=x-large') {
		.docs-section__wrap.active & {
			border-radius: $br-xl;
		}
	}
}

.section-header {
	display: flex;
	align-items: center;
	margin-bottom: $sp-m;
	z-index: 2;

	@include media('<laptop') {
		overflow: hidden;
		background-color: primary-color(50);
		margin: 0 (-$sp-s);
		padding: $sp-s;
		position: sticky;
		top: 0;
	}
}

.header-top__wrap {
	display: flex;
	align-items: center;
}

.section-title__wrap {
	display: flex;
	align-items: center;
	position: relative;
}

.section-anchor {
	@include circle(1.5rem);
	display: flex;
	background-color: primary-color(700, 0.15);
	margin-left: $sp-xxs;
	transition: 0.3s $ease-in-out;
	transition-property: background-color, opacity, transform;

	svg {
		--icon-color: #{primary-color(600)};
		@include size(0.75rem);
		margin: auto;
	}

	&:focus,
	&:hover {
		outline: none;
		background-color: primary-color(600);

		svg {
			--icon-color: white;
		}
	}

	&:hover {
		transform: scale(1.25);
	}

	&:active {
		background-color: $cyan;
		transform: scale(1);

		svg {
			--icon-color: #{$white};
		}
	}
}

.section-title {
	font-size: 2rem;
	line-height: 1;
	font-weight: 640;
	color: primary-color(700);

	@include media('<phone') {
		font-size: 1.5rem;
	}
}

.section-examples-button {
	margin-left: auto;
	height: 1.75rem;
	display: flex;
	align-items: center;
	padding: 0 $sp-xxs;
	border-radius: $br-m;
	background-color: primary-color(100);
	color: primary-color(700);
	text-decoration: none;
	font-weight: 500;
	font-size: $fs-s;
	transition: 0.3s $ease-out;
	transition-property: background-color, color;

	&::after {
		display: inline-block;
		content: '→';
		margin-left: $sp-xxxs;
		transition: transform 0.2s $ease-out-back;
	}

	&:hover,
	&:focus {
		outline: none;
		background-color: primary-color(300);
		color: primary-color(800);

		&::after {
			transform: translateX(0.75rem);
		}
	}

	@include media('>laptop') {
		display: none;
	}
}

.section-quote {
	display: block;
	font-size: 1.125rem;
	font-weight: 500;
	color: primary-color(600);
	padding-left: $sp-l;
	margin-bottom: $sp-m;

	@include media('<phone') {
		padding-left: $sp-m;
		margin-bottom: $sp-s;
		font-size: 1rem;
	}
}
</style>
