const icons = {}

const requireContext = require.context('./', true, /\.svg$/)

requireContext.keys().forEach((key) => {
	const iconTrimmedPath = key.match(new RegExp('./(.*).svg'))[1]
	const iconKey = iconTrimmedPath.replace('/', '_')
	icons[iconKey] = requireContext(key)
})

export default icons
