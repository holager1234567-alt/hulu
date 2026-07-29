import { useRef, useState, useEffect, useCallback } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from 'framer-motion'
import huluProfile from '@/assets/hulu-portrait-v2.png'
import {
  EASE,
  staggerContainer,
  staggerItem,
  useCountUp,
  viewportOnce,
} from '@/lib/motion'

const stats = [
  { numeric: 14, suffix: ' ימים', label: 'זמן מסירה' },
  { numeric: 5, suffix: '+', label: 'פרויקטים' },
  { numeric: 100, suffix: '%', label: 'mobile' },
]

const textLines = [
  'ואני חיה ונושמת עיצוב כל חיי.',
  'אני מאמינה שאין דבר כזה "עוד סתם אתר" ושכל עסק מביא איתו סיפור ייחודי, ולכל סיפור מגיע במה שתעשה וואו אמיתי.',
  'אני מתמחה בחיבור המדויק שבין עיצוב אסתטי עוצר נשימה, קופירייטינג שנוגע בנקודות הנכונות, ופיתוח טכנולוגי מתקדם.',
  'יחד, נבנה לך אתר שלא רק נראה כמו יצירת אמנות, אלא כזה שעובד בשבילך ומביא תוצאות עסקיות אמיתיות.',
]

const niceWords = ['NICE', 'TO', 'MEET', 'U']
const headlineLine = 'אני הולו'

function StatBadge({
  numeric,
  suffix,
  label,
  index,
}: {
  numeric: number
  suffix: string
  label: string
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const count = useCountUp(numeric, inView)
  const done = inView && count >= numeric

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      className={`about-stat-pill tech-pill rounded-full px-4 py-2 text-center ${inView ? 'about-stat-pill--glow' : ''}`}
      transition={{ delay: index * 0.1 }}
    >
      <span
        className={`font-mono-tech about-stat-number block text-sm font-bold text-gold md:text-base ${done ? 'about-stat-number--pulse' : ''}`}
      >
        {count}
        {suffix}
      </span>
      <span className="text-xs text-white/60">{label}</span>
    </motion.div>
  )
}

function AboutPortrait({
  reduced,
  sectionRef,
}: {
  reduced: boolean
  sectionRef: React.RefObject<HTMLElement | null>
}) {
  const frameRef = useRef<HTMLDivElement>(null)
  const imageInView = useInView(frameRef, { once: true, margin: '-80px' })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    stiffness: 280,
    damping: 28,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 280,
    damping: 28,
  })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [32, -32],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced || !frameRef.current) return
      const rect = frameRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mouseX.set(x)
      mouseY.set(y)
      glowX.set(((e.clientX - rect.left) / rect.width) * 100)
      glowY.set(((e.clientY - rect.top) / rect.height) * 100)
    },
    [reduced, mouseX, mouseY, glowX, glowY],
  )

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
    glowX.set(50)
    glowY.set(50)
  }, [mouseX, mouseY, glowX, glowY])

  const cursorGlow = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgb(212 175 55 / 0.18), transparent 55%)`

  return (
    <motion.div
      style={{ y: imageY }}
      className="about-image-col flex w-full justify-center lg:col-span-5"
    >
      <div
        ref={frameRef}
        className="about-image-wrap group relative w-full max-w-sm md:max-w-md"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="about-particles" aria-hidden />

        <motion.div
          className="about-tech-frame relative"
          style={
            reduced
              ? undefined
              : {
                  rotateX,
                  rotateY,
                  transformPerspective: 1200,
                  transformStyle: 'preserve-3d',
                }
          }
        >
          <motion.div
            className="about-frame-glow absolute -inset-3 rounded-2xl md:-rotate-2"
            aria-hidden
            animate={reduced ? undefined : { opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <span className="about-corner-bracket about-corner-bracket--tl" aria-hidden />
          <span className="about-corner-bracket about-corner-bracket--tr" aria-hidden />
          <span className="about-corner-bracket about-corner-bracket--bl" aria-hidden />
          <span className="about-corner-bracket about-corner-bracket--br" aria-hidden />

          <motion.div
            className="about-image-reveal relative overflow-hidden rounded-2xl"
            initial={
              reduced
                ? { clipPath: 'inset(0 0 0 0)' }
                : { clipPath: 'inset(0 100% 0 0)' }
            }
            animate={
              imageInView || reduced
                ? { clipPath: 'inset(0 0 0 0)' }
                : { clipPath: 'inset(0 100% 0 0)' }
            }
            transition={{ duration: 1.1, ease: EASE }}
          >
            <img
              src={huluProfile}
              alt="הולו, מעצבת אתרים"
              width={640}
              height={800}
              decoding="async"
              className="about-image-float relative aspect-[4/5] w-full rotate-1 object-contain shadow-[0_24px_48px_-12px_rgb(0_0_0_/_0.45)]"
            />
            <span className="about-scan-line" aria-hidden />
            {!reduced && (
              <motion.span
                className="about-cursor-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-lg:hidden"
                style={{ background: cursorGlow }}
                aria-hidden
              />
            )}
          </motion.div>
        </motion.div>
      </div>

      <hr
        className="about-mobile-divider mx-auto mt-8 w-full max-w-xs lg:hidden"
        aria-hidden
      />
    </motion.div>
  )
}

export function About() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const headlineInView = useInView(headerRef, viewportOnce)
  const [headlineFallback, setHeadlineFallback] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [-16, 16],
  )

  useEffect(() => {
    if (reduced) return
    const timer = window.setTimeout(() => setHeadlineFallback(true), 2000)
    return () => window.clearTimeout(timer)
  }, [reduced])

  const showHeadline = reduced || headlineInView || headlineFallback

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-section section-pad relative overflow-hidden bg-section-burgundy"
    >
      <div className="tech-grid-bg about-grid-bg" aria-hidden />
      <div className="about-ambient-glow" aria-hidden />

      <div className="container-site relative z-10 grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
        <AboutPortrait reduced={!!reduced} sectionRef={sectionRef} />

        <motion.div
          style={{ y: contentY }}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="lg:col-span-7"
        >
          <motion.div
            ref={headerRef}
            variants={staggerItem}
            className="mb-6 flex flex-col items-center text-center lg:items-start lg:text-start"
          >
            <p
              className="font-en-display text-[1.45rem] leading-none font-semibold whitespace-nowrap text-white/30 uppercase md:text-[2.1rem] lg:text-[2.45rem]"
              dir="ltr"
            >
              {niceWords.map((word, i) => (
                <motion.span
                  key={word}
                  className="inline-block"
                  initial={
                    reduced
                      ? { opacity: 1, letterSpacing: '0.16em' }
                      : { opacity: 0, letterSpacing: '0.42em', y: 8 }
                  }
                  animate={
                    showHeadline
                      ? { opacity: 1, letterSpacing: '0.16em', y: 0 }
                      : { opacity: 0, letterSpacing: '0.42em', y: 8 }
                  }
                  transition={{
                    duration: 0.65,
                    ease: EASE,
                    delay: i * 0.09,
                  }}
                >
                  {word}
                  {i < niceWords.length - 1 ? '\u00A0' : ''}
                </motion.span>
              ))}
            </p>

            <h2 className="mt-3 overflow-hidden font-display text-3xl leading-tight font-bold text-white md:mt-4 md:text-4xl lg:text-[2.75rem]">
              <span className="block overflow-hidden py-0.5">
                <motion.span
                  className="block"
                  initial={reduced ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
                  animate={
                    showHeadline
                      ? { y: 0, opacity: 1 }
                      : { y: '110%', opacity: 0 }
                  }
                  transition={{ duration: 0.75, ease: EASE, delay: 0.32 }}
                >
                  {headlineLine}
                </motion.span>
              </span>
            </h2>
          </motion.div>

          <motion.p
            variants={staggerItem}
            className="text-center text-lg leading-relaxed text-white/80 lg:text-start"
          >
            {textLines.map((line, i) => (
              <motion.span
                key={i}
                initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </motion.p>

          <motion.div
            variants={staggerContainer}
            className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
          >
            {stats.map((stat, i) => (
              <StatBadge
                key={stat.label}
                numeric={stat.numeric}
                suffix={stat.suffix}
                label={stat.label}
                index={i}
              />
            ))}
          </motion.div>

          <motion.div
            variants={staggerItem}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            className="mx-auto mt-8 h-px w-24 origin-center bg-gold/40 lg:mx-0 lg:origin-right"
          />
        </motion.div>
      </div>
    </section>
  )
}
