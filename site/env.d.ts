/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module '*.svg?component' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.svg?url' {
  const src: string
  export default src
}

declare module '*.svg?raw' {
  const content: string
  export default content
}
