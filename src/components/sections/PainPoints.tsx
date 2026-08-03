import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
} from 'framer-motion'
import { Button } from '@/components/ui/button'
import { SectionLuxuryBg } from '@/components/layout/SectionLuxuryBg'
import { EASE, fadeUpScale, viewportPainPoints } from '@/lib/motion'

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

type PainPointsHeaderProps = {
  headerRef: React.RefObject<HTMLElement | null>
  reduced: boolean
  showHeadline: boolean
}

function PainPointsHeader({
  headerRef,
  reduced,
  showHeadline,
}: PainPointsHeaderProps) {
  return (
    <motion.header
      ref={headerRef}
      initial="hidden"
      whileInView="visible"
      viewport={viewportPainPoints}
      variants={fadeUpScale}
      className="pain-points-header mx-auto mb-10 max-w-3xl text-center md:mb-12"
    >
      <h2 className="text-3xl font-bold text-primary dark:text-white md:text-4xl">
        {headlineLines.map((line, i) => (
          <span key={line} className="block overflow-hidden py-0.5">
            <motion.span
              className="block"
              initial={reduced ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
              animate={
                showHeadline ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }
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
        viewport={viewportPainPoints}
        transition={{ duration: 0.6, ease: EASE, delay: 0.28 }}
        className="mt-5 text-base leading-relaxed text-muted max-[480px]:text-[0.875rem] dark:text-white/65 md:mt-6 md:text-lg"
      >
        אני שומעת הרבה מבעלי עסקים את התסכול מאתר שלא עובד בשבילם,
        <br className="hidden sm:block" />{' '}
        הנה מה שאני שומעת שוב ושוב ואולי גם את/ה מזהה את עצמך כאן
      </motion.p>
    </motion.header>
  )
}

function PainPointsCta({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pain-points-cta-wrap text-center glass-card tech-corners ${className}`}
    >
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
  )
}

function PlayingCard({
  pain,
  index,
  reduced,
}: {
  pain: (typeof pains)[number]
  index: number
  reduced: boolean
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 32 }}
      animate={reduced || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.55, ease: EASE, delay: reduced ? 0 : 0.04 }}
      className="pain-point-card pain-point-card--playing pain-point-card--scroll group relative overflow-hidden"
    >
      <span className="pain-point-card-index pain-point-card-index--tl" aria-hidden>
        <span className="pain-point-card-index-letter font-en-display">H</span>
        <span className="pain-point-card-index-suit">♥</span>
      </span>
      <span className="pain-point-card-index pain-point-card-index--br" aria-hidden>
        <span className="pain-point-card-index-letter font-en-display">H</span>
        <span className="pain-point-card-index-suit">♥</span>
      </span>

      <span className="pain-points-scroll-num font-mono-tech" aria-hidden>
        {num}
      </span>

      <div className="pain-point-card-body pain-point-card-body--deck relative z-10">
        <h3 className="font-bold text-burgundy">{pain.title}</h3>
        <p className="text-primary dark:text-white/80">{pain.text}</p>
      </div>
    </motion.article>
  )
}

export function PainPoints() {
  const reduced = !!useReducedMotion()
  const headerRef = useRef<HTMLElement>(null)
  const headlineInView = useInView(headerRef, viewportPainPoints)
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
      className="pain-points-section section-pad relative overflow-x-clip bg-section-surface"
    >
      <SectionLuxuryBg variant="surface" />

      <div className="container-site relative z-10">
        <PainPointsHeader
          headerRef={headerRef}
          reduced={reduced}
          showHeadline={showHeadline}
        />

        <div className="pain-points-scroll relative mx-auto max-w-2xl">
          {pains.map((pain, i) => (
            <PlayingCard
              key={pain.title}
              pain={pain}
              index={i}
              reduced={reduced}
            />
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportPainPoints}
          variants={fadeUpScale}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-12 max-w-2xl md:mt-16"
        >
          <PainPointsCta />
        </motion.div>
      </div>
    </section>
  )
}
