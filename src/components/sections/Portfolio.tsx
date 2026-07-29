import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from 'framer-motion'
import { Button } from '@/components/ui/button'
import { EASE, fadeUpScale, viewportOnce, viewportOnceTight } from '@/lib/motion'

const projects = [
  {
    title: 'כהן בן עמי',
    category: 'משרד עורכי דין · תדמית',
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
    category: 'בינה מלאכותית · שירות לקוחות',
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
    category: 'ריסים וגבות · אתר תדמית',
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
    category: 'אירועי רכיבה · קהילה',
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

  const hasEntered = useInView(ref, {
    once: true,
    amount: 0.3,
    margin: viewportOnceTight.margin,
  })

  const cardVariants: Variants = reduced
    ? {
        hidden: { opacity: 1, y: 0, rotateX: 0, scale: 1 },
        visible: { opacity: 1, y: 0, rotateX: 0, scale: 1 },
      }
    : {
        hidden: {
          opacity: 0,
          y: 64,
          rotateX: 10,
          scale: 0.94,
          filter: 'blur(4px)',
        },
        visible: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          filter: 'blur(0px)',
          transition: {
            duration: 0.85,
            ease: EASE,
            delay: index * 0.1,
          },
        },
      }

  const stackVariants: Variants = reduced
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.14,
            delayChildren: index * 0.1 + 0.15,
          },
        },
      }

  const secondaryVariants: Variants = reduced
    ? {
        hidden: { opacity: 1, y: 0, rotateX: 5, scale: 0.985 },
        visible: { opacity: 1, y: 0, rotateX: 5, scale: 0.985 },
      }
    : {
        hidden: {
          opacity: 0,
          y: 40,
          rotateX: 14,
          scale: 0.94,
        },
        visible: {
          opacity: 1,
          y: 0,
          rotateX: 5,
          scale: 0.985,
          transition: { duration: 0.7, ease: EASE },
        },
      }

  const heroVariants: Variants = reduced
    ? {
        hidden: { opacity: 1, y: 0, rotateX: 5, scale: 1 },
        visible: { opacity: 1, y: 0, rotateX: 5, scale: 1 },
      }
    : {
        hidden: {
          opacity: 0,
          y: 56,
          rotateX: 16,
          scale: 0.9,
        },
        visible: {
          opacity: 1,
          y: 0,
          rotateX: 5,
          scale: 1,
          transition: { duration: 0.75, ease: EASE },
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
        style={{ perspective: 1200 }}
        whileHover={
          reduced
            ? undefined
            : {
                scale: 1.012,
                transition: { duration: 0.32, ease: EASE },
              }
        }
        className={`portfolio-card group ${flipped ? 'portfolio-card--flipped' : ''}`}
      >
        <span
          className={`portfolio-watermark font-mono-tech ${hasEntered ? 'portfolio-watermark--revealed' : ''}`}
          aria-hidden
        >
          {num}
        </span>

        <div className="portfolio-card-inner">
          <div className="portfolio-stack-col">
            <motion.div
              variants={stackVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnceTight}
              className="tech-corners portfolio-stack"
            >
              <motion.div
                variants={secondaryVariants}
                className="portfolio-frame portfolio-frame-secondary"
              >
                <div className="portfolio-frame-inner">
                  <img
                    src={project.secondary.src}
                    alt={project.secondary.alt}
                    width={1280}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="portfolio-shot-img"
                  />
                  <span className="portfolio-scan-line" aria-hidden />
                </div>
              </motion.div>

              <motion.div
                variants={heroVariants}
                className="portfolio-frame portfolio-frame-main"
              >
                <div className="portfolio-frame-inner">
                  <img
                    src={project.hero.src}
                    alt={project.hero.alt}
                    width={1280}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="portfolio-shot-img"
                  />
                  <span className="portfolio-scan-line portfolio-scan-line--delayed" aria-hidden />
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnceTight}
            transition={{
              duration: 0.6,
              ease: EASE,
              delay: reduced ? 0 : index * 0.1 + 0.35,
            }}
            className="portfolio-meta-col"
          >
            <span className="portfolio-index font-mono-tech">{num}</span>
            <h3 className="portfolio-title text-xl font-bold text-burgundy md:text-2xl">
              {project.title}
            </h3>
            <p
              className={`portfolio-category ${hasEntered ? 'portfolio-category--glow' : ''}`}
            >
              {project.category}
            </p>
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
      className="portfolio-section section-pad relative overflow-hidden"
    >
      <div className="tech-grid-bg portfolio-grid-bg" aria-hidden />
      <div className="portfolio-ambient-glow" aria-hidden />

      <div className="container-site relative z-10">
        <motion.header
          ref={headerRef}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUpScale}
          className="mx-auto mb-14 max-w-3xl text-center md:mb-16"
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
