import pkg from './package.json'
import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'

const banner = `/**
 * vue-animxyz v${pkg.version}
 * Copyright (c) 2020-present Ingram Projects
 * ${pkg.homepage}
 * Released under the ${pkg.license} License.
 */
`

function createOutput(format, ext) {
  return {
    banner,
    exports: 'named',
    file: `dist/vue-animxyz.${ext}`,
    format,
    name: 'VueAnimXyz',
  }
}

export default {
  input: 'src/index.js',
  output: [
    createOutput('umd', 'umd.js'),
    createOutput('es', 'esm.js'),
    createOutput('iife', 'min.js'),
  ],
  plugins: [
    commonjs(),
    vue({
      css: false,
    }),
  ],
}
