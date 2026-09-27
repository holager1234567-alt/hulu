import { useSyncExternalStore } from 'react'

export const MEDIA = {
  reducedMotion: '(prefers-reduced-motion: reduce)',
  finePointer: '(hover: hover) and (pointer: fine)',
  tablet: '(min-width: 768px)',
  desktop: '(min-width: 1024px)',
} as const

const subscriptions = new Map<string, (onChange: () => void) => () => void>()

function subscribeTo(query: string) {
  let subscribe = subscriptions.get(query)
  if (!subscribe) {
    subscribe = (onChange: () => void) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    }
    subscriptions.set(query, subscribe)
  }
  return subscribe
}

export function matchesMedia(query: string) {
  return typeof window !== 'undefined' && window.matchMedia(query).matches
}

export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    subscribeTo(query),
    () => window.matchMedia(query).matches,
    () => serverValue,
  )
}

let webglSupport: boolean | null = null

/** three.js r163+ needs WebGL2; software-only contexts fall back to the CSS layers. */
export function supportsWebGL() {
  if (webglSupport !== null) return webglSupport
  if (typeof window === 'undefined') return false

  const forced = new URLSearchParams(window.location.search).get('gl')
  if (forced === 'off') return (webglSupport = false)

  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2', {
      failIfMajorPerformanceCaveat: forced !== 'force',
    })
    webglSupport = Boolean(gl)
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
  } catch {
    webglSupport = false
  }

  return webglSupport
}

/** Resolves after the window load event plus an idle slot, so WebGL never competes with LCP. */
export function whenIdleAfterLoad(callback: () => void, timeout = 1800) {
  let cancelled = false
  let idleId = 0
  let timer = 0

  const schedule = () => {
    if (cancelled) return
    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(() => !cancelled && callback(), { timeout })
    } else {
      timer = globalThis.setTimeout(() => !cancelled && callback(), 300)
    }
  }

  if (document.readyState === 'complete') schedule()
  else window.addEventListener('load', schedule, { once: true })

  return () => {
    cancelled = true
    window.removeEventListener('load', schedule)
    if (idleId && typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idleId)
    if (timer) globalThis.clearTimeout(timer)
  }
}
