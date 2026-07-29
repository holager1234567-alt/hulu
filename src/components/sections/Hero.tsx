import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'
import {
  Calendar,
  Gauge,
  Layout,
  Megaphone,
  Palette,
  Shield,
  Smartphone,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  EASE,
  headlineStagger,
  heroFirstRevealCarousel,
  heroFirstRevealCta,
  heroFirstRevealFadeUp,
  heroFirstRevealLine,
  heroFirstRevealSimpleFade,
  heroFirstRevealStagger,
  lineRevealItem,
  lineRevealItemReduced,
} from '@/lib/motion'

const carouselCards: { headline: string; color: string; icon: LucideIcon }[] = [
  { headline: 'עיצוב מותאם אישית', color: '#3d0e16', icon: Palette },
  { headline: 'חוויית משתמש (UI/UX)', color: '#7a1c2e', icon: Layout },
  { headline: 'ביצועים ומהירות', color: '#5c1522', icon: Gauge },
  { headline: 'התאמה מלאה למובייל', color: '#9a2a3e', icon: Smartphone },
  { headline: 'תדמית וסמכות', color: '#5c1522', icon: Shield },
  { headline: 'מותאם לקמפיינים ממומנים', color: '#7a1c2e', icon: Megaphone },
  { headline: '14 ימי עבודה והאתר מוכן', color: '#3d0e16', icon: Calendar },
]

const titleLines = [
  { text: 'עיצוב אתרים שהופך', emphasis: false },
  { text: 'למנוע הצמיחה של העסק שלך', emphasis: true },
] as const

const subtitleLines = [
  'בשילוב של אסתטיקה גבוהה וטכנולוגיה מתקדמת',
  'אתר שלא רק נראה יוקרתי,',
  'אלא עובד בשבילך ומביא לידים אמיתיים.',
] as const

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

function CardSet({ suffix, startIndex }: { suffix: string; startIndex: number }) {
  return (
    <div className="hero-carousel-set">
      {carouselCards.map((card, i) => {
        const Icon = card.icon
        const index = startIndex + i + 1
        return (
          <div
            key={`${suffix}-${i}`}
            className="hero-carousel-card glass-card-burgundy"
            style={{ backgroundColor: card.color }}
          >
            <div className="hero-carousel-card-inner">
              <span className="hero-carousel-index font-mono-tech" aria-hidden>
                {String(index).padStart(2, '0')}
              </span>
              <Icon
                className="hero-carousel-icon"
                strokeWidth={1.5}
                aria-hidden
              />
              <p className="hero-carousel-headline">{card.headline}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function Hero({ isFirstReveal = false }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()
  const useReveal = isFirstReveal && !reduced
  const useSimpleFade = isFirstReveal && !!reduced

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 80])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, reduced ? 1 : 0.3])
  const gridY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 50])
  const fadeUp = fadeUpVariants(!!reduced)

  const headlineVariants = useReveal
    ? heroFirstRevealStagger
    : headlineStagger
  const lineVariants = useSimpleFade
    ? heroFirstRevealSimpleFade
    : useReveal
      ? heroFirstRevealLine
      : reduced
        ? lineRevealItemReduced
        : lineRevealItem
  const bodyVariants = useReveal ? heroFirstRevealFadeUp : fadeUp
  const ctaVariants = useReveal ? heroFirstRevealCta : fadeUp
  const carouselVariants = useReveal
    ? heroFirstRevealCarousel
    : {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, delay: reduced ? 0 : 0.75, ease: EASE },
        },
      }

  return (
    <section
      ref={sectionRef}
      id="top"
      className="hero-gradient relative flex min-h-svh flex-col overflow-x-hidden pt-28 md:pt-32"
    >
      {useReveal ? (
        <motion.div
          className="pointer-events-none absolute inset-0 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 0.85, times: [0, 0.18, 1], ease: 'easeOut' }}
          style={{
            background:
              'radial-gradient(ellipse 80% 70% at 50% 38%, rgb(122 28 46 / 0.28), transparent 68%)',
          }}
          aria-hidden
        />
      ) : null}

      <motion.div
        style={{ y: gridY }}
        className="tech-grid-bg"
        initial={useReveal ? { opacity: 0, scale: 1.06 } : false}
        animate={useReveal ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 1.15, delay: 0.08, ease: EASE }}
        aria-hidden
      />
      <div className="hero-shapes" aria-hidden>
        <span className="hero-shape hero-shape-ring" />
        <span className="hero-shape hero-shape-line" />
        <span className="hero-shape hero-shape-dot" />
        <span className="hero-shape hero-shape-ring-sm" />
      </div>
      <div className="grain-overlay" aria-hidden />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        initial={
          useReveal
            ? {
                opacity: 0,
                scale: 0.95,
                filter: isMobile ? 'none' : 'blur(10px)',
              }
            : false
        }
        animate={
          useReveal
            ? { opacity: 1, scale: 1, filter: 'none' }
            : undefined
        }
        transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center px-6 pb-2 text-center"
      >
        <motion.div
          className="hero-headline-glow"
          initial={useReveal ? { opacity: 0, scale: 0.88 } : false}
          animate={useReveal ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 1, delay: 0.18, ease: EASE }}
          aria-hidden
        />

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={headlineVariants}
          className="font-display text-4xl leading-[1.15] font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {titleLines.map((line) => (
            <span
              key={line.text}
              className="block overflow-hidden py-0.5"
            >
              <motion.span
                variants={lineVariants}
                className={
                  line.emphasis
                    ? 'hero-headline-emphasis mt-1 block text-5xl sm:text-6xl md:text-7xl lg:text-8xl'
                    : 'block text-primary'
                }
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.hr
          custom={2}
          initial="hidden"
          animate="visible"
          variants={bodyVariants}
          className="tech-divider hero-headline-divider"
        />

        <div className="mt-6 max-w-xl font-sans text-base font-normal leading-relaxed text-muted md:text-lg dark:text-white/65">
          {subtitleLines.map((line, i) => (
            <motion.span
              key={line}
              custom={i + 3}
              initial="hidden"
              animate="visible"
              variants={bodyVariants}
              className="block"
            >
              {line}
            </motion.span>
          ))}
        </div>

        <motion.div
          custom={6}
          initial="hidden"
          animate="visible"
          variants={ctaVariants}
          className="mt-8 flex flex-col items-center gap-2.5"
        >
          <Button
            asChild
            variant="burgundy"
            size="lg"
            className="cta-ring-hover h-12 rounded-full px-8 text-base shadow-soft"
          >
            <a href="#contact">השאירו פרטים</a>
          </Button>
          <span className="hero-cta-micro font-mono-tech text-muted dark:text-white/45">
            תגובה תוך 24 שעות
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={carouselVariants}
        className="relative z-10 mt-auto w-full pb-6 pt-8 md:pb-8"
      >
        <div className="hero-carousel">
          <div className="hero-carousel-track">
            <CardSet suffix="a" startIndex={0} />
            <CardSet suffix="b" startIndex={carouselCards.length} />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
