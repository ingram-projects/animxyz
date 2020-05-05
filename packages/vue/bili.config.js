const { version, homepage, licence } = require('./package')

const banner = `/**
 * vue-animxyz v${version}
 * Copyright (c) 2020-present Ingram Projects
 * ${homepage}
 * Released under the ${licence} License.
 */
`

module.exports = {
  banner,
  output: {
    fileName: (context) => {
      if (context.format === 'umd' || context.format === 'umd-min') {
        return 'vue-animxyz[min].js';
      }
      return 'vue-animxyz.[format].js';
    },
    moduleName: 'vue-animxyz',
    format: [
      'cjs',
      'es',
      'umd',
      'umd-min',
    ],
  },
  plugins: {
    commonjs: true,
    vue: {
      css: false,
    },
  },
  bundleNodeModules: true,
}
