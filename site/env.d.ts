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

declare module 'body-scroll-lock' {
  export interface BodyScrollOptions {
    allowTouchMove?: (el: HTMLElement | Node) => boolean
    reserveScrollBarGap?: boolean
  }
  export function disableBodyScroll(el: HTMLElement | Element, options?: BodyScrollOptions): void
  export function enableBodyScroll(el: HTMLElement | Element): void
  export function clearAllBodyScrollLocks(): void
}

// AnimXYZ uses a `data-xyz` attribute to declare animation utilities.
// `data-*` is already valid on HTMLAttributes; keep this note for clarity.
