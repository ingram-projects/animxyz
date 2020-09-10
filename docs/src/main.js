// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

// Fonts
import 'typeface-inter'
import 'typeface-inconsolata'

// Styles
import 'ress'
import '~/assets/styles/core/_index.scss'

// Packages
import 'prismjs'

// Plugins
import VueAnimXyz from '@animxyz/vue'
import VueGtag from 'vue-gtag'
import VueMQ from '~/plugins/VueMQ'
import VueObserveVisibility from 'vue-observe-visibility'

// Directives
import ScrollLock from '~/directives/ScrollLock'

// Layouts
import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router }) {
	Vue.use(VueAnimXyz)
	Vue.use(VueMQ, {
		breakpoints: {
			small: '375px',
			phone: '540px',
			tablet: '768px',
			laptop: '1024px',
			desktop: '1248px',
			large: '1440px',
			'x-large': '1600px',
			huge: '1920px',
		},
	})
	Vue.use(VueObserveVisibility)

	Vue.component('Layout', DefaultLayout)

	Vue.directive('ScrollLock', ScrollLock)

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

	if (process.env.NODE_ENV === 'production') {
		Vue.use(
			VueGtag,
			{
				config: { id: 'UA-177625453-1' },
			},
			router
		)
	}
}
