import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from 'framer-motion'
import { Button } from '@/components/ui/button'
import { EASE, fadeUpScale, viewportOnce, viewportOnceTight } from '@/lib/motion'

const pains: {
  title: string
  text: string
}[] = [
  {
    title: 'תסמונת "האתר המביך"',
    text: 'יש לך אתר, אבל אתה לא באמת שולח את הקישור. כי משהו שם פשוט לא מרגיש נכון, ואתה לא רוצה שאנשים יחשבו שזה מה שאתה מייצג.',
  },
  {
    title: 'חור בכיס בלי תוצאות',
    text: 'שילמת על אתר, אולי אפילו יותר מפעם. אבל הוא לא מביא פניות, לא סוגר עסקאות, ולא מרגיש כמו השקעה. יותר כמו הוצאה שאתה מנסה לא לחשוב עליה.',
  },
  {
    title: 'עיוות התדמית',
    text: 'עסק רציני עם אתר שנראה כמו בלוג חובבני משנת 2014. הלקוחות שופטים תוך שניות, ואתה יודע שהם לא רואים את מה שאתה באמת מציע.',
  },
  {
    title: 'תבנית שכולם מכירים',
    text: 'אותו עיצוב, אותם פונטים, אותה תחושה של "ראיתי את זה כבר". ואתה יודע שאתה לא בולט. אתה פשוט עוד אחד ברשימה.',
  },
  {
    title: 'איטי, תקוע, לא מותאם לנייד',
    text: 'הלקוח נכנס מהטלפון, מחכה, מנסה לגלול, ועוזב. אתר שלא עובד במובייל בשנת 2026 זה כמו חנות עם שלט "סגור".',
  },
  {
    title: 'כאב ראש של כתיבת תוכן',
    text: 'אתה יודע מה אתה עושה. אבל כשמגיעים לכתוב את זה באתר, הכל נשמע גנרי, יבש, או פשוט לא מוכר. ואתה נשאר עם דף ריק ותחושת תסכול.',
  },
]

const headlineLines = [
  'הגיע הזמן להפסיק להילחם באתר שלך,',
  'ולהתחיל לתת לו לעבוד בשבילך',
]

function PainPointCard({
  pain,
  index,
  reduced,
}: {
  pain: (typeof pains)[number]
  index: number
  reduced: boolean
}) {
  const ref = useRef<HTMLElement>(null)
  const [flash, setFlash] = useState(false)
  const num = String(index + 1).padStart(2, '0')
  const fromStart = index % 2 === 0

  const isActive = useInView(ref, {
    amount: 0.55,
    margin: '-28% 0px -28% 0px',
  })

  const hasEntered = useInView(ref, {
    once: true,
    amount: 0.35,
    margin: viewportOnceTight.margin,
  })

  useEffect(() => {
    if (reduced || !hasEntered) return
    setFlash(true)
    const timer = window.setTimeout(() => setFlash(false), 450)
    return () => window.clearTimeout(timer)
  }, [hasEntered, reduced])

  const cardVariants: Variants = reduced
    ? {
        hidden: { opacity: 1, x: 0, y: 0, rotateX: 0, rotateY: 0, scale: 1 },
        visible: { opacity: 1, x: 0, y: 0, rotateX: 0, rotateY: 0, scale: 1 },
      }
    : {
        hidden: {
          opacity: 0,
          x: fromStart ? 72 : -72,
          y: 36,
          rotateX: 10,
          rotateY: fromStart ? -8 : 8,
          scale: 0.92,
          filter: 'blur(6px)',
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          filter: 'blur(0px)',
          transition: {
            duration: 0.85,
            ease: EASE,
            delay: index * 0.07,
          },
        },
      }

  return (
    <motion.article
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnceTight}
      variants={cardVariants}
      style={{ perspective: 900 }}
      whileHover={
        reduced
          ? undefined
          : {
              y: -6,
              scale: 1.015,
              transition: { duration: 0.28, ease: EASE },
            }
      }
      className={`pain-point-card group glass-card tech-corners relative overflow-hidden rounded-2xl p-6 md:p-7 ${isActive ? 'pain-point-card--active' : ''}`}
    >
      <span
        className={`pain-point-entry-flash ${flash ? 'pain-point-entry-flash--on' : ''}`}
        aria-hidden
      />

      <motion.span
        initial={reduced ? { scaleY: 1 } : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={viewportOnceTight}
        transition={{
          duration: 0.65,
          ease: EASE,
          delay: index * 0.07 + 0.12,
        }}
        className="pain-point-accent-bar"
        aria-hidden
      />

      <motion.span
        initial={reduced ? { scaleY: 1 } : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={viewportOnceTight}
        transition={{
          duration: 0.55,
          ease: EASE,
          delay: index * 0.07 + 0.22,
        }}
        className="pain-point-edge-line"
        aria-hidden
      />

      <motion.span
        initial={
          reduced
            ? { opacity: 1, scale: 1, color: 'rgba(122, 28, 46, 0.18)' }
            : {
                opacity: 0,
                scale: 0.55,
                y: 24,
                color: 'rgba(163, 163, 163, 0.75)',
              }
        }
        whileInView={
          reduced
            ? undefined
            : {
                opacity: 1,
                scale: 1,
                y: 0,
                color: 'rgba(122, 28, 46, 0.18)',
              }
        }
        viewport={viewportOnceTight}
        transition={{
          duration: 0.9,
          ease: EASE,
          delay: index * 0.07 + 0.08,
        }}
        whileHover={
          reduced
            ? undefined
            : {
                scale: 1.08,
                color: 'rgba(122, 28, 46, 0.42)',
              }
        }
        className={`pain-point-watermark font-mono-tech ${hasEntered ? 'pain-point-watermark--revealed' : ''}`}
        aria-hidden
      >
        {num}
      </motion.span>

      <div className="pain-point-card-body relative z-10">
        <span className="pain-point-index font-mono-tech">{num}</span>
        <h3 className="mb-3 text-lg font-bold text-burgundy md:text-xl">
          {pain.title}
        </h3>
        <p className="text-base leading-relaxed text-primary dark:text-white/80">
          {pain.text}
        </p>
      </div>
    </motion.article>
  )
}

export function PainPoints() {
  const reduced = useReducedMotion()
  const headerRef = useRef<HTMLElement>(null)
  const headlineInView = useInView(headerRef, viewportOnce)
  const [headlineFallback, setHeadlineFallback] = useState(false)

  useEffect(() => {
    if (reduced) return
    const timer = window.setTimeout(() => setHeadlineFallback(true), 2000)
    return () => window.clearTimeout(timer)
  }, [reduced])

  const showHeadline = reduced || headlineInView || headlineFallback

  return (
    <section
      id="pains"
      className="pain-points-section section-pad relative overflow-hidden bg-section-surface"
    >
      <div className="tech-grid-bg pain-points-grid-bg" aria-hidden />
      <div className="pain-points-ambient-glow" aria-hidden />

      <div className="container-site relative z-10">
        <motion.header
          ref={headerRef}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUpScale}
          className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
        >
          <h2 className="text-3xl font-bold text-primary md:text-4xl dark:text-white">
            {headlineLines.map((line, i) => (
              <span key={line} className="block overflow-hidden py-0.5">
                <motion.span
                  className="block"
                  initial={reduced ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
                  animate={
                    showHeadline
                      ? { y: 0, opacity: 1 }
                      : { y: '110%', opacity: 0 }
                  }
                  transition={{
                    duration: 0.7,
                    ease: EASE,
                    delay: i * 0.12,
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>

          <hr className="tech-divider mx-auto mt-6 max-w-xs md:mt-8 md:max-w-sm" />

          <motion.p
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE, delay: 0.28 }}
            className="mt-5 text-base leading-relaxed text-muted max-[480px]:text-[0.875rem] md:mt-6 md:text-lg dark:text-white/65"
          >
            אני שומעת הרבה מבעלי עסקים את התסכול מאתר שלא עובד בשבילם,
            <br className="hidden sm:block" />
            הנה מה שאני שומעת שוב ושוב ואולי גם את/ה מזהה את עצמך כאן
          </motion.p>
        </motion.header>

        <div className="pain-points-stack relative mx-auto max-w-5xl">
          <div
            className="pain-points-timeline md:hidden"
            aria-hidden
          />

          <div className="pain-points-grid grid gap-7 md:grid-cols-2 md:gap-6">
            {pains.map((pain, i) => (
              <PainPointCard
                key={pain.title}
                pain={pain}
                index={i}
                reduced={!!reduced}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnceTight}
          variants={fadeUpScale}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-14 max-w-2xl md:mt-16"
        >
          <div className="pain-points-cta-wrap glass-card tech-corners text-center">
            <hr className="tech-divider mb-6" aria-hidden />

            <p className="text-lg leading-relaxed text-primary dark:text-white/85">
              אם משהו כאן נגע בך,
              <br />
              זה סימן שאתה מוכן ליותר מאתר.
              <br />
              אתה מוכן לנכס דיגיטלי
              <br />
              שאתה גאה לשתף, שעובד בשבילך,
              <br />
              ושמרגיש כמו העסק שלך באמת.
            </p>
            <p className="mt-4 text-muted dark:text-white/60">
              בוא נדבר. בלי לחץ, בלי מכירה אגרסיבית. רק שיחה כנה על מה שאתה
              צריך.
            </p>

            <Button
              asChild
              variant="burgundy"
              size="lg"
              className="btn-burgundy-glow mt-8 h-12 rounded-full px-8 shadow-soft"
            >
              <a href="#contact">רוצה לשנות את המצב? בוא נדבר</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
