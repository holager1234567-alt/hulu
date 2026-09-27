import { lazy, Suspense, useEffect, useRef, useState } from 'react'

import { useViewportPresence } from '@/hooks/useViewportPresence'
import { MEDIA, supportsWebGL, useMediaQuery, whenIdleAfterLoad } from '@/lib/motionEnv'
import { cn } from '@/lib/utils'
import type { SilkPalette } from '@/components/three/silkPalettes'

const SilkCanvas = lazy(() => import('@/components/three/SilkCanvas'))

type SilkBackdropProps = {
  palette: SilkPalette
  className?: string
}

/** Static satin gradient first; the WebGL silk fades in after load, only on tablet+ with motion allowed. */
export function SilkBackdrop({ palette, className }: SilkBackdropProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useMediaQuery(MEDIA.reducedMotion)
  const tablet = useMediaQuery(MEDIA.tablet)
  const { near, visible } = useViewportPresence(ref)
  const [idle, setIdle] = useState(false)
  const [ready, setReady] = useState(false)
  const enabled = tablet && !reduced && supportsWebGL()

  useEffect(() => {
    if (!enabled) return
    return whenIdleAfterLoad(() => setIdle(true))
  }, [enabled])

  return (
    <div ref={ref} className={cn('silk', `silk--${palette}`, ready && enabled && 'is-ready', className)} aria-hidden>
      <div className="silk-fallback" />
      {enabled && idle && near ? (
        <Suspense fallback={null}>
          <SilkCanvas palette={palette} active={visible} onReady={() => setReady(true)} />
        </Suspense>
      ) : null}
    </div>
  )
}
