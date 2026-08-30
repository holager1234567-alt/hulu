import { useRef } from 'react'
import { Check, X, ArrowLeft, Sparkles } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { HeroLuxuryBackdrop } from '@/components/layout/HeroLuxuryBackdrop'
import { LeadPopupTrigger } from '@/components/forms/LeadPopup'
import { Button } from '@/components/ui/button'
import { LEAD_FLOW_CTA_LABEL } from '@/lib/waveForms'
import { bindRevealTimeline, forceRevealVisible } from '@/lib/gsapReveal'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger, useGSAP)

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

function ComparePoint({
  children,
  variant,
  index,
}: {
  children: string
  variant: 'regular' | 'premium'
  index: number
}) {
  const isPremium = variant === 'premium'

  return (
    <li className="compare-point">
      <span className="compare-point-index font-mono-tech" aria-hidden>
        {String(index + 1).padStart(2, '0')}
      </span>
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
    </li>
  )
}

export function PainPoints() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const premiumCardRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const q = gsap.utils.selector(section)
      const pick = (selector: string) => {
        const nodes = q(selector)
        return nodes.length ? nodes : null
      }

      const header = headerRef.current
      const stage = stageRef.current
      const cta = ctaRef.current
      const ornaments = pick('.compare-header-ornament span')
      const headlineLines = pick('.compare-headline-inner')
      const accentLine = pick('.compare-headline-accent-line')
      const subheadline = pick('.compare-subheadline')
      const rule = pick('.compare-header-rule')
      const cards = pick('.compare-card-shell')
      const cardFrames = pick('.compare-card-frame')
      const badge = pick('.compare-card-badge')
      const glow = pick('.compare-card-glow')
      const corners = pick('.compare-card-corner')
      const vs = pick('.compare-vs')
      const regularPoints = pick('.compare-card--regular .compare-point')
      const premiumPoints = pick('.compare-card--premium .compare-point')
      const pointIndexes = pick('.compare-point-index')
      const icons = pick('.compare-point-icon')
      const sheen = pick('.compare-card-sheen')
      const toplines = pick('.compare-card-topline')
      const ctaGlow = pick('.compare-cta-glow')
      const ctaBtn = pick('.compare-cta-btn--lux')

      if (reduced) {
        forceRevealVisible(
          ornaments,
          headlineLines,
          accentLine,
          subheadline,
          rule,
          cards,
          cardFrames,
          badge,
          glow,
          corners,
          vs,
          regularPoints,
          premiumPoints,
          pointIndexes,
          icons,
          toplines,
          ctaGlow,
          ctaBtn,
        )
        return
      }

      const cleanups: Array<() => void> = []
      let cleanupTilt: (() => void) | undefined

      if (header) {
        if (ornaments) gsap.set(ornaments, { scaleX: 0, opacity: 0 })
        if (accentLine) gsap.set(accentLine, { scaleX: 0 })
        if (subheadline) gsap.set(subheadline, { opacity: 0, y: 22 })
        if (rule) gsap.set(rule, { scaleX: 0, opacity: 0 })

        const headerTl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: header,
            start: 'top 92%',
            once: true,
            invalidateOnRefresh: true,
          },
        })

        if (ornaments) {
          headerTl.to(ornaments, { scaleX: 1, opacity: 1, duration: 0.85, stagger: 0.08 }, 0)
        }
        if (headlineLines) {
          headerTl.from(
            headlineLines,
            { y: 24, opacity: 0, duration: 0.85, stagger: 0.1 },
            0.08,
          )
        }
        if (accentLine) {
          headerTl.to(accentLine, { scaleX: 1, duration: 0.9, ease: 'power2.inOut' }, '-=0.45')
        }
        if (subheadline) {
          headerTl.to(subheadline, { opacity: 1, y: 0, duration: 0.72 }, '-=0.5')
        }
        if (rule) {
          headerTl.to(rule, { scaleX: 1, opacity: 1, duration: 0.75 }, '-=0.55')
        }

        cleanups.push(bindRevealTimeline(headerTl, header))
      }

      if (stage) {
        if (cards) {
          gsap.set(cards, {
            opacity: 0,
            y: 56,
            rotateX: 10,
            transformPerspective: 1200,
            transformOrigin: '50% 100%',
          })
        }
        if (cardFrames) gsap.set(cardFrames, { opacity: 0.6 })
        if (toplines) gsap.set(toplines, { scaleX: 0 })
        if (badge) gsap.set(badge, { opacity: 0, y: -16, scale: 0.92 })
        if (glow) gsap.set(glow, { opacity: 0 })
        if (corners) gsap.set(corners, { opacity: 0, scale: 0.6 })
        if (vs) gsap.set(vs, { opacity: 0, scale: 0.4, rotate: -18 })
        if (regularPoints) gsap.set(regularPoints, { opacity: 0, x: -22 })
        if (premiumPoints) gsap.set(premiumPoints, { opacity: 0, x: 22 })
        if (pointIndexes) gsap.set(pointIndexes, { opacity: 0, y: 8 })
        if (icons) gsap.set(icons, { opacity: 0, scale: 0.3, rotate: -40 })
        if (sheen) gsap.set(sheen, { opacity: 0, xPercent: -200 })

        const stageTl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: stage,
            start: 'top 90%',
            once: true,
            invalidateOnRefresh: true,
          },
        })

        if (cards) {
          stageTl.to(cards, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.95,
            stagger: 0.16,
          })
        }
        if (cardFrames) {
          stageTl.to(cardFrames, { opacity: 1, duration: 0.7 }, '-=0.75')
        }
        if (toplines) {
          stageTl.to(toplines, { scaleX: 1, duration: 0.8, stagger: 0.12 }, '-=0.7')
        }
        if (badge) {
          stageTl.to(badge, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(2)' }, '-=0.55')
        }
        if (glow) {
          stageTl.to(glow, { opacity: 1, duration: 1 }, '-=0.6')
        }
        if (corners) {
          stageTl.to(corners, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.05 }, '-=0.85')
        }
        if (vs) {
          stageTl.to(
            vs,
            { opacity: 1, scale: 1, rotate: 0, duration: 0.75, ease: 'back.out(2.4)' },
            '-=0.65',
          )
        }
        if (regularPoints) {
          stageTl.to(
            regularPoints,
            { opacity: 1, x: 0, duration: 0.52, stagger: 0.07 },
            '-=0.42',
          )
        }
        if (premiumPoints) {
          stageTl.to(
            premiumPoints,
            { opacity: 1, x: 0, duration: 0.52, stagger: 0.07 },
            '<0.1',
          )
        }
        if (pointIndexes) {
          stageTl.to(pointIndexes, { opacity: 1, y: 0, duration: 0.45, stagger: 0.05 }, '<')
        }
        if (icons) {
          stageTl.to(
            icons,
            { opacity: 1, scale: 1, rotate: 0, duration: 0.48, ease: 'back.out(2.6)', stagger: 0.05 },
            '<-0.05',
          )
        }
        if (sheen) {
          stageTl
            .set(sheen, { opacity: 1 }, '-=0.35')
            .to(sheen, { xPercent: 340, duration: 1.2, ease: 'power2.inOut' }, '<')
            .set(sheen, { opacity: 0 })
        }

        cleanups.push(bindRevealTimeline(stageTl, stage))

        const premiumShell = premiumCardRef.current
        if (premiumShell && window.matchMedia('(min-width: 900px)').matches) {
          const tiltX = gsap.quickTo(premiumShell, 'rotateX', { duration: 0.45, ease: 'power2.out' })
          const tiltY = gsap.quickTo(premiumShell, 'rotateY', { duration: 0.45, ease: 'power2.out' })
          const liftY = gsap.quickTo(premiumShell, 'y', { duration: 0.45, ease: 'power2.out' })

          const onMove = (event: MouseEvent) => {
            const rect = premiumShell.getBoundingClientRect()
            const px = (event.clientX - rect.left) / rect.width - 0.5
            const py = (event.clientY - rect.top) / rect.height - 0.5
            tiltY(px * 7)
            tiltX(-py * 5)
            liftY(-4)
          }

          const onLeave = () => {
            tiltX(0)
            tiltY(0)
            liftY(0)
          }

          premiumShell.addEventListener('mousemove', onMove)
          premiumShell.addEventListener('mouseleave', onLeave)

          cleanupTilt = () => {
            premiumShell.removeEventListener('mousemove', onMove)
            premiumShell.removeEventListener('mouseleave', onLeave)
          }
        }
      }

      if (cta) {
        if (ctaGlow) gsap.set(ctaGlow, { opacity: 0, scale: 0.88 })
        if (ctaBtn) gsap.set(ctaBtn, { opacity: 0, y: 28, scale: 0.96 })

        const ctaTl = gsap.timeline({
          scrollTrigger: {
            trigger: cta,
            start: 'top 94%',
            once: true,
            invalidateOnRefresh: true,
          },
        })

        if (ctaGlow) {
          ctaTl.to(ctaGlow, { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' })
        }
        if (ctaBtn) {
          ctaTl.to(
            ctaBtn,
            { opacity: 1, y: 0, scale: 1, duration: 0.78, ease: 'power3.out' },
            '-=0.65',
          )
        }

        cleanups.push(bindRevealTimeline(ctaTl, cta))
      }

      return () => {
        cleanups.forEach((cleanup) => cleanup())
        cleanupTilt?.()
      }
    },
    { scope: sectionRef, dependencies: [reduced] },
  )

  return (
    <section
      ref={sectionRef}
      id="pains"
      className="compare-section compare-section--lux hero-luxury relative overflow-x-clip section-pad"
      aria-labelledby="compare-heading"
    >
      <HeroLuxuryBackdrop variant="continuation" />

      <div className="compare-ambient compare-ambient--left" aria-hidden />
      <div className="compare-ambient compare-ambient--right" aria-hidden />

      <div className="container-site relative z-10">
        <header ref={headerRef} className="compare-header">
          <div className="compare-header-ornament" aria-hidden>
            <span />
            <span />
          </div>

          <h2
            id="compare-heading"
            className="compare-headline"
            aria-label="להפוך לקוחה מתעניינת ללקוחה משלמת"
          >
            <span className="compare-headline-line">
              <span className="compare-headline-inner">להפוך לקוחה מתעניינת</span>
            </span>
            <span className="compare-headline-line">
              <span className="compare-headline-inner compare-headline-accent">ללקוחה משלמת</span>
            </span>
            <span className="compare-headline-accent-line" aria-hidden />
          </h2>

          <p className="compare-subheadline">
            ההבדל בין דף נחיתה סטנדרטי שלא מייצר תוצאות לבין דף נחיתה שמביא עבודה אמיתית
          </p>
          <hr className="compare-header-rule" aria-hidden />
        </header>

        <div ref={stageRef} className="compare-stage">
          <span className="compare-vs font-mono-tech" aria-hidden>
            VS
          </span>

          <div className="compare-grid">
            <article className="compare-card compare-card--regular">
              <div className="compare-card-frame" aria-hidden />
              <div className="compare-card-shell">
                <span className="compare-card-topline compare-card-topline--muted" aria-hidden />
                <div className="compare-card-head compare-card-head--centered">
                  <p className="compare-card-eyebrow font-mono-tech">BEFORE</p>
                  <h3 className="compare-card-title">דף נחיתה תבניתי סטנדרטי</h3>
                </div>
                <ul className="compare-point-list">
                  {REGULAR_POINTS.map((point, index) => (
                    <ComparePoint key={point} variant="regular" index={index}>
                      {point}
                    </ComparePoint>
                  ))}
                </ul>
              </div>
            </article>

            <article
              ref={premiumCardRef}
              className="compare-card compare-card--premium compare-card--head-centered"
            >
              <div className="compare-card-frame compare-card-frame--premium" aria-hidden />
              <div className="compare-card-shell">
                <span className="compare-card-glow" aria-hidden />
                <span className="compare-card-sheen" aria-hidden />
                <span className="compare-card-corner compare-card-corner--tl" aria-hidden />
                <span className="compare-card-corner compare-card-corner--br" aria-hidden />
                <span className="compare-card-topline compare-card-topline--accent" aria-hidden />
                <span className="compare-card-badge">
                  <Sparkles className="compare-card-badge-icon" aria-hidden />
                  הסטנדרט החדש שלך
                </span>
                <div className="compare-card-head compare-card-head--centered">
                  <p className="compare-card-eyebrow compare-card-eyebrow--premium font-mono-tech">
                    AFTER
                  </p>
                  <h3 className="compare-card-title compare-card-title--premium">
                    דף נחיתה פרימיום שנבנה ביחד
                  </h3>
                </div>
                <ul className="compare-point-list">
                  {PREMIUM_POINTS.map((point, index) => (
                    <ComparePoint key={point} variant="premium" index={index}>
                      {point}
                    </ComparePoint>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </div>

        <div ref={ctaRef} className="compare-cta-wrap compare-cta-wrap--mobile-fit">
          <span className="compare-cta-glow" aria-hidden />
          <Button
            asChild
            variant="burgundy"
            size="lg"
            className="group compare-cta-btn compare-cta-btn--lux btn-burgundy-glow h-auto min-h-14 w-full max-w-full rounded-full px-5 py-3 text-sm font-semibold whitespace-normal text-balance sm:h-14 sm:w-auto sm:px-9 sm:text-base sm:whitespace-nowrap md:px-10 md:text-lg"
          >
            <LeadPopupTrigger>
              <span>{LEAD_FLOW_CTA_LABEL}</span>
              <ArrowLeft
                className="size-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1"
                aria-hidden
              />
            </LeadPopupTrigger>
          </Button>
        </div>
      </div>
    </section>
  )
}
