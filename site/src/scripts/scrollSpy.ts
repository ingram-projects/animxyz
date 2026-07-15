import { activeSectionId } from '~/stores/docs'

// Replicates DocsApp.onWindowScroll: finds the section whose bounding box
// covers the most of the viewport and writes its id into `activeSectionId`.

export function initScrollSpy(selector = '.docs-section__wrap[id]') {
  if (typeof window === 'undefined' || typeof document === 'undefined') return

  let scheduled = false

  function measure() {
    scheduled = false
    const elements = document.querySelectorAll<HTMLElement>(selector)
    let bestId: string | null = null
    let maxCoverage = 0
    for (const el of elements) {
      if (!el.id) continue
      const { top, bottom } = el.getBoundingClientRect()
      const coverage = Math.min(bottom, window.innerHeight) - Math.max(top, 0)
      if (coverage > maxCoverage) {
        maxCoverage = coverage
        bestId = el.id
      }
    }
    if (bestId !== activeSectionId.get()) {
      activeSectionId.set(bestId)
    }
  }

  function schedule() {
    if (scheduled) return
    scheduled = true
    requestAnimationFrame(measure)
  }

  function applyActiveClass(id: string | null) {
    const wraps = document.querySelectorAll<HTMLElement>(selector)
    wraps.forEach((el) => {
      el.classList.toggle('active', el.id === id)
    })
  }

  function start() {
    activeSectionId.subscribe(applyActiveClass)
    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start)
  } else {
    start()
  }
}
