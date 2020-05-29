// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import 'ress'
import '@/assets/styles/core/_index.scss'

import VueAnimXyz from '@animxyz/vue'
import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue) {
	Vue.use(VueAnimXyz)
	// Set default layout as a global component
	Vue.component('Layout', DefaultLayout)
}
