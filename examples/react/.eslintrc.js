module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['react-app', 'eslint:recommended', 'prettier'],
	plugins: ['react', 'prettier'],
	parserOptions: {
		parser: 'babel-eslint',
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
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
