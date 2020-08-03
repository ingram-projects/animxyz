<template>
	<div class="markdown-content" v-html="content"></div>
</template>

<script>
export default {
	name: 'MarkdownContent',
	props: ['content'],
}
</script>

<style lang="scss" scoped>
.markdown-content {
	font-size: 1.125rem;

	@include media('<phone') {
		font-size: $fs-m;
	}

	::v-deep {
		p,
		blockquote,
		pre[class*='language-'] {
			&:not(:last-child) {
				margin-bottom: 1.25rem;
			}
		}

		strong {
			font-weight: 640;
		}

		pre[class*='language-'] {
			background: primary-color(900);
			margin: 0 (-$sp-s);
			border-radius: $br-l;
		}

		blockquote {
			background-color: primary-color(600, 0.05);
			border-left: 8px solid primary-color(500);
			padding: $sp-s;
			border-radius: $br-m;
			font-size: $fs-m;

			pre[class*='language-'] {
				margin: 0;
			}
		}

		table {
			border-collapse: collapse;
			font-family: $font-stack-mono;
			font-size: $fs-l;

			thead {
				// border-bottom: 1px solid primary-color(300);
				color: primary-color(800);
			}

			tr + tr {
				// border-top: 1px solid primary-color(300);
			}

			th,
			td {
				text-align: left;
				padding: $sp-xxs $sp-s;
			}

			td {
				color: primary-color(700);
				line-height: 1.5rem;
			}

			tbody {
				tr {
					&:nth-child(odd) {
						background-color: primary-color(800, 0.05);
					}
				}
			}
		}
	}
}
</style>
