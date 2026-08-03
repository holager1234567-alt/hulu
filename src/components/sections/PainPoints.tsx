import { useEffect, useLayoutEffect, useRef, useState, forwardRef, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from 'framer-motion'
import { Button } from '@/components/ui/button'
import { SectionLuxuryBg } from '@/components/layout/SectionLuxuryBg'
import { EASE, fadeUpScale, viewportOnce, viewportOnceTight } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

const MOBILE_DECK_MQ = '(max-width: 767px)'

function isMobileDeckViewport() {
  return window.matchMedia(MOBILE_DECK_MQ).matches
}

function isIOSDevice() {
  if (typeof navigator === 'undefined') return false
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  )
}

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

const DECK_SCROLL_VH = 0.52
const DECK_CTA_SCROLL_VH = 0.65

type PainPointsHeaderProps = {
  headerRef: RefObject<HTMLElement | null>
  reduced: boolean
  showHeadline: boolean
  deckPinned?: boolean
}

function PainPointsHeader({
  headerRef,
  reduced,
  showHeadline,
  deckPinned = false,
}: PainPointsHeaderProps) {
  return (
    <motion.header
      ref={headerRef}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUpScale}
      className={`mx-auto max-w-3xl text-center ${
        deckPinned ? 'pain-points-deck-header' : 'mb-10 md:mb-12'
      }`}
    >
      <h2
        className={`font-bold text-primary dark:text-white ${
          deckPinned
            ? 'text-[1.35rem] leading-snug sm:text-2xl md:text-3xl'
            : 'text-3xl md:text-4xl'
        }`}
      >
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

      <hr
        className={`tech-divider mx-auto max-w-xs md:max-w-sm ${
          deckPinned ? 'mt-4 md:mt-5' : 'mt-6 md:mt-8'
        }`}
      />

      <motion.p
        initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, ease: EASE, delay: 0.28 }}
        className={`leading-relaxed text-muted dark:text-white/65 ${
          deckPinned
            ? 'mt-3 text-sm max-[480px]:text-[0.8125rem] md:mt-4 md:text-base'
            : 'mt-5 text-base max-[480px]:text-[0.875rem] md:mt-6 md:text-lg'
        }`}
      >
        אני שומעת הרבה מבעלי עסקים את התסכול מאתר שלא עובד בשבילם,
        <br className="hidden sm:block" />{' '}
        הנה מה שאני שומעת שוב ושוב ואולי גם את/ה מזהה את עצמך כאן
      </motion.p>
    </motion.header>
  )
}

function PainPointsCta({
  className = '',
  reveal = false,
}: {
  className?: string
  reveal?: boolean
}) {
  return (
    <div
      className={`pain-points-cta-wrap text-center glass-card tech-corners ${
        reveal ? 'pain-points-cta-wrap--reveal' : ''
      } ${className}`}
    >
      {!reveal ? <hr className="tech-divider mb-6" aria-hidden /> : null}

      <p
        data-cta-part="lead"
        className={`leading-relaxed ${
          reveal
            ? 'pain-points-cta-wrap--reveal-lead text-lg text-primary dark:text-white/85'
            : 'text-lg text-primary dark:text-white/85'
        }`}
      >
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
      <p
        data-cta-part="sub"
        className={
          reveal
            ? 'pain-points-cta-wrap--reveal-sub mt-4 text-muted dark:text-white/60'
            : 'mt-4 text-muted dark:text-white/60'
        }
      >
        בוא נדבר. בלי לחץ, בלי מכירה אגרסיבית. רק שיחה כנה על מה שאתה
        צריך.
      </p>

      <Button
        asChild
        variant="burgundy"
        size="lg"
        className="btn-burgundy-glow mt-8 h-12 rounded-full px-8 shadow-soft"
      >
        <a href="#contact" data-cta-part="btn">
          רוצה לשנות את המצב? בוא נדבר
        </a>
      </Button>
    </div>
  )
}

type DeckPainCardProps = {
  pain: (typeof pains)[number]
  index: number
}

function DeckPainCard({ pain, index }: DeckPainCardProps) {
  return (
    <article
      data-deck-card
      data-stack-index={index}
      className="pain-point-card pain-point-card--playing pain-point-card--deck pain-point-card--active group relative overflow-hidden"
    >
      <span className="pain-point-card-index pain-point-card-index--tl" aria-hidden>
        <span className="pain-point-card-index-letter font-en-display">H</span>
        <span className="pain-point-card-index-suit">♥</span>
      </span>
      <span className="pain-point-card-index pain-point-card-index--br" aria-hidden>
        <span className="pain-point-card-index-letter font-en-display">H</span>
        <span className="pain-point-card-index-suit">♥</span>
      </span>

      <div className="pain-point-card-body pain-point-card-body--deck relative z-10">
        <h3 className="font-bold text-burgundy">
          {pain.title}
        </h3>
        <p className="text-primary dark:text-white/80">
          {pain.text}
        </p>
      </div>
    </article>
  )
}

function DeckDisplayNumber({
  displayNumRef,
}: {
  displayNumRef: RefObject<HTMLSpanElement | null>
}) {
  return (
    <div
      className="pain-points-deck-display"
      aria-live="polite"
      aria-label="קלף 1"
    >
      <span
        ref={displayNumRef}
        className="pain-points-deck-display-num font-mono-tech"
        aria-hidden
      >
        01
      </span>
    </div>
  )
}

type PainPointCardProps = {
  pain: (typeof pains)[number]
  index: number
  reduced: boolean
}

const PainPointCard = forwardRef<HTMLElement, PainPointCardProps>(
  function PainPointCard({ pain, index, reduced }, forwardedRef) {
    const localRef = useRef<HTMLElement>(null)
    const [flash, setFlash] = useState(false)
    const num = String(index + 1).padStart(2, '0')
    const fromStart = index % 2 === 0

    const setRef = (node: HTMLElement | null) => {
      localRef.current = node
      if (typeof forwardedRef === 'function') forwardedRef(node)
      else if (forwardedRef) forwardedRef.current = node
    }

    const isActive = useInView(localRef, {
      amount: 0.55,
      margin: '-28% 0px -28% 0px',
    })

    const hasEntered = useInView(localRef, viewportOnceTight)

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
        ref={setRef}
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
        className={`pain-point-card group relative overflow-hidden glass-card tech-corners rounded-2xl p-6 md:p-7 ${isActive ? 'pain-point-card--active' : ''}`}
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
          whileInView={{
            opacity: 1,
            scale: 1,
            y: 0,
            color: 'rgba(122, 28, 46, 0.18)',
          }}
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
          className="pain-point-watermark font-mono-tech pain-point-watermark--revealed"
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
  },
)

function PainPointsDeck({
  reduced,
  headerRef,
  showHeadline,
}: {
  reduced: boolean
  headerRef: RefObject<HTMLElement | null>
  showHeadline: boolean
}) {
  const pinRef = useRef<HTMLDivElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)
  const deckContentRef = useRef<HTMLDivElement>(null)
  const ctaRevealRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLParagraphElement>(null)
  const displayRef = useRef<HTMLDivElement>(null)
  const displayNumRef = useRef<HTMLSpanElement>(null)
  const activeIndexRef = useRef(0)

  useLayoutEffect(() => {
    if (reduced) return

    const pin = pinRef.current
    const stack = stackRef.current
    if (!pin || !stack) return

    let ctx: gsap.Context | undefined
    let mounted = true
    let cardYSetters: Array<(value: number) => void> = []

    const updateDisplayIndex = (idx: number) => {
      if (idx === activeIndexRef.current) return
      activeIndexRef.current = idx

      const num = String(idx + 1).padStart(2, '0')
      if (displayNumRef.current) {
        displayNumRef.current.textContent = num
      }

      const displayShell = displayRef.current
      const displayEl = displayNumRef.current?.closest('.pain-points-deck-display')
      if (displayEl) {
        displayEl.setAttribute('aria-label', `קלף ${idx + 1}`)
      } else if (displayShell) {
        displayShell.setAttribute('aria-label', `קלף ${idx + 1}`)
      }
    }

    const setup = () => {
      ctx?.revert()

      const cards = gsap.utils.toArray<HTMLElement>('[data-deck-card]', stack)
      if (cards.length < 2) return

      const isMobile = isMobileDeckViewport()
      const useFixedPin = isMobile || isIOSDevice()
      const stageHeight = Math.round(stack.getBoundingClientRect().height)
      const usePixelCards = useFixedPin && stageHeight > 0

      pin.classList.toggle('pain-points-deck-pin--mobile', isMobile)

      if (useFixedPin) {
        ScrollTrigger.config({ ignoreMobileResize: true })
      }

      const glow = pin.querySelector<HTMLElement>('[data-deck-glow]')
      const orbit = pin.querySelector<HTMLElement>('[data-deck-orbit]')
      const beam = pin.querySelector<HTMLElement>('[data-deck-beam]')
      const grid = pin.querySelector<HTMLElement>('[data-deck-grid]')
      const ctaReveal = ctaRevealRef.current
      const deckContent = deckContentRef.current
      const hint = hintRef.current
      const display = displayRef.current

      ctx = gsap.context(() => {
        const count = cards.length
        const cardScrollDistance = Math.round(
          window.innerHeight * DECK_SCROLL_VH * (count - 1),
        )
        const ctaScrollDistance = Math.round(
          window.innerHeight * DECK_CTA_SCROLL_VH,
        )
        const totalScrollDistance = cardScrollDistance + ctaScrollDistance
        const cardPhaseEnd = cardScrollDistance / totalScrollDistance

        gsap.set(cards, {
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          transformOrigin: '50% 100%',
          force3D: true,
          visibility: 'visible',
        })

        cardYSetters = cards.map((card) =>
          usePixelCards
            ? (gsap.quickSetter(card, 'y', 'px') as (value: number) => void)
            : (gsap.quickSetter(card, 'yPercent') as (value: number) => void),
        )

        if (ctaReveal) {
          gsap.set(ctaReveal, {
            opacity: 0,
            scale: 0.9,
            y: 48,
            filter: 'blur(10px)',
            pointerEvents: 'none',
          })
          gsap.utils.toArray<HTMLElement>('[data-cta-part]', ctaReveal).forEach((part) => {
            gsap.set(part, { opacity: 0, y: 18 })
          })
        }
        if (deckContent) {
          gsap.set(deckContent, { opacity: 1, scale: 1, y: 0, filter: 'none' })
        }
        if (stackRef.current) {
          gsap.set(stackRef.current, { opacity: 1 })
        }
        if (hint) {
          gsap.set(hint, { opacity: 1 })
        }
        if (display) {
          gsap.set(display, { opacity: 1 })
        }

        const updateDeck = (progress: number) => {
          if (!isMobile) {
            pin.style.setProperty('--deck-progress', progress.toFixed(4))
          }

          const idx = Math.min(Math.round(progress * (count - 1)), count - 1)

          cards.forEach((_card, i) => {
            if (i === 0) {
              cardYSetters[i](0)
              return
            }

            const segmentStart = (i - 1) / (count - 1)
            const segmentEnd = i / (count - 1)
            const segmentSpan = segmentEnd - segmentStart || 1
            const local = gsap.utils.clamp(
              0,
              1,
              (progress - segmentStart) / segmentSpan,
            )

            if (usePixelCards) {
              cardYSetters[i](Math.round((1 - local) * stageHeight))
            } else {
              cardYSetters[i](Math.round((100 - local * 100) * 10) / 10)
            }
          })

          if (!isMobile || idx !== activeIndexRef.current) {
            pin.style.setProperty('--deck-index', String(idx))
          }
          if (mounted) updateDisplayIndex(idx)
        }

        const updateReveal = (totalProgress: number) => {
          const ctaProgress =
            totalProgress <= cardPhaseEnd
              ? 0
              : gsap.utils.clamp(
                  0,
                  1,
                  (totalProgress - cardPhaseEnd) / (1 - cardPhaseEnd),
                )

          pin.style.setProperty('--deck-cta-progress', ctaProgress.toFixed(4))

          const deckFade = 1 - gsap.utils.clamp(0, 1, ctaProgress * 2.8)
          const deckLift = ctaProgress * -28
          const deckScale = 1 - ctaProgress * 0.06

          if (deckContent) {
            gsap.set(deckContent, {
              opacity: deckFade,
              y: deckLift,
              scale: deckScale,
              filter:
                !isMobile && ctaProgress > 0.05
                  ? `blur(${ctaProgress * 4}px)`
                  : 'none',
              pointerEvents: deckFade > 0.35 ? 'auto' : 'none',
            })
          }

          const revealIn = gsap.utils.clamp(0, 1, (ctaProgress - 0.12) / 0.88)

          if (ctaReveal) {
            gsap.set(ctaReveal, {
              opacity: revealIn,
              scale: 0.9 + revealIn * 0.1,
              y: 48 - revealIn * 48,
              filter:
                !isMobile && revealIn < 1
                  ? `blur(${(1 - revealIn) * 10}px)`
                  : 'none',
              pointerEvents: revealIn > 0.92 ? 'auto' : 'none',
            })

            const parts = gsap.utils.toArray<HTMLElement>('[data-cta-part]', ctaReveal)
            parts.forEach((part, i) => {
              const partIn = gsap.utils.clamp(0, 1, (revealIn - i * 0.12) / 0.72)
              gsap.set(part, {
                opacity: partIn,
                y: (1 - partIn) * 18,
              })
            })
          }

          const uiFade = 1 - Math.min(ctaProgress * 2.5, 1)
          if (hint) {
            gsap.set(hint, { opacity: uiFade })
          }
          if (display) {
            gsap.set(display, { opacity: uiFade })
          }
        }

        const updateAll = (totalProgress: number) => {
          const cardProgress =
            totalProgress <= cardPhaseEnd
              ? gsap.utils.clamp(0, 1, totalProgress / cardPhaseEnd)
              : 1

          updateDeck(cardProgress)
          updateReveal(totalProgress)
        }

        cards.forEach((card, i) => {
          gsap.set(card, {
            zIndex: i + 1,
            y: usePixelCards ? (i === 0 ? 0 : stageHeight) : 0,
            yPercent: usePixelCards ? 0 : i === 0 ? 0 : 100,
            scale: 1,
            rotation: 0,
            filter: 'none',
          })
        })

        const scrollConfig: ScrollTrigger.Vars = {
          trigger: pin,
          start: isMobile ? 'top 14%' : 'top 18%',
          end: `+=${totalScrollDistance}`,
          pin: true,
          pinSpacing: true,
          pinType: useFixedPin ? 'fixed' : 'transform',
          scrub: isMobile ? true : 0.75,
          anticipatePin: isMobile ? 0 : 1,
          invalidateOnRefresh: true,
          fastScrollEnd: !isMobile,
          onUpdate: (self) => updateAll(self.progress),
        }

        if (isMobile) {
          scrollConfig.snap = {
            snapTo: (value: number) => {
              if (value <= cardPhaseEnd) {
                const steps = count - 1
                const normalized = value / cardPhaseEnd
                const snapped = Math.round(normalized * steps) / steps
                return snapped * cardPhaseEnd
              }
              return value
            },
            duration: { min: 0.18, max: 0.42 },
            delay: 0.02,
            ease: 'power1.inOut',
          }
        }

        ScrollTrigger.create(scrollConfig)

        updateAll(0)

        if (glow) {
          gsap.set(glow, { opacity: 0.35, scale: 0.88 })
        }
        if (orbit) {
          gsap.set(orbit, { rotate: 0, opacity: 0.25 })
        }
        if (beam) {
          gsap.set(beam, { yPercent: -35, opacity: 0.15 })
        }
        if (grid) {
          gsap.set(grid, { opacity: 0.12, scale: 1 })
        }
      }, pin)

      pin.style.setProperty('--deck-progress', '0')
      pin.style.setProperty('--deck-index', '0')
      pin.style.setProperty('--deck-cta-progress', '0')
    }

    setup()

    const refresh = () => ScrollTrigger.refresh()
    const raf = requestAnimationFrame(() => requestAnimationFrame(refresh))
    window.addEventListener('load', refresh)

    let resizeTimer = 0
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        setup()
        refresh()
      }, isMobileDeckViewport() ? 280 : 150)
    }
    window.addEventListener('resize', onResize)

    return () => {
      mounted = false
      cancelAnimationFrame(raf)
      window.removeEventListener('load', refresh)
      window.removeEventListener('resize', onResize)
      window.clearTimeout(resizeTimer)
      ctx?.revert()
    }
  }, [reduced])

  return (
    <div ref={pinRef} className="pain-points-deck-pin">
      <div className="pain-points-deck-scene" aria-hidden>
        <div className="pain-points-deck-scene-grid" data-deck-grid />
        <div className="pain-points-deck-scene-glow" data-deck-glow />
        <div className="pain-points-deck-scene-orbit" data-deck-orbit />
        <div className="pain-points-deck-scene-beam" data-deck-beam />
      </div>
      <PainPointsHeader
        headerRef={headerRef}
        reduced={reduced}
        showHeadline={showHeadline}
        deckPinned
      />
      <div className="pain-points-deck-body">
        <div ref={deckContentRef} className="pain-points-deck-viewport">
          <div ref={displayRef} className="pain-points-deck-display-shell">
            <DeckDisplayNumber displayNumRef={displayNumRef} />
          </div>
          <div className="pain-points-deck-stage">
            <div ref={stackRef} className="pain-points-deck-stack">
              {pains.map((pain, i) => (
                <DeckPainCard key={pain.title} pain={pain} index={i} />
              ))}
            </div>
          </div>
          <p
            ref={hintRef}
            className="pain-points-deck-hint font-mono-tech"
            aria-hidden
          >
            גללו ↓
          </p>
        </div>

        <div ref={ctaRevealRef} className="pain-points-deck-cta-reveal">
          <div className="pain-points-deck-cta-reveal-glow" aria-hidden />
          <PainPointsCta reveal className="pain-points-deck-cta-reveal-card" />
        </div>
      </div>
    </div>
  )
}

function PainPointsList({ reduced }: { reduced: boolean }) {
  return (
    <div className="pain-points-grid grid gap-7 md:grid-cols-2 md:gap-6">
      {pains.map((pain, i) => (
        <PainPointCard key={pain.title} pain={pain} index={i} reduced={reduced} />
      ))}
    </div>
  )
}

export function PainPoints() {
  const reduced = !!useReducedMotion()
  const headerRef = useRef<HTMLElement>(null)
  const headlineInView = useInView(headerRef, viewportOnce)
  const [headlineFallback, setHeadlineFallback] = useState(false)

  useEffect(() => {
    if (reduced) return
    const timer = window.setTimeout(() => setHeadlineFallback(true), 2000)
    return () => window.clearTimeout(timer)
  }, [reduced])

  useEffect(() => {
    if (reduced) return
    const refresh = () => ScrollTrigger.refresh()
    const timer = window.setTimeout(refresh, 400)
    window.addEventListener('load', refresh)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('load', refresh)
    }
  }, [reduced])

  const showHeadline = reduced || headlineInView || headlineFallback

  return (
    <section
      id="pains"
      className="pain-points-section section-pad relative overflow-x-clip bg-section-surface"
    >
      <SectionLuxuryBg variant="surface" />

      <div className="container-site relative z-10">
        {reduced ? (
          <PainPointsHeader
            headerRef={headerRef}
            reduced={reduced}
            showHeadline={showHeadline}
          />
        ) : null}

        <div className="pain-points-stack relative mx-auto max-w-2xl">
          {reduced ? (
            <PainPointsList reduced={reduced} />
          ) : (
            <PainPointsDeck
              reduced={reduced}
              headerRef={headerRef}
              showHeadline={showHeadline}
            />
          )}
        </div>

        {reduced ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnceTight}
            variants={fadeUpScale}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-14 max-w-2xl md:mt-16"
          >
            <PainPointsCta />
          </motion.div>
        ) : null}
      </div>
    </section>
  )
}
