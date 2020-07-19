<template>
	<article class="docs-section" :class="{ 'xyz-paused': !isVisible }" :id="section.anchor" v-observe-visibility="visibilityChanged">
		<div class="section-column section-text">
			<div class="section-column__content">
				<header class="section-header">
					<div class="section-title__wrap">
						<h1 class="section-title">{{ section.title }}</h1>
						<a :href="`#${section.anchor}`" class="section-anchor">
							<icon-link></icon-link>
							<span class="screen-reader-only">Link to {{ section.title }}</span>
						</a>
					</div>
					<span class="section-quote" v-if="section.quote">{{ section.quote }}</span>
				</header>
				<markdown-content :content="section.content"></markdown-content>
			</div>
		</div>
		<div class="section-column section-sandbox" v-if="section.examples.length">
			<div class="section-column__content">
				<client-only>
					<sandbox :modifiers="section.modifiers" :examples="section.examples"></sandbox>
				</client-only>
			</div>
		</div>
	</article>
</template>

<script>
import ClientOnly from 'vue-client-only'
import IconLink from '~/assets/icons/IconLink.svg'
import MarkdownContent from '~/components/reusable/MarkdownContent'
import Sandbox from '~/components/reusable/Sandbox'

export default {
	name: 'DocsSection',
	props: ['section'],
	components: {
		ClientOnly,
		IconLink,
		MarkdownContent,
		Sandbox,
	},
	data () {
		return {
			isVisible: false,
		}
	},
	methods: {
		visibilityChanged(isVisible) {
			this.isVisible = isVisible
		}
	}
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
	font-size: 3rem;
	line-height: 1;
	font-family: $font-stack-mono;
	color: primary-color(600);

	@include media('<phone') {
		font-size: 2.5rem;
	}
}

.section-quote {
	display: block;
	font-size: $fs-l;
	font-weight: 500;
	color: primary-color(500);
	margin-top: $sp-s;
	margin-left: $sp-l;
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
