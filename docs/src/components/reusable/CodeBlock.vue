<template>
	<div class="code-block">
		<TabBar :tabs="code" v-if="code.length > 1" v-model="activeCode"></TabBar>

		<Prism v-for="(codeChunk, index) in activeCodeChunks" :language="codeChunk.prism.language" :key="index">{{ codeChunk.content }}</Prism>
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
		activeCodeChunks() {
			/* eslint-disable no-unused-vars */
			const data = this.data
			const evalData = eval(`\`${this.activeCode.content}\``)

			const codeChunks = []

			const splitChunks = evalData.split(/##(\w+)/)
			for (let i = 1; i < splitChunks.length; i += 2) {
				const language = splitChunks[i]
				const content = splitChunks[i + 1]
				const chunkLanguageOptions = languageOptions[language]

				const prettifiedContent = prettier.format(content, {
					...chunkLanguageOptions.prettier,
					printWidth: 80,
					semi: false,
					singleQuote: true,
					trailingComma: 'es5',
				})

				codeChunks.push({
					language,
					content: prettifiedContent,
					...chunkLanguageOptions,
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
				if (this.code.length) {
					if (this.activeCode) {
						this.activeCode = this.code.find((code) => {
							return code.name === this.activeCode.name
						})
					}
					if (!this.activeCode) {
						this.activeCode = this.code[0]
					}
				} else {
					this.activeCode = null
				}
			},
		},
	},
	methods: {
		setCode(codeName) {
			this.activeCode = this.code.find((code) => {
				return code.name === codeName
			})
		},
	},
}
</script>

<style lang="scss" scoped></style>
