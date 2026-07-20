import { createApp } from 'vue'
import VueAnimXyz from '@animxyz/vue3'
import '@animxyz/core'

window.log = []

const app = createApp({
	data() {
		return {
			showSingle: false,
			showSlow: false,
			showDurationNumber: false,
			showDurationAuto: false,
			items: [1, 2, 3],
			nextItem: 4,
			dirValue: 'fade up',
			switchState: 'a',
		}
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

			<section id="slow">
				<button id="slow-toggle" @click="showSlow = !showSlow">slow</button>
				<XyzTransition xyz="fade">
					<div v-if="showSlow" id="slow-box" class="box" style="--xyz-duration: 800ms"></div>
				</XyzTransition>
			</section>

			<section id="appear">
				<XyzTransition appear xyz="fade" @after-appear="logEvent('appear:after-appear')">
					<div id="appear-box" class="box" style="--xyz-duration: 50ms"></div>
				</XyzTransition>
			</section>

			<section id="duration">
				<button id="duration-number-toggle" @click="showDurationNumber = true">number</button>
				<XyzTransition xyz="fade" :duration="50" @after-enter="logEvent('duration-number:after-enter')">
					<div v-if="showDurationNumber" id="duration-number-box" class="box" style="--xyz-duration: 50ms"></div>
				</XyzTransition>

				<button id="duration-auto-toggle" @click="showDurationAuto = true">auto</button>
				<XyzTransition xyz="fade" duration="auto" @after-enter="logEvent('duration-auto:after-enter')">
					<div v-if="showDurationAuto" id="duration-auto-box" style="--xyz-duration: 50ms">
						<div class="box xyz-nested" style="--xyz-duration: 150ms"></div>
						<div class="box xyz-nested" style="--xyz-duration: 100ms"></div>
					</div>
				</XyzTransition>
			</section>

			<section id="switch">
				<button id="switch-toggle" @click="switchState = switchState === 'a' ? 'b' : 'a'">switch</button>
				<XyzTransition xyz="fade" mode="out-in"
					@after-enter="logEvent('switch:after-enter')"
					@after-leave="logEvent('switch:after-leave')">
					<div class="box" :key="switchState" :id="'switch-' + switchState" style="--xyz-duration: 50ms"></div>
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

app.use(VueAnimXyz)
app.mount('#app')
