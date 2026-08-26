import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { LeadPopupTrigger } from '@/components/forms/LeadPopup'
import { Button } from '@/components/ui/button'
import { SectionLuxuryBg } from '@/components/layout/SectionLuxuryBg'
import { LEAD_FLOW_CTA_LABEL } from '@/lib/waveForms'
import { EASE, fadeUpScale, viewportOnce, viewportOnceTight } from '@/lib/motion'

type Project = {
  title: string
  field: string
  insight: string
  url: string
  /** Live site URL — set to enable the hover CTA link. */
  href?: string
  hero: { src: string; alt: string }
  secondary: { src: string; alt: string }
}

const projects: Project[] = [
  {
    title: 'כהן בן עמי',
    field: 'משרד עורכי דין',
    insight: 'אתר שמשדר ביטחון וסמכות בעולם המשפט.',
    url: 'cohen-law.co.il',
    hero: {
      src: '/images/portfolio/cohen-law-hero.png',
      alt: 'כהן בן עמי, עמוד ראשי',
    },
    secondary: {
      src: '/images/portfolio/cohen-law-team.png',
      alt: 'כהן בן עמי, הצוות',
    },
  },
  {
    title: 'סוכן AI',
    field: 'טכנולוגיה ואוטומציה',
    insight: 'אתר שמפשט מוצר טכנולוגי ומייצר תחושת אמון.',
    url: 'ai-agent.io',
    hero: {
      src: '/images/portfolio/ai-agent-hero.png',
      alt: 'סוכן AI, עמוד ראשי',
    },
    secondary: {
      src: '/images/portfolio/ai-agent-chat.png',
      alt: 'סוכן AI, לייב צ׳אט',
    },
  },
  {
    title: 'tru_riss',
    field: 'סטודיו יופי וריסים',
    insight: 'אתר שמכניס את האישיות והאסתטיקה של המותג לתוך החוויה.',
    url: 'tru-riss.co.il',
    hero: {
      src: '/images/portfolio/tru-riss-hero.png',
      alt: 'tru_riss, עמוד ראשי',
    },
    secondary: {
      src: '/images/portfolio/tru-riss-services.png',
      alt: 'tru_riss, שירותים',
    },
  },
  {
    title: 'Ride With Yoav',
    field: 'קהילת רכיבה וטיולי שטח',
    insight: 'אתר שמחבר קהילה, אקשן ואווירה אותנטית.',
    url: 'ridewithyoav.com',
    hero: {
      src: '/images/portfolio/ride-yoav-hero.png',
      alt: 'Ride With Yoav, עמוד ראשי',
    },
    secondary: {
      src: '/images/portfolio/ride-yoav-route.png',
      alt: 'Ride With Yoav, מסלול',
    },
  },
]

const headlineLines = ['אתרים שנבנו סביב המותג.']

function BrowserMockup({
  src,
  alt,
  url,
  variant = 'main',
  overlay,
}: {
  src: string
  alt: string
  url: string
  variant?: 'main' | 'secondary'
  overlay?: Project
}) {
  return (
    <div className={`portfolio-browser portfolio-browser--${variant}`}>
      <div className="portfolio-browser-chrome">
        <div className="portfolio-browser-dots" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <span className="portfolio-browser-url font-mono-tech">{url}</span>
      </div>
      <div className="portfolio-browser-screen">
        <img
          src={src}
          alt={alt}
          width={1280}
          height={800}
          loading="lazy"
          decoding="async"
          className="portfolio-browser-shot"
        />
        {overlay ? (
          <div className="portfolio-overlay">
            <div className="portfolio-overlay-meta">
              <p className="portfolio-overlay-title">{overlay.title}</p>
              <p className="portfolio-overlay-field">{overlay.field}</p>
              {overlay.href ? (
                <a
                  href={overlay.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-overlay-cta group/cta"
                >
                  לצפייה בפרויקט
                  <ArrowLeft
                    className="size-3.5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:-translate-x-1"
                    aria-hidden
                  />
                </a>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
      <span className="portfolio-browser-shine" aria-hidden />
    </div>
  )
}

function ProjectCard({
  project,
  index,
  reduced,
}: {
  project: (typeof projects)[number]
  index: number
  reduced: boolean
}) {
  const ref = useRef<HTMLElement>(null)
  const num = String(index + 1).padStart(2, '0')
  const flipped = index % 2 === 1

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.92', 'end 0.2'],
  })

  const cardOpacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.55, 0.88, 1],
    reduced ? [1, 1, 1, 1, 1] : [0.2, 1, 1, 1, 0.35],
  )
  const cardScale = useTransform(
    scrollYProgress,
    [0, 0.28, 0.72, 1],
    reduced ? [1, 1, 1, 1] : [0.94, 1, 1, 0.97],
  )
  const cardY = useTransform(
    scrollYProgress,
    [0, 0.32],
    reduced ? [0, 0] : [40, 0],
  )
  const showcaseY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [28, -28],
  )
  const metaX = useTransform(
    scrollYProgress,
    [0, 0.35],
    reduced ? [0, 0] : flipped ? [20, 0] : [-20, 0],
  )
  const watermarkOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.45, 0.85],
    reduced ? [0.22, 0.22, 0.22] : [0, 0.22, 0.08],
  )

  return (
    <motion.article
      ref={ref}
      style={
        reduced
          ? undefined
          : {
              opacity: cardOpacity,
              scale: cardScale,
              y: cardY,
              willChange: 'transform, opacity',
            }
      }
      className={`portfolio-card group ${flipped ? 'portfolio-card--flipped' : ''}`}
    >
      <motion.span
        className="portfolio-watermark font-mono-tech portfolio-watermark--scroll"
        style={reduced ? undefined : { opacity: watermarkOpacity }}
        aria-hidden
      >
        {num}
      </motion.span>

      <div className="portfolio-card-inner">
        <motion.div
          className="portfolio-showcase-col"
          style={
            reduced ? undefined : { y: showcaseY, willChange: 'transform' }
          }
        >
          <div className="portfolio-showcase">
            <BrowserMockup
              variant="secondary"
              src={project.secondary.src}
              alt={project.secondary.alt}
              url={project.url}
            />
            <BrowserMockup
              variant="main"
              src={project.hero.src}
              alt={project.hero.alt}
              url={project.url}
              overlay={project}
            />
          </div>
        </motion.div>

        <motion.div
          style={
            reduced ? undefined : { x: metaX, willChange: 'transform' }
          }
          className="portfolio-meta-col"
        >
          <span className="portfolio-index font-mono-tech">{num}</span>
          <h3 className="portfolio-title text-xl font-bold text-burgundy md:text-2xl lg:text-[1.65rem]">
            {project.title}
          </h3>
          <p className="portfolio-field mt-1.5 text-sm text-muted md:text-base dark:text-white/60">
            {project.field}
          </p>
          <p className="portfolio-insight mt-2 text-sm leading-relaxed text-primary/80 md:text-base dark:text-white/75">
            {project.insight}
          </p>
        </motion.div>
      </div>
    </motion.article>
  )
}

export function Portfolio() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const headlineInView = useInView(headerRef, viewportOnce)
  const [headlineFallback, setHeadlineFallback] = useState(false)

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const { scrollYProgress: listProgress } = useScroll({
    target: listRef,
    offset: ['start 0.75', 'end 0.25'],
  })

  const railFill = useTransform(listProgress, [0, 1], [0, 1])
  const headerY = useTransform(
    sectionProgress,
    [0, 0.35],
    reduced ? [0, 0] : [24, 0],
  )
  const headerOpacity = useTransform(
    sectionProgress,
    [0, 0.2],
    reduced ? [1, 1] : [0.4, 1],
  )

  useEffect(() => {
    if (reduced) return
    const timer = window.setTimeout(() => setHeadlineFallback(true), 2000)
    return () => window.clearTimeout(timer)
  }, [reduced])

  const showHeadline = reduced || headlineInView || headlineFallback

  return (
    <section
      ref={sectionRef}
      id="work"
      className="portfolio-section portfolio-section--white section-pad relative overflow-x-clip bg-section-portfolio"
    >
      <SectionLuxuryBg variant="portfolio" />

      {!reduced ? (
        <div className="portfolio-scroll-rail" aria-hidden>
          <div className="portfolio-scroll-rail-track" />
          <motion.div
            className="portfolio-scroll-rail-fill"
            style={{ scaleY: railFill }}
          />
        </div>
      ) : null}

      <div className="container-site relative z-10">
        <motion.header
          ref={headerRef}
          style={
            reduced
              ? undefined
              : { y: headerY, opacity: headerOpacity, willChange: 'transform' }
          }
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUpScale}
          className="mx-auto mb-10 max-w-3xl text-center md:mb-12"
        >
          <h2 className="text-3xl font-bold leading-tight text-burgundy md:text-4xl lg:text-[2.75rem]">
            {headlineLines.map((line, i) => (
              <span key={line} className="block overflow-hidden py-0.5">
                <motion.span
                  className="block"
                  initial={reduced ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
                  animate={
                    showHeadline
                      ? { y: 0, opacity: 1 }
                      : { y: '110%', opacity: 0 }
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

          <motion.p
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE, delay: 0.24 }}
            className="mt-5 text-base leading-relaxed text-muted dark:text-white/65 md:text-lg"
          >
            כל פרויקט נבנה סביב העסק שמאחוריו, כדי להרגיש מדויק, ייחודי ונכון לקהל שלו.
          </motion.p>

          <hr className="tech-divider mx-auto mt-6 max-w-xs md:mt-8 md:max-w-sm" />
        </motion.header>

        <div ref={listRef} className="portfolio-list mx-auto max-w-5xl">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              reduced={!!reduced}
            />
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnceTight}
          variants={fadeUpScale}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-12 max-w-2xl md:mt-14"
        >
          <div className="portfolio-cta-wrap glass-card tech-corners text-center">
            <hr className="tech-divider mb-6" aria-hidden />

            <p className="text-sm leading-relaxed text-primary md:text-base dark:text-white/85">
              כאן תראו איך עסקים שונים קיבלו אתר שמתאים לשפה, לקהל ולרמה שלהם.
            </p>

            <div className="portfolio-cta-btn-wrap mt-8 flex w-full justify-center">
              <Button
                asChild
                variant="burgundy"
                size="lg"
                className="btn-burgundy-glow portfolio-cta-btn h-auto min-h-12 w-full max-w-full rounded-full px-5 py-3 text-sm font-semibold whitespace-normal text-balance shadow-soft sm:h-12 sm:w-auto sm:px-8 sm:text-base sm:whitespace-nowrap"
              >
                <LeadPopupTrigger>{LEAD_FLOW_CTA_LABEL}</LeadPopupTrigger>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
