export default function (...configs) {
	const mergedConfig = {}
	configs.forEach((config) => {
		Object.assign(mergedConfig, config)
	})
	return mergedConfig
}
