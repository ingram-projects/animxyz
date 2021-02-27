import postcss from 'postcss'
import postcssJs from 'postcss-js'
import postcssNested from 'postcss-nested'
import isPlainObject from 'lodash/isPlainObject'

const postcssProcessor = postcss([postcssNested])

export default function (node) {
	if (typeof node === 'string') {
		return postcssProcessor.process(node).result.root
	}
	if (isPlainObject(node)) {
		return postcssProcessor.process(node, { parser: postcssJs }).result.root
	}
	return node
}
