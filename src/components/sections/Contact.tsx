import { motion, useReducedMotion } from 'framer-motion'
import { LeadPopupTrigger } from '@/components/forms/LeadPopup'
import { Button } from '@/components/ui/button'
import { EASE, viewportOnce } from '@/lib/motion'
import { LEAD_FLOW_CTA_LABEL } from '@/lib/waveForms'

import { WHATSAPP_FLOAT_MESSAGE, whatsAppUrl } from '@/lib/whatsapp'

const JOURNEY_FINALE_PRELINE = 'אני חושבת שאת יודעת....'
const JOURNEY_FINALE_HEADLINE = 'שהגיע הזמן לתת לעסק שלך אתר שעובד.'
const JOURNEY_FINALE_BODY =
  'עני על כמה שאלות קצרות, ואבין איפה העסק שלך נמצא היום ומה האתר שלך צריך כדי להתחיל לעבוד בשבילך.'
const JOURNEY_FINALE_WHATSAPP_CTA = 'אפשר לדבר גם בווצאפ'

export function Contact() {
  const reduced = useReducedMotion()

  return (
    <section
      id="contact"
      className="contact-journey contact-journey--merged"
      aria-label="שלב אחרון — התחלת תהליך ההרשמה"
    >
      <div className="container-site">
        <motion.div
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.75, ease: EASE }}
          className="contact-journey-finale"
        >
          <div className="contact-journey-copy">
            <p className="contact-journey-preline">{JOURNEY_FINALE_PRELINE}</p>
            <h2 className="contact-journey-headline-main">{JOURNEY_FINALE_HEADLINE}</h2>
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
        </motion.div>
      </div>
    </section>
  )
}
