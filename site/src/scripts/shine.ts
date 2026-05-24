// Tracks the global mouse position and writes it as `--mouseX`/`--mouseY`
// custom properties (relative to each element's bounding box) onto every
// element marked with `data-shine`. Replaces the per-component Shine.vue
// island; the SCSS that consumed those variables stays in place.

export function initShine() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return

  let lastEvent: MouseEvent | null = null
  let rafId = 0

  function update() {
    rafId = 0
    if (!lastEvent) return
    const els = document.querySelectorAll<HTMLElement>('[data-shine]')
    for (const el of els) {
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--mouseX', `${lastEvent.clientX - rect.left}px`)
      el.style.setProperty('--mouseY', `${lastEvent.clientY - rect.top}px`)
    }
  }

  window.addEventListener(
    'mousemove',
    (event) => {
      lastEvent = event
      if (!rafId) {
        rafId = requestAnimationFrame(update)
      }
    },
    { passive: true }
  )
}
