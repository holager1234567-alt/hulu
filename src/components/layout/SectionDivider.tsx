import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { EASE, viewportOnceTight } from '@/lib/motion'

export type SectionDividerVariant = 'wave' | 'diagonal' | 'gradient-line' | 'fade' | 'blend'

export type SectionDividerTone =
  | 'default'
  | 'to-surface'
  | 'to-burgundy'
  | 'from-burgundy'
  | 'to-process'

export type SectionBlendColor =
  | 'hero'
  | 'surface'
  | 'process-top'
  | 'process-bottom'
  | 'portfolio'
  | 'bridge'
  | 'burgundy'

type SectionDividerProps = {
  variant?: SectionDividerVariant
  tone?: SectionDividerTone
  from?: SectionBlendColor
  to?: SectionBlendColor
  /** Flip diagonal direction */
  flip?: boolean
  className?: string
}

export function SectionDivider({
  variant = 'wave',
  tone = 'default',
  from = 'surface',
  to = 'surface',
  flip = false,
  className = '',
}: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const inView = useInView(ref, viewportOnceTight)

  if (variant === 'blend') {
    return (
      <div
        ref={ref}
        className={`section-divider section-divider--blend ${className}`}
        data-blend-from={from}
        data-blend-to={to}
        aria-hidden
      />
    )
  }

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
