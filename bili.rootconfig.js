/*eslint-env es6*/

module.exports = function (pkg) {
  const banner = `/**
   * ${pkg.moduleName} v${pkg.version}
   * Copyright (c) 2020-present Ingram Projects
   * Released under the ${pkg.license} License.
   * ${pkg.homepage}
   */
  `

  return {
  	banner,
  	input: 'src/index.js',
  	output: {
  		moduleName: pkg.moduleName,
  		fileName({ format }, defaultFileName) {
  			if (format === 'umd') {
  				return `${pkg.moduleName}.js`
  			}
  			if (format === 'esm') {
  				return `${pkg.moduleName}.esm.js`
  			}
  			if (format === 'cjs') {
  				return `${pkg.moduleName}.cjs.js`
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
  	external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  }
}
