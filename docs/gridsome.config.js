// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const path = require('path')

function addStyleResource(rule) {
	rule
		.use('style-resource')
		.loader('style-resources-loader')
		.options({
			patterns: [path.resolve(__dirname, './src/assets/styles/variables/_index.scss')],
		})
}

module.exports = {
	siteName: 'AnimXYZ',
	siteDescription: 'AnimXYZ Documentation',
	host: '0.0.0.0',
	transformers: {
		remark: {
			externalLinksTarget: '_blank',
			externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
			anchorClassName: 'icon icon-link',
			plugins: [],
		},
	},
	plugins: [
	  {
	    use: '@gridsome/source-filesystem',
	    options: {
	      typeName: 'Section',
	      baseDir: 'content/sections',
	      path: '**/*.md',
	    },
	  },
	],
	chainWebpack: (config) => {
		const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
		types.forEach((type) => addStyleResource(config.module.rule('scss').oneOf(type)))

		const svgRule = config.module.rule('svg')
		svgRule.uses.clear()
		svgRule
			.use('vue-svg-loader')
			.loader('vue-svg-loader')
			.options({
				svgo: {
					plugins: [
						{
							removeViewBox: false,
						},
					],
				},
			})
	},
}
