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

function ShowcaseCanvas({
  mouseRotateX,
  mouseRotateY,
  scrollRotateX,
  scrollRotateY,
  scrollScale,
  sphereX,
  sphereY,
}: {
  mouseRotateX: MotionValue<number>
  mouseRotateY: MotionValue<number>
  scrollRotateX: MotionValue<number>
  scrollRotateY: MotionValue<number>
  scrollScale: MotionValue<number>
  sphereX: MotionValue<number>
  sphereY: MotionValue<number>
}) {
  const rigRotateX = useTransform(
    [scrollRotateX, mouseRotateX],
    ([scroll, mouse]) => (scroll as number) + (mouse as number),
  )
  const rigRotateY = useTransform(
    [scrollRotateY, mouseRotateY],
    ([scroll, mouse]) => (scroll as number) + (mouse as number),
  )

  return (
    <motion.div
      className="hero-showcase-rig"
      style={{
        rotateX: rigRotateX,
        rotateY: rigRotateY,
        scale: scrollScale,
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="hero-showcase-isometric">
        {/* Layer 0 — glass browser base */}
        <article className="hero-showcase-window hero-showcase-layer hero-showcase-layer--0">
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
          </div>
        </article>

        {/* Layer 2 — glass orb breaking frame (+60px Z) */}
        <div className="hero-showcase-sphere-wrap hero-showcase-layer hero-showcase-layer--2">
          <motion.div
            className="hero-showcase-sphere-inner"
            style={{ x: sphereX, y: sphereY }}
            aria-hidden
          >
            <div className="hero-showcase-sphere">
              <div className="hero-showcase-sphere-glow" />
              <div className="hero-showcase-sphere-core" />
              <div className="hero-showcase-sphere-shine" />
              <div className="hero-showcase-sphere-rim" />
            </div>
          </motion.div>
        </div>

        <div className="hero-showcase-shadow hero-showcase-layer hero-showcase-layer--0" aria-hidden />
      </div>
    </motion.div>
  )
}

export function HeroOrb({ sectionRef }: HeroShowcaseProps) {
  const reduced = useReducedMotion()
  const tiltEnabled = !reduced

  const {
    sceneRef,
    rotateX,
    rotateY,
    sphereX,
    sphereY,
    onMouseMove,
    onMouseLeave,
    onTouchMove,
    onTouchEnd,
  } = useParallaxTilt({ enabled: tiltEnabled, maxTilt: 11 })

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
      style={{ y: sceneY }}
      aria-hidden
    >
      <div className="hero-showcase-ambient" aria-hidden />
      <div className="hero-showcase-ambient hero-showcase-ambient--secondary" aria-hidden />

      <div
        ref={sceneRef}
        className="hero-showcase-stage"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <ShowcaseCanvas
          mouseRotateX={rotateX}
          mouseRotateY={rotateY}
          scrollRotateX={scrollRotateX}
          scrollRotateY={scrollRotateY}
          scrollScale={scrollScale}
          sphereX={sphereX}
          sphereY={sphereY}
        />
      </div>
    </motion.div>
  )
}
