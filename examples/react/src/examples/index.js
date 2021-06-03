const examples = {}

const requireContext = require.context('./', true, /\.jsx$/)

requireContext.keys().forEach((key) => {
	const exampleTrimmedPath = key.match(new RegExp('./(.*).jsx'))[1]
	const exampleKey = exampleTrimmedPath.replace('/', '_')
	examples[exampleKey] = requireContext(key).default
})

export default examples
