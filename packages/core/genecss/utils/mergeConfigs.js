export default function (...configs) {
	const mergedConfig = {}
	for (const config of configs) {
		Object.assign(mergedConfig, config)
	}
	return mergedConfig
}
