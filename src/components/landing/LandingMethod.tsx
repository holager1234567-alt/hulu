import { PinnedCard } from '@/components/ui/PinnedCard'

const steps = [
  {
    label: 'שלב ראשון',
    body: 'שאלון קצר של עשר דקות שבו את מספרת לנו על העסק',
    physics: { phase: 0, wind: -0.9, speed: 0.55 },
  },
  {
    label: 'שלב שני',
    body: 'דמו מעוצב בשיחת זום קצרה של עשרים דקות מול אופיר להצגת הקונספט ומענה על שאלות',
    physics: { phase: 1.7, wind: 0.9, speed: 0.61 },
  },
  {
    label: 'שלב שלישי',
    body: 'סשן עבודה ושדרוג יחד איתי לדף המושלם שמתחיל לעבוד בשבילך',
    physics: { phase: 3.4, wind: -0.9, speed: 0.67 },
  },
] as const

export function LandingMethod() {
  return (
    <section id="method" className="lp-section lp-method" aria-labelledby="lp-method-title">
      <div className="lp-container">
        <header className="lp-section-head">
          <p className="lp-eyebrow" data-reveal="">
            תהליך בלי חיכוך
          </p>
          <h2 id="lp-method-title" className="lp-heading" data-split="">
            איך זה עובד
          </h2>
          <p className="lp-lead" data-reveal="">
            שלושה צעדים פשוטים, ואת בדרך לנכס דיגיטלי שעובד בשבילך
          </p>
        </header>

        <ol className="lp-steps">
          {steps.map((step, index) => (
            <PinnedCard
              key={step.label}
              as="li"
              className="lp-step"
              bodyClassName="lp-step-card"
              physics={step.physics}
            >
              <span className="lp-step-number" dir="ltr" aria-hidden>
                0{index + 1}
              </span>
              <h3 className="lp-step-title">{step.label}</h3>
              <p className="lp-step-body">{step.body}</p>
            </PinnedCard>
          ))}
        </ol>
      </div>
    </section>
  )
}
