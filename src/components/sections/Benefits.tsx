import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  headlineStagger,
  lineRevealItem,
  lineRevealItemReduced,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from '@/lib/motion'

const headlineLines = ['ראית איך זה יכול להיראות.', 'עכשיו בואי נבנה את האתר של העסק שלך.']

const readySignals = [
  'יש לכם עסק פעיל ולקוחות.',
  'אתם רוצים שהאתר ירגיש כמו העסק שלכם.',
  'אתם מוכנים לעבור מהתעניינות לצעד הבא.',
] as const

export function Benefits() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  const lineVariants = reduced ? lineRevealItemReduced : lineRevealItem

  return (
    <section
      ref={sectionRef}
      id="readiness"
      className="bridge-section section-pad relative overflow-x-clip"
      aria-labelledby="bridge-heading"
    >
      <div className="container-site relative z-10">
        <div className="bridge-layout">
          <motion.header
            className="bridge-intro"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={headlineStagger}
          >
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
          </div>
        </div>
      </div>
    </section>
  )
}
