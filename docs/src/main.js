// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

// Fonts
import 'typeface-inter'
import 'typeface-inconsolata'

// Styles
import 'ress'
import '~/assets/styles/core/_index.scss'

// Plugins
import 'prismjs'
import VueAnimXyz from '@animxyz/vue'
import VueMQ from '~/plugins/VueMQ'
import VueScrollactive from 'vue-scrollactive'

export default function (Vue) {
	Vue.use(VueAnimXyz)
	Vue.use(VueMQ, {
		breakpoints: {
			small: '375px',
			phone: '540px',
			tablet: '768px',
			laptop: '1024px',
			desktop: '1248px',
			large: '1440px',
			'x-large': '2000px',
		},
	})
	Vue.use(VueScrollactive)
}
