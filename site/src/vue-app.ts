import type { App } from 'vue'
import VueAnimXyz from '@animxyz/vue3'
import icons from '~/assets/icons'
import { exampleComponents } from '~/components/vue/examples'
import scrollLock from '~/directives/scrollLock'
import xyzScrollSync from '~/directives/xyzScrollSync'
import clickOutside from '~/directives/clickOutside'

export default (app: App) => {
  app.use(VueAnimXyz)

  for (const [name, component] of Object.entries(icons)) {
    app.component(name, component as any)
  }

  for (const [name, component] of Object.entries(exampleComponents)) {
    app.component(`Example_${name}`, component)
  }

  app.directive('scroll-lock', scrollLock)
  app.directive('xyz-scroll-sync', xyzScrollSync)
  app.directive('click-outside', clickOutside)
}
