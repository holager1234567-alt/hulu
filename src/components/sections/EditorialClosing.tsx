import { SilkBackdrop } from '@/components/three/SilkBackdrop'
import { CtaButton } from '@/components/ui/CtaButton'

export function EditorialClosing() {
  return (
    <section id="contact" className="editorial-closing" aria-labelledby="editorial-closing-heading" data-surface="dark">
      <SilkBackdrop palette="wine" />
      <div className="editorial-closing-inner">
        <h2
          id="editorial-closing-heading"
          className="editorial-section-heading editorial-section-heading--light"
          data-split=""
        >
          מגיע לך עסק שעובד בשבילך,
          <br />
          לא עסק שאת עובדת בשבילו מסביב לשעון.
        </h2>
        <p className="editorial-closing-body">
          כל יום בלי נכס דיגיטלי הוא עוד שיחות מתישות, עוד הסברים חוזרים, ועוד לקוחה שהלכה
          למתחרה כי לא היה לה איפה להחליט.
        </p>
        <p className="editorial-closing-body editorial-closing-body--strong">
          10 דקות עכשיו, ואת צעד אחד קרוב יותר לעסק שמוכר גם כשאת לא זמינה.
        </p>

        <div className="editorial-section-cta">
          <CtaButton tone="cream" size="lg">
            אני רוצה להתחיל עם השאלון של 10 דקות
          </CtaButton>
          <p className="editorial-cta-note editorial-cta-note--light">
            דמו מעוצב לפני כל התחייבות · ליווי אישי עד שהדף מרגיש בדיוק כמוך
          </p>
        </div>
      </div>
    </section>
  )
}
