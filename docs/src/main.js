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

export default function (Vue) {
	Vue.use(VueAnimXyz)
}
