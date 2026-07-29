import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EASE, fadeUpScale, viewportOnce } from '@/lib/motion'
import { WHATSAPP_CONTACT_MESSAGE, whatsAppUrl } from '@/lib/whatsapp'

export function Contact() {
  return (
    <section id="contact" className="section-pad bg-section-burgundy">
      <div className="container-site">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUpScale}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            בואו נבנה אתר שיעבוד בשבילך ושיתן לך תוצאות
          </h2>
          <p className="mt-4 text-lg text-white/65">
            כתבו לי בוואטסאפ ונתחיל לדבר.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="contact-glass-wrap tech-corners tech-corners-light mx-auto mt-10 md:mt-12"
          >
            <Button
              asChild
              variant="burgundy"
              size="lg"
              className="btn-icon-slide h-14 rounded-full px-10 text-lg shadow-elevated"
            >
              <a
                href={whatsAppUrl(WHATSAPP_CONTACT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle
                  className="h-5 w-5"
                  strokeWidth={1.5}
                  data-icon
                />
                שלחו הודעה בוואטסאפ
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
