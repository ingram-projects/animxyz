import type { Directive } from 'vue'

interface ClickOutsideEl extends HTMLElement {
  _clickOutsideHandler?: (event: MouseEvent | TouchEvent) => void
}

const clickOutside: Directive = {
  mounted(el: ClickOutsideEl, binding) {
    el._clickOutsideHandler = (event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        if (typeof binding.value === 'function') {
          binding.value(event)
        }
      }
    }
    document.addEventListener('click', el._clickOutsideHandler, true)
    document.addEventListener('touchstart', el._clickOutsideHandler, true)
  },
  unmounted(el: ClickOutsideEl) {
    if (el._clickOutsideHandler) {
      document.removeEventListener('click', el._clickOutsideHandler, true)
      document.removeEventListener('touchstart', el._clickOutsideHandler, true)
      el._clickOutsideHandler = undefined
    }
  },
}

export default clickOutside
