import { useLayoutEffect, useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion, useReducedMotion } from 'framer-motion'
import { SectionLuxuryBg } from '@/components/layout/SectionLuxuryBg'
import { LeadPopupTrigger } from '@/components/forms/LeadPopup'
import { bindRevealTimeline, forceRevealVisible } from '@/lib/gsapReveal'
import { scheduleScrollTriggerRefresh } from '@/lib/scrollTriggerRefresh'
import { EASE } from '@/lib/motion'
import { LEAD_FLOW_CTA_LABEL } from '@/lib/waveForms'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger, useGSAP)

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
  { text: 'תהליך פרימיום', accent: false },
  { text: 'בשלושה שלבים', accent: false },
  { text: 'ברורים.', accent: true },
]

export function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const introRef = useRef<HTMLElement>(null)
  const closingRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLElement | null)[]>([])

  const reduced = useReducedMotion()
  const [activeStep, setActiveStep] = useState(0)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    scheduleScrollTriggerRefresh(0)
    scheduleScrollTriggerRefresh(350)
    return () => {
      mountedRef.current = false
    }
  }, [])

  useGSAP(
    () => {
      const section = sectionRef.current
      const intro = introRef.current
      const closing = closingRef.current
      if (!section) return

      const q = gsap.utils.selector(section)
      const pick = (selector: string) => {
        const nodes = q(selector)
        return nodes.length ? nodes : null
      }

      const ornaments = pick('.process-header-ornament span')
      const headlineInners = pick('.process-headline-inner')
      const accentLine = pick('.process-headline-accent-line')
      const lead = pick('.process-lead')
      const diff = pick('.process-diff')
      const diffGlow = pick('.process-diff-glow')
      const closingText = pick('.process-closing-text')
      const closingLink = pick('.process-closing-link')
      const closingGlow = pick('.process-closing-glow')

      if (reduced) {
        forceRevealVisible(
          ornaments,
          headlineInners,
          accentLine,
          lead,
          diff,
          diffGlow,
          closingText,
          closingLink,
          closingGlow,
        )
        return
      }

      const cleanups: Array<() => void> = []

      if (ornaments) gsap.set(ornaments, { scaleX: 0, opacity: 0 })
      if (headlineInners) gsap.set(headlineInners, { yPercent: 118, opacity: 0, rotateX: 12 })
      if (accentLine) gsap.set(accentLine, { scaleX: 0, opacity: 0 })
      if (lead) gsap.set(lead, { opacity: 0, y: 20 })
      if (diff) gsap.set(diff, { opacity: 0, y: 28, rotateY: -8 })
      if (diffGlow) gsap.set(diffGlow, { opacity: 0, scale: 0.9 })
      if (closingText) gsap.set(closingText, { opacity: 0, y: 28 })
      if (closingLink) gsap.set(closingLink, { opacity: 0, y: 18 })
      if (closingGlow) gsap.set(closingGlow, { opacity: 0, scale: 0.88 })

      if (intro) {
        const introTl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: intro,
            start: 'top 92%',
            once: true,
            invalidateOnRefresh: true,
          },
        })

        if (ornaments) introTl.to(ornaments, { scaleX: 1, opacity: 1, duration: 0.8, stagger: 0.08 })
        if (headlineInners) {
          introTl.to(
            headlineInners,
            { yPercent: 0, opacity: 1, rotateX: 0, duration: 0.92, stagger: 0.1, ease: 'power4.out' },
            '-=0.5',
          )
        }
        if (accentLine) {
          introTl.to(accentLine, { scaleX: 1, opacity: 1, duration: 0.7, ease: 'power2.inOut' }, '-=0.42')
        }
        if (lead) introTl.to(lead, { opacity: 1, y: 0, duration: 0.65 }, '-=0.38')
        if (diffGlow) introTl.to(diffGlow, { opacity: 1, scale: 1, duration: 0.75 }, '-=0.35')
        if (diff) introTl.to(diff, { opacity: 1, y: 0, rotateY: 0, duration: 0.82 }, '-=0.55')

        cleanups.push(bindRevealTimeline(introTl, intro))
      }

      if (closing) {
        const closingTl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: closing,
            start: 'top 92%',
            once: true,
            invalidateOnRefresh: true,
          },
        })

        if (closingGlow) closingTl.to(closingGlow, { opacity: 1, scale: 1, duration: 0.8 }, 0)
        if (closingText) closingTl.to(closingText, { opacity: 1, y: 0, duration: 0.78 }, '-=0.55')
        if (closingLink) closingTl.to(closingLink, { opacity: 1, y: 0, duration: 0.62 }, '-=0.38')

        cleanups.push(bindRevealTimeline(closingTl, closing))
      }

      return () => cleanups.forEach((cleanup) => cleanup())
    },
    { scope: sectionRef, dependencies: [reduced] },
  )

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

        const stepBody = el.querySelector('.process-step-body')
        const stepNum = el.querySelector('.process-step-num')

        if (stepBody) {
          gsap.fromTo(
            stepBody,
            { opacity: 0, x: 36, y: 18 },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 84%',
                once: true,
                invalidateOnRefresh: true,
              },
            },
          )
        }

        if (stepNum) {
          gsap.fromTo(
            stepNum,
            { scale: 0.72, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.75,
              ease: 'back.out(1.8)',
              scrollTrigger: {
                trigger: el,
                start: 'top 84%',
                once: true,
                invalidateOnRefresh: true,
              },
            },
          )
        }

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
          <header ref={introRef} className="process-intro process-intro--lux">
            <div>
              <div className="process-header-ornament" aria-hidden>
                <span />
                <span />
              </div>

              <h2
                id="process-heading"
                className="process-headline font-display font-bold leading-[1.06] text-burgundy"
              >
                {headlineLines.map((line) => (
                  <span
                    key={line.text}
                    className={cn(
                      'process-headline-line block overflow-hidden py-0.5',
                      line.accent && 'process-headline-accent',
                    )}
                  >
                    <span className="process-headline-inner block">{line.text}</span>
                  </span>
                ))}
                <span className="process-headline-accent-line" aria-hidden />
              </h2>

              <p className="process-lead mt-5 max-w-md text-base leading-relaxed text-muted md:mt-6 md:text-lg dark:text-white/65">
                מותאם לבעלות עסקים שרוצות נוכחות דיגיטלית שחוסכת זמן בשירות
                וממירה מתעניינות ללקוחות משלמות.
              </p>
            </div>

            <aside className="process-diff process-diff--lux">
              <span className="process-diff-glow" aria-hidden />
              <p className="process-diff-lead font-display text-lg font-semibold leading-snug text-burgundy md:text-xl">
                אני לא מתחילה מהמסך.
                <br />
                אני מתחילה מהעסק.
              </p>
              <p className="process-diff-note mt-3 max-w-xs text-sm leading-relaxed text-muted dark:text-white/50">
                לפני העיצוב, אני מבינה מה צריך לקרות באתר כדי שהלקוחה הנכונה תרגיש
                שהיא הגיעה למקום הנכון.
              </p>
            </aside>
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

        <footer ref={closingRef} className="process-closing process-closing--lux">
          <span className="process-closing-glow" aria-hidden />
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
        </footer>
      </div>
    </section>
  )
}
