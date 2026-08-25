import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { lazy, Suspense, useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
  EASE,
  headlineStagger,
  heroFirstRevealCta,
  heroFirstRevealFadeUp,
  heroFirstRevealLine,
  heroFirstRevealSimpleFade,
  heroFirstRevealStagger,
  lineRevealItemReduced,
} from '@/lib/motion'
import { LEAD_FLOW_CTA_LABEL } from '@/lib/waveForms'

import { LeadPopupTrigger } from '@/components/forms/LeadPopup'

const HeroCoverflow = lazy(() =>
  import('@/components/sections/HeroCoverflow').then((module) => ({
    default: module.HeroCoverflow,
  })),
)

const instantVisible = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
}

const HERO_HEADLINE_LEAD = 'להפוך את העסק שלך'
const HERO_HEADLINE_ACCENT = 'למותג שלא מתעלמים ממנו.'
const HERO_SUBHEADLINE =
  'עיצוב ובניית נכסים דיגיטליים ודפי נחיתה שחוסכים לך זמן יקר וממירים מתעניינות ללקוחות משלמות.'
const HERO_SECONDARY_CTA = 'איך זה עובד?'
const PORTFOLIO_ANCHOR = '#work'

type HeroProps = {
  isFirstReveal?: boolean
}

export function Hero({ isFirstReveal = false }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const useReveal = isFirstReveal && !reduced
  const useSimpleFade = isFirstReveal && !!reduced

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 36])
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.7],
    [1, reduced ? 1 : 0.45],
  )

  const headlineVariants = useReveal ? heroFirstRevealStagger : headlineStagger
  const lineVariants = useSimpleFade
    ? heroFirstRevealSimpleFade
    : useReveal
      ? heroFirstRevealLine
      : lineRevealItemReduced
  const bodyVariants = useReveal ? heroFirstRevealFadeUp : instantVisible
  const ctaVariants = useReveal ? heroFirstRevealCta : instantVisible

  return (
    <section
      ref={sectionRef}
      id="top"
      className="hero-luxury relative overflow-x-clip pb-8 pt-[4.5rem] md:pb-10 md:pt-32"
    >
      {useReveal ? (
        <motion.div
          className="pointer-events-none absolute inset-0 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.28, 0] }}
          transition={{ duration: 0.85, times: [0, 0.18, 1], ease: 'easeOut' }}
          style={{
            background:
              'radial-gradient(ellipse 68% 52% at 78% 40%, rgb(90 14 35 / 0.12), transparent 68%)',
          }}
          aria-hidden
        />
      ) : null}

      <div className="hero-luxury-bg" aria-hidden />
      <div className="hero-luxury-mesh" aria-hidden />
      <div className="hero-luxury-perspective-grid" aria-hidden>
        <div className="hero-luxury-perspective-grid-inner" />
      </div>
      <div className="hero-luxury-horizon" aria-hidden />
      <div className="hero-luxury-texture" aria-hidden />
      <div className="hero-luxury-ambient hero-luxury-ambient--primary" aria-hidden />
      <div className="hero-luxury-ambient hero-luxury-ambient--secondary" aria-hidden />
      <div className="hero-luxury-ambient hero-luxury-ambient--accent" aria-hidden />
      <div className="hero-luxury-spotlight" aria-hidden />
      <div className="hero-luxury-nodes" aria-hidden>
        <span className="hero-luxury-node hero-luxury-node--1" />
        <span className="hero-luxury-node hero-luxury-node--2" />
        <span className="hero-luxury-node hero-luxury-node--3" />
        <span className="hero-luxury-node hero-luxury-node--4" />
      </div>
      <div className="tech-grid-bg hero-luxury-grid" aria-hidden />
      <div className="hero-luxury-scanlines" aria-hidden />
      <div className="hero-luxury-vignette" aria-hidden />
      <div className="grain-overlay hero-luxury-grain" aria-hidden />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity, willChange: 'transform' }}
        initial={
          useReveal
            ? { opacity: 0, scale: 0.97, filter: reduced ? 'none' : 'blur(8px)' }
            : false
        }
        animate={useReveal ? { opacity: 1, scale: 1, filter: 'none' } : undefined}
        transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
        className="container-site relative z-10 py-1 md:py-8 lg:py-10"
      >
        <div className="hero-luxury-grid-layout w-full">
          <motion.div
            className="hero-luxury-copy hero-luxury-text"
            initial={useReveal ? 'hidden' : false}
            animate="visible"
            variants={headlineVariants}
          >
            <h1 className="hero-luxury-headline">
              <motion.span
                variants={lineVariants}
                className="hero-luxury-headline-primary"
              >
                <span className="hero-headline-lead">{HERO_HEADLINE_LEAD}</span>
                <span className="hero-headline-accent">{HERO_HEADLINE_ACCENT}</span>
              </motion.span>
            </h1>

            <motion.p
              custom={0}
              initial={useReveal ? 'hidden' : false}
              animate="visible"
              variants={bodyVariants}
              className="hero-luxury-subheadline-detail"
            >
              {HERO_SUBHEADLINE}
            </motion.p>

            <motion.div
              custom={0}
              initial={useReveal ? 'hidden' : false}
              animate="visible"
              variants={ctaVariants}
              className="hero-luxury-desktop-cta mx-auto mt-7 hidden max-w-xl md:mt-8 md:block md:max-w-2xl"
            >
              <Button
                asChild
                variant="burgundy"
                size="lg"
                className="group btn-burgundy-glow hero-desktop-cta-btn luxury-interactive h-12 rounded-full px-7 text-sm font-semibold md:h-14 md:px-9 md:text-base"
              >
                <LeadPopupTrigger>
                  {LEAD_FLOW_CTA_LABEL}
                  <ArrowLeft
                    className="size-3.5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1 md:size-4"
                    aria-hidden
                  />
                </LeadPopupTrigger>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={useReveal ? { opacity: 0, y: reduced ? 0 : 20, scale: 0.96 } : false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: useReveal ? 1 : 0.45,
              delay: useReveal ? 0.34 : 0,
              ease: EASE,
            }}
            className="hero-luxury-visual"
          >
            <Suspense fallback={<div className="hero-coverflow hero-coverflow--placeholder" aria-hidden />}>
              <HeroCoverflow />
            </Suspense>
          </motion.div>

          <motion.div
            custom={1}
            initial={useReveal ? 'hidden' : false}
            animate="visible"
            variants={ctaVariants}
            className="hero-luxury-actions mt-2 flex w-full flex-col items-center justify-center gap-2.5 sm:flex-row md:mt-0 md:hidden"
          >
            <Button
              asChild
              variant="burgundy"
              size="lg"
              className="group btn-burgundy-glow hero-luxury-cta hero-luxury-cta-primary luxury-interactive h-11 rounded-full px-5 text-sm font-semibold md:h-12 md:px-7 md:text-base"
            >
              <LeadPopupTrigger>
                {LEAD_FLOW_CTA_LABEL}
                <ArrowLeft
                  className="size-3.5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1 md:size-4"
                  aria-hidden
                />
              </LeadPopupTrigger>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="hero-luxury-cta hero-luxury-cta-secondary luxury-interactive luxury-interactive--glass h-11 rounded-full px-5 text-sm font-medium md:h-12 md:px-6 md:text-base"
            >
              <a href={PORTFOLIO_ANCHOR}>{HERO_SECONDARY_CTA}</a>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
