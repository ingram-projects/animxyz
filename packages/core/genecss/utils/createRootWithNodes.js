import postcss from 'postcss'

export default function (nodes) {
	return postcss.root().append(...nodes)
}
