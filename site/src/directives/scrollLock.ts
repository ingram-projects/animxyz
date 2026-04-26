import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import type { Directive, DirectiveBinding } from 'vue'

function updateScrollLock(el: HTMLElement, binding: DirectiveBinding) {
  if (binding.oldValue === binding.value) {
    return
  }

  if (binding.value) {
    disableBodyScroll(el, {
      allowTouchMove: (node: any) => {
        let current = node as HTMLElement | null
        while (current && current !== document.body) {
          if (current.getAttribute && current.getAttribute('body-scroll-lock-ignore') !== null) {
            return true
          }
          current = current.parentNode as HTMLElement | null
        }
        return false
      },
    })
  } else {
    enableBodyScroll(el)
  }
}

const scrollLock: Directive = {
  mounted: updateScrollLock,
  updated: updateScrollLock,
  unmounted(el) {
    enableBodyScroll(el)
  },
}

export default scrollLock
