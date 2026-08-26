import { useLayoutEffect, useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useReducedMotion } from 'framer-motion'
import { SectionLuxuryBg } from '@/components/layout/SectionLuxuryBg'
import { LeadPopupTrigger } from '@/components/forms/LeadPopup'
import { scheduleScrollTriggerRefresh } from '@/lib/scrollTriggerRefresh'
import {
  EASE,
  headlineStagger,
  lineRevealItem,
  lineRevealItemReduced,
  viewportOnce,
} from '@/lib/motion'
import { LEAD_FLOW_CTA_LABEL } from '@/lib/waveForms'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    title: 'שיחת אסטרטגיה בזום',
    text: '45 דקות שבהן מבינים את העסק, הקהל והיעדים — ומגדירים מה האתר צריך להשיג.',
  },
  {
    title: 'עיצוב ופיתוח מותאם',
    text: 'עיצוב פרימיום, סבבי תיקונים מובנים ומסירה מקצועית — עד שהאתר מרגיש בדיוק כמו העסק שלך.',
  },
  {
    title: 'עליה לאוויר ואינטגרציות',
    text: 'השקה, חיבור לקביעת פגישות, איסוף לידים וכל מה שצריך כדי שהאתר יתחיל לעבוד בשבילך.',
  },
] as const

const headlineLines = [
  'תהליך פרימיום',
  'בשלושה שלבים',
  'ברורים.',
]

export function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLElement | null)[]>([])

  const reduced = useReducedMotion()
  const [activeStep, setActiveStep] = useState(0)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  useLayoutEffect(() => {
    if (reduced) return

    const section = sectionRef.current
    const track = trackRef.current
    const fill = fillRef.current
    if (!section || !track || !fill) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: track,
            start: 'top 62%',
            end: 'bottom 38%',
            scrub: 0.55,
          },
        },
      )

      stepRefs.current.forEach((el, i) => {
        if (!el) return
        ScrollTrigger.create({
          trigger: el,
          start: 'top 58%',
          end: 'bottom 42%',
          onEnter: () => {
            if (mountedRef.current) setActiveStep(i)
          },
          onEnterBack: () => {
            if (mountedRef.current) setActiveStep(i)
          },
        })
      })
    }, section)

    scheduleScrollTriggerRefresh(120)

    return () => ctx.revert()
  }, [reduced])

  useEffect(() => {
    if (reduced) return
    scheduleScrollTriggerRefresh(400)
    scheduleScrollTriggerRefresh(1000)
  }, [reduced])

  const lineVariants = reduced ? lineRevealItemReduced : lineRevealItem

  return (
    <section
      ref={sectionRef}
      id="process"
      className="process-section section-pad relative overflow-x-clip bg-section-process"
      aria-labelledby="process-heading"
    >
      <SectionLuxuryBg variant="process" />

      <div className="container-site relative z-10">
        <div className="process-editorial">
          <header className="process-intro">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={headlineStagger}
            >
              <h2
                id="process-heading"
                className="process-headline font-display font-bold leading-[1.06] text-burgundy"
              >
                {headlineLines.map((line) => (
                  <span key={line} className="process-headline-line block overflow-hidden py-0.5">
                    <motion.span className="block" variants={lineVariants}>
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h2>

              <motion.p
                className="process-lead mt-5 max-w-md text-base leading-relaxed text-muted md:mt-6 md:text-lg dark:text-white/65"
                variants={lineVariants}
              >
                מותאם לבעלות עסקים שרוצות נוכחות דיגיטלית שחוסכת זמן בשירות
                וממירה מתעניינות ללקוחות משלמות.
              </motion.p>
            </motion.div>

            <motion.aside
              className="process-diff"
              initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, ease: EASE, delay: reduced ? 0 : 0.35 }}
            >
              <p className="process-diff-lead font-display text-lg font-semibold leading-snug text-burgundy md:text-xl">
                אני לא מתחילה מהמסך.
                <br />
                אני מתחילה מהעסק.
              </p>
              <p className="process-diff-note mt-3 max-w-xs text-sm leading-relaxed text-muted dark:text-white/50">
                לפני העיצוב, אני מבינה מה צריך לקרות באתר כדי שהלקוחה הנכונה תרגיש
                שהיא הגיעה למקום הנכון.
              </p>
            </motion.aside>
          </header>

          <div ref={trackRef} className="process-timeline-wrap">
            <div className="process-rail" aria-hidden>
              <div className="process-rail-track" />
              <div ref={fillRef} className="process-rail-fill">
                {!reduced && <span className="process-rail-marker" />}
              </div>
            </div>

            <ol
              className="process-list"
              aria-label="שלבי תהליך העבודה"
              aria-live="polite"
            >
              {steps.map((step, i) => {
                const num = String(i + 1).padStart(2, '0')
                const isActive = activeStep === i
                const isPast = !reduced && i < activeStep
                const isFuture = !reduced && i > activeStep

                return (
                  <li
                    key={step.title}
                    ref={(el) => {
                      stepRefs.current[i] = el
                    }}
                    className={[
                      'process-step',
                      isActive ? 'process-step--active' : '',
                      isPast ? 'process-step--past' : '',
                      isFuture ? 'process-step--future' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    aria-current={!reduced && isActive ? 'step' : undefined}
                  >
                    <span
                      className="process-step-num font-mono-tech"
                      aria-hidden
                    >
                      {num}
                    </span>

                    <div className="process-step-body">
                      <h3 className="process-step-title">{step.title}</h3>

                      <motion.p
                        className="process-step-text"
                        initial={false}
                        animate={
                          reduced
                            ? { opacity: 1, y: 0 }
                            : {
                                opacity: isActive ? 1 : 0.42,
                                y: isActive ? 0 : 6,
                              }
                        }
                        transition={{ duration: 0.55, ease: EASE }}
                      >
                        {step.text}
                      </motion.p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>

        <motion.footer
          className="process-closing"
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <p className="process-closing-text font-display font-bold leading-tight text-burgundy">
            <span className="block">ומכאן</span>
            <span className="block">האתר מתחיל לעבוד בשבילך.</span>
          </p>
          <LeadPopupTrigger className="process-closing-link group">
            <span>{LEAD_FLOW_CTA_LABEL}</span>
            <span className="process-closing-link-arrow" aria-hidden>
              →
            </span>
          </LeadPopupTrigger>
        </motion.footer>
      </div>
    </section>
  )
}
