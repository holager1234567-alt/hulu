import { useEffect, useRef } from 'react'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'

/** Direct DOM updates — avoids framer-motion scroll + spring work on every frame. */
export function ScrollProgress() {
  const reduced = useReducedMotionPreference()
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced) return

    const bar = barRef.current
    if (!bar) return

    let rafId = 0

    const paint = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      bar.style.transform = `scaleX(${progress})`
    }

    const onScroll = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(() => {
        rafId = 0
        paint()
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    paint()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <div
      ref={barRef}
      className="scroll-progress pointer-events-none fixed inset-x-0 top-0 z-[60] origin-right"
      style={{ transform: 'scaleX(0)' }}
      aria-hidden
    />
  )
}
