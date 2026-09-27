import { WhatsAppCta } from '@/components/ui/WhatsAppCta'

const before = [
  'מסבירות את אותו הדבר עשרות פעמים',
  'לידים קרים ששואלים רק על מחיר',
  '"אני אחשוב על זה"',
  'הכנסה שתלויה בזמינות שלך',
] as const

const after = [
  'הדף עונה על השאלות לפני שהן נשאלות',
  'לקוחות שמגיעות מחוממות ומבינות את הערך',
  '"איך מתחילים?"',
  'נכס שעובד גם כשאת לא',
] as const

export function EditorialVision() {
  return (
    <section id="vision" className="editorial-vision" aria-labelledby="editorial-vision-heading">
      <div className="editorial-vision-inner">
        <h2 id="editorial-vision-heading" className="editorial-section-heading">
          ומה אם הלקוחה הייתה מגיעה אלייך
          <br />
          כשהיא כבר יודעת שהיא רוצה אותך?
        </h2>
        <p className="editorial-section-lead">
          דף נחיתה מקצועי עושה את מה שאת עושה בשיחה של שעה, רק לבד, מסביב לשעון. הוא מציג את
          הערך שלך, עונה על השאלות, מסיר התלבטויות ובונה סמכות מהשנייה הראשונה.
        </p>

        <div className="editorial-compare">
          <div className="editorial-compare-col editorial-compare-col--before">
            <h3>בלי נכס דיגיטלי</h3>
            <ul>
              {before.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="editorial-compare-col editorial-compare-col--after">
            <img
              src="/images/editorial-nail.png"
              alt=""
              className="editorial-value-card-nail"
              aria-hidden
              width={232}
              height={281}
              decoding="async"
            />
            <h3>עם דף נחיתה ממיר</h3>
            <ul>
              {after.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="editorial-section-strong">
          כשהדף עושה את החימום, את נשארת עם החלק שאת הכי טובה בו, לעבוד עם הלקוחות שלך.
        </p>

        <div className="editorial-section-cta">
          <WhatsAppCta className="editorial-pill">אני רוצה לראות איך זה ייראה אצלי</WhatsAppCta>
        </div>
      </div>
    </section>
  )
}
