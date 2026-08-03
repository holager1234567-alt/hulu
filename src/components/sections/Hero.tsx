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

const headlineLight = 'אני לא מעצבת עוד אתר.'
const subheadline =
  'שילוב של עיצוב UI/UX מתקדם, קופירייטינג מדויק, אלמנטים תלת-ממדיים ואופטימיזציה להמרות, כדי להוציא את המותג שלך מהתבנית ולהפוך גולשים ללקוחות.'

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
      <div className="tech-grid-bg hero-luxury-grid" aria-hidden />
      <div className="grain-overlay" aria-hidden />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
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
                  className="hero-luxury-headline-light block"
                >
                  {headlineLight}
                </motion.span>
              </span>

              <span className="block overflow-hidden py-0.5">
                <motion.span
                  variants={lineVariants}
                  className="hero-luxury-headline-bold block"
                >
                  אני בונה{' '}
                  <span className="hero-luxury-emphasis">
                    <span className="hero-luxury-emphasis-glow" aria-hidden />
                    <span className="hero-luxury-emphasis-text">מנוע צמיחה</span>
                    <span className="hero-luxury-emphasis-line" aria-hidden />
                  </span>
                  <br />
                  לעסק שלך.
                </motion.span>
              </span>
            </h1>

            <motion.p
              custom={0}
              initial="hidden"
              animate="visible"
              variants={bodyVariants}
              className="hero-luxury-subheadline mt-4 max-w-lg md:mt-5"
            >
              {subheadline}
            </motion.p>

            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={ctaVariants}
              className="hero-luxury-actions mt-6 flex flex-wrap items-center gap-3 md:mt-7"
            >
              <Button
                asChild
                variant="burgundy"
                size="lg"
                className="group hero-luxury-cta-primary h-12 rounded-full px-7 text-base shadow-soft hover:scale-[1.03]"
              >
                <a href="#contact">
                  להתחלת השאלון המהיר
                  <ArrowLeft
                    className="size-4 shrink-0 transition-transform duration-300 ease-out group-hover:-translate-x-1.5"
                    aria-hidden
                  />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="hero-luxury-cta-secondary h-12 rounded-full px-7 text-base"
              >
                <a href="#work">צפייה בעבודות</a>
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
