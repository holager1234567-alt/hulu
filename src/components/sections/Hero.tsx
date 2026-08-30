import { Fragment, lazy, Suspense, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/useIsMobile'
import { EASE } from '@/lib/motion'
import { HERO_CTA_LABEL } from '@/lib/waveForms'

import { LeadPopupTrigger } from '@/components/forms/LeadPopup'

const HeroCoverflow = lazy(() =>
  import('@/components/sections/HeroCoverflow').then((module) => ({
    default: module.HeroCoverflow,
  })),
)

gsap.registerPlugin(ScrollTrigger, useGSAP)

const HERO_HEADLINE_LEAD = 'להפוך את העסק שלך'
const HERO_HEADLINE_ACCENT = 'למותג שלא מתעלמים ממנו.'
const HERO_SUBHEADLINE =
  'עיצוב ובניית אתרים ודפי נחיתה שחוסכים לך זמן יקר וממירים מתעניינות ללקוחות משלמות.'

type HeroProps = {
  isFirstReveal?: boolean
}

/** Splits text into per-word, per-character spans so GSAP can stagger them. */
function SplitChars({ text }: { text: string }) {
  const words = text.split(' ')

  return (
    <>
      {words.map((word, wordIndex) => (
        <Fragment key={`${word}-${wordIndex}`}>
          <span className="hero-split-word">
            {Array.from(word).map((char, charIndex) => (
              <span key={`${char}-${charIndex}`} className="hero-split-char">
                {char}
              </span>
            ))}
          </span>
          {wordIndex < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  )
}

export function Hero({ isFirstReveal = false }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const enterRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()
  const useReveal = isFirstReveal && !reduced

  useGSAP(
    () => {
      if (reduced || isMobile) return

      const section = sectionRef.current
      const content = contentRef.current
      if (!section || !content) return

      gsap.fromTo(
        content,
        { opacity: 1, scale: 1, y: 0 },
        {
          opacity: 0,
          scale: 0.94,
          y: 70,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom 30%',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        },
      )
    },
    { dependencies: [reduced, isMobile] },
  )

  useGSAP(
    () => {
      const root = enterRef.current
      if (!root) return

      const headline = root.querySelector('.hero-enter-headline')
      const chars = Array.from(root.querySelectorAll('.hero-split-char'))
      const subheadline = root.querySelector('.hero-enter-subheadline')
      const ctas = Array.from(root.querySelectorAll('.hero-enter-cta'))

      const blocks = [headline, subheadline, ...ctas].filter(
        (node): node is Element => node !== null,
      )
      if (!blocks.length) return

      // Anything we cannot animate must still end up visible, never stuck at opacity 0.
      if (reduced || !chars.length) {
        gsap.set(blocks, { opacity: 1, y: 0, willChange: 'auto' })
        gsap.set(chars, { opacity: 1, yPercent: 0 })
        return
      }

      gsap.set(chars, { opacity: 0, yPercent: 100 })
      gsap.set(blocks, { opacity: 0, y: 22 })
      if (headline) gsap.set(headline, { opacity: 1, y: 0 })

      const timeline = gsap.timeline({
        defaults: { ease: 'power2.out' },
        // Drop the compositor layers once the intro is done.
        onComplete: () => gsap.set(blocks, { willChange: 'auto' }),
      })

      timeline.to(chars, {
        opacity: 1,
        yPercent: 0,
        duration: 0.6,
        stagger: 0.03,
      })

      if (subheadline) {
        timeline.to(subheadline, { opacity: 1, y: 0, duration: 0.65 }, '-=0.3')
      }

      if (ctas.length) {
        timeline.to(
          ctas,
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.12 },
          '-=0.18',
        )
      }
    },
    { scope: enterRef, dependencies: [reduced] },
  )

  return (
    <section
      ref={sectionRef}
      id="top"
      className="hero-luxury relative overflow-x-clip pb-8 pt-[6.5rem] md:pb-10 md:pt-40"
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
        ref={contentRef}
        style={{ willChange: 'transform, opacity' }}
        initial={
          useReveal
            ? { opacity: 0, scale: 0.97, filter: reduced ? 'none' : 'blur(8px)' }
            : false
        }
        animate={useReveal ? { opacity: 1, scale: 1, filter: 'none' } : undefined}
        transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
        className="container-site relative z-10 py-1 md:py-8 lg:py-10"
      >
        <div ref={enterRef} className="hero-luxury-grid-layout w-full">
          <div className="hero-luxury-copy hero-luxury-text">
            <h1
              className="hero-luxury-headline"
              aria-label={`${HERO_HEADLINE_LEAD} ${HERO_HEADLINE_ACCENT}`}
            >
              <span className="hero-luxury-headline-primary hero-enter-headline">
                <span className="hero-headline-lead">
                  <SplitChars text={HERO_HEADLINE_LEAD} />
                </span>
                <span className="hero-headline-accent">
                  <SplitChars text={HERO_HEADLINE_ACCENT} />
                </span>
              </span>
            </h1>

            <p className="hero-luxury-subheadline-detail hero-enter-subheadline">
              {HERO_SUBHEADLINE}
            </p>

            <div className="hero-luxury-desktop-cta hero-enter-cta mx-auto mt-7 hidden max-w-xl md:mt-10 md:mb-4 md:block md:max-w-none">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group hero-cta-btn hero-desktop-cta-btn luxury-interactive h-12 rounded-full px-7 text-xs font-semibold whitespace-nowrap md:h-14 md:px-9 md:text-sm"
              >
                <LeadPopupTrigger>
                  {HERO_CTA_LABEL}
                  <ArrowLeft
                    className="size-3.5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1 md:size-4"
                    aria-hidden
                  />
                </LeadPopupTrigger>
              </Button>
            </div>
          </div>

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

          <div className="hero-luxury-actions hero-enter-cta mt-6 flex w-full flex-col items-center justify-center gap-2.5 sm:flex-row md:mt-0 md:hidden">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group hero-cta-btn hero-luxury-cta hero-luxury-cta-primary luxury-interactive h-11 rounded-full px-5 text-[0.72rem] font-semibold whitespace-nowrap sm:text-xs md:h-12 md:px-7 md:text-sm"
            >
              <LeadPopupTrigger>
                {HERO_CTA_LABEL}
                <ArrowLeft
                  className="size-3.5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1 md:size-4"
                  aria-hidden
                />
              </LeadPopupTrigger>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
