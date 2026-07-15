// Awaits a specific xyz keyframe animation across a host element and its
// `.xyz-nested` descendants. Used by scripts that need to know when an
// xyz-driven transition has fully completed (host + nested children) so they
// can tear down classes safely without breaking later animations.

export type WaitForXyzAnimationOptions = {
  nestedSelector?: string
  filterNested?: (el: Element) => boolean
}

export type XyzAnimationHandle = { cancel: () => void }

function computedAnimationHasKeyframe(target: Element, keyframeName: string): boolean {
  const name = window.getComputedStyle(target).animationName
  return name.split(',').some((n) => n.trim() === keyframeName)
}

export function waitForXyzAnimation(
  host: HTMLElement,
  keyframeName: string,
  onDone: () => void,
  options: WaitForXyzAnimationOptions = {}
): XyzAnimationHandle {
  const nestedSelector = options.nestedSelector ?? '.xyz-nested'
  const { filterNested } = options
  const pending = new Set<Element>()
  let finished = false

  function finish() {
    if (finished) return
    finished = true
    host.removeEventListener('animationend', onAnimEnd)
    host.removeEventListener('animationcancel', onAnimEnd)
    onDone()
  }

  function onAnimEnd(event: AnimationEvent) {
    if (event.animationName !== keyframeName) return
    if (!(event.target instanceof Element)) return
    if (!pending.has(event.target)) return
    pending.delete(event.target)
    if (pending.size === 0) finish()
  }

  host.addEventListener('animationend', onAnimEnd)
  host.addEventListener('animationcancel', onAnimEnd)

  // Defer one tick so the browser has resolved computed styles after the
  // class flip that triggered this call, then collect everything that will
  // actually fire an animationend for `keyframeName`.
  window.setTimeout(() => {
    if (finished) return
    if (computedAnimationHasKeyframe(host, keyframeName)) {
      pending.add(host)
    }
    const nestedEls = host.querySelectorAll(nestedSelector)
    nestedEls.forEach((nested) => {
      if (filterNested && !filterNested(nested)) return
      if (!computedAnimationHasKeyframe(nested, keyframeName)) return
      pending.add(nested)
    })
    if (pending.size === 0) finish()
  })

  return { cancel: finish }
}
