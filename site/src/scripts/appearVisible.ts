// Replicates the appear-visible behaviour from
// `utils/getXyzAnimationHook.js` for plain static markup. Any element rendered
// with the `xyz-paused-all` class (and ideally also `xyz-appear`) will have
// `xyz-paused-all` removed when it first intersects the viewport, allowing the
// AnimXYZ CSS keyframes to play.

const PAUSED_CLASS = 'xyz-paused-all'

let observer: IntersectionObserver | null = null
let mutationObserver: MutationObserver | null = null

function getObserver(): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.remove(PAUSED_CLASS)
            observer!.unobserve(entry.target)
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
