<template>
	<div class="docs-section__wrap" :id="section.id">
		<article class="docs-section">
			<header class="section-header">
				<div class="section-title__wrap">
					<h1 class="section-title">
						{{ section.title }}
					</h1>
					<a :href="`#${section.id}`" class="section-anchor">
						<IconLink></IconLink>
						<span class="screen-reader-only">Link to {{ section.title }}</span>
					</a>
				</div>
				<a class="section-examples-button" v-if="section.examples.length" :href="`?tab=examples#${section.id}`"
					>Examples</a
				>
			</header>
			<span class="section-quote" v-if="section.quote">{{ section.quote }}</span>
			<MarkdownContent :content="section.content"></MarkdownContent>
		</article>
	</div>
</template>

<script>
import MarkdownContent from '~/components/reusable/MarkdownContent'

export default {
	name: 'DocsSection',
	props: {
		section: Object,
	},
	components: {
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
}

.docs-section {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: 48rem;
	width: 100%;
	padding: $sp-m;
	border-radius: $br-xl;
	margin: auto;
	transition: background-color 0.8s $ease-out;
	--shadow-scroll-color: #{primary-color(900, 0.25)};
	--shadow-scroll-backdrop-color: #{primary-color(50)};

	&::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: -1;
		border-radius: $br-xl;
		box-shadow: 0 0.25rem 1.5rem primary-color(700, 0.15);
		opacity: 0;
		transition: 1.2s ease-out 0.2s;
		transition-property: opacity, box-shadow;
	}

	@include dark-mode {
		--shadow-scroll-backdrop-color: #{primary-color(950)};
	}

	::v-deep {
		.shadow-scroll,
		.shadow-scroll-content {
			transition: box-shadow 0.8s $ease-out;
		}

		h1,
		h2,
		h3 {
			color: primary-color(700);

			@include dark-mode {
				color: primary-color(300);
			}
		}

		hr {
			margin: $sp-xl (-$sp-m);
		}

		hr + h2 {
			background-color: primary-color(50);
			margin-top: -3.75rem;
			margin-bottom: $sp-l;
			margin-left: -$sp-xs;
			width: fit-content;
			padding: 0 $sp-xs;
			transition: background-color 0.8s $ease-out;

			@include dark-mode {
				background-color: primary-color(950);
			}
		}
	}

	@include media('>=laptop') {
		padding: $sp-xl;

		.docs-section__wrap.active & {
			--shadow-scroll-backdrop-color: white;
			background-color: white;

			&::before {
				opacity: 1;
			}

			@include dark-mode {
				--shadow-scroll-backdrop-color: #{primary-color(950, 0.25)};
				background-color: transparent;

				&::before {
					box-shadow: 0 0 0 0.25rem primary-color(700);
				}
			}

			::v-deep {
				hr {
					margin: $sp-xl (-$sp-xl);
				}

				hr + h2 {
					background-color: white;

					@include dark-mode {
						background-color: primary-color(950);
					}
				}
			}
		}
	}

	@include media('<=x-large') {
		border-radius: 0;
	}

	@include media('<large') {
		border-radius: $br-xl;
	}

	@include media('<desktop') {
		border-radius: 0;
	}
}

.section-header {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	margin-bottom: $sp-m;
	z-index: 2;

	@include media('<laptop') {
		background-color: primary-color(50);
		transition: background-color 0.3s $ease-in-out;
		margin: 0 (-$sp-s);
		padding: $sp-xs $sp-s;
		position: sticky;
		top: 0;

		@include dark-mode {
			background-color: primary-color(950);
		}
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
	padding-right: $sp-xxs;
}

.section-anchor {
	@include circle(1.5rem);
	display: flex;
	background-color: primary-color(700, 0.15);
	margin-left: $sp-xxs;
	transition: 0.3s $ease-in-out;
	transition-property: background-color, opacity, transform, box-shadow;

	svg {
		--icon-color: #{primary-color(600)};
		@include size(0.75rem);
		margin: auto;
	}

	@include media('<phone') {
		@include circle(1.375rem);
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
		box-shadow: none;

		svg {
			--icon-color: #{$white};
		}
	}
}

.section-title {
	font-size: 2rem;
	line-height: 1;
	font-weight: 640;

	@include media('<phone') {
		font-size: 1.5rem;
	}

	@include media('<small') {
		font-size: 1.25rem;
	}

	&::before {
		content: '';
		@include size(1rem);
		border-radius: $br-s;
		position: absolute;
		top: 50%;
		transform: translate(-2rem, -50%) rotate(0deg);
		right: 100%;
		background-color: $cyan;
		opacity: 0;
		transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
	}

	.docs-section__wrap.active & {
		&::before {
			opacity: 1;
			transform: translate(-1rem, -50%) rotate(45deg);
		}
	}
}

.section-examples-button {
	margin: $sp-xxxs;
	margin-left: auto;
	margin-right: 0;
	display: flex;
	align-items: center;
	height: 1.75rem;
	color: primary-color(700);
	border: 2px solid primary-color(500);
	font-size: $fs-s;
	font-weight: 700;
	text-decoration: none;
	padding: 0 $sp-xxs;
	border-radius: $br-m;
	transition: 0.3s $ease-out;
	transition-property: background-color, color, box-shadow, border;

	@include dark-mode {
		color: $cyan;
		border-color: transparentize($cyan, 0.25);
	}

	&::after {
		display: inline-block;
		content: '→';
		margin-left: $sp-xxxs;
		transition: transform 0.2s $ease-out-back;
	}

	&:focus {
		box-shadow: 0 0 0 2px $cyan;
		outline: none;
	}

	&:hover {
		background-color: primary-color(200);
		color: primary-color(800);

		&::after {
			transform: translateX(0.5rem);
		}

		@include dark-mode {
			color: $cyan;
			background-color: transparentize($cyan, 0.75);
			border-color: $cyan;
		}
	}

	&:active {
		background-color: primary-color(700);
		border-color: primary-color(700);
		color: primary-color(50);
		box-shadow: none;
		transition-duration: 0.1s;

		@include dark-mode {
			color: primary-color(900);
			background-color: $cyan;
		}
	}

	@include media('<phone') {
		font-size: $fs-xs;
		font-weight: 600;
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

	@include dark-mode {
		color: primary-color(500);
	}
}
</style>
