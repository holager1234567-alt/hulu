import { useEffect, useLayoutEffect, useState } from 'react'

const SESSION_KEY = 'hulu-splash-seen'
const HOLD_MS = 1500
const FADE_MS = 650

function shouldShowSplash() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return window.sessionStorage.getItem(SESSION_KEY) !== '1'
  } catch {
    return true
  }
}

/** Once per session intro overlay; the page renders underneath and the hero intro waits for it. */
export function LandingSplash() {
  const [phase, setPhase] = useState<'show' | 'leave' | 'done'>(() => (shouldShowSplash() ? 'show' : 'done'))

  useLayoutEffect(() => {
    if (phase !== 'show') return
    document.documentElement.style.setProperty('--lp-intro-delay', `${(HOLD_MS + 250) / 1000}s`)
  }, [phase])

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
      className={`lp-splash${phase === 'leave' ? ' is-leaving' : ''}`}
      aria-hidden
      onClick={() => setPhase('leave')}
    >
      <div className="lp-splash-inner" dir="ltr">
        <p className="lp-splash-mark">
          {'HULU'.split('').map((letter, index) => (
            <span key={index} style={{ animationDelay: `${0.08 * index}s` }}>
              {letter}
            </span>
          ))}
        </p>
        <p className="lp-splash-sub">Web Designer &amp; Landing page</p>
        <span className="lp-splash-progress">
          <span />
        </span>
      </div>
    </div>
  )
}
