import type { App } from 'vue'
import VueAnimXyz from '@animxyz/vue3'
import scrollLock from '~/directives/scrollLock'
import clickOutside from '~/directives/clickOutside'

export default (app: App) => {
  app.use(VueAnimXyz)

  app.directive('scroll-lock', scrollLock)
  app.directive('click-outside', clickOutside)
}
