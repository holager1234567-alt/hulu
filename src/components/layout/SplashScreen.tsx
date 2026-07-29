import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Logo } from '@/components/layout/Logo'
import { EASE } from '@/lib/motion'

type SplashScreenProps = {
  onComplete: () => void
}

const MIN_DURATION = 1200
const ANIM_DURATION = 1500
const MAX_WAIT = 3000
const PAUSE_AT_100 = 200
const FADE_OUT_MS = 400

function isDocumentReady() {
  return document.readyState !== 'loading'
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const reducedMotion = useReducedMotion()
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'pause' | 'exit'>('loading')

  useEffect(() => {
    if (reducedMotion) {
      onCompleteRef.current()
      return
    }

    const startTime = performance.now()
    let loadCompleteTime = isDocumentReady()
      ? startTime
      : Number.POSITIVE_INFINITY

    const markReady = () => {
      loadCompleteTime = performance.now()
    }

    if (!isDocumentReady()) {
      document.addEventListener('DOMContentLoaded', markReady, { once: true })
      window.addEventListener('load', markReady, { once: true })
    }

    let raf = 0

    const tick = (now: number) => {
      const elapsed = now - startTime
      const loadElapsed =
        loadCompleteTime === Number.POSITIVE_INFINITY
          ? 0
          : loadCompleteTime - startTime

      const totalDuration = Math.max(MIN_DURATION, ANIM_DURATION, loadElapsed)
      const raw = Math.min(elapsed / totalDuration, 1)
      const pct = Math.round(easeOutCubic(raw) * 100)

      setProgress(pct)

      const loadReady =
        loadCompleteTime !== Number.POSITIVE_INFINITY || elapsed >= MAX_WAIT
      const timeReady = elapsed >= totalDuration

      if (timeReady && loadReady && pct >= 100) {
        setProgress(100)
        setPhase('pause')
        return
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('DOMContentLoaded', markReady)
      window.removeEventListener('load', markReady)
    }
  }, [reducedMotion])

  useEffect(() => {
    if (phase !== 'pause') return
    const timer = window.setTimeout(() => setPhase('exit'), PAUSE_AT_100)
    return () => window.clearTimeout(timer)
  }, [phase])

  if (reducedMotion) return null

  return (
    <motion.div
      className="splash-screen fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden hero-gradient"
      role="status"
      aria-live="polite"
      aria-label={`טוען, ${progress} אחוז`}
      initial={{ opacity: 1, scale: 1 }}
      animate={
        phase === 'exit'
          ? { opacity: 0, scale: 1.015 }
          : { opacity: 1, scale: 1 }
      }
      transition={{ duration: FADE_OUT_MS / 1000, ease: EASE }}
      onAnimationComplete={() => {
        if (phase === 'exit') onComplete()
      }}
    >
      <div className="tech-grid-bg splash-grid" aria-hidden />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6">
        <Logo className="h-16 w-auto md:h-20 lg:h-24" />

        <div className="flex flex-col items-center gap-3">
          <p
            className="font-mono-tech text-3xl font-semibold tabular-nums text-burgundy md:text-4xl"
            aria-hidden
          >
            {progress}
            <span className="text-xl opacity-70 md:text-2xl">%</span>
          </p>

          <div
            className="splash-progress-track h-[2px] w-44 overflow-hidden rounded-full bg-burgundy/12 md:w-52"
            aria-hidden
          >
            <div
              className="splash-progress-fill h-full rounded-full bg-burgundy"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
