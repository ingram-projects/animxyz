export default function textToId(text) {
	return text
		.trim()
		.toLowerCase()
		.replace(/\s/g, '-')
		.replace(/[^\w-]/g, '')
}
