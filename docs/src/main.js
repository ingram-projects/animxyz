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
import VueLocation from '~/plugins/VueLocation'
import VueMQ from '~/plugins/VueMQ'
import VueObserveVisibility from 'vue-observe-visibility'
import VScrollLock from 'v-scroll-lock'

// Layouts
import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, context) {
	Vue.use(VueAnimXyz)
	Vue.use(VueLocation)
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
	Vue.use(VScrollLock)

	Vue.component('Layout', DefaultLayout)

	context.router.afterEach((to) => {
    if (to.hash) {
      setTimeout(() => {
				const hashEl = document.getElementById(to.hash.substr(1))
				if (hashEl) {
					hashEl.scrollIntoView()
				}
      })
    }
  })
}
