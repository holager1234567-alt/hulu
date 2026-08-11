import { ArrowLeft } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { LEAD_FLOW_ANCHOR, LEAD_FLOW_CTA_LABEL } from '@/lib/waveForms'
import { EASE, viewportOnce } from '@/lib/motion'
import { WHATSAPP_FLOAT_MESSAGE, whatsAppUrl } from '@/lib/whatsapp'

const WHATSAPP_OUTLINE_CTA = 'אפשר לדבר גם בווצאפ'

export function PreFooterCta() {
  const reduced = useReducedMotion()

  return (
    <section className="pre-footer-cta relative overflow-x-clip bg-section-surface">
      <div className="container-site relative z-10">
        <motion.div
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="mb-6 h-12 rounded-full border border-black/80 bg-transparent px-8 text-base font-medium text-primary hover:bg-black/[0.03] hover:text-primary dark:border-white/70 dark:text-white dark:hover:bg-white/5"
          >
            <a href={whatsAppUrl(WHATSAPP_FLOAT_MESSAGE)} target="_blank" rel="noopener noreferrer">
              {WHATSAPP_OUTLINE_CTA}
            </a>
          </Button>

          <p className="font-display text-2xl font-bold leading-snug text-primary md:text-3xl dark:text-white">
            יש לך עסק.
            <span className="mt-1 block">עכשיו הגיע הזמן לתת לו אתר שעובד.</span>
          </p>

          <Button
            asChild
            variant="burgundy"
            size="lg"
            className="group btn-burgundy-glow mt-8 h-12 rounded-full px-8 text-base font-semibold"
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
      </div>
    </section>
  )
}
