import isPlainObject from 'lodash/isPlainObject'
import postcss from 'postcss'
import postcssCalc from 'postcss-calc'
import postcssJs from 'postcss-js'
import postcssNested from 'postcss-nested'

const postcssProcessor = postcss([postcssNested, postcssCalc])

export default function (node) {
	if (typeof node === 'string') {
		node = postcssProcessor.process(node).root
	} else if (isPlainObject(node)) {
		node = postcssProcessor.process(node, { parser: postcssJs }).root
	}
	node.cleanRaws()
	return node
}
