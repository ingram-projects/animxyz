import genecss from '../genecss'
import defaultConfig from './defaultConfig'

const animxyzPlugin = function () {
	return {
		...genecss([defaultConfig, './animxyz.config.js']),
		postcssPlugin: 'animxyz',
	}
}
animxyzPlugin.postcss = true

export default animxyzPlugin
