import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import huluProfile from '@/assets/hulu-portrait-v2.png'
import { SectionLuxuryBg } from '@/components/layout/SectionLuxuryBg'
import {
  EASE,
  fadeUpScale,
  springPop,
  staggerContainer,
  staggerItem,
  viewportOnce,
  viewportOnceTight,
} from '@/lib/motion'

const faqs = [
  {
    question: 'כמה זמן לוקח לבנות אתר?',
    answer:
      'רוב האתרים נבנים תוך 14 ימי עבודה, בכפוף למורכבות ולחומרים שתשלחו. לאורך הדרך תקבלו גרסאות לבדיקה.',
  },
  {
    question: 'מה כולל השירות?',
    answer:
      'אפיון, עיצוב מותאם, כתיבה, בנייה, התאמה למובייל והכנה להמשך. הכל בליווי אישי.',
  },
  {
    question: 'האם אפשר לבקש שינויים?',
    answer:
      'כן. במהלך התהליך כלולים עד 3 סבבי תיקונים, כדי שהתוצאה תרגיש מדויקת לעסק שלכם.',
  },
  {
    question: 'מה קורה אם עדיין אין לי תוכן?',
    answer:
      'זה בסדר. נעבור יחד על מה שיש, נבין מה חסר ונבנה כיוון גם לפני שיש את כל החומרים.',
  },
  {
    question: 'האם האתר עובד טוב במובייל?',
    answer:
      'כן. כל אתר נבנה Mobile First, עם דגש על מהירות, נוחות וקריאות במסכים קטנים.',
  },
  {
    question: 'מה קורה אחרי שהאתר עולה?',
    answer:
      'אפשר להמשיך עם ליווי, עדכונים ושיפורים לפי הצורך של העסק.',
  },
  {
    question: 'מה כולל הדמו החינמי?',
    answer:
      'שיחת אפיון אישית, הבנת העסק והכיוון, ובניית אתר דמו ראשוני שמראה איך זה יכול להיראות.',
  },
]

function FaqItem({
  question,
  answer,
  open,
  onToggle,
  reduced,
}: {
  question: string
  answer: string
  open: boolean
  onToggle: () => void
  reduced: boolean
}) {
  const id = question.replace(/\s+/g, '-').slice(0, 40)

  return (
    <motion.div
      layout={!reduced}
      className={cn(
        'rounded-2xl border border-neutral-200/80 bg-white/60 backdrop-blur-sm dark:border-white/10 dark:bg-white/5',
        open && 'border-burgundy/20',
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`faq-answer-${id}`}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start md:px-6 md:py-5"
      >
        <span className="text-base font-semibold text-primary dark:text-white md:text-lg">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={springPop}
        >
          <ChevronDown
            className="h-5 w-5 shrink-0 text-burgundy"
            strokeWidth={2}
            aria-hidden
          />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key={`faq-answer-${id}`}
            id={`faq-answer-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ ...springPop, delay: 0.05 }}
              className="flex items-end gap-2.5 px-4 pb-4 md:gap-3 md:px-5 md:pb-5"
              dir="ltr"
            >
              <motion.img
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={springPop}
                src={huluProfile}
                alt="הולו"
                className="h-8 w-8 shrink-0 rounded-full border border-neutral-200/80 bg-white object-cover object-top shadow-sm md:h-9 md:w-9"
              />
              <div className="relative max-w-[calc(100%-2.75rem)] md:max-w-[85%]">
                <span
                  className="absolute -start-1.5 bottom-3 block h-0 w-0 border-y-[7px] border-y-transparent border-e-[9px] border-e-[#5c1522] md:bottom-3.5"
                  aria-hidden
                />
                <div className="rounded-2xl rounded-bl-md bg-[#5c1522] px-3.5 py-2.5 text-white shadow-md md:px-4 md:py-3">
                  <p
                    dir="rtl"
                    className="text-sm leading-relaxed text-white md:text-[0.95rem]"
                  >
                    {answer}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function Faq() {
  const reduced = useReducedMotion()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="section-pad relative overflow-hidden bg-section-surface">
      <SectionLuxuryBg variant="surface" />
      <div className="container-site relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUpScale}
          className="mx-auto mb-12 max-w-3xl text-center md:mb-14"
        >
          <h2 className="font-display text-3xl font-bold text-burgundy md:text-4xl lg:text-[2.5rem]">
            שאלות ותשובות
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted dark:text-white/65">
            לפני שמתחילים, הנה התשובות לשאלות שעולות הכי הרבה.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnceTight}
          variants={staggerContainer}
          className="mx-auto flex max-w-3xl flex-col gap-3 md:gap-4"
        >
          {faqs.map((faq, i) => (
            <motion.div key={faq.question} variants={staggerItem}>
              <FaqItem
                question={faq.question}
                answer={faq.answer}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                reduced={!!reduced}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
