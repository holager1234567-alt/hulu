import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useIsMobile } from '@/hooks/useIsMobile'
import { EASE } from '@/lib/motion'

/** Triggers slightly before the section enters — cross-section continuity */
const viewportFlowReveal = {
  once: true,
  amount: 0.06 as const,
  margin: '0px 0px -14% 0px' as const,
}

type SectionWrapperProps = {
  children: ReactNode
  /** Fade + slide up when section enters viewport */
  reveal?: boolean
  /** Subtle background parallax shift on scroll */
  parallax?: boolean
  className?: string
}

function SectionParallaxBg({
  wrapRef,
}: {
  wrapRef: RefObject<HTMLDivElement | null>
}) {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ['0%', '0%'] : ['-3%', '3%'],
  )

  if (reduced) return null

  return (
    <motion.div
      className="section-parallax-bg"
      style={{ y: bgY, willChange: 'transform', transform: 'translateZ(0)' }}
      aria-hidden
    />
  )
}

export function SectionWrapper({
  children,
  reveal = true,
  parallax = false,
  className = '',
}: SectionWrapperProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()
  const inView = useInView(wrapRef, viewportFlowReveal)
  const [revealFallback, setRevealFallback] = useState(false)

  useEffect(() => {
    if (reduced || !reveal) return
    const timer = window.setTimeout(() => setRevealFallback(true), 900)
    return () => window.clearTimeout(timer)
  }, [reduced, reveal])

  const shouldShow = !reveal || reduced || inView || revealFallback
  const enableParallax = parallax && !isMobile && !reduced
  const revealY = isMobile ? 14 : 22

  return (
    <div
      ref={wrapRef}
      className={`section-wrapper ${enableParallax ? 'section-wrapper--parallax' : ''} ${className}`}
    >
      {enableParallax && <SectionParallaxBg wrapRef={wrapRef} />}
      <motion.div
        className="section-wrapper-inner"
        initial={
          reveal && !reduced
            ? { opacity: 0, y: revealY, scale: 0.993 }
            : false
        }
        animate={
          shouldShow
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: revealY, scale: 0.993 }
        }
        transition={{ duration: 0.75, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  )
}
