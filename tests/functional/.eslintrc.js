module.exports = {
	parserOptions: {
		ecmaVersion: 2021,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	env: {
		browser: true,
		node: true,
	},
	plugins: ['react'],
	rules: {
		// espree alone doesn't mark JSX identifiers as used
		'react/jsx-uses-vars': 'error',
	},
}
