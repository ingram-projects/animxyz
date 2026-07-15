import { reactive, onMounted, onUnmounted, readonly } from 'vue'

const breakpoints: Record<string, number> = {
  small: 375,
  phone: 540,
  tablet: 768,
  laptop: 1024,
  desktop: 1248,
  large: 1440,
  'x-large': 1600,
  huge: 1920,
}

function getBreakpoint(val: string | number): number {
  if (typeof val === 'number') return val
  if (val in breakpoints) return breakpoints[val]
  const num = Number(val)
  return Number.isNaN(num) ? 0 : num
}

interface MqState {
  width: number
  height: number
}

const state = reactive<MqState>({
  width: typeof window !== 'undefined' ? window.innerWidth : 0,
  height: typeof window !== 'undefined' ? window.innerHeight : 0,
})

let listenerCount = 0
let resizeHandler: (() => void) | null = null

function ensureListener() {
  if (typeof window === 'undefined') return
  if (resizeHandler) return
  resizeHandler = () => {
    state.width = window.innerWidth
    state.height = window.innerHeight
  }
  window.addEventListener('resize', resizeHandler)
}

function teardownListener() {
  if (typeof window === 'undefined') return
  if (!resizeHandler) return
  if (listenerCount > 0) return
  window.removeEventListener('resize', resizeHandler)
  resizeHandler = null
}

export function useMediaQueries() {
  onMounted(() => {
    listenerCount++
    ensureListener()
    if (resizeHandler) resizeHandler()
  })
  onUnmounted(() => {
    listenerCount = Math.max(0, listenerCount - 1)
    teardownListener()
  })

  function above(name: string | number): boolean {
    return state.width >= getBreakpoint(name)
  }

  function below(name: string | number): boolean {
    return state.width < getBreakpoint(name)
  }

  return {
    state: readonly(state),
    above,
    below,
  }
}
