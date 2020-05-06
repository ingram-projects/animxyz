import pkg from './package.json'

const banner = `/**
 * VueAnimXyz v${pkg.version}
 * Copyright (c) 2020-present Ingram Projects
 * ${pkg.homepage}
 * Released under the ${pkg.license} License.
 */
`

module.exports = {
  banner,
  input: 'src/index.js',
  output: {
    moduleName: 'VueAnimXyz',
    fileName({ format }, defaultFileName) {
      if (format === 'umd') {
        return 'VueAnimXyz.js'
      }
      if (format === 'esm') {
        return 'VueAnimXyz.esm.js'
      }
      if (format === 'cjs') {
        return 'VueAnimXyz.cjs.js'
      }
      return defaultFileName
    },
    format: ['umd', 'esm', 'cjs'],
    sourceMapExcludeSources: true,
  },
  babel: {
    minimal: true
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
}
