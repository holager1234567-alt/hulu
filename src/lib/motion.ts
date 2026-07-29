import { useEffect, useState } from 'react'
import type { Transition, Variants } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1] as const

export const defaultTransition: Transition = {
  duration: 0.55,
  ease: EASE,
}

export const viewportOnce = { once: true, margin: '-80px' as const }
export const viewportOnceTight = { once: true, margin: '-40px' as const }

export const fadeUpScale: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: defaultTransition,
  },
}

export const fadeUpScaleSmall: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: defaultTransition,
  },
}

/** Stagger container for split-line headline reveals (mount or scroll). */
export const headlineStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
}

/** Inner line slide-up + fade — animate from parent, not whileInView. */
export const lineRevealItem: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.75, ease: EASE },
  },
}

export const lineRevealItemReduced: Variants = {
  hidden: { y: 0, opacity: 1 },
  visible: { y: 0, opacity: 1 },
}

export const springPop: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 22,
}

/** Post-splash Hero reveal — longer stagger for headline lines. */
export const heroFirstRevealStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.2,
    },
  },
}

export const heroFirstRevealLine: Variants = {
  hidden: { y: '110%', opacity: 0, filter: 'blur(4px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: EASE },
  },
}

export const heroFirstRevealFadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.95 + i * 0.1,
      ease: EASE,
    },
  }),
}

export const heroFirstRevealCarousel: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: 0.65, ease: EASE },
  },
}

export const heroFirstRevealCta: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { ...springPop, delay: 0.85 },
  },
}

export const heroFirstRevealSimpleFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE },
  },
}

export function useCountUp(
  target: number,
  active: boolean,
  duration = 1400,
): number {
  const reduced = useReducedMotion()
  const [value, setValue] = useState(reduced ? target : 0)

  useEffect(() => {
    if (!active) return
    if (reduced) {
      setValue(target)
      return
    }

    let start: number | null = null
    let frame: number

    const step = (timestamp: number) => {
      if (start === null) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [active, target, duration, reduced])

  return value
}
