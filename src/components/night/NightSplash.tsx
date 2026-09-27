import { useEffect, useState } from 'react'

const SESSION_KEY = 'hulu-splash-seen'
const HOLD_MS = 1400
const FADE_MS = 700

function shouldShowSplash() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return window.sessionStorage.getItem(SESSION_KEY) !== '1'
  } catch {
    return true
  }
}

/** Once per session intro overlay; it never blocks the page underneath. */
export function NightSplash() {
  const [phase, setPhase] = useState<'show' | 'leave' | 'done'>(() => (shouldShowSplash() ? 'show' : 'done'))

  useEffect(() => {
    if (phase === 'done') return
    try {
      window.sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* private mode */
    }
    const leave = window.setTimeout(() => setPhase('leave'), HOLD_MS)
    const done = window.setTimeout(() => setPhase('done'), HOLD_MS + FADE_MS)
    return () => {
      window.clearTimeout(leave)
      window.clearTimeout(done)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-50 flex flex-col items-center justify-center bg-night transition-opacity duration-700 ${
        phase === 'leave' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <span dir="ltr" className="mb-3 text-xs tracking-widest text-sand uppercase">
        Studio Digital Assets
      </span>
      <p dir="ltr" className="px-4 text-center text-2xl font-light tracking-wide text-cream md:text-3xl">
        HULU Web Designer &amp; Landing page
      </p>
      <div className="relative mt-6 h-px w-24 overflow-hidden bg-night-line">
        <div className="h-full w-full origin-left animate-pulse bg-sand" />
      </div>
    </div>
  )
}
