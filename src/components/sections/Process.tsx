import { motion } from 'framer-motion'
import {
  EASE,
  fadeUpScale,
  springPop,
  staggerContainer,
  staggerItem,
  viewportOnce,
  viewportOnceTight,
} from '@/lib/motion'

const steps = [
  {
    title: 'שיחת מכירה',
    text: 'הכרות ראשונית, הבנת הצרכים של העסק שלך והגדרת המטרות שלשמן אתה צריך את האתר.',
  },
  {
    title: 'פגישת אפיון ושליחת חומרים',
    text: 'פגישת זום ממוקדת שבה נגדיר את הויזן, המראה והסגנון הוויזואלי של האתר, לצד שליחת החומרים והתמונות הדרושים.',
  },
  {
    title: 'מקדמה וחתימת חוזה',
    text: 'מסדירים את תחילת העבודה באופן רשמי כדי לצאת לדרך בראש שקט.',
  },
  {
    title: 'פיתוח ובניית האתר (כ14 ימים)',
    text: 'תהליך העבודה נמשך כשבועיים (בתלות במורכבות הדרישות ובזמינות שליחת החומרים). לאורך התקופה יעברו אליך גרסאות ניסיון (טיוטות) של האתר לאישור, עם עד 3 סבבי תיקונים ושינויים לבחירתך.',
  },
  {
    title: 'השקת האתר וקידום ממומן',
    text: 'האתר יוצא לאוויר העולם, מוכן להתחיל לעבוד בשבילך ולהביא תוצאות, כולל חיבור ופרסום בקמפיינים ממומנים.',
  },
]

export function Process() {
  return (
    <section id="process" className="section-pad bg-section-process">
      <div className="container-site">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUpScale}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <h2 className="font-display text-3xl font-bold text-burgundy md:text-4xl lg:text-[2.5rem]">
            איך התהליך עובד? שלב אחר שלב
          </h2>
        </motion.div>

        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnceTight}
          variants={staggerContainer}
          className="mx-auto max-w-3xl"
        >
          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              variants={staggerItem}
              className="relative flex gap-5 pb-10 last:pb-0 md:gap-6"
            >
              {i < steps.length - 1 && (
                <motion.span
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 + 0.2, ease: EASE }}
                  className="process-timeline absolute start-[1.125rem] top-10 bottom-0 w-px origin-top md:start-[1.25rem]"
                  aria-hidden
                />
              )}

              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ ...springPop, delay: i * 0.08 }}
                className="process-step-indicator relative z-10 flex h-9 w-9 shrink-0 items-center justify-center bg-burgundy text-sm font-bold text-white md:h-10 md:w-10"
              >
                {i + 1}
              </motion.span>

              <div className="pt-0.5">
                <h3 className="text-lg font-semibold text-primary dark:text-white md:text-xl">
                  {step.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-muted dark:text-white/65">
                  {step.text}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
