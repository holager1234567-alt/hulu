import { useRef, useState, useEffect, useCallback } from 'react'
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import huluProfile from '@/assets/hulu-portrait-v2.png'
import { SectionLuxuryBg } from '@/components/layout/SectionLuxuryBg'
import {
  EASE,
  staggerContainer,
  staggerItem,
  useCountUp,
  viewportOnce,
  viewportOnceTight,
} from '@/lib/motion'

const stats = [
  { numeric: 14, suffix: ' ימים', label: 'זמן מסירה' },
  { numeric: 5, suffix: '+', label: 'פרויקטים' },
  { numeric: 100, suffix: '%', label: 'mobile' },
]

const headlineParts = ['אני לא מתחילה מעיצוב.', 'אני מתחילה מהעסק שלך.']

const understandingLines = [
  'מי את.',
  'למי את פונה.',
  'מה את רוצה לשדר.',
  'ומה צריך לקרות כדי שהאתר באמת יעבוד עבורך.',
]

const personalLines = [
  'אני הולו, ואני חיה ונושמת עיצוב כל חיי.',
  'אני מאמינה שאין דבר כזה "עוד סתם אתר" ושכל עסק מביא איתו סיפור ייחודי, ולכל סיפור מגיע במה שתעשה וואו אמיתי.',
  'אני מתמחה בחיבור המדויק שבין עיצוב אסתטי עוצר נשימה, קופירייטינג שנוגע בנקודות הנכונות, ופיתוח טכנולוגי מתקדם.',
]

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
  const inView = useInView(ref, viewportOnceTight)
  const count = useCountUp(numeric, inView)
  const done = inView && count >= numeric

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      className={`about-stat-pill rounded-full px-4 py-2 text-center ${inView ? 'about-stat-pill--glow' : ''}`}
      transition={{ delay: index * 0.1 }}
    >
      <span
        className={`font-mono-tech about-stat-number block text-sm font-bold text-burgundy md:text-base ${done ? 'about-stat-number--pulse' : ''}`}
      >
        {count}
        {suffix}
      </span>
      <span className="text-xs text-muted dark:text-white/60">{label}</span>
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
  const imageInView = useInView(frameRef, viewportOnce)

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
      style={{ y: imageY, willChange: 'transform' }}
      className="about-image-col flex w-full justify-center lg:col-span-4"
    >
      <div
        ref={frameRef}
        className="about-image-wrap group relative w-full max-w-[12.5rem] sm:max-w-[14rem] md:max-w-[15.5rem]"
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
              className="about-image-float relative aspect-[4/5] w-full rotate-1 object-contain shadow-[0_20px_40px_-14px_rgb(90_14_35_/_0.22)]"
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
  const [showPersonal, setShowPersonal] = useState(false)

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
      className="about-section section-pad relative overflow-x-clip bg-section-surface"
    >
      <SectionLuxuryBg variant="surface" />
      <div className="about-accent-glow" aria-hidden />

      <div className="container-site relative z-10 grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
        <AboutPortrait reduced={!!reduced} sectionRef={sectionRef} />

        <motion.div
          style={{ y: contentY, willChange: 'transform' }}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="about-copy lg:col-span-8"
        >
          <motion.div
            ref={headerRef}
            variants={staggerItem}
            className="about-header mb-6 flex flex-col items-center text-center lg:items-start lg:text-start"
          >
            <h2 className="mt-3 overflow-hidden font-display text-3xl leading-tight font-bold text-primary md:mt-4 md:text-4xl lg:text-[2.5rem] dark:text-white">
              {headlineParts.map((part, i) => (
                <span key={part} className="block overflow-hidden py-0.5">
                  <motion.span
                    className="block"
                    initial={
                      reduced ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }
                    }
                    animate={
                      showHeadline
                        ? { y: 0, opacity: 1 }
                        : { y: '110%', opacity: 0 }
                    }
                    transition={{
                      duration: 0.75,
                      ease: EASE,
                      delay: 0.32 + i * 0.12,
                    }}
                  >
                    {i === 1 ? (
                      <span className="text-burgundy">{part}</span>
                    ) : (
                      part
                    )}
                  </motion.span>
                </span>
              ))}
            </h2>
            <hr className="tech-divider about-header-divider mx-auto mt-5 max-w-xs lg:mx-0 lg:max-w-sm" />
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="about-body text-center text-base leading-relaxed text-primary/85 md:text-lg lg:text-start dark:text-white/80"
          >
            <motion.p
              initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnceTight}
              transition={{ duration: 0.55, ease: EASE }}
            >
              לפני שאני פותחת את תוכנת העיצוב, אני רוצה להבין את העסק שלך.
            </motion.p>

            <motion.ul
              initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnceTight}
              transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
              className="about-understanding mt-4"
            >
              {understandingLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </motion.ul>

            <motion.p
              initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnceTight}
              transition={{ duration: 0.55, delay: 0.16, ease: EASE }}
              className="about-belief mt-5"
            >
              כי אתר טוב לא מתחיל בצבעים.{' '}
              <span className="text-burgundy">הוא מתחיל בהבנה.</span>
            </motion.p>
          </motion.div>

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
            className="mt-7 text-center lg:text-start"
          >
            <button
              type="button"
              onClick={() => setShowPersonal((value) => !value)}
              aria-expanded={showPersonal}
              aria-controls="about-personal-story"
              className="about-personal-toggle group"
            >
              קצת עליי
              <ArrowLeft
                className={`size-3.5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${showPersonal ? '-rotate-90' : 'group-hover:-translate-x-1'}`}
                aria-hidden
              />
            </button>

            <AnimatePresence initial={false}>
              {showPersonal && (
                <motion.div
                  key="about-personal-story"
                  id="about-personal-story"
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduced ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="about-personal-story text-center text-sm leading-relaxed text-primary/75 md:text-base lg:text-start dark:text-white/70">
                    {personalLines.map((line, i) => (
                      <p key={i} className={i > 0 ? 'mt-2.5' : undefined}>
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            variants={staggerItem}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            className="mx-auto mt-8 h-px w-24 origin-center bg-burgundy/25 lg:mx-0 lg:origin-right"
          />
        </motion.div>
      </div>
    </section>
  )
}
