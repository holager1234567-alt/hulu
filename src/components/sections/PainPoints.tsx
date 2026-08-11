import { useRef, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { HeroLuxuryBackdrop } from '@/components/layout/HeroLuxuryBackdrop'
import { useIsMobile } from '@/hooks/useIsMobile'
import { EASE, viewportOnce } from '@/lib/motion'
import { LEAD_FLOW_ANCHOR } from '@/lib/waveForms'

const STORY_LEAD_CTA = 'קבלו הצצה לאתר שעובד'

const STEPS = [
  {
    id: '01',
    title: 'להבין',
    description: 'מי אתם, מה אתם מציעים ולמי.',
  },
  {
    id: '02',
    title: 'להתחבר',
    description: 'להרגיש את הערך, האישיות והייחוד של העסק.',
  },
  {
    id: '03',
    title: 'לפעול',
    description: 'לעבור מהתעניינות לצעד הבא.',
  },
] as const

function StoryStepItem({
  step,
  index,
  activeIndex,
  interactive,
  reduced,
}: {
  step: (typeof STEPS)[number]
  index: number
  activeIndex: number
  interactive: boolean
  reduced: boolean
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.45 })
  const isActive = interactive && activeIndex === index
  const isPast = interactive && activeIndex > index
  const isVisible = reduced || !interactive || inView

  return (
    <motion.article
      ref={ref}
      className={`story-step ${isActive ? 'story-step--active' : ''} ${isPast ? 'story-step--past' : ''} ${!interactive ? 'story-step--static' : ''}`}
      aria-current={isActive ? 'step' : undefined}
      initial={reduced || interactive ? false : { opacity: 0, y: 24 }}
      animate={
        reduced || interactive || isVisible
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 24 }
      }
      transition={{ duration: 0.6, ease: EASE, delay: reduced ? 0 : index * 0.06 }}
    >
      <span className="story-step-num font-mono-tech" aria-hidden>
        {step.id}
      </span>
      <span className="story-step-rule" aria-hidden />
      <div className="story-step-copy">
        <h3 className="story-step-title">{step.title}</h3>
        <motion.p
          className="story-step-desc"
          initial={false}
          animate={{
            opacity: reduced || !interactive || isActive || isPast ? 1 : 0.42,
            y: reduced || !interactive || isActive ? 0 : 6,
          }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {step.description}
        </motion.p>
      </div>
    </motion.article>
  )
}

export function PainPoints() {
  const reduced = !!useReducedMotion()
  const isMobile = useIsMobile()
  const sectionRef = useRef<HTMLElement>(null)
  const scrollTrackRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  const useScrollExperience = !reduced && !isMobile

  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (!useScrollExperience) return
    if (value < 0.34) setActiveStep(0)
    else if (value < 0.66) setActiveStep(1)
    else setActiveStep(2)
  })

  const headlineOpacity = useTransform(
    scrollYProgress,
    [0, 0.12],
    reduced || isMobile ? [1, 1] : [0.35, 1],
  )
  const headlineY = useTransform(
    scrollYProgress,
    [0, 0.14],
    reduced || isMobile ? [0, 0] : [32, 0],
  )
  const subOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.2],
    reduced || isMobile ? [1, 1] : [0, 1],
  )
  const lineProgress = useTransform(scrollYProgress, [0.22, 0.78], [0, 1])
  const dotTop = useTransform(lineProgress, (v) => `${v * 100}%`)
  const closingOpacity = useTransform(
    scrollYProgress,
    [0.78, 0.92],
    reduced || isMobile ? [1, 1] : [0, 1],
  )
  const closingY = useTransform(
    scrollYProgress,
    [0.78, 0.92],
    reduced || isMobile ? [0, 0] : [20, 0],
  )

  const headlineBlockAOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.45, 0.55],
    reduced || isMobile ? [1, 1, 1] : [1, 1, 0.55],
  )
  const headlineBlockBOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.62, 0.78],
    reduced || isMobile ? [1, 1, 1] : [0.45, 1, 1],
  )

  return (
    <section
      ref={sectionRef}
      id="pains"
      className="story-section hero-luxury relative overflow-x-clip"
      aria-label="העסק שלכם צריך מקום שעובד עבורו"
    >
      <HeroLuxuryBackdrop variant="continuation" />

      <div
        ref={scrollTrackRef}
        className={
          useScrollExperience
            ? 'story-scroll-track story-scroll-track--desktop'
            : 'story-scroll-track story-scroll-track--static'
        }
      >
        <div className="story-sticky">
          <div className="container-site story-shell relative z-10">
            <div className="story-layout">
              <motion.header
                className="story-headline-col"
                initial={
                  useScrollExperience ? undefined : reduced ? false : { opacity: 0, y: 28 }
                }
                whileInView={
                  useScrollExperience ? undefined : { opacity: 1, y: 0 }
                }
                viewport={viewportOnce}
                transition={{ duration: 0.7, ease: EASE }}
                style={
                  useScrollExperience
                    ? {
                        opacity: headlineOpacity,
                        y: headlineY,
                        willChange: 'transform, opacity',
                      }
                    : undefined
                }
              >
                <h2 className="story-headline">
                  <motion.span
                    className="story-headline-block"
                    style={
                      useScrollExperience
                        ? { opacity: headlineBlockAOpacity }
                        : undefined
                    }
                  >
                    <span className="story-headline-line">העסק שלכם לא צריך עוד אתר.</span>
                  </motion.span>
                  <motion.span
                    className="story-headline-block story-headline-block--accent"
                    style={
                      useScrollExperience
                        ? { opacity: headlineBlockBOpacity }
                        : undefined
                    }
                  >
                    <span className="story-headline-line story-headline-emphasis">
                      הוא צריך אתר שעובד עבורו.
                    </span>
                  </motion.span>
                </h2>

                <motion.p
                  className="story-subheadline"
                  style={
                    useScrollExperience ? { opacity: subOpacity } : undefined
                  }
                >
                  אתר טוב לא רק נראה טוב.
                  <span className="story-subheadline-break">
                    {' '}
                    הוא עוזר לאנשים להבין מי אתם, לסמוך עליכם ולדעת מה לעשות עכשיו.
                  </span>
                </motion.p>
              </motion.header>

              <div className="story-steps-col">
                {useScrollExperience ? (
                  <div className="story-rail" aria-hidden>
                    <span className="story-rail-track" />
                    <motion.span
                      className="story-rail-fill"
                      style={{ scaleY: lineProgress }}
                    />
                    <motion.span
                      className="story-rail-dot"
                      style={{ top: dotTop }}
                    />
                  </div>
                ) : null}

                <ol className="story-steps" aria-label="שלבי החוויה">
                  {STEPS.map((step, index) => (
                    <li key={step.id}>
                      <StoryStepItem
                        step={step}
                        index={index}
                        activeIndex={activeStep}
                        interactive={useScrollExperience}
                        reduced={reduced}
                      />
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <motion.div
              className="story-lead-cta-wrap"
              initial={
                useScrollExperience ? undefined : reduced ? false : { opacity: 0, y: 14 }
              }
              whileInView={
                useScrollExperience ? undefined : { opacity: 1, y: 0 }
              }
              viewport={viewportOnce}
              transition={{ duration: 0.6, ease: EASE, delay: reduced ? 0 : 0.12 }}
              style={
                useScrollExperience
                  ? {
                      opacity: closingOpacity,
                      y: closingY,
                      willChange: 'transform, opacity',
                    }
                  : undefined
              }
            >
              <a href={LEAD_FLOW_ANCHOR} className="story-lead-cta group">
                <span>{STORY_LEAD_CTA}</span>
                <ArrowLeft
                  className="size-3.5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1"
                  aria-hidden
                />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
