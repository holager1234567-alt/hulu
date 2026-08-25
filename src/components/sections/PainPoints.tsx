import { useRef } from 'react'
import { Check, X, ArrowLeft } from 'lucide-react'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { HeroLuxuryBackdrop } from '@/components/layout/HeroLuxuryBackdrop'
import { LeadPopupTrigger } from '@/components/forms/LeadPopup'
import { Button } from '@/components/ui/button'
import { EASE, viewportOnce } from '@/lib/motion'
import { LEAD_FLOW_CTA_LABEL } from '@/lib/waveForms'
import { cn } from '@/lib/utils'

const REGULAR_POINTS = [
  'עיצוב גנרי שנראה בדיוק כמו כל המתחרות שלך',
  'עומס טקסטים שמבלבל את הגולשת וגורם לה לנטוש',
  'חוסר מיקוד שמקשה להבין מה את באמת מציעה',
  'אין מסלול ברור שמוביל את הגולשת ליצירת קשר',
] as const

const PREMIUM_POINTS = [
  'נראות יוקרתית שמבססת סמכות ומצדיקה מחירים גבוהים',
  'מסר מדויק שנוגע ישירות בצורך של קהל היעד',
  'חוויית משתמש חלקה שמניעה לפעולה בביטחון',
  'מנגנון לקביעת פגישות ואיסוף לידים מסביב לשעון',
] as const

function CompareMockup({ variant }: { variant: 'regular' | 'premium' }) {
  const isPremium = variant === 'premium'

  return (
    <div
      className={cn('compare-mockup', isPremium && 'compare-mockup--premium')}
      aria-hidden
    >
      <div className="compare-mockup-chrome">
        <span className="compare-mockup-dot compare-mockup-dot--close" />
        <span className="compare-mockup-dot compare-mockup-dot--min" />
        <span className="compare-mockup-dot compare-mockup-dot--max" />
        <span className="compare-mockup-url">
          {isPremium ? 'yourbrand.studio' : 'template-site.com'}
        </span>
      </div>
      <div className="compare-mockup-screen">
        <span className={cn('compare-mockup-hero', isPremium && 'compare-mockup-hero--premium')} />
        <div className="compare-mockup-rows">
          <span className="compare-mockup-row compare-mockup-row--wide" />
          <span className="compare-mockup-row" />
          <span className="compare-mockup-row compare-mockup-row--short" />
        </div>
        <span
          className={cn('compare-mockup-cta', isPremium && 'compare-mockup-cta--premium')}
        />
        {isPremium ? <span className="compare-mockup-shine" /> : null}
      </div>
    </div>
  )
}

function ComparePoint({
  children,
  index,
  variant,
  reduced,
}: {
  children: string
  index: number
  variant: 'regular' | 'premium'
  reduced: boolean | null
}) {
  const isPremium = variant === 'premium'
  return (
    <motion.li
      className="compare-point"
      initial={reduced ? false : { opacity: 0, x: isPremium ? 14 : -14 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: EASE, delay: reduced ? 0 : index * 0.07 }}
    >
      <span
        className={cn(
          'compare-point-icon',
          isPremium ? 'compare-point-icon--check' : 'compare-point-icon--cross',
        )}
        aria-hidden
      >
        {isPremium ? (
          <Check className="size-3.5" strokeWidth={2.25} />
        ) : (
          <X className="size-3.5" strokeWidth={2} />
        )}
      </span>
      <span className="compare-point-text">{children}</span>
    </motion.li>
  )
}

export function PainPoints() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const stageInView = useInView(stageRef, { once: true, amount: 0.25 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const ambientY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [24, -24])
  const premiumLift = useTransform(
    scrollYProgress,
    [0.15, 0.45],
    reduced ? [0, 0] : [8, 0],
  )

  return (
    <section
      ref={sectionRef}
      id="pains"
      className="compare-section compare-section--lux hero-luxury relative overflow-x-clip section-pad"
      aria-labelledby="compare-heading"
    >
      <HeroLuxuryBackdrop variant="continuation" />

      <motion.div
        className="compare-ambient compare-ambient--left"
        style={{ y: ambientY }}
        aria-hidden
      />
      <motion.div
        className="compare-ambient compare-ambient--right"
        style={{ y: ambientY }}
        aria-hidden
      />

      <div className="container-site relative z-10">
        <motion.header
          className="compare-header"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <h2 id="compare-heading" className="compare-headline">
            <span className="compare-headline-line">להפוך לקוחה מתעניינת</span>
            <span className="compare-headline-line compare-headline-accent">ללקוחה משלמת</span>
          </h2>
          <p className="compare-subheadline">
            ההבדל בין אתר סטנדרטי שלא מייצר תוצאות לבין אתר שמביא עבודה אמיתית
          </p>
          <hr className="compare-header-rule" aria-hidden />
        </motion.header>

        <div ref={stageRef} className="compare-stage">
          <motion.span
            className="compare-vs font-mono-tech"
            initial={reduced ? false : { opacity: 0, scale: 0.85 }}
            animate={stageInView ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.55, ease: EASE, delay: reduced ? 0 : 0.2 }}
            aria-hidden
          >
            VS
          </motion.span>

          <div className="compare-grid">
            <motion.article
              className="compare-card compare-card--regular"
              initial={reduced ? false : { opacity: 0, y: 36, rotate: -0.6 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.75, ease: EASE, delay: reduced ? 0 : 0.05 }}
            >
              <CompareMockup variant="regular" />
              <div className="compare-card-head compare-card-head--centered">
                <p className="compare-card-eyebrow font-mono-tech">BEFORE</p>
                <h3 className="compare-card-title">אתר תבניתי סטנדרטי</h3>
              </div>
              <ul className="compare-point-list">
                {REGULAR_POINTS.map((point, index) => (
                  <ComparePoint key={point} index={index} variant="regular" reduced={reduced}>
                    {point}
                  </ComparePoint>
                ))}
              </ul>
            </motion.article>

            <motion.article
              className="compare-card compare-card--premium compare-card--head-centered"
              style={{ y: premiumLift }}
              initial={reduced ? false : { opacity: 0, y: 36, rotate: 0.6 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.75, ease: EASE, delay: reduced ? 0 : 0.14 }}
            >
              <span className="compare-card-glow" aria-hidden />
              <span className="compare-card-badge">הסטנדרט החדש שלך</span>
              <CompareMockup variant="premium" />
              <div className="compare-card-head compare-card-head--centered">
                <p className="compare-card-eyebrow compare-card-eyebrow--premium font-mono-tech">
                  AFTER
                </p>
                <h3 className="compare-card-title compare-card-title--premium">
                  אתר פרימיום שנבנה ביחד
                </h3>
              </div>
              <ul className="compare-point-list">
                {PREMIUM_POINTS.map((point, index) => (
                  <ComparePoint key={point} index={index} variant="premium" reduced={reduced}>
                    {point}
                  </ComparePoint>
                ))}
              </ul>
            </motion.article>
          </div>
        </div>

        <motion.div
          className="compare-cta-wrap"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, ease: EASE, delay: reduced ? 0 : 0.22 }}
        >
          <Button
            asChild
            variant="burgundy"
            size="lg"
            className="group btn-burgundy-glow compare-cta-btn h-14 rounded-full px-9 text-base font-semibold md:px-10 md:text-lg"
          >
            <LeadPopupTrigger>
              <span>{LEAD_FLOW_CTA_LABEL}</span>
              <ArrowLeft
                className="size-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1"
                aria-hidden
              />
            </LeadPopupTrigger>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
