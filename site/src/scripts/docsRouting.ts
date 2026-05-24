import { activeTab, type DocsTab } from '~/stores/docs'

// Ports DocsApp.onInternalLinkClick / onLocationChange so internal links that
// stay on the current page only update history + the activeTab store without
// triggering a full page reload, and so the tab pulled from `?tab=` syncs the
// store on load / popstate / hashchange.

export function initDocsRouting() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return

  function readTab(): DocsTab {
    const params = new URLSearchParams(window.location.search)
    const value = params.get('tab')
    return value === 'examples' ? 'examples' : 'docs'
  }

  function applyTab() {
    activeTab.set(readTab())
  }

  function applyClass(tab: DocsTab) {
    const root = document.querySelector('.docs-root')
    if (!root) return
    root.classList.remove('tab--docs', 'tab--examples')
    root.classList.add(`tab--${tab}`)
  }

  function onInternalLinkClick(event: MouseEvent) {
    if (event.defaultPrevented) return
    if (event.button !== 0) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    const target = event.target as Element | null
    const anchor = target ? (target.closest('a') as HTMLAnchorElement | null) : null
    if (!anchor || !anchor.href) return
    if (anchor.target && anchor.target !== '_self') return
    if (anchor.hasAttribute('download')) return

    let url: URL
    try {
      url = new URL(anchor.href, window.location.href)
    } catch {
      return
    }

    if (url.origin !== window.location.origin) return

    const samePath = url.pathname.replace(/\/$/, '') === window.location.pathname.replace(/\/$/, '')
    if (!samePath) return

    event.preventDefault()

    const urlChanged = url.href !== window.location.href
    if (urlChanged) {
      window.history.pushState({}, '', url.href)
    }

    applyTab()

    if (url.hash) {
      const id = decodeURIComponent(url.hash.slice(1))
      const targetEl = id && document.getElementById(id)
      if (targetEl) {
        targetEl.scrollIntoView({ block: 'start' })
      }
    }

    // `pushState` doesn't fire hashchange/popstate, so listeners that re-read
    // `location.search` (notably the Sandbox component, which applies the
    // `example` / `utilities` / `variables` / `group` query params) wouldn't
    // pick up the new URL when the user stayed on the same section. Manually
    // dispatch a popstate to let them resync.
    if (urlChanged) {
      window.dispatchEvent(new PopStateEvent('popstate'))
    }
  }

  function start() {
    activeTab.subscribe(applyClass)
    applyTab()
    window.addEventListener('hashchange', applyTab)
    window.addEventListener('popstate', applyTab)
    document.addEventListener('click', onInternalLinkClick)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start)
  } else {
    start()
  }
}
