const examples = {}

const requireContext = require.context('./', true, /\.vue$/)

requireContext.keys().forEach((key) => {
	const exampleTrimmedPath = key.match(new RegExp('./(.*).vue'))[1]
	const exampleKey = exampleTrimmedPath.replace('/', '_')
	examples[exampleKey] = requireContext(key).default
})

export default examples
