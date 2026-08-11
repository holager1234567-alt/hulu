import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { HeroOrb } from '@/components/sections/HeroOrb'
import {
  EASE,
  headlineStagger,
  heroFirstRevealCta,
  heroFirstRevealFadeUp,
  heroFirstRevealLine,
  heroFirstRevealSimpleFade,
  heroFirstRevealStagger,
  lineRevealItem,
  lineRevealItemReduced,
} from '@/lib/motion'

import { LEAD_FLOW_ANCHOR, LEAD_FLOW_CTA_LABEL } from '@/lib/waveForms'

const HERO_HEADLINE_LINE_1 = 'העסק שלכם כבר מדבר.'
const HERO_HEADLINE_LINE_2 = 'הגיע הזמן שהאתר'
const HERO_HEADLINE_EMPHASIS = 'יספר את הסיפור שלו'
const HERO_SUBHEADLINE_LEAD = 'אתר דמו בחינם + שיחת אפיון אישית'
const HERO_SUBHEADLINE_DETAIL =
  'כדי להבין את העסק, הלקוחות והחזון שלכם לפני שמעצבים.'
const HERO_SECONDARY_CTA = 'לראות עבודות נבחרות'
const PORTFOLIO_ANCHOR = '#work'

type HeroProps = {
  isFirstReveal?: boolean
}

function fadeUpVariants(reduced: boolean | null) {
  return {
    hidden: { opacity: 0, y: 22 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        delay: (reduced ? 0 : 0.38) + i * 0.1,
        ease: EASE,
      },
    }),
  }
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
      : reduced
        ? lineRevealItemReduced
        : lineRevealItem
  const bodyVariants = useReveal ? heroFirstRevealFadeUp : fadeUpVariants(!!reduced)
  const ctaVariants = useReveal ? heroFirstRevealCta : fadeUpVariants(!!reduced)

  return (
    <section
      ref={sectionRef}
      id="top"
      className="hero-luxury relative overflow-x-clip pb-8 pt-24 md:pb-10 md:pt-28"
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
        className="container-site relative z-10 py-6 md:py-8 lg:py-10"
      >
        <div className="hero-luxury-grid-layout w-full">
          <motion.div
            className="hero-luxury-copy"
            initial="hidden"
            animate="visible"
            variants={headlineVariants}
          >
            <h1 className="hero-luxury-headline">
              <span className="block overflow-hidden py-0.5">
                <motion.span
                  variants={lineVariants}
                  className="hero-luxury-headline-bold block"
                >
                  {HERO_HEADLINE_LINE_1}
                </motion.span>
              </span>

              <span className="hero-luxury-headline-line--story block overflow-visible py-0.5">
                <motion.span
                  variants={lineVariants}
                  className="hero-luxury-headline-bold block"
                >
                  {HERO_HEADLINE_LINE_2}
                  <span className="hero-luxury-emphasis">
                    <span className="hero-luxury-emphasis-glow" aria-hidden />
                    <span className="hero-luxury-emphasis-text">
                      <span className="hero-luxury-emphasis-words-wrap">
                        <span className="hero-luxury-emphasis-words-glint" aria-hidden />
                        <span className="hero-luxury-emphasis-words-rail" aria-hidden />
                        <span
                          className="hero-luxury-emphasis-words-corner hero-luxury-emphasis-words-corner--start"
                          aria-hidden
                        />
                        <span
                          className="hero-luxury-emphasis-words-corner hero-luxury-emphasis-words-corner--end"
                          aria-hidden
                        />
                        <span className="hero-luxury-emphasis-words">{HERO_HEADLINE_EMPHASIS}</span>
                      </span>
                      <span className="hero-luxury-emphasis-dot" aria-hidden>
                        .
                      </span>
                    </span>
                    <span className="hero-luxury-emphasis-shadow" aria-hidden />
                  </span>
                </motion.span>
              </span>
            </h1>

            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={bodyVariants}
              className="hero-luxury-subheadline mt-5 max-w-xl space-y-1 md:mt-6 md:max-w-2xl"
            >
              <p>{HERO_SUBHEADLINE_LEAD}</p>
              <p>{HERO_SUBHEADLINE_DETAIL}</p>
            </motion.div>

            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={ctaVariants}
              className="hero-luxury-actions mt-7 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center md:mt-8"
            >
              <Button
                asChild
                variant="burgundy"
                size="lg"
                className="group btn-burgundy-glow hero-luxury-cta-primary luxury-interactive h-12 w-full rounded-full px-8 text-base font-semibold sm:w-auto md:h-[3.25rem] md:px-9 md:text-[1.05rem]"
              >
                <a href={LEAD_FLOW_ANCHOR}>
                  {LEAD_FLOW_CTA_LABEL}
                  <ArrowLeft
                    className="size-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1.5"
                    aria-hidden
                  />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="hero-luxury-cta-secondary luxury-interactive luxury-interactive--glass h-12 w-full rounded-full border-white/50 bg-white/25 px-7 text-base font-medium text-[#121212]/85 sm:w-auto md:h-[3.25rem]"
              >
                <a href={PORTFOLIO_ANCHOR}>{HERO_SECONDARY_CTA}</a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={
              useReveal
                ? { opacity: 0, x: reduced ? 0 : -40, scale: 0.92 }
                : { opacity: 0, y: 24 }
            }
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            transition={{
              duration: 1,
              delay: useReveal ? 0.34 : 0.2,
              ease: EASE,
            }}
            className="hero-luxury-visual"
          >
            <HeroOrb sectionRef={sectionRef} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
