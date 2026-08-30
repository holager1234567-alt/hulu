import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  headlineStagger,
  lineRevealItem,
  lineRevealItemReduced,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from '@/lib/motion'
import { bindRevealTimeline, forceRevealVisible } from '@/lib/gsapReveal'
import { scheduleScrollTriggerRefresh } from '@/lib/scrollTriggerRefresh'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const headlineLines = [
  { text: 'ראית איך זה יכול להיראות.', accent: false },
  { text: 'עכשיו בואי נבנה את האתר של העסק שלך.', accent: true },
] as const

const readySignals = [
  'יש לך עסק פעיל ולקוחות.',
  'את רוצה שהאתר ירגיש כמו העסק שלך.',
  'את מוכנה לעבור מהתעניינות לצעד הבא.',
] as const

export function Benefits() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)

  const lineVariants = reduced ? lineRevealItemReduced : lineRevealItem

  useEffect(() => {
    scheduleScrollTriggerRefresh(80)
  }, [])

  useGSAP(
    () => {
      const headline = headlineRef.current
      if (!headline) return

      const q = gsap.utils.selector(headline)
      const pick = (selector: string) => {
        const nodes = q(selector)
        return nodes.length ? nodes : null
      }

      const ornaments = pick('.bridge-header-ornament span')
      const headlineInners = pick('.bridge-headline-inner')
      const accentLine = pick('.bridge-headline-accent-line')

      if (reduced) {
        forceRevealVisible(ornaments, headlineInners, accentLine)
        return
      }

      if (ornaments) gsap.set(ornaments, { scaleX: 0, opacity: 0 })
      if (headlineInners) gsap.set(headlineInners, { yPercent: 118, opacity: 0, rotateX: 14 })
      if (accentLine) gsap.set(accentLine, { scaleX: 0, opacity: 0 })

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: headline,
          start: 'top 88%',
          once: true,
          invalidateOnRefresh: true,
        },
      })

      if (ornaments) tl.to(ornaments, { scaleX: 1, opacity: 1, duration: 0.85, stagger: 0.08 })
      if (headlineInners) {
        tl.to(
          headlineInners,
          { yPercent: 0, opacity: 1, rotateX: 0, duration: 0.95, stagger: 0.12, ease: 'power4.out' },
          '-=0.55',
        )
      }
      if (accentLine) {
        tl.to(accentLine, { scaleX: 1, opacity: 1, duration: 0.75, ease: 'power2.inOut' }, '-=0.45')
      }

      return bindRevealTimeline(tl, headline)
    },
    { scope: sectionRef, dependencies: [reduced] },
  )

  return (
    <section
      ref={sectionRef}
      id="readiness"
      className="bridge-section section-pad relative overflow-x-clip"
      aria-labelledby="bridge-heading"
    >
      <div className="container-site relative z-10">
        <div className="bridge-layout">
          <header className="bridge-intro bridge-intro--lux">
            <div ref={headlineRef} className="bridge-headline-block">
              <div className="bridge-header-ornament" aria-hidden>
                <span />
                <span />
              </div>

              <h2
                id="bridge-heading"
                className="bridge-headline font-display font-bold leading-[1.04] text-burgundy"
              >
                {headlineLines.map((line) => (
                  <span
                    key={line.text}
                    className={cn(
                      'bridge-headline-line block overflow-hidden py-0.5',
                      line.accent && 'bridge-headline-accent',
                    )}
                  >
                    <span className="bridge-headline-inner block">{line.text}</span>
                  </span>
                ))}
                <span className="bridge-headline-accent-line" aria-hidden />
              </h2>
            </div>

            <motion.div
              className="bridge-subhead"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={headlineStagger}
            >
              <motion.p className="bridge-subhead-line" variants={lineVariants}>
                לא עוד אתר שנראה טוב.
              </motion.p>
              <motion.p className="bridge-subhead-line" variants={lineVariants}>
                אתר שמרגיש כמו העסק שלך ועובד כמוך.
              </motion.p>
            </motion.div>
          </header>

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
                  אם את עדיין בונה את העסק
                </motion.h3>
                <motion.p className="bridge-path-text" variants={staggerItem}>
                  את עדיין בודקת מה עובד,
                  <br />
                  למי את פונה ומה בדיוק את מציעה.
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
                <motion.h3
                  className="bridge-path-title bridge-path-title--accent"
                  variants={lineVariants}
                >
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
          </div>
        </div>
      </div>
    </section>
  )
}
