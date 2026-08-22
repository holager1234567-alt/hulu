import { useCallback, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const AUTOPLAY_MS = 4800
const VISIBLE_RANGE = 2
const COVERFLOW_EASE = [0.16, 1, 0.3, 1] as const

export type CoverflowProject = {
  id: number
  img: string
  alt?: string
}

export const HERO_COVERFLOW_PROJECTS: CoverflowProject[] = [
  { id: 1, img: '/images/portfolio/cohen-law-hero.png', alt: 'כהן בן עמי' },
  { id: 2, img: '/images/portfolio/ai-agent-hero.png', alt: 'סוכן AI' },
  { id: 3, img: '/images/portfolio/tru-riss-hero.png', alt: 'tru_riss' },
  { id: 4, img: '/images/portfolio/ride-yoav-hero.png', alt: 'Ride With Yoav' },
  { id: 5, img: '/images/portfolio/noa-pilates-hero.png', alt: 'noa pilates' },
]

function wrapOffset(index: number, active: number, length: number) {
  let diff = index - active
  const half = length / 2
  if (diff > half) diff -= length
  if (diff < -half) diff += length
  return diff
}

function slotMotion(offset: number, reduced: boolean) {
  const abs = Math.abs(offset)
  const visible = abs <= VISIBLE_RANGE
  const isCenter = offset === 0

  return {
    x: `${offset * 58}%`,
    y: isCenter ? 0 : 10,
    z: isCenter ? 110 : abs === 1 ? -120 : -190,
    rotateY: reduced || isCenter ? 0 : offset * -12,
    opacity: !visible ? 0 : isCenter ? 1 : abs === 1 ? 0.38 : 0.28,
    scale: isCenter ? 1.2 : abs === 1 ? 0.58 : 0.48,
  }
}

export function HeroCoverflow({
  projects = HERO_COVERFLOW_PROJECTS,
}: {
  projects?: CoverflowProject[]
}) {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = projects.length

  const goTo = useCallback(
    (next: number) => {
      setActive(((next % count) + count) % count)
    },
    [count],
  )

  const goPrev = useCallback(() => goTo(active - 1), [active, goTo])
  const goNext = useCallback(() => goTo(active + 1), [active, goTo])

  useEffect(() => {
    if (reduced || paused || count < 2) return
    const id = window.setInterval(goNext, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [reduced, paused, count, goNext])

  useEffect(() => {
    projects.forEach((project) => {
      const preload = new Image()
      preload.src = project.img
    })
  }, [projects])

  return (
    <div
      className="hero-coverflow"
      dir="ltr"
      role="region"
      aria-roledescription="carousel"
      aria-label="פרויקטים נבחרים"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false)
        }
      }}
    >
      <button
        type="button"
        className="hero-coverflow-nav hero-coverflow-nav--prev"
        aria-label="פרויקט קודם"
        onClick={goPrev}
      >
        <ChevronLeft aria-hidden />
      </button>

      <div className="hero-coverflow-stage">
        {projects.map((project, index) => {
          const offset = wrapOffset(index, active, count)
          const abs = Math.abs(offset)
          const visible = abs <= VISIBLE_RANGE

          return (
            <motion.div
              key={project.id}
              className="hero-coverflow-slot"
              initial={false}
              animate={slotMotion(offset, !!reduced)}
              transition={{
                duration: 0.7,
                ease: COVERFLOW_EASE,
              }}
              style={{
                pointerEvents: visible ? 'auto' : 'none',
                zIndex: offset === 0 ? 30 : 10,
              }}
            >
              <button
                type="button"
                className={`hero-coverflow-card${offset === 0 ? ' hero-coverflow-card--active' : ''}`}
                tabIndex={offset === 0 ? -1 : visible ? 0 : -1}
                aria-hidden={offset !== 0}
                aria-label={`הצגת ${project.alt ?? `פרויקט ${project.id}`}`}
                onClick={() => {
                  if (offset !== 0) goTo(index)
                }}
              >
                <img
                  src={project.img}
                  alt={offset === 0 ? (project.alt ?? '') : ''}
                  width={1024}
                  height={480}
                  sizes="(min-width: 768px) 44rem, 88vw"
                  draggable={false}
                  decoding="async"
                  fetchPriority={offset === 0 ? 'high' : 'low'}
                />
              </button>
            </motion.div>
          )
        })}
      </div>

      <button
        type="button"
        className="hero-coverflow-nav hero-coverflow-nav--next"
        aria-label="פרויקט הבא"
        onClick={goNext}
      >
        <ChevronRight aria-hidden />
      </button>
    </div>
  )
}
