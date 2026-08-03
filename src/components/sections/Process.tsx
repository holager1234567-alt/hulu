import { useLayoutEffect, useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useReducedMotion } from 'framer-motion'
import { SectionLuxuryBg } from '@/components/layout/SectionLuxuryBg'
import { scheduleScrollTriggerRefresh } from '@/lib/scrollTriggerRefresh'
import {
  EASE,
  fadeUpScale,
  viewportOnce,
  viewportOnceTight,
} from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    title: 'שיחת מכירה',
    text: 'הכרות ראשונית, הבנת הצרכים של העסק שלך והגדרת המטרות שלשמן אתה צריך את האתר.',
  },
  {
    title: 'פגישת אפיון ושליחת חומרים',
    text: 'פגישת זום ממוקדת שבה נגדיר את הויזן, המראה והסגנון הוויזואלי של האתר, לצד שליחת החומרים והתמונות הדרושים.',
  },
  {
    title: 'מקדמה וחתימת חוזה',
    text: 'מסדירים את תחילת העבודה באופן רשמי כדי לצאת לדרך בראש שקט.',
  },
  {
    title: 'פיתוח ובניית האתר (כ14 ימים)',
    text: 'תהליך העבודה נמשך כשבועיים (בתלות במורכבות הדרישות ובזמינות שליחת החומרים). לאורך התקופה יעברו אליך גרסאות ניסיון (טיוטות) של האתר לאישור, עם עד 3 סבבי תיקונים ושינויים לבחירתך.',
  },
  {
    title: 'השקת האתר וקידום ממומן',
    text: 'האתר יוצא לאוויר העולם, מוכן להתחיל לעבוד בשבילך ולהביא תוצאות, כולל חיבור ופרסום בקמפיינים ממומנים.',
  },
]

function ProcessNode({
  index,
  active,
  done,
  reduced,
}: {
  index: number
  active: boolean
  done: boolean
  reduced: boolean
}) {
  const num = String(index + 1).padStart(2, '0')

  return (
    <div
      className={`process-node ${active ? 'process-node--active' : ''} ${done ? 'process-node--done' : ''}`}
    >
      <span className="process-node-ring" aria-hidden />
      {active && !reduced && <span className="process-node-pulse" aria-hidden />}
      <span className="process-node-core">
        <span className="process-node-num font-mono-tech">{num}</span>
      </span>
    </div>
  )
}

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
            start: 'top 58%',
            end: 'bottom 42%',
            scrub: 0.45,
          },
        },
      )

      stepRefs.current.forEach((el, i) => {
        if (!el) return
        ScrollTrigger.create({
          trigger: el,
          start: 'top 60%',
          end: 'bottom 40%',
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

  const progressNum = String(activeStep + 1).padStart(2, '0')
  const progressTotal = String(steps.length).padStart(2, '0')

  return (
    <section
      ref={sectionRef}
      id="process"
      className="process-section section-pad relative overflow-hidden bg-section-process"
    >
      <SectionLuxuryBg variant="process" />
      <div className="process-accent-glow" aria-hidden />

      <div className="container-site relative z-10">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUpScale}
          className="process-header mx-auto mb-12 max-w-3xl text-center md:mb-16"
        >
          <p className="process-kicker font-mono-tech mb-4 text-[0.68rem] font-semibold tracking-[0.22em] text-burgundy/50 uppercase md:text-xs">
            the process
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl lg:text-[2.5rem]">
            <span className="block text-burgundy">איך התהליך עובד?</span>
            <span className="process-headline-sub mt-1 block text-xl font-semibold text-primary md:mt-1.5 md:text-2xl lg:text-[1.85rem] dark:text-white">
              שלב אחר שלב
            </span>
          </h2>
          <hr className="tech-divider mx-auto mt-6 max-w-xs md:mt-8 md:max-w-sm" />
        </motion.header>

        <div className="process-layout mx-auto max-w-3xl lg:max-w-4xl">
          <div
            className="process-progress font-mono-tech"
            aria-live="polite"
            aria-label={`שלב ${activeStep + 1} מתוך ${steps.length}`}
          >
            <span className="process-progress-current">{progressNum}</span>
            <span className="process-progress-sep" aria-hidden>
              /
            </span>
            <span className="process-progress-total">{progressTotal}</span>
          </div>

          <div ref={trackRef} className="process-track">
            <div className="process-rail" aria-hidden>
              <div className="process-rail-track" />
              <div ref={fillRef} className="process-rail-fill" />
            </div>

            <ol className="process-list">
              {steps.map((step, i) => {
                const num = String(i + 1).padStart(2, '0')
                const isActive = activeStep === i
                const isDone = i < activeStep

                return (
                  <li
                    key={step.title}
                    ref={(el) => {
                      stepRefs.current[i] = el
                    }}
                    className={`process-step ${isActive ? 'process-step--active' : ''} ${isDone ? 'process-step--done' : ''}`}
                  >
                    <div className="process-node-col">
                      <ProcessNode
                        index={i}
                        active={isActive}
                        done={isDone}
                        reduced={!!reduced}
                      />
                    </div>

                    <motion.article
                      initial={
                        reduced
                          ? { opacity: 1, x: 0, filter: 'blur(0px)' }
                          : { opacity: 0, x: -24, filter: 'blur(6px)' }
                      }
                      whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      viewport={{ ...viewportOnceTight, margin: '0px 0px -8% 0px' }}
                      transition={{
                        duration: 0.65,
                        ease: EASE,
                        delay: i * 0.06,
                      }}
                      className={`process-step-card glass-card tech-corners tech-corners-light ${isActive ? 'process-step-card--active' : ''}`}
                    >
                      <span className="process-step-watermark font-mono-tech" aria-hidden>
                        {num}
                      </span>
                      <span className="process-step-index font-mono-tech">{num}</span>
                      <h3 className="process-step-title">{step.title}</h3>
                      <p className="process-step-text">{step.text}</p>
                    </motion.article>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
