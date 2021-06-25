const visit = require('unist-util-visit')
const u = require('unist-builder')

function parseMeta(metaString) {
	const meta = {}

	metaString.split(' ').forEach((str) => {
		const equalIndex = str.indexOf('=')

		if (equalIndex > 0) {
			const key = str.slice(0, equalIndex)
			const value = str.slice(equalIndex + 1)

			meta[key] = value
		}
	})

	return meta
}

module.exports = () => {
	return (tree) => {
		visit(tree, 'code', (node, index, parent) => {
			if (node.data && node.data.codesandboxUrl) {
				const meta = parseMeta(node.meta || '')
				const sandboxMeta = meta.codesandbox

				const [, queryString] = sandboxMeta.split('?')
				const query = new URLSearchParams(queryString)

				const buttonTitle = query.get('buttonTitle') || 'Edit on CodeSandbox'

				const button = u('paragraph', [
					u(
						'link',
						{
							url: node.data.codesandboxUrl,
							data: {
								hProperties: {
									className: 'codesandbox-link',
									target: '_blank',
									rel: 'nofollow noopener noreferrer',
								},
							},
						},
						[
							u('text', {
								value: buttonTitle,
							}),
						]
					),
				])

				if (node.value.length) {
					parent.children.splice(index + 1, 0, button)
				} else {
					parent.children.splice(index, 1, button)
				}
			}
		})
	}
}
