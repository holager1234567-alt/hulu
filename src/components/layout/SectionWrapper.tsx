import { useRef, type ReactNode, type RefObject } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useIsMobile } from '@/hooks/useIsMobile'
import { EASE } from '@/lib/motion'

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
      style={{ y: bgY, willChange: 'transform' }}
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
  const inView = useInView(wrapRef, { once: true, margin: '-72px' })

  const shouldReveal = !reveal || reduced || inView
  const enableParallax = parallax && !isMobile && !reduced

  return (
    <div
      ref={wrapRef}
      className={`section-wrapper ${enableParallax ? 'section-wrapper--parallax' : ''} ${className}`}
    >
      {enableParallax && <SectionParallaxBg wrapRef={wrapRef} />}
      <motion.div
        className="section-wrapper-inner"
        initial={reveal && !reduced ? { opacity: 0, y: 36 } : false}
        animate={
          shouldReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }
        }
        transition={{ duration: 0.75, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  )
}
