import type { Directive } from 'vue'

function px(v: number) {
  return v
}

function vh(v: number) {
  return (v * window.innerHeight) / 100
}

function vw(v: number) {
  return (v * window.innerWidth) / 100
}

function percent(v: number, axis: string) {
  return axis === 'x' ? vw(v) : vh(v)
}

const viewportValueFns: Record<string, (v: number, axis?: string) => number> = {
  px,
  vh,
  vw,
  '%': percent,
}

function viewportValue(v: number | string | undefined, axis: string) {
  if (v === null || v === undefined) return 0
  if (typeof v === 'number') return v
  const match = v.match(/([\d]+\.?[\d]*)(px|vh|vw|vmin|vmax|%)/)
  if (match) {
    const [, num, unit] = match
    const fn = viewportValueFns[unit]
    if (fn) return fn(parseFloat(num), axis)
  }
  return 0
}

interface ScrollSyncEl extends HTMLElement {
  _xyzScrollSyncCallback?: () => void
}

function updateDirective(el: ScrollSyncEl, { value = {} as any }) {
  removeDirective(el)
  el.classList.add('xyz-paused-all')

  const { axis = 'y', compare = 'start', offset = 0 } = value as {
    axis?: 'x' | 'y'
    compare?: 'start' | 'end'
    offset?: number | string
  }
  const offsetPx = viewportValue(offset, axis)

  el._xyzScrollSyncCallback = () => {
    const elementBounds = el.getBoundingClientRect()

    let progress = 0
    if (axis === 'y') {
      if (compare === 'start') {
        progress = (elementBounds.top - offsetPx) / window.innerHeight
      } else if (compare === 'end') {
        progress = (window.innerHeight - elementBounds.bottom - offsetPx) / window.innerHeight
      }
    } else if (axis === 'x') {
      if (compare === 'start') {
        progress = (elementBounds.left - offsetPx) / window.innerWidth
      } else if (compare === 'end') {
        progress = (window.innerWidth - elementBounds.right - offsetPx) / window.innerWidth
      }
    }
    const normalizedProgress = 1 - Math.max(0, progress)
    el.style.setProperty('--xyz-start-offset', String(normalizedProgress))
  }
  el._xyzScrollSyncCallback()
  window.addEventListener('scroll', el._xyzScrollSyncCallback, { passive: true })
  window.addEventListener('resize', el._xyzScrollSyncCallback)
}

function removeDirective(el: ScrollSyncEl) {
  el.classList.remove('xyz-paused-all')
  el.style.removeProperty('--xyz-start-offset')
  if (el._xyzScrollSyncCallback) {
    window.removeEventListener('scroll', el._xyzScrollSyncCallback)
    window.removeEventListener('resize', el._xyzScrollSyncCallback)
    el._xyzScrollSyncCallback = undefined
  }
}

const xyzScrollSync: Directive = {
  mounted: updateDirective,
  updated: updateDirective,
  unmounted: removeDirective,
}

export default xyzScrollSync
