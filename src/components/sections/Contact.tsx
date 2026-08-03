import { motion } from 'framer-motion'
import { LeadQualificationForm } from '@/components/forms/LeadQualificationForm'
import { SectionLuxuryBg } from '@/components/layout/SectionLuxuryBg'
import { EASE, fadeUpScale, viewportOnce } from '@/lib/motion'

export function Contact() {
  return (
    <section id="contact" className="section-pad relative overflow-hidden bg-section-burgundy">
      <SectionLuxuryBg variant="burgundy" />
      <div className="container-site relative z-10">
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
            מלאו את הטופס הקצר ונמשיך ישר ל-WhatsApp.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="mx-auto mt-10 max-w-xl md:mt-12"
          >
            <LeadQualificationForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
