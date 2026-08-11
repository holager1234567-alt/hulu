import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { WaveFormsLeadFlow } from '@/components/forms/WaveFormsLeadFlow'
import { Button } from '@/components/ui/button'
import { SectionLuxuryBg } from '@/components/layout/SectionLuxuryBg'
import { LEAD_FLOW_ANCHOR, LEAD_FLOW_CTA_LABEL } from '@/lib/waveForms'
import { EASE, viewportOnce } from '@/lib/motion'

const CONTACT_HEADLINE_LEAD = 'לפני שבונים את האתר שלך'
const CONTACT_HEADLINE_ACCENT = 'בואי נראה איך הוא יכול להיראות.'
const CONTACT_BODY_LEAD = 'אתר דמו בחינם + שיחת אפיון אישית.'
const CONTACT_BODY_DETAIL =
  'נכיר את העסק שלך, נבין את הלקוחות והחזון שלך ונבנה כיוון ראשוני לאתר שמתאים לך.'
const CONTACT_FOOTNOTE = 'ללא התחייבות. מתחילות בשיחת אפיון.'

const contactHeadlineStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
}

const contactHeadlineLine = {
  hidden: {
    y: '108%',
    opacity: 0,
    filter: 'blur(5px)',
  },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: EASE },
  },
}

const contactHeadlineLineReduced = {
  hidden: { y: 0, opacity: 1, filter: 'blur(0px)' },
  visible: { y: 0, opacity: 1, filter: 'blur(0px)' },
}

const contactHeadlineDivider = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE, delay: 0.38 },
  },
}

const contactHeadlineDividerReduced = {
  hidden: { scaleX: 1, opacity: 1 },
  visible: { scaleX: 1, opacity: 1 },
}

function ContactHeadline() {
  const reduced = useReducedMotion()
  const lineVariants = reduced ? contactHeadlineLineReduced : contactHeadlineLine
  const dividerVariants = reduced ? contactHeadlineDividerReduced : contactHeadlineDivider

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={contactHeadlineStagger}
      className="contact-headline-wrap"
    >
      <h2 className="contact-headline">
        <span className="contact-headline-line contact-headline-line--lead">
          <motion.span variants={lineVariants} className="contact-headline-line-inner">
            {CONTACT_HEADLINE_LEAD}
          </motion.span>
        </span>
        <span className="contact-headline-line contact-headline-line--accent">
          <motion.span
            variants={lineVariants}
            className="contact-headline-line-inner contact-headline-accent"
          >
            <span className="contact-headline-glow" aria-hidden />
            <span className="contact-headline-accent-text">{CONTACT_HEADLINE_ACCENT}</span>
          </motion.span>
        </span>
      </h2>
      <motion.span
        variants={dividerVariants}
        className="contact-headline-divider"
        aria-hidden
      />
    </motion.div>
  )
}

export function Contact() {
  return (
    <section id="contact" className="contact-section section-pad relative overflow-x-clip bg-section-burgundy">
      <SectionLuxuryBg variant="burgundy" />
      <div className="contact-bottom-halo" aria-hidden />
      <div className="container-site relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <ContactHeadline />

          <div className="mx-auto mt-5 max-w-xl space-y-3 text-lg leading-relaxed text-white/70">
            <p>{CONTACT_BODY_LEAD}</p>
            <p>{CONTACT_BODY_DETAIL}</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.55, ease: EASE, delay: 0.06 }}
            className="mx-auto mt-8 flex justify-center"
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group h-12 rounded-full border-white/35 bg-white/10 px-8 text-base font-semibold text-white hover:bg-white/15 hover:text-white"
            >
              <a href={LEAD_FLOW_ANCHOR}>
                {LEAD_FLOW_CTA_LABEL}
                <ArrowLeft
                  className="size-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1.5"
                  aria-hidden
                />
              </a>
            </Button>
          </motion.div>

          <p className="mx-auto mt-4 max-w-md text-sm text-white/55">{CONTACT_FOOTNOTE}</p>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="mx-auto mt-10 max-w-xl md:mt-12"
          >
            <WaveFormsLeadFlow />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
