export default function ({ title, description, url, image, appId } = {}) {
	const google = [
		{
			key: 'google:name',
			itemprop: 'name',
			content: title,
		},
		{
			key: 'google:description',
			itemprop: 'description',
			content: description,
		},
		{
			key: 'google:image',
			itemprop: 'image',
			content: image,
		},
	]

	const twitter = [
		{
			key: 'twitter:card',
			name: 'twitter:card',
			content: 'summary_large_image',
		},
		{
			key: 'twitter:title',
			name: 'twitter:title',
			content: title,
		},
		{
			key: 'twitter:description',
			name: 'twitter:description',
			content: description,
		},
		{
			key: 'twitter:image',
			name: 'twitter:image',
			content: image,
		},
	]

	const facebook = [
		appId
			? {
					key: 'fb:app_id',
					property: 'fb:app_id',
					content: appId ? appId : '',
			  }
			: {},
	]

	const openGraph = [
		{
			key: 'og:url',
			property: 'og:url',
			content: url,
		},
		{
			key: 'og:type',
			property: 'og:type',
			content: 'website',
		},
		{
			key: 'og:title',
			property: 'og:title',
			content: title,
		},
		{
			key: 'og:description',
			property: 'og:description',
			content: description,
		},
		{
			key: 'og:image',
			property: 'og:image',
			content: image,
		},
	]

	this.$once('hook:mounted', () => {
		this.$meta().refresh()
	})

	return {
		title,
		meta: [
			{
				key: 'description',
				name: 'description',
				content: description,
			},
			...google,
			...twitter,
			...facebook,
			...openGraph,
		],
	}
}
