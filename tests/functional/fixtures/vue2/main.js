// "vue" is aliased to the vue2 (vue@2.7) full ESM build in build-fixtures.mjs
import Vue from 'vue'
import VueAnimXyz from '@animxyz/vue'
import '@animxyz/core'

Vue.use(VueAnimXyz)

window.log = []

new Vue({
	el: '#app',
	data: {
		showSingle: false,
		items: [1, 2, 3],
		nextItem: 4,
		dirValue: 'fade up',
	},
	methods: {
		logEvent(name) {
			window.log.push(name)
		},
	},
	template: `
		<main>
			<section id="single">
				<button id="single-toggle" @click="showSingle = !showSingle">single</button>
				<XyzTransition xyz="fade"
					@after-enter="logEvent('single:after-enter')"
					@after-leave="logEvent('single:after-leave')">
					<div v-if="showSingle" id="single-box" class="box" style="--xyz-duration: 50ms"></div>
				</XyzTransition>
			</section>

			<section id="appear">
				<XyzTransition appear xyz="fade" @after-appear="logEvent('appear:after-appear')">
					<div id="appear-box" class="box" style="--xyz-duration: 50ms"></div>
				</XyzTransition>
			</section>

			<section id="group-section">
				<button id="group-add" @click="items.push(nextItem++)">add</button>
				<button id="group-remove" @click="items.shift()">remove</button>
				<XyzTransitionGroup id="group" tag="ul" xyz="fade" class="group-class">
					<li v-for="item in items" :key="item" :id="'item-' + item" class="box" style="--xyz-duration: 50ms">{{ item }}</li>
				</XyzTransitionGroup>
			</section>

			<section id="directive">
				<div id="dir-plain" class="box" v-xyz="'fade up'"></div>
				<div id="dir-compose" class="box" xyz="duration-5" v-xyz="dirValue"></div>
				<button id="dir-update" @click="dirValue = 'left'">update directive</button>
			</section>
		</main>
	`,
})
