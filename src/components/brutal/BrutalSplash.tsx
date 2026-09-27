import { useEffect, useState } from 'react'

import { site } from '@/content/site'

const SESSION_KEY = 'hulu-splash-seen'
const HOLD_MS = 1200
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
export function BrutalSplash() {
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
      dir="ltr"
      className={`pointer-events-none fixed inset-0 z-50 flex flex-col items-center justify-center bg-burgundy-deep text-cream transition-opacity duration-700 ${
        phase === 'leave' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-block size-2.5 animate-ping rounded-full bg-crimson" />
        <span className="font-mono text-[12px] tracking-widest text-tan uppercase">{site.splash.status}</span>
      </div>
      <p className="px-4 text-center font-mono text-xl tracking-wider text-cream uppercase md:text-2xl">
        {site.chrome.englishLine}
      </p>
      <div className="relative mt-6 h-px w-48 overflow-hidden bg-hair-dark">
        <div className="h-full w-full animate-pulse bg-crimson" />
      </div>
    </div>
  )
}
