import { useLayoutEffect, useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import { cubicBezier, motion, useMotionValue, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'framer-motion'

import { site } from '@/content/site'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'
import { cn } from '@/lib/utils'

/* Editorial scroll scrub: smooth, slightly springy, no bounce. */
const EASE = cubicBezier(0.22, 1, 0.36, 1)

/** Scroll distance while pinned; the sticky frame itself adds one more viewport. */
const PIN_TRAVEL_VH = 300
/** Mobile sticky scrub: one viewport per pillar plus a short intro beat. */
const MOBILE_SCRUB_VH = 340
const REVEAL_START = 0.05
const REVEAL_STEP = 0.15
/** The ghost numeral leads the word by a beat, like a layered cut. */
const NUMERAL_LEAD = 0.015
const DRIFT_START = 0.8

type Placement = {
  /** Grid cell in a 3x3 frame. The frame is laid out LTR so cells map to visual positions. */
  cell: string
  /** Where the pillar slides in from, in px, before it settles. */
  from: { x: number; y: number }
  /** Parallax drift of the numeral once everything is revealed. */
  drift: number
  numeralItalic?: boolean
  wordItalic?: boolean
  wordOutline?: boolean
}

/* Everything emanates from the headline in the middle cell. */
const PLACEMENTS: readonly Placement[] = [
  { cell: 'col-start-2 row-start-1', from: { x: 0, y: -40 }, drift: -20 },
  { cell: 'col-start-1 row-start-2', from: { x: 40, y: 0 }, drift: 18 },
  { cell: 'col-start-3 row-start-2', from: { x: -40, y: 0 }, drift: -18, numeralItalic: true, wordItalic: true },
  { cell: 'col-start-1 row-start-3', from: { x: 40, y: 40 }, drift: 20 },
  { cell: 'col-start-3 row-start-3', from: { x: -40, y: 40 }, drift: -20, numeralItalic: true, wordOutline: true },
]

const numeralClass =
  'pointer-events-none absolute inset-0 flex select-none items-center justify-center font-sans text-[clamp(160px,20vw,340px)] leading-none font-black text-cream/[0.06]'
const labelClass = 'text-[11px] font-medium tracking-[0.25em] text-cream/40'
const wordClass = 'text-[clamp(48px,6vw,96px)] leading-none text-cream'
const outlineClass = 'text-transparent [-webkit-text-stroke:1px_var(--color-cream)]'

const pillars = site.pillars.items
const MOBILE_SEGMENT = 1 / pillars.length

function Headline({
  scale,
  compact = false,
  hideLead = false,
}: {
  scale?: MotionValue<number>
  compact?: boolean
  hideLead?: boolean
}) {
  return (
    <motion.div
      style={scale ? { scale } : undefined}
      className={cn('relative flex flex-col items-center px-4 text-center', compact ? 'gap-3' : 'gap-4')}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-24 -inset-y-16 -z-10 rounded-full bg-crimson/30 blur-3xl md:-inset-x-32 md:-inset-y-20"
      />
      <h2
        id="brutal-pillars-title"
        className={cn(
          compact
            ? 'max-w-2xl text-balance text-[1.65rem] leading-snug text-cream sm:text-2xl'
            : 'flex max-w-3xl flex-col items-center gap-1 text-center leading-[1.2] md:gap-1.5',
        )}
      >
        {compact ? (
          <>
            {site.pillars.title.before}{' '}
            <span className="bg-gradient-to-l from-burgundy-light via-champagne to-rosegold bg-clip-text text-transparent">
              {site.pillars.title.highlight}
            </span>{' '}
            {site.pillars.title.after}
          </>
        ) : (
          <>
            <span className="text-balance text-cream text-[clamp(1.05rem,1.55vw,1.45rem)]">
              {site.pillars.title.before}
            </span>
            <span className="whitespace-nowrap bg-gradient-to-l from-burgundy-light via-champagne to-rosegold bg-clip-text text-[clamp(1.35rem,2vw,2rem)] text-transparent">
              {site.pillars.title.highlight} {site.pillars.title.after}
            </span>
          </>
        )}
      </h2>
      {!hideLead ? (
        <p className={cn('max-w-md leading-relaxed text-cream/50', compact ? 'text-xs' : 'text-sm md:text-base')}>
          {site.pillars.lead}
        </p>
      ) : null}
    </motion.div>
  )
}

function ScrollHint({ className, animate = true }: { className?: string; animate?: boolean }) {
  return (
    <div className={cn('flex flex-col items-center gap-3 text-cream/50', className)}>
      <span className="text-xs tracking-[0.15em]">{site.pillars.hint}</span>
      <span className="grid size-10 place-items-center rounded-full border border-cream/20" aria-hidden>
        <ArrowDown strokeWidth={1.5} className={cn('size-4', animate && 'animate-bounce motion-reduce:animate-none')} />
      </span>
    </div>
  )
}

function PillarContent({ index, placement, compact = false }: { index: number; placement: Placement; compact?: boolean }) {
  return (
    <div dir="rtl" className="relative z-10 flex flex-col items-center gap-1.5 text-center sm:gap-2">
      <span dir="rtl" className={cn(labelClass, compact && 'text-[10px] tracking-[0.2em]')}>
        {site.pillars.label(index)}
      </span>
      <h3
        className={cn(
          compact ? 'text-4xl leading-none tracking-tight' : wordClass,
          placement.wordItalic && 'italic',
          placement.wordOutline && outlineClass,
        )}
      >
        {pillars[index]}
      </h3>
      <p
        className={cn(
          'max-w-xs text-pretty font-sans font-normal text-cream/55',
          compact ? 'mt-3 text-sm leading-relaxed' : 'mt-2 max-w-[11rem] text-[11px] leading-snug md:max-w-[13rem] md:text-xs',
        )}
      >
        {site.pillars.descriptions[index]}
      </p>
    </div>
  )
}

/* Desktop: scrubbed by scroll progress. `progress` is a constant 1 when motion is reduced. */
function PinnedPillar({ index, placement, progress }: { index: number; placement: Placement; progress: MotionValue<number> }) {
  const start = REVEAL_START + index * REVEAL_STEP
  const end = start + REVEAL_STEP

  const numeralT = useTransform(progress, [start - NUMERAL_LEAD, end - NUMERAL_LEAD], [0, 1], { ease: EASE })
  const wordT = useTransform(progress, [start, end], [0, 1], { ease: EASE })
  const drift = useTransform(progress, [DRIFT_START, 1], [0, placement.drift], { ease: EASE })

  const numeralX = useTransform(numeralT, (t) => placement.from.x * (1 - t))
  const numeralY = useTransform([numeralT, drift], ([t, d]: number[]) => placement.from.y * (1 - t) + d)
  const wordX = useTransform(wordT, (t) => placement.from.x * (1 - t))
  const wordY = useTransform(wordT, (t) => placement.from.y * (1 - t))

  return (
    <div className={cn('relative flex items-center justify-center', placement.cell)}>
      <motion.span
        dir="ltr"
        aria-hidden
        style={{ opacity: numeralT, x: numeralX, y: numeralY }}
        className={cn(numeralClass, placement.numeralItalic && 'italic')}
      >
        {site.pillars.numeral(index)}
      </motion.span>
      <motion.div style={{ opacity: wordT, x: wordX, y: wordY }}>
        <PillarContent index={index} placement={placement} />
      </motion.div>
    </div>
  )
}

function PinnedPillars({ reducedMotion }: { reducedMotion: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  /*
   * Copy the scroll progress into a plain motion value. Values derived directly from
   * `useScroll` get hardware-accelerated via ScrollTimeline when they hit `opacity`,
   * and that path drops the input ranges and easing of the sub-range transforms below.
   */
  const progress = useMotionValue(reducedMotion ? 1 : 0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!reducedMotion) progress.set(v)
  })
  useLayoutEffect(() => {
    progress.set(reducedMotion ? 1 : scrollYProgress.get())
  }, [progress, reducedMotion, scrollYProgress])
  const headlineScale = useTransform(progress, [0, 0.5, 1], [1, 1.02, 1])

  return (
    <div ref={trackRef} className="bg-transparent" style={reducedMotion ? undefined : { height: `${100 + PIN_TRAVEL_VH}vh` }}>
      <div className="sticky top-0 h-svh overflow-hidden bg-transparent pt-12 md:pt-16">
        <div dir="ltr" className="grid h-full grid-cols-3 grid-rows-3">
          {PLACEMENTS.map((placement, index) => (
            <PinnedPillar key={placement.cell} index={index} placement={placement} progress={progress} />
          ))}
          <div dir="rtl" className="col-start-2 row-start-2 flex items-center justify-center">
            <Headline scale={reducedMotion ? undefined : headlineScale} />
          </div>
        </div>
        <ScrollHint className="absolute inset-x-0 bottom-6" animate={!reducedMotion} />
      </div>
    </div>
  )
}

function MobileScrubPillar({
  index,
  placement,
  progress,
}: {
  index: number
  placement: Placement
  progress: MotionValue<number>
}) {
  const pad = MOBILE_SEGMENT * 0.2
  const start = index * MOBILE_SEGMENT
  const end = start + MOBILE_SEGMENT
  const isFirst = index === 0
  const isLast = index === pillars.length - 1
  const opacity = useTransform(
    progress,
    isFirst
      ? [0, end - pad, end]
      : isLast
        ? [start, start + pad, 1]
        : [start, start + pad, end - pad, end],
    isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0],
    { ease: EASE },
  )
  const y = useTransform(
    progress,
    isFirst ? [0, end - pad, end] : [start, start + pad, end - pad, end],
    isFirst ? [0, 0, -16] : [20, 0, 0, -16],
    { ease: EASE },
  )
  const numeralScale = useTransform(
    progress,
    isFirst ? [0, end - pad, end] : [start, start + pad, end - pad, end],
    isFirst ? [1, 1, 0.96] : [0.94, 1, 1, 0.96],
    { ease: EASE },
  )

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center justify-center px-6"
    >
      <motion.span
        dir="ltr"
        aria-hidden
        style={{ scale: numeralScale }}
        className={cn(
          numeralClass,
          'text-[clamp(7rem,52vw,11rem)] text-cream/[0.07]',
          placement.numeralItalic && 'italic',
        )}
      >
        {site.pillars.numeral(index)}
      </motion.span>
      <PillarContent index={index} placement={placement} compact />
    </motion.div>
  )
}

function MobileProgressDot({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const start = index * MOBILE_SEGMENT
  const end = start + MOBILE_SEGMENT
  const dotOpacity = useTransform(progress, [start, start + MOBILE_SEGMENT * 0.35, end], [0.25, 1, 0.25], {
    ease: EASE,
  })
  const dotScale = useTransform(progress, [start, start + MOBILE_SEGMENT * 0.35, end], [1, 1.35, 1], { ease: EASE })

  return (
    <motion.span style={{ opacity: dotOpacity, scale: dotScale }} className="size-1.5 rounded-full bg-champagne" />
  )
}

function MobileProgress({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="flex justify-center gap-2 pb-10 pt-2" aria-hidden>
      {PLACEMENTS.map((placement, index) => (
        <MobileProgressDot key={placement.cell} index={index} progress={progress} />
      ))}
    </div>
  )
}

/* Mobile: sticky scrub — one pillar at a time while scrolling, closer to desktop pin. */
function MobileScrubPillars({ reducedMotion }: { reducedMotion: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  const progress = useMotionValue(reducedMotion ? 0.5 : 0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!reducedMotion) progress.set(v)
  })
  useLayoutEffect(() => {
    progress.set(reducedMotion ? 0.5 : scrollYProgress.get())
  }, [progress, reducedMotion, scrollYProgress])

  const staticIndex = reducedMotion ? 2 : undefined

  return (
    <div
      ref={trackRef}
      className="brutal-pillars-mobile bg-transparent"
      style={reducedMotion ? undefined : { height: `${100 + MOBILE_SCRUB_VH}vh` }}
    >
      <div className="sticky top-0 flex h-svh flex-col bg-transparent pt-8">
        <Headline compact hideLead />
        <div className="relative min-h-0 flex-1">
          {reducedMotion ? (
            <div className="flex h-full items-center justify-center px-6">
              <PillarContent index={staticIndex!} placement={PLACEMENTS[staticIndex!]} compact />
            </div>
          ) : (
            PLACEMENTS.map((placement, index) => (
              <MobileScrubPillar key={placement.cell} index={index} placement={placement} progress={progress} />
            ))
          )}
        </div>
        {reducedMotion ? (
          <div className="flex justify-center gap-2 pb-10 pt-2" aria-hidden>
            {PLACEMENTS.map((placement, index) => (
              <span
                key={placement.cell}
                className={cn('size-1.5 rounded-full bg-champagne/30', index === staticIndex && 'bg-champagne')}
              />
            ))}
          </div>
        ) : (
          <MobileProgress progress={progress} />
        )}
        <ul className="sr-only">
          {pillars.map((word, index) => (
            <li key={word}>
              {site.pillars.label(index)} {word}. {site.pillars.descriptions[index]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function BrutalPillars() {
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotionPreference()

  return (
    <section
      id="pillars"
      aria-labelledby="brutal-pillars-title"
      className="brutal-pillars relative -mt-6 bg-transparent text-cream md:-mt-10"
    >
      {isMobile ? <MobileScrubPillars reducedMotion={reducedMotion} /> : <PinnedPillars reducedMotion={reducedMotion} />}
    </section>
  )
}
