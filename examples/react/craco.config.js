const sassResourcesLoader = require('craco-sass-resources-loader')
const scopedCSS = require('craco-plugin-scoped-css')

module.exports = {
	plugins: [
		{
			plugin: sassResourcesLoader,
			options: {
				resources: ['./src/styles/_variables.scss'],
			},
		},
		{
			plugin: scopedCSS,
		},
	],
}
