import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useIsMobile } from '@/hooks/useIsMobile'
import { EASE } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

const standardsData: {
  id: string
  title: string
  description: string
}[] = [
  {
    id: '01',
    title: 'קופירייטינג מדויק וממיר',
    description:
      'מילים לא נועדו רק למלא את המסך, הן נועדו לדבר ישירות אל הלב והצורך של הלקוח האידיאלי שלך. אני יוצרת עבורך רשת מסרים חדה, שמשדרת סמכות מקצועית ומובילה את הגולש יד ביד לעבר פעולה ברורה.',
  },
  {
    id: '02',
    title: 'אסטרטגיה עסקית ממוקדת',
    description:
      'אתר טוב הוא לא רק תערוכה ויזואלית, אלא מכונת לידים שקטה. כל פריסה, כפתור ומבנה מתוכננים בקפידה כדי לשרת את היעדים העסקיים שלך, למקסם את מסע הלקוח ולהבטיח החזר השקעה גבוה.',
  },
  {
    id: '03',
    title: 'טכנולוגיית עילית ומהירות',
    description:
      'בנייה על התשתיות המתקדמות ביותר בשוק (React & Vite), המבטיחות זמני טעינה מהירים במיוחד, ביצועים חלקים בכל מכשיר נייד או מחשב, והתאמה מושלמת לקידום אורגני וממומן.',
  },
  {
    id: '04',
    title: 'אסתטיקה ויוקרה ויזואלית',
    description:
      'העיצוב הדיגיטלי שלך הוא הרושם הראשוני על העסק. אני משלבת סטנדרטים עיצוביים בינלאומיים, מינימליזם נקי ונגיעות סטייל ייחודיות שגורמות למותג שלך לבלוט מעל כולם ולהיראות מיליון דולר.',
  },
  {
    id: '05',
    title: 'תהליך עבודה מדויק ויעיל',
    description:
      'שקיפות מלאה, ניהול זמנים קפדני (מסירה תוך כ14 יום) וליווי אישי צמוד לאורך כל הדרך. אנחנו עובדים בשיטה מסודרת שחוסכת לך זמן יקר ומביאה אותך לתוצאה המושלמת בראש שקט.',
  },
]

const DESKTOP_PATH =
  'M 30,65 L 210,65 L 210,30 L 410,30 L 410,95 L 610,95 L 610,40 L 810,40 L 810,75 L 970,75'
const MOBILE_PATH =
  'M 55,25 L 55,155 L 85,155 L 85,285 L 55,285 L 55,415 L 85,415 L 85,545 L 55,545 L 55,675 L 85,675 L 85,805 L 55,805'

const DESKTOP_VIEW = { w: 1000, h: 120 }
const MOBILE_VIEW = { w: 120, h: 840 }

function HexNode({
  id,
  reached,
  active,
  pulse,
}: {
  id: string
  reached: boolean
  active: boolean
  pulse: boolean
}) {
  return (
    <div
      className={`benefits-node ${reached ? 'benefits-node--reached' : ''} ${active ? 'benefits-node--active' : ''} ${pulse ? 'benefits-node--pulse' : ''}`}
    >
      <svg viewBox="0 0 32 32" className="benefits-node-hex" aria-hidden>
        <polygon
          points="16,2 29,9 29,23 16,30 3,23 3,9"
          className="benefits-node-hex-shape"
        />
      </svg>
      <span className="benefits-node-id font-mono-tech">{id}</span>
      {active && <span className="benefits-node-ring" aria-hidden />}
    </div>
  )
}

export function Benefits() {
  const sectionRef = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const measurePathRef = useRef<SVGPathElement>(null)
  const glowPathRef = useRef<SVGPathElement>(null)
  const prevStepRef = useRef(0)

  const reduced = useReducedMotion()
  const isMobile = useIsMobile()

  const [activeStep, setActiveStep] = useState(0)
  const [tip, setTip] = useState({ x: 5, y: 54 })
  const [stations, setStations] = useState<{ x: number; y: number }[]>([])
  const [pulseStep, setPulseStep] = useState<number | null>(null)
  const [flash, setFlash] = useState(false)

  const pathD = isMobile ? MOBILE_PATH : DESKTOP_PATH
  const viewW = isMobile ? MOBILE_VIEW.w : DESKTOP_VIEW.w
  const viewH = isMobile ? MOBILE_VIEW.h : DESKTOP_VIEW.h

  const triggerStepPulse = useCallback((stepIndex: number) => {
    setPulseStep(stepIndex)
    setFlash(true)
    window.setTimeout(() => setPulseStep(null), 700)
    window.setTimeout(() => setFlash(false), 400)
  }, [])

  useEffect(() => {
    if (reduced) return

    const el = sectionRef.current
    const path = pathRef.current
    const measure = measurePathRef.current
    const glow = glowPathRef.current
    if (!el || !path || !measure) return

    const length = path.getTotalLength()

    setStations(
      standardsData.map((_, index) => {
        const t = index / (standardsData.length - 1)
        const point = measure.getPointAtLength(t * length)
        return {
          x: (point.x / viewW) * 100,
          y: (point.y / viewH) * 100,
        }
      }),
    )

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    })
    if (glow) {
      gsap.set(glow, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })
    }

    const updateTip = (progress: number) => {
      const point = measure.getPointAtLength(progress * length)
      setTip({
        x: (point.x / viewW) * 100,
        y: (point.y / viewH) * 100,
      })

      const stepIndex = Math.min(
        Math.floor(progress * standardsData.length),
        standardsData.length - 1,
      )

      if (stepIndex !== prevStepRef.current) {
        prevStepRef.current = stepIndex
        triggerStepPulse(stepIndex)
      }

      setActiveStep(stepIndex)
    }

    updateTip(0)

    const tween = gsap.to([path, glow].filter(Boolean), {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          updateTip(self.progress)
        },
      },
    })

    const refresh = () => ScrollTrigger.refresh()
    refresh()
    let resizeTimer = 0
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(refresh, 150)
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('load', refresh)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('load', refresh)
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reduced, isMobile, pathD, viewW, viewH, triggerStepPulse])

  const active = standardsData[activeStep]
  const slideDir = activeStep % 2 === 0 ? 1 : -1
  const blurAmount = isMobile ? 0 : 10
  const blurExit = isMobile ? 0 : 8

  if (reduced) {
    return (
      <section
        id="why"
        className="benefits-section benefits-section--static relative w-full px-5 py-16 text-primary md:px-8 md:py-24"
      >
        <div className="tech-grid-bg benefits-grid opacity-30" aria-hidden />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-primary md:text-5xl dark:text-white">
            הסטנדרטים הגבוהים שהעסק שלך ראוי להם
          </h2>
        </div>
        <div className="relative z-10 mx-auto mt-10 flex max-w-2xl flex-col gap-6 md:mt-14 md:gap-8">
          {standardsData.map((item) => (
            <article
              key={item.id}
              className="glass-card tech-corners rounded-2xl p-6 md:p-8"
            >
              <span className="font-mono-tech mb-3 block text-sm font-bold text-gold">
                {item.id}
              </span>
              <h3 className="mb-3 text-xl font-bold text-burgundy md:text-2xl">
                {item.title}
              </h3>
              <p className="text-base leading-relaxed text-primary dark:text-white/80">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      id="why"
      ref={sectionRef}
      className="benefits-section relative flex h-svh w-full flex-col overflow-hidden px-4 text-primary md:px-8"
    >
      <div className="tech-grid-bg benefits-grid" aria-hidden />
      <div className="benefits-ambient-glow" aria-hidden />
      <div
        className={`benefits-flash ${flash ? 'benefits-flash--on' : ''}`}
        aria-hidden
      />

      <div className="benefits-progress font-mono-tech" aria-live="polite">
        <span className="benefits-progress-current">
          {String(activeStep + 1).padStart(2, '0')}
        </span>
        <span className="benefits-progress-sep">/</span>
        <span className="benefits-progress-total">05</span>
      </div>

      <div className="relative z-10 shrink-0 pt-12 text-center md:pt-14">
        <h2 className="benefits-headline text-[1.35rem] font-extrabold leading-snug tracking-tight text-primary md:text-4xl lg:text-5xl dark:text-white">
          הסטנדרטים הגבוהים שהעסק שלך ראוי להם
        </h2>
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-4 pb-2 md:gap-6 md:pb-4">
        <div className="benefits-content glass-card tech-corners tech-corners-light relative mx-auto w-full max-w-3xl shrink-0 px-5 py-7 md:px-10 md:py-10">
          <AnimatePresence mode="wait">
            <motion.span
              key={`num-${active.id}`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="benefits-step-number font-mono-tech"
              aria-hidden
            >
              {active.id}
            </motion.span>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{
                opacity: 0,
                y: 28 * slideDir,
                scale: 0.9,
                filter: blurAmount ? `blur(${blurAmount}px)` : 'none',
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'none',
              }}
              exit={{
                opacity: 0,
                y: -24 * slideDir,
                scale: 0.94,
                filter: blurExit ? `blur(${blurExit}px)` : 'none',
              }}
              transition={{ duration: 0.55, ease: EASE }}
              className="relative z-10 text-center"
            >
              <h3 className="mb-3 text-xl font-bold leading-snug text-burgundy md:mb-4 md:text-3xl lg:text-[2rem]">
                {active.title}
              </h3>
              <p className="text-balance mx-auto max-w-xl text-[0.95rem] leading-relaxed text-primary md:text-lg md:leading-loose dark:text-white/80">
                {active.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          className={`benefits-timeline relative mt-1 w-full shrink-0 md:mt-2 ${isMobile ? 'benefits-timeline--mobile h-[min(42svh,22rem)] max-w-[8rem]' : 'benefits-timeline--desktop h-28 max-w-5xl'}`}
        >
          <svg
            className="absolute inset-0 h-full w-full overflow-visible"
            viewBox={`0 0 ${viewW} ${viewH}`}
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <filter
                id="benefits-path-glow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              ref={measurePathRef}
              d={pathD}
              fill="none"
              stroke="transparent"
              strokeWidth={isMobile ? 10 : 12}
            />

            <path
              d={pathD}
              fill="none"
              stroke="#d4cebe"
              strokeWidth={isMobile ? 3 : 4}
              strokeLinecap="square"
              strokeLinejoin="miter"
              strokeDasharray={isMobile ? '6 10' : '10 14'}
              className="benefits-path-track"
            />

            <path
              ref={glowPathRef}
              d={pathD}
              fill="none"
              stroke="#7a1c2e"
              strokeWidth={isMobile ? 14 : 18}
              strokeLinecap="square"
              strokeLinejoin="miter"
              opacity={isMobile ? 0.25 : 0.35}
              filter={isMobile ? undefined : 'url(#benefits-path-glow)'}
            />

            <path
              ref={pathRef}
              d={pathD}
              fill="none"
              stroke="#7a1c2e"
              strokeWidth={isMobile ? 5 : 6}
              strokeLinecap="square"
              strokeLinejoin="miter"
              filter={isMobile ? undefined : 'url(#benefits-path-glow)'}
              className="benefits-path-draw"
            />
          </svg>

          <div className="pointer-events-none absolute inset-0">
            {stations.map((station, index) => (
              <div
                key={standardsData[index].id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${station.x}%`,
                  top: `${station.y}%`,
                }}
              >
                <HexNode
                  id={standardsData[index].id}
                  reached={activeStep >= index}
                  active={activeStep === index}
                  pulse={pulseStep === index}
                />
              </div>
            ))}

            <div
              className="benefits-cursor absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${tip.x}%`,
                top: `${tip.y}%`,
              }}
            >
              <span className="benefits-cursor-trail" aria-hidden />
              <span className="benefits-cursor-core" aria-hidden>
                <svg viewBox="0 0 24 24" className="h-full w-full">
                  <polygon
                    points="12,2 21,7 21,17 12,22 3,17 3,7"
                    fill="#7a1c2e"
                  />
                  <circle cx="12" cy="12" r="3" fill="white" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
