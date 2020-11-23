<template>
	<div class="code-block">
		<tab-bar :tabs="languages" v-if="languages.length > 1" v-model="activeLanguage"></tab-bar>
		<prism :language="activeLanguage.prism.language">{{ activeLanguageContent }}</prism>
	</div>
</template>

<script>
import prettier from 'prettier/standalone'
import parserBabel from 'prettier/parser-babel'
import parserHtml from 'prettier/parser-html'
import parserPostCSS from 'prettier/parser-postcss'
import Prism from 'vue-prism-component'
import 'prismjs/components/prism-jsx'
import TabBar from '~/components/reusable/TabBar'

const langOptions = {
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
			parser: 'postcss',
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
			activeLanguage: null,
		}
	},
	computed: {
		languages() {
			return this.code.map((code) => {
				const codeLangOptions = langOptions[code.language]
				return {
					...code,
					...codeLangOptions,
				}
			})
		},
		activeLanguageContent() {
			/* eslint-disable no-unused-vars */
			const data = this.data
			/* eslint-enable no-unused-vars */
			const evalData = eval(`\`${this.activeLanguage.content}\``)
			const prettierData = prettier.format(evalData, {
				...this.activeLanguage.prettier,
				printWidth: 80,
				semi: false,
				singleQuote: true,
				trailingComma: 'es5',
			})
			return prettierData
		},
	},
	watch: {
		activeLanguage() {
			this.$emit('language-changed', this.activeLanguage)
		},
		languages: {
			immediate: true,
			handler() {
				if (this.code.length) {
					if (this.activeLanguage) {
						this.activeLanguage = this.languages.find((language) => {
							return language.name === this.activeLanguage.name
						})
					}
					if (!this.activeLanguage) {
						this.activeLanguage = this.languages[0]
					}
				} else {
					this.activeLanguage = null
				}
			},
		},
	},
	methods: {
		setLanguage(languageName) {
			this.activeLanguage = this.languages.find((language) => {
				return language.name === languageName
			})
		},
	},
}
</script>

<style lang="scss" scoped></style>
