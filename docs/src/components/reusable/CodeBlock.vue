<template>
	<prism :language="activeLangOptions.language">{{ activeCodeContent }}</prism>
</template>

<script>
import prettier from 'prettier/standalone'
import parserBabel from 'prettier/parser-babel'
import parserHtml from 'prettier/parser-html'
import parserPostCSS from 'prettier/parser-postcss'
import Prism from 'vue-prism-component'

const langOptions = {
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
			parser: 'postcss',
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
	vue: {
		prettier: {
			parser: 'vue',
			plugins: [parserHtml, parserPostCSS, parserBabel],
		},
		prism: {
			language: 'html',
		},
	},
	react: {
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
	},
	data() {
		return {
			activeCodeIndex: null,
		}
	},
	computed: {
		activeCode() {
			if (this.code.length) {
				return this.code[this.activeCodeIndex]
			}
			return null
		},
		activeLangOptions() {
			return langOptions[this.activeCode.language]
		},
		activeCodeContent() {
			/* eslint-disable no-unused-vars */
			const data = this.data
			/* eslint-enable no-unused-vars */
			const evalData = eval(`\`${this.activeCode.content}\``)
			const prettierData = prettier.format(evalData, {
				...this.activeLangOptions.prettier,
				printWidth: 80,
				semi: false,
				singleQuote: true,
				trailingComma: 'es5',
			})
			return prettierData
		},
	},
	methods: {
		setActiveLang(index) {
			this.activeCodeIndex = index
		},
	},
	created() {
		this.setActiveLang(0)
	},
}
</script>

<style lang="scss" scoped></style>
