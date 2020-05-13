module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['eslint:recommended', 'prettier'],
	plugins: ['prettier'],
	parserOptions: {
		ecmaVersion: 9,
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
