// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
	siteName: 'AnimXYZ',
	siteDescription: 'AnimXYZ Documentation',
	host: '0.0.0.0',
	runtimeCompiler: true,
	icon: {
		favicon: './src/assets/images/animxyz-logo.png',
		touchicon: './src/assets/images/animxyz-logo-touch.png',
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
		{
			use: 'gridsome-plugin-sass-resources-loader',
			options: {
				resources: '~/assets/styles/variables/_index.scss',
			},
		},
		{
			use: 'gridsome-plugin-svg',
			options: {
				svgo: [
					{
						removeViewBox: false,
					},
					{
						prefixIds: false,
					},
				],
			},
		},
	],
	transformers: {
		remark: {
			slug: false,
			plugins: [
				'@gridsome/remark-prismjs',
				[
					'remark-containers',
					{
						default: true,
						custom: [
							{
								type: 'note',
								transform(node, config) {
									let classes = ['note']

									const tagsMatch = config.match(/\[(.*?)\]/)
									if (tagsMatch) {
										const tagsArray = tagsMatch[1].split(',')
										if (tagsArray.length) {
											classes.push(`note--tagged`)

											if (tagsArray.length === 1) {
												classes.push(`note--${tagsArray[0]}`)
											}
											node.children.unshift({
												type: 'html',
												value: `
												<div class="note-tag__wrap">
													${tagsArray.map((tag) => `<div class="note-tag note-tag--${tag}">${tag}</div>`).join('')}
												</div>
											`,
											})
										}
									}

									node.data.hProperties = {
										className: classes.join(' '),
									}
								},
							},
						],
					},
				],
			],
		},
	},
}
