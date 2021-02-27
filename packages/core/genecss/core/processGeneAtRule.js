import generateGene from './generateGene'
import { createRootWithNodes } from '../utils'

export default function (atRule, contentString, config) {
	const gene = {}

	let generatesString
	atRule.each((childNode) => {
		if (childNode.type === 'atrule') {
			switch (childNode.name) {
				case 'modifiers':
					gene.modifiers = childNode.params.split(',').map((str) => str.trim())
					childNode.remove()
					break
				case 'matches':
					gene.matches = childNode.params
					childNode.remove()
					break
				case 'generates':
					generatesString = createRootWithNodes(childNode.nodes).toString()
					childNode.remove()
					break
			}
		}
	})

	if (!generatesString) {
		generatesString = createRootWithNodes(atRule.nodes).toString()
	}

	gene.generates = (match, captured) => {
		let node = generatesString
		const replaceTerms = {
			match,
			...captured,
		}
		for (const [replaceKey, replaceValue] of Object.entries(replaceTerms)) {
			node = node.replace(`$${replaceKey}`, replaceValue)
		}
		return node
	}

	const generatedGene = generateGene(atRule.params, gene, contentString, config)
	const geneNodes = Object.values(generatedGene.matched).map((match) => match.node)

	atRule.replaceWith(geneNodes)
}
