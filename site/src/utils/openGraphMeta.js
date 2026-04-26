export default function ({ title, description, type, url, image }) {
	const metaInfo = {
		meta: [],
	}

	if (title) {
		metaInfo.title = title
		metaInfo.meta.push({
			key: 'og:title',
			property: 'og:title',
			content: title,
		})
	}

	if (description) {
		metaInfo.meta.push({
			key: 'description',
			name: 'description',
			content: description,
		})
		metaInfo.meta.push({
			key: 'og:description',
			property: 'og:description',
			content: description,
		})
	}

	if (type) {
		metaInfo.meta.push({
			key: 'og:type',
			property: 'og:type',
			content: type,
		})
	}

	if (url) {
		metaInfo.meta.push({
			key: 'og:url',
			property: 'og:url',
			content: url,
		})
	}

	if (image) {
		metaInfo.meta.push({
			key: 'og:image',
			property: 'og:image',
			content: image,
		})
	}

	return metaInfo
}
