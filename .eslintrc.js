module.exports = {
	root: true,
	env: {
		es2021: true,
		node: true,
		browser: true,
	},
	extends: ['eslint:recommended', 'prettier'],
	plugins: ['prettier'],
	parserOptions: {
		ecmaVersion: 2021,
		sourceType: 'module',
	},
	rules: {
		'prettier/prettier': [
			'warn',
			{
				printWidth: 120,
				useTabs: true,
				semi: false,
				singleQuote: true,
				trailingComma: 'es5',
			},
		],
	},
}
