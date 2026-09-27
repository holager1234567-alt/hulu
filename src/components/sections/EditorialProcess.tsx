import { CtaButton } from '@/components/ui/CtaButton'
import { PinnedCard } from '@/components/ui/PinnedCard'

const steps = [
  {
    title: 'שאלון דיגיטלי של 10 דקות',
    body: 'את עונה על שאלון ממוקד, מתי שנוח לך. בלי ישיבות אינסופיות ובלי מסמכי אפיון. רק מה שבאמת צריך כדי להבין את העסק, הקהל וההצעה שלך.',
  },
  {
    title: 'דמו מעוצב ושיחת זום קצרה',
    body: 'אנחנו בונות לך דמו מעוצב של הדף. בשיחת זום של 20 עד 30 דקות, השותפה שלי מציגה לך אותו, ואת רואה בעיניים איך העסק שלך ייראה ברמה אחרת.',
  },
  {
    title: 'סשנים של ליטוש והתאמה',
    body: 'אחרי המקדמה, אנחנו נפגשות לסשנים משותפים. משדרגות, מלטשות ומדייקות כל פרט, עד שהדף מרגיש בדיוק כמוך, ומוכן להתחיל לסגור.',
  },
] as const

export function EditorialProcess() {
  const marquee = Array.from({ length: 8 }, (_, index) => (
    <span key={index}>3 שלבים פשוטים</span>
  ))

  return (
    <>
      <div className="editorial-marquee" aria-hidden>
        <div className="editorial-marquee-track">
          {marquee}
          {marquee}
        </div>
      </div>

      <section id="process" className="editorial-values" aria-labelledby="process-heading" data-surface="dark">
        <div className="editorial-values-light" />
        <h2
          id="process-heading"
          className="editorial-section-heading editorial-section-heading--light"
          data-split=""
        >
          אין פה פרויקט שגוזל ממך שעות.
          <br />
          יש 3 שלבים פשוטים.
        </h2>
        <div className="editorial-values-board editorial-values-board--steps">
          <ol className="editorial-values-grid editorial-values-grid--steps">
            {steps.map((step, index) => (
              <PinnedCard
                key={step.title}
                as="li"
                bodyClassName="editorial-value-card editorial-value-card--step"
                physics={{ phase: index * 1.7, wind: index % 2 ? 0.9 : -0.9, speed: 0.55 + index * 0.06 }}
              >
                <span className="editorial-step-number">שלב {index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </PinnedCard>
            ))}
          </ol>
        </div>

        <div className="editorial-values-footer">
          <p className="editorial-section-strong editorial-section-strong--light">
            10 דקות שלך בהתחלה. ואז אנחנו לוקחות את זה מכאן.
          </p>
          <div className="editorial-section-cta">
            <CtaButton tone="cream">מתחילות בשאלון של 10 דקות</CtaButton>
          </div>
        </div>
      </section>
    </>
  )
}
