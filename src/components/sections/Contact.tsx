import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { LeadPopupTrigger } from '@/components/forms/LeadPopup'
import { Button } from '@/components/ui/button'
import { EASE, viewportOnce } from '@/lib/motion'
import { bindRevealTimeline, forceRevealVisible } from '@/lib/gsapReveal'
import { scheduleScrollTriggerRefresh } from '@/lib/scrollTriggerRefresh'
import { LEAD_FLOW_CTA_LABEL } from '@/lib/waveForms'
import { cn } from '@/lib/utils'

import { WHATSAPP_FLOAT_MESSAGE, whatsAppUrl } from '@/lib/whatsapp'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const JOURNEY_FINALE_PRELINE = 'אני חושבת שאת יודעת....'
const JOURNEY_FINALE_HEADLINE = 'שהגיע הזמן לתת לעסק שלך אתר שעובד.'
const JOURNEY_FINALE_BODY =
  'עני על כמה שאלות קצרות, ואבין איפה העסק שלך נמצא היום ומה האתר שלך צריך כדי להתחיל לעבוד בשבילך.'
const JOURNEY_FINALE_WHATSAPP_CTA = 'אפשר לדבר גם בווצאפ'

const HEADLINE_LINES = ['שהגיע הזמן', 'לתת לעסק שלך', 'אתר שעובד.'] as const

export function Contact() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)

  // Contact is lazy-loaded; refresh ScrollTrigger once the chunk mounts.
  useEffect(() => {
    scheduleScrollTriggerRefresh(80)
  }, [])

  useGSAP(
    () => {
      const copy = copyRef.current
      if (!copy) return

      const q = gsap.utils.selector(copy)
      const pick = (selector: string) => {
        const nodes = q(selector)
        return nodes.length ? nodes : null
      }

      const preline = pick('.contact-journey-preline')
      const ornaments = pick('.contact-journey-headline-ornament span')
      const lines = pick('.contact-journey-headline-inner')
      const accentBar = pick('.contact-journey-headline-accent-bar')
      const glow = pick('.contact-journey-headline-glow')
      const body = pick('.contact-journey-body')

      if (reduced) {
        forceRevealVisible(preline, ornaments, lines, accentBar, glow, body)
        return
      }

      if (preline) gsap.set(preline, { opacity: 0, y: 16 })
      if (ornaments) gsap.set(ornaments, { scaleX: 0, opacity: 0 })
      if (accentBar) gsap.set(accentBar, { scaleX: 0, opacity: 0 })
      if (glow) gsap.set(glow, { opacity: 0, scale: 0.88 })
      if (body) gsap.set(body, { opacity: 0, y: 18 })

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: copy,
          start: 'top 94%',
          once: true,
          invalidateOnRefresh: true,
        },
      })

      if (preline) tl.to(preline, { opacity: 1, y: 0, duration: 0.65 })
      if (ornaments) {
        tl.to(ornaments, { scaleX: 1, opacity: 1, duration: 0.8, stagger: 0.07 }, '-=0.35')
      }
      if (lines) {
        tl.from(lines, { y: 24, opacity: 0, duration: 0.85, stagger: 0.1 }, '-=0.45')
      }
      if (glow) {
        tl.to(glow, { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' }, '-=0.55')
      }
      if (accentBar) {
        tl.to(accentBar, { scaleX: 1, opacity: 1, duration: 0.75, ease: 'power2.inOut' }, '-=0.5')
      }
      if (body) tl.to(body, { opacity: 1, y: 0, duration: 0.7 }, '-=0.35')

      return bindRevealTimeline(tl, copy, { fallbackMs: 900, viewportRatio: 0.96 })
    },
    { scope: sectionRef, dependencies: [reduced] },
  )

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="contact-journey contact-journey--merged"
      aria-label="שלב אחרון — התחלת תהליך ההרשמה"
    >
      <div className="container-site">
        <div className="contact-journey-finale">
          <div ref={copyRef} className="contact-journey-copy">
            <p className="contact-journey-preline">{JOURNEY_FINALE_PRELINE}</p>

            <div className="contact-journey-headline-wrap">
              <div className="contact-journey-headline-ornament" aria-hidden>
                <span />
                <span />
              </div>

              <h2 className="contact-journey-headline" aria-label={JOURNEY_FINALE_HEADLINE}>
                <span className="contact-journey-headline-glow" aria-hidden />
                {HEADLINE_LINES.map((line, index) => {
                  const isAccent = index === HEADLINE_LINES.length - 1
                  return (
                    <span
                      key={line}
                      className={cn(
                        'contact-journey-headline-line',
                        isAccent && 'contact-journey-headline-line--accent',
                      )}
                    >
                      <span
                        className={cn(
                          'contact-journey-headline-inner',
                          isAccent && 'contact-journey-headline-inner--accent',
                        )}
                      >
                        {line}
                      </span>
                    </span>
                  )
                })}
                <span className="contact-journey-headline-accent-bar" aria-hidden />
              </h2>
            </div>

            <p className="contact-journey-body contact-journey-body--dark">{JOURNEY_FINALE_BODY}</p>
          </div>

          <motion.div
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE, delay: reduced ? 0 : 0.1 }}
            className="contact-journey-actions"
          >
            <Button
              asChild
              variant="burgundy"
              size="lg"
              className="group btn-burgundy-glow contact-journey-cta h-14 rounded-full px-9 text-base font-semibold md:px-10 md:text-lg"
            >
              <LeadPopupTrigger>{LEAD_FLOW_CTA_LABEL}</LeadPopupTrigger>
            </Button>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="contact-journey-whatsapp h-9 rounded-full border border-primary/20 bg-white/60 px-5 text-xs font-medium text-primary hover:border-burgundy/35 hover:bg-white/85 hover:text-burgundy"
            >
              <a
                href={whatsAppUrl(WHATSAPP_FLOAT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {JOURNEY_FINALE_WHATSAPP_CTA}
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
