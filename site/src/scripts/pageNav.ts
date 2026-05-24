import { activeSectionId, navOpen } from '~/stores/docs'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

// Replaces the toggle/open/close + click-outside + active-link logic that
// used to live in PageNav.vue. Operates on the static markup emitted by
// `PageNav.astro` and is wired through nanostores so the rest of the page can
// react to nav open/closed and the active section.

const LARGE_QUERY = '(min-width: 1440px)'
const TABLET_QUERY = '(max-width: 767.98px)'

export function initPageNav() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPageNav, { once: true })
    return
  }

  const root = document.querySelector<HTMLElement>('.page-nav__wrap')
  const navEl = document.querySelector<HTMLElement>('.page-nav')
  const button = document.querySelector<HTMLButtonElement>('.nav-button')
  const toggleText = document.querySelector<HTMLElement>('.nav-button .toggle-text')
  const navListWrap = document.querySelector<HTMLElement>('.nav-list__wrap')
  if (!root || !navEl || !button || !navListWrap) return

  const largeMq = window.matchMedia(LARGE_QUERY)
  const tabletMq = window.matchMedia(TABLET_QUERY)

  let bodyLocked = false

  function applyNavState() {
    const open = navOpen.get()
    root!.classList.toggle('open', open)
    button!.disabled = largeMq.matches
    if (toggleText) {
      toggleText.textContent = open ? 'Close' : 'Menu'
    }
    const shouldLock = tabletMq.matches && open
    if (shouldLock && !bodyLocked) {
      disableBodyScroll(navListWrap!, {
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
      bodyLocked = true
    } else if (!shouldLock && bodyLocked) {
      enableBodyScroll(navListWrap!)
      bodyLocked = false
    }
  }

  function syncToMedia() {
    if (largeMq.matches) {
      navOpen.set(true)
    } else {
      navOpen.set(false)
    }
  }

  function onClickOutside(event: MouseEvent) {
    if (!navOpen.get()) return
    if (largeMq.matches) return
    const target = event.target as Node | null
    if (!target) return
    if (root!.contains(target)) return
    navOpen.set(false)
  }

  function onSectionClick(event: Event) {
    const target = event.target as Element | null
    if (!target) return
    if (!target.closest('.nav-item__link')) return
    if (largeMq.matches) return
    navOpen.set(false)
  }

  function applyActiveSection(id: string | null) {
    const links = root!.querySelectorAll<HTMLAnchorElement>('.nav-item__link[data-section-id]')
    let activeEl: HTMLAnchorElement | null = null
    links.forEach((link) => {
      const isActive = link.dataset.sectionId === id
      link.classList.toggle('active', isActive)
      if (isActive) activeEl = link
    })
    if (activeEl) {
      ;(activeEl as HTMLElement).scrollIntoView({ block: 'center' })
    }
  }

  button.addEventListener('click', () => {
    if (largeMq.matches) return
    navOpen.set(!navOpen.get())
  })

  root.addEventListener('click', onSectionClick)
  document.addEventListener('click', onClickOutside)

  if (typeof largeMq.addEventListener === 'function') {
    largeMq.addEventListener('change', () => {
      syncToMedia()
    })
    tabletMq.addEventListener('change', () => {
      applyNavState()
    })
  }

  navOpen.subscribe(() => applyNavState())
  activeSectionId.subscribe((id) => applyActiveSection(id))

  syncToMedia()
}
