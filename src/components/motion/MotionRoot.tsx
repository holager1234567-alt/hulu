import { useEffect } from 'react'

import { gsap, ScrollTrigger, SplitText, useGSAP } from '@/lib/gsap'
import { MEDIA, useMediaQuery } from '@/lib/motionEnv'
import { startPointerFx } from '@/lib/pointerFx'
import { retainScrollVelocity } from '@/lib/scrollVelocity'
import { startSmoothScroll, stopSmoothScroll } from '@/lib/smoothScroll'

/**
 * Page-wide motion layer: Lenis smooth scroll synced to ScrollTrigger (desktop only),
 * magnetic / tilt pointer effects, and [data-split] / [data-reveal] reveals.
 */
export function MotionRoot() {
  const reduced = useMediaQuery(MEDIA.reducedMotion)
  const finePointer = useMediaQuery(MEDIA.finePointer)
  const rich = finePointer && !reduced

  useEffect(() => {
    if (!rich) return
    const html = document.documentElement
    startSmoothScroll()
    html.classList.add('has-smooth-scroll')
    const stopPointerFx = startPointerFx()

    return () => {
      stopPointerFx()
      stopSmoothScroll()
      html.classList.remove('has-smooth-scroll')
    }
  }, [rich])

  useEffect(() => {
    if (reduced) return
    return retainScrollVelocity()
  }, [reduced])

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh).catch(() => undefined)
    window.addEventListener('load', refresh, { once: true })
    return () => window.removeEventListener('load', refresh)
  }, [])

  useGSAP(
    () => {
      if (reduced) return

      gsap.utils.toArray<HTMLElement>('[data-split]').forEach((heading) => {
        SplitText.create(heading, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 115,
              duration: 1.25,
              ease: 'expo.out',
              stagger: 0.11,
              scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
            }),
        })
      })

      const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]')
      if (!reveals.length) return
      gsap.set(reveals, { autoAlpha: 0, y: 34 })
      ScrollTrigger.batch(reveals, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 1.05,
            ease: 'power3.out',
            stagger: 0.09,
            overwrite: true,
          }),
      })
    },
    { dependencies: [reduced], revertOnUpdate: true },
  )

  return null
}
