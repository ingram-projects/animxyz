<template>
	<div class="code-block">
		<TabBar class="code-block__tabs" :tabs="computedCode" v-if="computedCode.length > 1" v-model="activeCode"></TabBar>

		<XyzTransition xyz="fade" mode="out-in">
			<div class="example-code__wrap" :key="activeCode.name">
				<Prism v-for="(codeChunk, index) in activeCodeChunks" :language="codeChunk.prism.language" :key="index">{{
					codeChunk.content
				}}</Prism>
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
					content: chunkParsedContent + '\n',
				})
			}

			return codeChunks
		},
	},
	watch: {
		activeCode() {
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

.example-code__wrap {
	overflow: auto;

	pre[class*='language-'] {
		overflow: initial;
		padding-bottom: 0;
	}

	pre + pre {
		padding-top: 0;
	}
}
</style>
