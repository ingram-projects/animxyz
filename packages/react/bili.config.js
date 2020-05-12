import pkg from './package.json'

const moduleName = 'ReactAnimXyz'

const banner = `/**
 * ${moduleName} v${pkg.version}
 * Copyright (c) 2020-present Ingram Projects
 * Released under the ${pkg.license} License.
 * ${pkg.homepage}
 */
`

module.exports = {
	banner,
	input: 'src/index.js',
	output: {
		moduleName,
		fileName({ format }, defaultFileName) {
			if (format === 'umd') {
				return `${moduleName}.js`
			}
			if (format === 'esm') {
				return `${moduleName}.esm.js`
			}
			if (format === 'cjs') {
				return `${moduleName}.cjs.js`
			}
			return defaultFileName
		},
		format: ['umd', 'esm', 'cjs'],
		sourceMapExcludeSources: true,
	},
	babel: {
		minimal: true,
	},
	extendConfig(config, { format }) {
		if (format === 'umd') {
			config.output.minify = true
			config.env = {
				...config.env,
				NODE_ENV: 'production',
			}
		}
		return config
	},
	external: ['react', 'react-dom'],
}
