import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { EASE } from '@/lib/motion'

export type SectionDividerVariant = 'wave' | 'diagonal' | 'gradient-line' | 'fade'

export type SectionDividerTone =
  | 'default'
  | 'to-surface'
  | 'to-burgundy'
  | 'from-burgundy'
  | 'to-process'

type SectionDividerProps = {
  variant?: SectionDividerVariant
  tone?: SectionDividerTone
  /** Flip diagonal direction */
  flip?: boolean
  className?: string
}

export function SectionDivider({
  variant = 'wave',
  tone = 'default',
  flip = false,
  className = '',
}: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-20px' })

  if (variant === 'gradient-line') {
    return (
      <div
        ref={ref}
        className={`section-divider section-divider--line ${className}`}
        aria-hidden
      >
        <motion.span
          className="section-divider-line tech-divider block"
          initial={reduced ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0.4 }}
          animate={
            reduced || inView
              ? { scaleX: 1, opacity: 1 }
              : { scaleX: 0, opacity: 0.4 }
          }
          transition={{ duration: 0.9, ease: EASE }}
          style={{ transformOrigin: 'center' }}
        />
      </div>
    )
  }

  const variantClass =
    variant === 'diagonal'
      ? `section-divider--diagonal${flip ? ' section-divider--diagonal-flip' : ''}`
      : variant === 'fade'
        ? 'section-divider--fade'
        : 'section-divider--wave'

  const toneClass = tone !== 'default' ? `section-divider--tone-${tone}` : ''

  return (
    <div
      ref={ref}
      className={`section-divider ${variantClass} ${toneClass} ${className}`}
      aria-hidden
    />
  )
}
