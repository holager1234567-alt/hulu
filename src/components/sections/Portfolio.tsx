import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from 'framer-motion'
import { Button } from '@/components/ui/button'
import { SectionLuxuryBg } from '@/components/layout/SectionLuxuryBg'
import { EASE, fadeUpScale, viewportOnce, viewportOnceTight } from '@/lib/motion'

const projects = [
  {
    title: 'כהן בן עמי',
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

const headlineLines = [
  'מבחר פרויקטים שמשלבים',
  'דיוק עיצוב עם חשיבה עסקית ברורה',
]

function BrowserMockup({
  src,
  alt,
  url,
  variant = 'main',
}: {
  src: string
  alt: string
  url: string
  variant?: 'main' | 'secondary'
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
      </div>
      <span className="portfolio-browser-shine" aria-hidden />
    </div>
  )
}

function ProjectCard({
  project,
  index,
  reduced,
  isLast,
}: {
  project: (typeof projects)[number]
  index: number
  reduced: boolean
  isLast: boolean
}) {
  const ref = useRef<HTMLElement>(null)
  const num = String(index + 1).padStart(2, '0')
  const flipped = index % 2 === 1

  const hasEntered = useInView(ref, viewportOnceTight)

  const cardVariants: Variants = reduced
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: 48, filter: 'blur(4px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: {
            duration: 0.8,
            ease: EASE,
            delay: index * 0.08,
          },
        },
      }

  return (
    <>
      <motion.article
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnceTight}
        variants={cardVariants}
        className={`portfolio-card group ${flipped ? 'portfolio-card--flipped' : ''}`}
      >
        <span
          className={`portfolio-watermark font-mono-tech ${hasEntered ? 'portfolio-watermark--revealed' : ''}`}
          aria-hidden
        >
          {num}
        </span>

        <div className="portfolio-card-inner">
          <div className="portfolio-showcase-col">
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
              />
            </div>
          </div>

          <motion.div
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnceTight}
            transition={{
              duration: 0.55,
              ease: EASE,
              delay: reduced ? 0 : index * 0.08 + 0.2,
            }}
            className="portfolio-meta-col"
          >
            <span className="portfolio-index font-mono-tech">{num}</span>
            <h3 className="portfolio-title text-xl font-bold text-burgundy md:text-2xl lg:text-[1.65rem]">
              {project.title}
            </h3>
          </motion.div>
        </div>
      </motion.article>

      {!isLast && <hr className="portfolio-divider tech-divider" aria-hidden />}
    </>
  )
}

export function Portfolio() {
  const reduced = useReducedMotion()
  const headerRef = useRef<HTMLElement>(null)
  const headlineInView = useInView(headerRef, viewportOnce)
  const [headlineFallback, setHeadlineFallback] = useState(false)

  useEffect(() => {
    if (reduced) return
    const timer = window.setTimeout(() => setHeadlineFallback(true), 2000)
    return () => window.clearTimeout(timer)
  }, [reduced])

  const showHeadline = reduced || headlineInView || headlineFallback

  return (
    <section
      id="work"
      className="portfolio-section section-pad relative overflow-hidden bg-section-portfolio"
    >
      <SectionLuxuryBg variant="portfolio" />
      <div className="portfolio-accent-glow" aria-hidden />
      <div className="portfolio-horizon" aria-hidden />

      <div className="container-site relative z-10">
        <motion.header
          ref={headerRef}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUpScale}
          className="mx-auto mb-14 max-w-3xl text-center md:mb-16"
        >
          <p className="portfolio-kicker font-mono-tech mb-4 text-[0.68rem] font-semibold tracking-[0.22em] text-burgundy/50 uppercase md:text-xs">
            selected work
          </p>
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

          <hr className="tech-divider mx-auto mt-6 max-w-xs md:mt-8 md:max-w-sm" />
        </motion.header>

        <div className="portfolio-list mx-auto max-w-5xl">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              reduced={!!reduced}
              isLast={i === projects.length - 1}
            />
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnceTight}
          variants={fadeUpScale}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-16 max-w-2xl md:mt-20"
        >
          <div className="portfolio-cta-wrap glass-card tech-corners text-center">
            <hr className="tech-divider mb-6" aria-hidden />

            <p className="text-sm leading-relaxed text-primary md:text-base dark:text-white/85">
              חלק מהעבודות המוצגות כאן הן אתרים אמיתיים שנבנו עבור לקוחות
              פעילים, וחלקן הן דמו שנועדו להמחיש יכולות עיצוביות, חדשנות
              טכנולוגית ויצירתיות בלתי מתפשרת.
            </p>

            <Button
              asChild
              variant="burgundy"
              size="lg"
              className="btn-burgundy-glow mt-8 h-12 rounded-full px-8 shadow-soft"
            >
              <a href="#contact">אני גם רוצה אתר לעסק שלי</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
