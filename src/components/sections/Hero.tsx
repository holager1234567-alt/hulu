import { CtaButton } from '@/components/ui/CtaButton'
import { HERO_CTA_LABEL } from '@/lib/waveForms'

const PORTRAIT = '/images/hulu-editorial-hero.png?v=2'
const HERO_ARROW = '/images/hero-arrow.png'

/** PNG doodle arrow. Default = source orientation (right side). Flip for left side. */
function ArrowImage({ flip = false }: { flip?: boolean }) {
  return (
    <img
      className={
        flip
          ? 'editorial-arrow editorial-arrow-img editorial-arrow-img--flip'
          : 'editorial-arrow editorial-arrow-img'
      }
      src={HERO_ARROW}
      alt=""
      width={194}
      height={216}
      decoding="async"
      aria-hidden
    />
  )
}

export function Hero() {
  return (
    <section id="top" className="editorial-hero">
      <div className="editorial-hero-grid">
        <h1 className="editorial-hero-title" aria-label="It's time to make money.">
          <span className="editorial-hero-title-line">It&apos;s time to</span>
          <span className="editorial-hero-title-line">make money</span>
        </h1>

        <aside className="editorial-side editorial-side--start">
          <div className="editorial-callout editorial-callout--start editorial-callout--start-top">
            <p>
              בניית אתר או דף נחיתה יוקרתי וממגנט שעונה בשבילך על כל השאלות, מסנן התלבטויות ומייצר לך מכירות מסביב לשעון
            </p>
            <ArrowImage flip />
          </div>
          <div className="editorial-callout editorial-callout--start editorial-callout--start-bottom">
            <p>
              הגיע הזמן לנכס דיגיטלי שלוקח על עצמו 80% מתהליך המכירה וסוגר לקוחות עוד לפני השיחה הראשונה
            </p>
            <ArrowImage flip />
          </div>
        </aside>

        <figure className="editorial-hero-figure">
          <img
            className="editorial-hero-photo"
            src={PORTRAIT}
            alt="הולו, מעצבת אתרים"
            width={900}
            height={1200}
            decoding="async"
            fetchPriority="high"
          />
          <figcaption className="editorial-hero-caption" dir="rtl">
            מפתחת אתרים
            <br />
            ודפי נחיתה
            <br />
            והשותפה לצמיחה שלך
          </figcaption>
        </figure>

        <aside className="editorial-side editorial-side--end">
          <div className="editorial-callout editorial-callout--portrait">
            <ArrowImage />
            <p>
              פיתוח אתרים ודפי נחיתה לבעלות עסק שרוצות לגדול בלי להישחק
            </p>
          </div>
        </aside>

        <div className="editorial-hero-cta">
          <CtaButton>{HERO_CTA_LABEL}</CtaButton>
        </div>
      </div>
    </section>
  )
}
