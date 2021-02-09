<template>
	<div class="code-block">
		<TabBar class="code-block__tabs" :tabs="computedCode" v-if="computedCode.length > 1" v-model="activeCode"></TabBar>

		<XyzTransition xyz="fade" mode="out-in">
			<div :key="activeCode.name">
				<div class="code__wrap">
					<Prism v-for="(codeChunk, index) in activeCodeChunks" :language="codeChunk.prism.language" :key="index">{{
						`${codeChunk.content}${index !== activeCodeChunks.length - 1 ? '\n' : ''}`
					}}</Prism>
				</div>
				<div class="code-buttons">
					<button class="code-button" @click="copyCode">
						{{ isCopied ? 'Copied' : 'Copy' }}
					</button>
				</div>
			</div>
		</XyzTransition>
	</div>
</template>

<script>
import prettier from 'prettier/standalone'
import parserBabel from 'prettier/parser-babel'
import parserHtml from 'prettier/parser-html'
import parserPostCSS from 'prettier/parser-postcss'
import Prism from 'vue-prism-component'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-scss'
import TabBar from '~/components/reusable/TabBar'
import { copyToClipboard } from '~/utils'

const languageOptions = {
	html: {
		prettier: {
			parser: 'html',
			plugins: [parserHtml, parserPostCSS, parserBabel],
		},
		prism: {
			language: 'html',
		},
	},
	css: {
		prettier: {
			parser: 'css',
			plugins: [parserPostCSS],
		},
		prism: {
			language: 'css',
		},
	},
	scss: {
		prettier: {
			parser: 'scss',
			plugins: [parserPostCSS],
		},
		prism: {
			language: 'scss',
		},
	},
	javascript: {
		prettier: {
			parser: 'babel',
			plugins: [parserBabel],
		},
		prism: {
			language: 'javascript',
		},
	},
	jsx: {
		prettier: {
			parser: 'babel',
			plugins: [parserBabel],
		},
		prism: {
			language: 'jsx',
		},
	},
	vue: {
		prettier: {
			parser: 'vue',
			plugins: [parserHtml, parserPostCSS, parserBabel],
		},
		prism: {
			language: 'html',
		},
	},
}

export default {
	name: 'CodeBlock',
	props: {
		code: Array,
		data: Object,
	},
	components: {
		Prism,
		TabBar,
	},
	data() {
		return {
			activeCode: null,
			isCopied: false,
			isCopiedTimout: null,
		}
	},
	computed: {
		computedCode() {
			return this.code.map((code) => {
				let icon
				switch (code.name) {
					case 'HTML':
						icon = 'IconHtml'
						break
					case 'Vue':
						icon = 'IconVue'
						break
					case 'React':
						icon = 'IconReact'
				}

				return {
					icon,
					...code,
				}
			})
		},
		activeCodeChunks() {
			/* eslint-disable no-unused-vars */
			const data = this.data
			const evalContent = eval(`\`${this.activeCode.content}\``)

			const codeChunks = []

			const splitChunks = evalContent.split(/##(\w+)/)
			for (let i = 1; i < splitChunks.length; i += 2) {
				const chunkLanguage = splitChunks[i]
				const chunkContent = splitChunks[i + 1]
				const chunkLanguageOptions = languageOptions[chunkLanguage]

				const chunkPrettierOptions = {
					printWidth: 70,
					tabWidth: 2,
					semi: false,
					singleQuote: true,
					trailingComma: 'es5',
					...chunkLanguageOptions.prettier,
				}

				const chunkPrismOptions = {
					...chunkLanguageOptions.prism,
				}

				let chunkParsedContent = prettier.format(chunkContent, chunkPrettierOptions)

				// Remove weird semicolon from beginning of jsx content
				if (chunkParsedContent.startsWith(';')) {
					chunkParsedContent = chunkParsedContent.substring(1)
				}

				codeChunks.push({
					language: chunkLanguage,
					prettier: chunkPrettierOptions,
					prism: chunkPrismOptions,
					content: chunkParsedContent,
				})
			}

			return codeChunks
		},
	},
	watch: {
		activeCode() {
			clearTimeout(this.isCopiedTimout)
			this.isCopied = false
			this.$emit('language-changed', this.activeCode)
		},
		code: {
			immediate: true,
			handler() {
				if (this.computedCode.length) {
					if (this.activeCode) {
						this.activeCode = this.computedCode.find((code) => {
							return code.name === this.activeCode.name
						})
					}
					if (!this.activeCode) {
						this.activeCode = this.computedCode[0]
					}
				} else {
					this.activeCode = null
				}
			},
		},
	},
	methods: {
		setCode(codeName) {
			this.activeCode = this.computedCode.find((code) => {
				return code.name === codeName
			})
		},
		copyCode() {
			if (!this.isCopied) {
				const codeText = this.activeCodeChunks
					.map((codeChunk) => {
						return codeChunk.content
					})
					.join('\n')

				copyToClipboard(codeText)

				this.isCopied = true
				this.isCopiedTimout = setTimeout(() => {
					this.isCopied = false
				}, 2000)
			}
		},
	},
	beforeDestroy() {
		clearTimeout(this.isCopiedTimout)
	},
}
</script>

<style lang="scss" scoped>
.code-block__tabs {
	::v-deep {
		@include media('>tablet') {
			.tab-bar__tab {
				flex-grow: initial;
				padding: 0 $sp-m;
			}
		}
	}
}

.code__wrap {
	position: relative;
	overflow: auto;

	pre[class*='language-'] {
		overflow: initial;
		padding-bottom: 0;
	}

	pre + pre {
		padding-top: 0;
	}
}

.code-buttons {
	padding: $sp-xs;
	display: flex;

	.code-button + .code-button {
		margin-left: $sp-xxs;
	}
}

.code-button {
	color: primary-color(200);
	padding: $sp-xxs $sp-xs;
	font-size: $fs-s;
	font-weight: 500;
	transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
	border-radius: $br-m;
	display: flex;
	align-items: center;

	&:hover,
	&:focus {
		background-color: primary-color(800, 0.5);
		color: primary-color(50);
	}

	&:focus {
		box-shadow: 0 0 0 2px $cyan;
	}
}
</style>
