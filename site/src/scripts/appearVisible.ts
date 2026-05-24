// Replicates the appear-visible behaviour from
// `utils/getXyzAnimationHook.js` for plain static markup. Any element rendered
// with the `xyz-paused-all` class (and ideally also `xyz-appear`) will have
// `xyz-paused-all` removed when it first intersects the viewport, allowing the
// AnimXYZ CSS keyframes to play.
//
// Once the appear animation completes (on the element and any `.xyz-nested`
// descendants), the `xyz-appear` class is also removed. This mirrors what
// Vue's `<XyzTransition appear-visible>` did in the previous app: leaving
// `xyz-appear` on the element forever causes the global `.xyz-appear .xyz-nested`
// rule to keep applying `xyz-appear-keyframes` to descendants, which then
// "wins" specificity against `.xyz-out .xyz-nested` etc. and breaks any later
// xyz animations on nested children (notably the homepage sandbox).

import { waitForXyzAnimation } from './xyzAnimation'

const PAUSED_CLASS = 'xyz-paused-all'
const APPEAR_CLASS = 'xyz-appear'
const APPEAR_KEYFRAMES = 'xyz-appear-keyframes'
const NESTED_SELECTOR = '.xyz-nested, .xyz-appear-nested'

let observer: IntersectionObserver | null = null
let mutationObserver: MutationObserver | null = null

function activate(el: HTMLElement) {
  el.classList.remove(PAUSED_CLASS)
  if (el.classList.contains(APPEAR_CLASS)) {
    waitForXyzAnimation(
      el,
      APPEAR_KEYFRAMES,
      () => {
        if (el.classList.contains(APPEAR_CLASS)) {
          el.classList.remove(APPEAR_CLASS)
        }
      },
      {
        nestedSelector: NESTED_SELECTOR,
        filterNested: (nested) => {
          // Skip elements that won't actually paint (e.g. inside a hidden parent).
          const el = nested as HTMLElement
          return Boolean(el.offsetParent) || nested.getClientRects().length > 0
        },
      }
    )
  }
}

function getObserver(): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer!.unobserve(entry.target)
            activate(entry.target as HTMLElement)
          }
        }
      },
      { rootMargin: '0px', threshold: 0 }
    )
  }
  return observer
}

function observeAll(root: ParentNode = document) {
  const els = root.querySelectorAll<HTMLElement>(`.${PAUSED_CLASS}`)
  const io = getObserver()
  for (const el of els) {
    io.observe(el)
  }
}

function watchForNewElements() {
  if (mutationObserver) return
  mutationObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue
        const el = node as Element
        if (el.classList && el.classList.contains(PAUSED_CLASS)) {
          getObserver().observe(el)
        }
        observeAll(el)
      }
    }
  })
  mutationObserver.observe(document.body, { childList: true, subtree: true })
}

export function initAppearVisible() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      observeAll()
      watchForNewElements()
    })
  } else {
    observeAll()
    watchForNewElements()
  }
}
