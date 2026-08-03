import { Zap } from 'lucide-react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useParallaxTilt } from '@/hooks/useParallaxTilt'
import type { RefObject } from 'react'

type HeroShowcaseProps = {
  sectionRef: RefObject<HTMLElement | null>
}

function ShowcaseCursor3D() {
  return (
    <div className="hero-showcase-cursor-rig">
      <span className="hero-showcase-cursor-ground" aria-hidden />
      <span className="hero-showcase-cursor-ring" aria-hidden />
      <svg
        className="hero-showcase-cursor-svg"
        viewBox="0 0 36 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient
            id="showcase-cursor-face"
            x1="6"
            y1="4"
            x2="28"
            y2="36"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ffffff" />
            <stop offset="0.55" stopColor="#f7f0f2" />
            <stop offset="1" stopColor="#e8d9de" />
          </linearGradient>
          <linearGradient
            id="showcase-cursor-side"
            x1="16"
            y1="18"
            x2="30"
            y2="34"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#d4bcc4" />
            <stop offset="1" stopColor="#9a7080" />
          </linearGradient>
          <filter
            id="showcase-cursor-soft-shadow"
            x="-20%"
            y="-10%"
            width="140%"
            height="150%"
          >
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="2.5"
              floodColor="#5a0e23"
              floodOpacity="0.28"
            />
          </filter>
        </defs>
        <path
          d="M6 4 L6 34 L14.5 25.5 L20.5 39 L25 36.5 L19 23.5 L30.5 23.5 Z"
          fill="url(#showcase-cursor-side)"
          transform="translate(1.5 1.5)"
          opacity="0.88"
        />
        <path
          d="M5 3 L5 33 L13.5 24.5 L19.5 38 L24 35.5 L18 22.5 L29.5 22.5 Z"
          fill="url(#showcase-cursor-face)"
          stroke="#5a0e23"
          strokeWidth="1.35"
          strokeLinejoin="round"
          filter="url(#showcase-cursor-soft-shadow)"
        />
        <path
          d="M7.5 6.5 L7.5 18.5 L12.5 14.5 L12.5 10.5 Z"
          fill="rgb(255 255 255 / 0.72)"
        />
      </svg>
    </div>
  )
}

function ShowcaseCanvas({
  mouseRotateX,
  mouseRotateY,
  scrollRotateX,
  scrollRotateY,
  scrollScale,
  cursorLeft,
  cursorTop,
}: {
  mouseRotateX: MotionValue<number>
  mouseRotateY: MotionValue<number>
  scrollRotateX: MotionValue<number>
  scrollRotateY: MotionValue<number>
  scrollScale: MotionValue<number>
  cursorLeft: MotionValue<number>
  cursorTop: MotionValue<number>
}) {
  const rigRotateX = useTransform(
    [scrollRotateX, mouseRotateX],
    ([scroll, mouse]) => (scroll as number) + (mouse as number),
  )
  const rigRotateY = useTransform(
    [scrollRotateY, mouseRotateY],
    ([scroll, mouse]) => (scroll as number) + (mouse as number),
  )
  const cursorLeftPct = useTransform(cursorLeft, (value) => `${value}%`)
  const cursorTopPct = useTransform(cursorTop, (value) => `${value}%`)

  return (
    <motion.div
      className="hero-showcase-rig"
      style={{
        rotateX: rigRotateX,
        rotateY: rigRotateY,
        scale: scrollScale,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      <div className="hero-showcase-isometric">
        {/* Layer 0 — glass browser base */}
        <article className="hero-showcase-window hero-showcase-layer hero-showcase-layer--0">
          <span className="hero-showcase-window-shine" aria-hidden />
          <span className="hero-showcase-window-edge" aria-hidden />
          <div className="hero-showcase-window-chrome">
            <div className="hero-showcase-window-dots" aria-hidden>
              <span />
              <span />
              <span />
            </div>
            <span className="hero-showcase-window-url font-mono-tech">
              yourbrand.co.il
            </span>
          </div>

          <div className="hero-showcase-window-body">
            <div className="hero-showcase-wire-row" aria-hidden>
              <span className="hero-showcase-wire-logo" />
              <span className="hero-showcase-wire-nav">
                <span />
                <span />
                <span />
              </span>
            </div>

            <div className="hero-showcase-wire-hero" aria-hidden>
              <span className="hero-showcase-wire-line hero-showcase-wire-line--accent" />
              <span className="hero-showcase-wire-line" />
              <span className="hero-showcase-wire-line hero-showcase-wire-line--sm" />
              <span className="hero-showcase-wire-btn" />
            </div>

            <div className="hero-showcase-wire-grid" aria-hidden>
              <span />
              <span />
              <span />
            </div>

            <div className="hero-showcase-cursor-layer hero-showcase-layer hero-showcase-layer--2">
              <motion.div
                className="hero-showcase-cursor"
                style={{ left: cursorLeftPct, top: cursorTopPct }}
                aria-hidden
              >
                <ShowcaseCursor3D />
              </motion.div>
            </div>
          </div>
        </article>

        <div className="hero-showcase-badge hero-showcase-badge--speed hero-showcase-layer hero-showcase-layer--2">
          <Zap className="hero-showcase-badge-icon" strokeWidth={2} aria-hidden />
          <span className="hero-showcase-badge-value">14</span>
          <span className="hero-showcase-badge-label">ימי מסירה</span>
        </div>

        <div className="hero-showcase-shadow hero-showcase-layer hero-showcase-layer--0" aria-hidden />
      </div>
    </motion.div>
  )
}

export function HeroOrb({ sectionRef }: HeroShowcaseProps) {
  const reduced = useReducedMotion()
  const tiltEnabled = !reduced

  const { sceneRef, rotateX, rotateY, cursorLeft, cursorTop } = useParallaxTilt({
    enabled: tiltEnabled,
    maxTilt: 11,
  })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const scrollRotateX = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [14, 14] : [14, 4],
  )
  const scrollRotateY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [-16, -16] : [-16, -2],
  )
  const scrollScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [1, 1] : [1, 1.1],
  )
  const sceneY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 56])

  return (
    <motion.div
      className="hero-showcase-scene"
      style={{ y: sceneY, willChange: 'transform' }}
      aria-hidden
    >
      <div className="hero-showcase-ambient" aria-hidden />
      <div className="hero-showcase-ambient hero-showcase-ambient--secondary" aria-hidden />

      <div ref={sceneRef} className="hero-showcase-stage">
        <ShowcaseCanvas
          mouseRotateX={rotateX}
          mouseRotateY={rotateY}
          scrollRotateX={scrollRotateX}
          scrollRotateY={scrollRotateY}
          scrollScale={scrollScale}
          cursorLeft={cursorLeft}
          cursorTop={cursorTop}
        />
      </div>
    </motion.div>
  )
}
