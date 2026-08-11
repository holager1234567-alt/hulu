import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useReducedMotion } from 'framer-motion'
import { SectionLuxuryBg } from '@/components/layout/SectionLuxuryBg'
import { scheduleScrollTriggerRefresh } from '@/lib/scrollTriggerRefresh'
import { LEAD_FLOW_ANCHOR, LEAD_FLOW_CTA_LABEL } from '@/lib/waveForms'
import {
  EASE,
  headlineStagger,
  lineRevealItem,
  lineRevealItemReduced,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

const headlineLines = ['ראית איך זה יכול להיראות.', 'עכשיו בואי נבנה את האתר של העסק שלך.']

const readySignals = [
  'יש לכם עסק פעיל ולקוחות.',
  'אתם רוצים שהאתר ירגיש כמו העסק שלכם.',
  'אתם מוכנים לעבור מהתעניינות לצעד הבא.',
] as const

const finalLines: string[] = []

export function Benefits() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const transitionRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (reduced) return

    const section = sectionRef.current
    const transition = transitionRef.current
    const fill = fillRef.current
    if (!section || !transition || !fill) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: transition,
            start: 'top 75%',
            end: 'bottom 35%',
            scrub: 0.55,
          },
        },
      )
    }, section)

    scheduleScrollTriggerRefresh(120)
    return () => ctx.revert()
  }, [reduced])

  const lineVariants = reduced ? lineRevealItemReduced : lineRevealItem

  return (
    <section
      ref={sectionRef}
      id="readiness"
      className="bridge-section section-pad relative overflow-x-clip"
      aria-labelledby="bridge-heading"
    >
      <SectionLuxuryBg variant="benefits" />

      <div className="container-site relative z-10">
        <div className="bridge-layout">
          <motion.header
            className="bridge-intro"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={headlineStagger}
          >
            <p className="bridge-eyebrow font-mono-tech text-[0.68rem] font-semibold tracking-[0.22em] text-burgundy/50 uppercase md:text-xs">
              אחרי שראיתם
            </p>

            <h2
              id="bridge-heading"
              className="bridge-headline font-display font-bold leading-[1.04] text-burgundy"
            >
              {headlineLines.map((line) => (
                <span key={line} className="bridge-headline-line block overflow-hidden py-0.5">
                  <motion.span className="block" variants={lineVariants}>
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>

            <motion.div className="bridge-subhead" variants={lineVariants}>
              <p className="bridge-subhead-line">לא עוד אתר שנראה טוב.</p>
              <p className="bridge-subhead-line">
                אתר שמרגיש כמו העסק שלך ועובד כמוהו.
              </p>
            </motion.div>
          </motion.header>

          <div className="bridge-paths-wrap">
            <div className="bridge-paths">
              <motion.article
                className="bridge-path bridge-path--still"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={staggerContainer}
              >
                <motion.h3 className="bridge-path-title" variants={staggerItem}>
                  אם אתם עדיין בונים את העסק
                </motion.h3>
                <motion.p className="bridge-path-text" variants={staggerItem}>
                  אתם עדיין בודקים מה עובד,
                  <br />
                  למי אתם פונים ומה בדיוק אתם מציעים.
                </motion.p>
                <motion.p
                  className="bridge-path-emphasis font-display"
                  variants={staggerItem}
                >
                  אולי עוד לא.
                </motion.p>
              </motion.article>

              <div className="bridge-path-divider" aria-hidden>
                <span className="bridge-path-divider-line" />
              </div>

              <motion.article
                className="bridge-path bridge-path--ready"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={headlineStagger}
              >
                <motion.h3 className="bridge-path-title bridge-path-title--accent" variants={lineVariants}>
                  אבל אם...
                </motion.h3>
                <ul className="bridge-ready-list">
                  {readySignals.map((signal) => (
                    <motion.li
                      key={signal}
                      className="bridge-ready-item"
                      variants={lineVariants}
                    >
                      {signal}
                    </motion.li>
                  ))}
                </ul>
              </motion.article>
            </div>

            <div ref={transitionRef} className="bridge-transition" aria-hidden>
              <div className="bridge-transition-track">
                <div ref={fillRef} className="bridge-transition-fill" />
              </div>
            </div>
          </div>

          <motion.div
            className="bridge-moment"
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.85, ease: EASE, delay: reduced ? 0 : 0.08 }}
          >
            <p className="bridge-moment-line font-display font-bold text-burgundy">
              <span className="block">הגיע הזמן</span>
              <span className="bridge-moment-emphasis block">לתת לעסק שלך</span>
            </p>
            <p className="bridge-moment-line bridge-moment-line--second font-display font-bold text-burgundy">
              <span className="bridge-moment-emphasis block">אתר שעובד.</span>
            </p>
          </motion.div>

          {finalLines.length > 0 ? (
            <motion.div
              className="bridge-final"
              initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, ease: EASE, delay: reduced ? 0 : 0.12 }}
            >
              {finalLines.map((line) => (
                <p key={line} className="bridge-final-line">
                  {line}
                </p>
              ))}
            </motion.div>
          ) : null}

          <motion.div
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.65, ease: EASE, delay: reduced ? 0 : 0.16 }}
          >
            <a href={LEAD_FLOW_ANCHOR} className="bridge-cta group">
              <span>{LEAD_FLOW_CTA_LABEL}</span>
              <span className="bridge-cta-arrow" aria-hidden>
                →
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
