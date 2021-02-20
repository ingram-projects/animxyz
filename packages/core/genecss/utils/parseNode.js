import postcss from 'postcss'

export default function (node) {
	if (typeof node === 'string') {
		node = postcss.parse(node)
	}
	node.cleanRaws()
	return node
}
