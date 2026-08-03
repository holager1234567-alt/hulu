import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useIsMobile } from '@/hooks/useIsMobile'

export function ScrollProgress() {
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: isMobile ? 280 : 120,
    damping: isMobile ? 42 : 30,
    restDelta: 0.001,
  })

  if (reduced) return null

  return (
    <motion.div
      className="scroll-progress pointer-events-none fixed inset-x-0 top-0 z-[60] origin-left"
      style={{
        scaleX: isMobile ? scrollYProgress : scaleX,
        willChange: 'transform',
      }}
      aria-hidden
    />
  )
}
