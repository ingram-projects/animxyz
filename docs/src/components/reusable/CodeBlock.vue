<template>
	<div class="code-block">
		<TabBar :tabs="computedCode" v-if="computedCode.length > 1" v-model="activeCode"></TabBar>
		<Prism :language="activeCode.prism.language">{{ activeCodeContent }}</Prism>
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

const languageDefaults = {
	html: {
		name: 'HTML',
		prettier: {
			parser: 'html',
			plugins: [parserHtml, parserPostCSS, parserBabel],
		},
		prism: {
			language: 'html',
		},
	},
	css: {
		name: 'CSS',
		prettier: {
			parser: 'css',
			plugins: [parserPostCSS],
		},
		prism: {
			language: 'css',
		},
	},
	scss: {
		name: 'SCSS',
		prettier: {
			parser: 'scss',
			plugins: [parserPostCSS],
		},
		prism: {
			language: 'scss',
		},
	},
	javascript: {
		name: 'Javascript',
		prettier: {
			parser: 'babel',
			plugins: [parserBabel],
		},
		prism: {
			language: 'javascript',
		},
	},
	vue: {
		name: 'Vue',
		icon: 'IconVue',
		prettier: {
			parser: 'vue',
			plugins: [parserHtml, parserPostCSS, parserBabel],
		},
		prism: {
			language: 'html',
		},
	},
	react: {
		name: 'React',
		icon: 'IconReact',
		prettier: {
			parser: 'babel',
			plugins: [parserBabel],
		},
		prism: {
			language: 'jsx',
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
				const codeLanguageDefaults = languageDefaults[code.language]
				return {
					...codeLanguageDefaults,
					...code,
				}
			})
		},
		activeCodeContent() {
			/* eslint-disable no-unused-vars */
			const data = this.data
			/* eslint-enable no-unused-vars */
			const evalData = eval(`\`${this.activeCode.content}\``)
			const prettierData = prettier.format(evalData, {
				...this.activeCode.prettier,
				printWidth: 80,
				semi: false,
				singleQuote: true,
				trailingComma: 'es5',
			})
			return prettierData
		},
	},
	watch: {
		activeCode() {
			this.$emit('language-changed', this.activeCode)
		},
		computedCode: {
			immediate: true,
			handler() {
				if (this.code.length) {
					if (this.activeCode) {
						this.activeCode = this.computedCode.find((language) => {
							return language.name === this.activeCode.name
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

<style lang="scss" scoped></style>
