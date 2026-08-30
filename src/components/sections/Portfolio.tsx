import { useRef, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowLeft } from 'lucide-react'
import { LeadPopupTrigger } from '@/components/forms/LeadPopup'
import { Button } from '@/components/ui/button'
import { SectionLuxuryBg } from '@/components/layout/SectionLuxuryBg'
import { bindRevealTimeline, forceRevealVisible } from '@/lib/gsapReveal'
import { scheduleScrollTriggerRefresh } from '@/lib/scrollTriggerRefresh'
import { LEAD_FLOW_CTA_LABEL } from '@/lib/waveForms'

gsap.registerPlugin(ScrollTrigger, useGSAP)

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
}: {
  project: (typeof projects)[number]
  index: number
}) {
  const num = String(index + 1).padStart(2, '0')
  const flipped = index % 2 === 1

  return (
    <article className={`portfolio-card group ${flipped ? 'portfolio-card--flipped' : ''}`}>
      <span className="portfolio-watermark font-mono-tech portfolio-watermark--reveal" aria-hidden>
        {num}
      </span>

      <div className="portfolio-card-inner">
        <div className="portfolio-showcase-col portfolio-showcase-col--reveal">
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
        </div>

        <div className="portfolio-meta-col portfolio-meta-col--reveal">
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
        </div>
      </div>
    </article>
  )
}

export function Portfolio() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const railFillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scheduleScrollTriggerRefresh(80)
  }, [])

  useGSAP(
    () => {
      const section = sectionRef.current
      const header = headerRef.current
      const list = listRef.current
      const cta = ctaRef.current
      const railFill = railFillRef.current
      if (!section) return

      const q = gsap.utils.selector(section)
      const pick = (selector: string) => {
        const nodes = q(selector)
        return nodes.length ? nodes : null
      }

      const ornaments = pick('.portfolio-header-ornament span')
      const headlineInners = pick('.portfolio-headline-inner')
      const accentLine = pick('.portfolio-headline-accent-line')
      const subhead = pick('.portfolio-subhead')
      const divider = pick('.portfolio-header-divider')
      const cards = pick('.portfolio-card')
      const showcases = pick('.portfolio-showcase-col--reveal')
      const metas = pick('.portfolio-meta-col--reveal')
      const watermarks = pick('.portfolio-watermark--reveal')
      const ctaWrap = pick('.portfolio-cta-wrap')
      const ctaGlow = pick('.portfolio-cta-glow')

      if (reduced) {
        forceRevealVisible(
          ornaments,
          headlineInners,
          accentLine,
          subhead,
          divider,
          cards,
          showcases,
          metas,
          watermarks,
          ctaWrap,
          ctaGlow,
        )
        if (railFill) gsap.set(railFill, { scaleY: 1 })
        return
      }

      const cleanups: Array<() => void> = []

      if (ornaments) gsap.set(ornaments, { scaleX: 0, opacity: 0 })
      if (headlineInners) gsap.set(headlineInners, { yPercent: 118, opacity: 0, rotateX: 12 })
      if (accentLine) gsap.set(accentLine, { scaleX: 0, opacity: 0 })
      if (subhead) gsap.set(subhead, { opacity: 0, y: 20 })
      if (divider) gsap.set(divider, { scaleX: 0, opacity: 0 })
      if (cards) gsap.set(cards, { opacity: 1 })
      if (showcases) gsap.set(showcases, { opacity: 0, y: 56 })
      if (metas) gsap.set(metas, { opacity: 0, x: 28 })
      if (watermarks) gsap.set(watermarks, { opacity: 0, scale: 0.8 })
      if (ctaWrap) gsap.set(ctaWrap, { opacity: 0, y: 32 })
      if (ctaGlow) gsap.set(ctaGlow, { opacity: 0, scale: 0.88 })
      if (railFill) gsap.set(railFill, { scaleY: 0 })

      if (header) {
        const headerTl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: header,
            start: 'top 88%',
            once: true,
            invalidateOnRefresh: true,
          },
        })

        if (ornaments) headerTl.to(ornaments, { scaleX: 1, opacity: 1, duration: 0.8, stagger: 0.08 })
        if (headlineInners) {
          headerTl.to(
            headlineInners,
            { yPercent: 0, opacity: 1, rotateX: 0, duration: 0.92, stagger: 0.1, ease: 'power4.out' },
            '-=0.5',
          )
        }
        if (accentLine) {
          headerTl.to(accentLine, { scaleX: 1, opacity: 1, duration: 0.7, ease: 'power2.inOut' }, '-=0.4')
        }
        if (subhead) headerTl.to(subhead, { opacity: 1, y: 0, duration: 0.65 }, '-=0.35')
        if (divider) {
          headerTl.to(divider, { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.inOut' }, '-=0.3')
        }

        cleanups.push(bindRevealTimeline(headerTl, header))
      }

      if (cards) {
        cards.forEach((card, i) => {
          const showcase = card.querySelector('.portfolio-showcase-col--reveal')
          const meta = card.querySelector('.portfolio-meta-col--reveal')
          const watermark = card.querySelector('.portfolio-watermark--reveal')
          const flipped = i % 2 === 1

          if (showcase) {
            gsap.set(showcase, { rotateY: flipped ? -8 : 8 })
          }

          const cardTl = gsap.timeline({
            defaults: { ease: 'power3.out' },
            scrollTrigger: {
              trigger: card,
              start: 'top 86%',
              once: true,
              invalidateOnRefresh: true,
            },
          })

          if (watermark) {
            cardTl.to(watermark, { opacity: 0.22, scale: 1, duration: 0.75, ease: 'power2.out' })
          }
          if (showcase) {
            cardTl.to(
              showcase,
              { opacity: 1, y: 0, rotateY: 0, duration: 0.95, ease: 'power4.out' },
              '-=0.55',
            )
          }
          if (meta) {
            cardTl.to(meta, { opacity: 1, x: 0, duration: 0.75 }, '-=0.55')
          }

          cleanups.push(bindRevealTimeline(cardTl, card))
        })
      }

      if (list && railFill) {
        gsap.to(railFill, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: list,
            start: 'start 75%',
            end: 'end 25%',
            scrub: 0.85,
            invalidateOnRefresh: true,
          },
        })
      }

      if (cta) {
        const ctaTl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: cta,
            start: 'top 92%',
            once: true,
            invalidateOnRefresh: true,
          },
        })

        if (ctaGlow) ctaTl.to(ctaGlow, { opacity: 1, scale: 1, duration: 0.8 }, 0)
        if (ctaWrap) ctaTl.to(ctaWrap, { opacity: 1, y: 0, duration: 0.75 }, '-=0.55')

        cleanups.push(bindRevealTimeline(ctaTl, cta))
      }

      return () => cleanups.forEach((cleanup) => cleanup())
    },
    { scope: sectionRef, dependencies: [reduced] },
  )

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
          <div ref={railFillRef} className="portfolio-scroll-rail-fill" />
        </div>
      ) : null}

      <div className="container-site relative z-10">
        <header
          ref={headerRef}
          className="portfolio-header--lux mx-auto mb-10 max-w-3xl text-center md:mb-12"
        >
          <div className="portfolio-header-ornament" aria-hidden>
            <span />
            <span />
          </div>

          <h2 className="text-3xl font-bold leading-tight text-burgundy md:text-4xl lg:text-[2.75rem]">
            {headlineLines.map((line) => (
              <span key={line} className="block overflow-hidden py-0.5">
                <span className="portfolio-headline-inner block">{line}</span>
              </span>
            ))}
            <span className="portfolio-headline-accent-line" aria-hidden />
          </h2>

          <p className="portfolio-subhead mt-5 text-base leading-relaxed text-muted dark:text-white/65 md:text-lg">
            כל פרויקט נבנה סביב העסק שמאחוריו, כדי להרגיש מדויק, ייחודי ונכון לקהל שלו.
          </p>

          <hr className="tech-divider portfolio-header-divider mx-auto mt-6 max-w-xs origin-center md:mt-8 md:max-w-sm" />
        </header>

        <div ref={listRef} className="portfolio-list mx-auto max-w-5xl">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <div ref={ctaRef} className="mx-auto mt-12 max-w-2xl md:mt-14">
          <span className="portfolio-cta-glow" aria-hidden />
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
        </div>
      </div>
    </section>
  )
}
