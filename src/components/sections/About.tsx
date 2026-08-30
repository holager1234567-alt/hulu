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
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowLeft } from 'lucide-react'
import huluProfile from '@/assets/hulu-portrait-v2.png'
import { SectionLuxuryBg } from '@/components/layout/SectionLuxuryBg'
import { useIsMobile } from '@/hooks/useIsMobile'
import { bindRevealTimeline, forceRevealVisible } from '@/lib/gsapReveal'
import { scheduleScrollTriggerRefresh } from '@/lib/scrollTriggerRefresh'
import { EASE, viewportOnce } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

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

function AboutPortrait({
  reduced,
  isMobile,
  sectionRef,
}: {
  reduced: boolean
  isMobile: boolean
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
    reduced || isMobile ? [0, 0] : [32, -32],
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
  const isMobile = useIsMobile()
  const sectionRef = useRef<HTMLElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const [showPersonal, setShowPersonal] = useState(false)

  useEffect(() => {
    scheduleScrollTriggerRefresh(80)
  }, [])

  useGSAP(
    () => {
      const copy = copyRef.current
      if (!copy) return

      const q = gsap.utils.selector(copy)
      const pick = (selector: string) => {
        const nodes = q(selector)
        return nodes.length ? nodes : null
      }

      const ornaments = pick('.about-header-ornament span')
      const headlineInners = pick('.about-headline-inner')
      const accentLine = pick('.about-headline-accent-line')
      const headlineGlow = pick('.about-headline-glow')
      const divider = pick('.about-header-divider')
      const intro = pick('.about-intro-line')
      const understandingItems = pick('.about-understanding li')
      const belief = pick('.about-belief')
      const footerLine = pick('.about-footer-line')

      if (reduced) {
        forceRevealVisible(
          ornaments,
          headlineInners,
          accentLine,
          headlineGlow,
          divider,
          intro,
          understandingItems,
          belief,
          footerLine,
        )
        return
      }

      if (ornaments) gsap.set(ornaments, { scaleX: 0, opacity: 0 })
      if (headlineInners) gsap.set(headlineInners, { yPercent: 118, opacity: 0, rotateX: 10 })
      if (accentLine) gsap.set(accentLine, { scaleX: 0, opacity: 0 })
      if (headlineGlow) gsap.set(headlineGlow, { opacity: 0, scale: 0.88 })
      if (divider) gsap.set(divider, { scaleX: 0, opacity: 0 })
      if (intro) gsap.set(intro, { opacity: 0, y: 16 })
      if (understandingItems) gsap.set(understandingItems, { opacity: 0, x: 20 })
      if (belief) gsap.set(belief, { opacity: 0, y: 16 })
      if (footerLine) gsap.set(footerLine, { scaleX: 0, opacity: 0 })

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: copy,
          start: 'top 88%',
          once: true,
          invalidateOnRefresh: true,
        },
      })

      if (ornaments) tl.to(ornaments, { scaleX: 1, opacity: 1, duration: 0.8, stagger: 0.08 })
      if (headlineGlow) tl.to(headlineGlow, { opacity: 1, scale: 1, duration: 0.85 }, '-=0.45')
      if (headlineInners) {
        tl.to(
          headlineInners,
          { yPercent: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.11, ease: 'power4.out' },
          '-=0.55',
        )
      }
      if (accentLine) {
        tl.to(accentLine, { scaleX: 1, opacity: 1, duration: 0.65, ease: 'power2.inOut' }, '-=0.4')
      }
      if (divider) {
        tl.to(divider, { scaleX: 1, opacity: 1, duration: 0.65, ease: 'power2.inOut' }, '-=0.35')
      }
      if (intro) tl.to(intro, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      if (understandingItems) {
        tl.to(understandingItems, { opacity: 1, x: 0, duration: 0.52, stagger: 0.08 }, '-=0.35')
      }
      if (belief) tl.to(belief, { opacity: 1, y: 0, duration: 0.6 }, '-=0.25')
      if (footerLine) {
        tl.to(footerLine, { scaleX: 1, opacity: 1, duration: 0.55, ease: 'power2.inOut' }, '-=0.2')
      }

      return bindRevealTimeline(tl, copy)
    },
    { scope: sectionRef, dependencies: [reduced] },
  )

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-section section-pad relative overflow-x-clip bg-section-surface"
    >
      <SectionLuxuryBg variant="surface" />
      <div className="about-accent-glow" aria-hidden />

      <div className="container-site relative z-10 grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
        <AboutPortrait reduced={!!reduced} isMobile={isMobile} sectionRef={sectionRef} />

        <div ref={copyRef} className="about-copy lg:col-span-8">
          <div className="about-header mb-6 flex flex-col items-center text-center lg:items-start lg:text-start">
            <div className="about-headline-wrap relative">
              <span className="about-headline-glow" aria-hidden />

              <div className="about-header-ornament" aria-hidden>
                <span />
                <span />
              </div>

              <h2 className="about-headline mt-3 overflow-hidden font-display text-3xl leading-tight font-bold text-primary md:mt-4 md:text-4xl lg:text-[2.5rem] dark:text-white">
                {headlineParts.map((part, i) => (
                  <span key={part} className="block overflow-hidden py-0.5">
                    <span
                      className={`about-headline-inner block ${i === 1 ? 'about-headline-accent' : ''}`}
                    >
                      {part}
                    </span>
                  </span>
                ))}
                <span className="about-headline-accent-line" aria-hidden />
              </h2>
            </div>

            <hr className="tech-divider about-header-divider mx-auto mt-5 max-w-xs origin-center lg:mx-0 lg:max-w-sm lg:origin-right" />
          </div>

          <div className="about-body text-center text-base leading-relaxed text-primary/85 md:text-lg lg:text-start dark:text-white/80">
            <p className="about-intro-line">
              לפני שאני פותחת את תוכנת העיצוב, אני רוצה להבין את העסק שלך.
            </p>

            <ul className="about-understanding mt-4">
              {understandingLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            <p className="about-belief mt-5">
              כי אתר טוב לא מתחיל בצבעים.{' '}
              <span className="text-burgundy">הוא מתחיל בהבנה.</span>
            </p>
          </div>

          <div className="mt-7 text-center lg:text-start">
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
          </div>

          <div className="about-footer-line mx-auto mt-8 h-px w-24 origin-center bg-burgundy/25 lg:mx-0 lg:origin-right" />
        </div>
      </div>
    </section>
  )
}
