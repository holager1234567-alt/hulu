import { WhatsAppCta } from '@/components/ui/WhatsAppCta'
import { EditorialPain } from '@/components/sections/EditorialPain'
import { EditorialPortfolio } from '@/components/sections/EditorialPortfolio'
import { LEAD_FLOW_CTA_LABEL } from '@/lib/waveForms'

export function EditorialStory() {
  return (
    <>
      <section id="about" className="editorial-intro" aria-labelledby="editorial-intro-heading">
        <div className="editorial-intro-inner">
          <p className="editorial-script">היי, אני הולו.</p>
          <h2 id="editorial-intro-heading">הייתי שם.</h2>

          <div className="editorial-intro-body">
            <div className="editorial-intro-copy">
              <p>
                שעות על שיחות מכירה, רדיפה אחרי "אני אחשוב על זה", והרגשה שהזמן שלי נשאב
                למקומות הלא נכונים.
              </p>
              <p>
                ואז הבנתי שהאתר צריך לעשות את הפסיכולוגיה. את החימום. את הביטחון. את ההחלטה.
                לא אני, בשיחה של שעה.
              </p>
              <p>
                היום אני בונה לבעלות עסקים דפי נחיתה ואתרים שעושים בדיוק את זה.
                <br />
                <span className="editorial-intro-emphasis">
                  אני מאמינה בכוח של נשים להרוויח בגדול.
                  <br />
                  ודיגיטל חכם הוא הדרך לעשות את זה בלי להישחק.
                </span>
              </p>
            </div>
          </div>

          <div className="editorial-intro-cta">
            <WhatsAppCta className="editorial-pill">{LEAD_FLOW_CTA_LABEL}</WhatsAppCta>
          </div>
        </div>
      </section>

      <EditorialPortfolio />

      <EditorialPain />
    </>
  )
}
