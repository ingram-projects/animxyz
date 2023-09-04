// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

// Fonts
import 'typeface-inter'
import 'fontsource-inconsolata'

// Styles
import '~/assets/styles/core/_index.scss'

// Packages
import 'prismjs'

// Plugins
import VueAnimXyz from '@animxyz/vue'
import VueClickOutside from 'v-click-outside'
import VueMQ from '~/plugins/VueMQ'
import VueObserveVisibility from 'vue-observe-visibility'

// Icons
import icons from '~/assets/icons'

// Examples
import examples from '~/components/examples'

// Directives
import scrollLock from '~/directives/scrollLock'
import xyzScrollSync from '~/directives/xyzScrollSync'

// Layouts
import DefaultLayout from '~/layouts/Default.vue'

// Other
import { openGraphMeta } from '~/utils'

export default function (Vue, { router, head }) {
	Vue.use(VueAnimXyz)
	Vue.use(VueClickOutside)
	Vue.use(VueMQ, {
		breakpoints: {
			small: 375,
			phone: 540,
			tablet: 768,
			laptop: 1024,
			desktop: 1248,
			large: 1440,
			'x-large': 1600,
			huge: 1920,
		},
	})
	Vue.use(VueObserveVisibility)

	Object.entries(icons).forEach(([name, component]) => {
		return Vue.component(name, component)
	})

	Object.entries(examples).forEach(([name, component]) => {
		return Vue.component(name, component)
	})

	Vue.component('Layout', DefaultLayout)

	Vue.directive('scroll-lock', scrollLock)
	Vue.directive('xyz-scroll-sync', xyzScrollSync)

	Object.assign(head, {
		titleTemplate: (titleChunk) => {
			return titleChunk
		},
		...openGraphMeta({
			title: 'AnimXYZ',
			description: 'The first composable CSS animation toolkit',
			type: 'website',
			url: 'https://animxyz.com',
			image: 'https://animxyz.com/animxyz-link-preview.png',
		}),
	})

	head.meta.push({
		name: 'viewport',
		content: 'width=device-width, initial-scale=1.0',
	})

	head.script.push({
		src: 'https://beamanalytics.b-cdn.net/beam.min.js',
		'data-token': 'd87546f1-7825-45bb-9a4e-7fbb12ed65b4',
		async: true,
	})

	router.options.scrollBehavior = function (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		}
		if (to.hash) {
			return { selector: to.hash }
		}
		if (to.path !== from.path) {
			return { x: 0, y: 0 }
		}
		return null
	}

	Vue.use(
		// VueGtag,
		// {
		// 	config: { id: "UA-177625453-1" },
		// 	enabled: process.env.NODE_ENV === "production",
		// },
		router
	)
}
