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
				<button class="section-examples-button" v-if="section.examples.length">View Examples</button>
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
	padding: $sp-s;
	margin: auto;
	transition: background-color 1s $ease-out, box-shadow 0.5s $ease-out;

	@include media('>=laptop') {
		padding: $sp-l;

		.docs-section__wrap.active & {
			background-color: white;
			border-radius: 1rem;
		}
	}
}

.section-header {
	display: flex;
	align-items: center;
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

	&:hover,
	.docs-section__wrap.active & {
		.section-anchor {
			opacity: 1;
		}
	}
}

.section-anchor {
	@include circle(1.5rem);
	display: flex;
	background-color: primary-color(700, 0.15);
	margin-left: $sp-xxs;
	opacity: 0;
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
	font-weight: 500;
	font-size: $fs-s;
	transition: background-color 0.3s $ease-out, color 0.3s $ease-out, transform 0.3s $ease-out;

	&::after {
		display: inline-block;
		content: '→';
		margin-left: $sp-xxxs;
		transition: transform 0.2s $ease-out-back;
	}

	&:hover,
	&:focus {
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
	margin-left: $sp-l;
	margin-top: $sp-m;
	margin-bottom: $sp-m;

	@include media('<phone') {
		margin-top: 0;
		margin-left: $sp-m;
		font-size: 1rem;
	}
}
</style>
