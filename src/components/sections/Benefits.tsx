import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { SectionLuxuryBg } from '@/components/layout/SectionLuxuryBg'
import { EASE, fadeUpScale, viewportPainPoints } from '@/lib/motion'

const standardsData: {
  id: string
  title: string
  description: string
}[] = [
  {
    id: '01',
    title: 'קופירייטינג מדויק וממיר',
    description:
      'מילים לא נועדו רק למלא את המסך, הן נועדו לדבר ישירות אל הלב והצורך של הלקוח האידיאלי שלך. אני יוצרת עבורך רשת מסרים חדה, שמשדרת סמכות מקצועית ומובילה את הגולש יד ביד לעבר פעולה ברורה.',
  },
  {
    id: '02',
    title: 'אסטרטגיה עסקית ממוקדת',
    description:
      'אתר טוב הוא לא רק תערוכה ויזואלית, אלא מכונת לידים שקטה. כל פריסה, כפתור ומבנה מתוכננים בקפידה כדי לשרת את היעדים העסקיים שלך, למקסם את מסע הלקוח ולהבטיח החזר השקעה גבוה.',
  },
  {
    id: '03',
    title: 'טכנולוגיית עילית ומהירות',
    description:
      'בנייה על התשתיות המתקדמות ביותר בשוק (React & Vite), המבטיחות זמני טעינה מהירים במיוחד, ביצועים חלקים בכל מכשיר נייד או מחשב, והתאמה מושלמת לקידום אורגני וממומן.',
  },
  {
    id: '04',
    title: 'אסתטיקה ויוקרה ויזואלית',
    description:
      'העיצוב הדיגיטלי שלך הוא הרושם הראשוני על העסק. אני משלבת סטנדרטים עיצוביים בינלאומיים, מינימליזם נקי ונגיעות סטייל ייחודיות שגורמות למותג שלך לבלוט מעל כולם ולהיראות מיליון דולר.',
  },
  {
    id: '05',
    title: 'תהליך עבודה מדויק ויעיל',
    description:
      'שקיפות מלאה, ניהול זמנים קפדני (מסירה תוך כ14 יום) וליווי אישי צמוד לאורך כל הדרך. אנחנו עובדים בשיטה מסודרת שחוסכת לך זמן יקר ומביאה אותך לתוצאה המושלמת בראש שקט.',
  },
]

function HexBadge({ id, active }: { id: string; active?: boolean }) {
  return (
    <div className={`benefits-scroll-badge ${active ? 'benefits-scroll-badge--active' : ''}`}>
      <svg viewBox="0 0 32 32" className="benefits-scroll-badge-hex" aria-hidden>
        <polygon
          points="16,2 29,9 29,23 16,30 3,23 3,9"
          className="benefits-scroll-badge-shape"
        />
      </svg>
      <span className="benefits-scroll-badge-id font-mono-tech">{id}</span>
    </div>
  )
}

function BenefitsItem({
  item,
  index,
  reduced,
}: {
  item: (typeof standardsData)[number]
  index: number
  reduced: boolean
}) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })

  return (
    <motion.li
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      animate={reduced || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.55, ease: EASE, delay: reduced ? 0 : index * 0.05 }}
      className="benefits-scroll-item"
    >
      <div className="benefits-scroll-item-marker" aria-hidden>
        <HexBadge id={item.id} active={inView} />
        {index < standardsData.length - 1 ? (
          <span className="benefits-scroll-item-line" />
        ) : null}
      </div>

      <article className="benefits-scroll-card glass-card tech-corners tech-corners-light">
        <span className="benefits-scroll-card-num font-mono-tech md:hidden" aria-hidden>
          {item.id}
        </span>
        <h3 className="benefits-scroll-card-title">{item.title}</h3>
        <p className="benefits-scroll-card-text">{item.description}</p>
      </article>
    </motion.li>
  )
}

export function Benefits() {
  const reduced = !!useReducedMotion()

  return (
    <section
      id="why"
      className="benefits-section benefits-section--scroll section-pad relative w-full overflow-hidden px-4 text-primary md:px-8"
    >
      <SectionLuxuryBg variant="benefits" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={viewportPainPoints}
          variants={fadeUpScale}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-2xl font-extrabold tracking-tight text-primary md:text-4xl lg:text-5xl dark:text-white">
            הסטנדרטים הגבוהים שהעסק שלך ראוי להם
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted md:mt-5 md:text-base dark:text-white/60">
            כל פרויקט נשען על חמש עמודות תווך שמבטיחות אתר שעובד, נראה מצוין
            ומביא תוצאות.
          </p>
        </motion.header>

        <ol className="benefits-scroll-list mx-auto mt-10 max-w-2xl md:mt-14">
          {standardsData.map((item, index) => (
            <BenefitsItem
              key={item.id}
              item={item}
              index={index}
              reduced={reduced}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}
