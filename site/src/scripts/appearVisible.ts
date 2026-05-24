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

const PAUSED_CLASS = 'xyz-paused-all'
const APPEAR_CLASS = 'xyz-appear'
const APPEAR_KEYFRAMES = 'xyz-appear-keyframes'
const NESTED_SELECTOR = '.xyz-nested, .xyz-appear-nested'

let observer: IntersectionObserver | null = null
let mutationObserver: MutationObserver | null = null

function cleanupAppearClass(el: HTMLElement) {
  // Track all elements whose `xyz-appear-keyframes` animation we expect to end
  // before removing `xyz-appear` from the host. The host itself only matters
  // when its computed animation actually includes `xyz-appear-keyframes`
  // (e.g. it may be `animation: none` via `.xyz-none`).
  const pending = new Set<Element>()

  function hasAppearAnimation(target: Element) {
    const animationName = window.getComputedStyle(target).animationName
    return animationName.indexOf(APPEAR_KEYFRAMES) !== -1
  }

  function finish() {
    el.removeEventListener('animationend', onAnimEnd)
    el.removeEventListener('animationcancel', onAnimEnd)
    if (el.classList.contains(APPEAR_CLASS)) {
      el.classList.remove(APPEAR_CLASS)
    }
  }

  function clear(target: Element) {
    pending.delete(target)
    if (pending.size === 0) {
      finish()
    }
  }

  function onAnimEnd(event: AnimationEvent) {
    if (event.animationName !== APPEAR_KEYFRAMES) return
    if (!(event.target instanceof Element)) return
    if (!pending.has(event.target)) return
    clear(event.target)
  }

  // Defer one tick so the browser has resolved computed styles after
  // `xyz-paused-all` was removed, then prune anything that won't actually
  // fire an `xyz-appear-keyframes` animationend.
  window.setTimeout(() => {
    if (hasAppearAnimation(el)) {
      pending.add(el)
    }
    const nestedEls = el.querySelectorAll(NESTED_SELECTOR)
    nestedEls.forEach((nested) => {
      if (!hasAppearAnimation(nested)) return
      // Skip elements that won't actually paint (e.g. inside a hidden parent).
      const visible = (nested as HTMLElement).offsetParent || nested.getClientRects().length
      if (!visible) return
      pending.add(nested)
    })
    if (pending.size === 0) {
      finish()
    }
  })

  el.addEventListener('animationend', onAnimEnd, false)
  el.addEventListener('animationcancel', onAnimEnd, false)
}

function activate(el: HTMLElement) {
  el.classList.remove(PAUSED_CLASS)
  if (el.classList.contains(APPEAR_CLASS)) {
    cleanupAppearClass(el)
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
