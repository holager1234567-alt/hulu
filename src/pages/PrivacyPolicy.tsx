import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Logo } from '@/components/layout/Logo'
import { Footer } from '@/components/layout/Footer'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-svh bg-white dark:bg-[#0a0a0a]">
      <header className="border-b border-neutral-100 dark:border-white/10">
        <div className="container-site flex items-center justify-between py-5">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-burgundy dark:text-white/70 dark:hover:text-gold"
          >
            <ArrowRight className="h-4 w-4" aria-hidden />
            חזרה לדף הבית
          </Link>
          <Link to="/" className="logo-hover shrink-0">
            <Logo className="h-10 w-auto min-w-[120px] md:h-12 md:min-w-[140px]" />
          </Link>
        </div>
      </header>

      <main className="section-pad">
        <article className="container-site mx-auto max-w-4xl">
          <header className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-primary dark:text-white md:text-4xl">
              מדיניות פרטיות ותנאי הגנת מידע
            </h1>
            <p className="mt-2 text-sm text-muted dark:text-white/60">
              תאריך עדכון אחרון: אוגוסט 2026
            </p>
          </header>

          <section className="space-y-8 text-right leading-relaxed">
            <p className="text-primary/90 dark:text-white/85">
              ברוכים הבאים לאתר <strong>HULU WEB DESIGNER</strong> (להלן:{' '}
              <strong>&quot;העסק&quot;</strong> או <strong>&quot;האתר&quot;</strong>).
              העסק מכבד את פרטיותם של המשתמשים והמבקרים באתר ומחויב להגן על המידע
              האישי שנמסר לו או שנאסף במהלך הגלישה והשימוש באתר.
            </p>
            <p className="text-primary/90 dark:text-white/85">
              מדיניות פרטיות זו מפרטת את האופן שבו העסק אוסף, משתמש, שומר ומגן על
              המידע האישי שלך, וכן מבהירה את זכויותיך על פי דין, ובפרט בהתאם לחוק
              הגנת הפרטיות, התשמ&quot;א-1981 ותיקון 13 לו.
            </p>

            <hr className="tech-divider" aria-hidden />

            <div>
              <h2 className="privacy-heading">1. סוגי המידע הנאספים באתר</h2>
              <ul className="privacy-list text-muted dark:text-white/65">
                <li>
                  <strong>מידע אישי שנמסר באופן אקטיבי:</strong> שם מלא, כתובת
                  דוא&quot;ל, מספר טלפון וכל מידע שתזינו בטפסי יצירת קשר או שאלון
                  אפיון.
                </li>
                <li>
                  <strong>מידע טכני ונתוני גלישה:</strong> כתובת IP, סוג דפדפן,
                  מערכת הפעלה, זמן שהייה ודפים שנצפו.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="privacy-heading">2. מטרות השימוש במידע</h2>
              <p className="text-muted dark:text-white/65">
                מתן שירות ויצירת קשר (מענה לפניות, אפיון פרויקטים, הצעות מחיר),
                תפעול ושיפור האתר, ושיווק ודיוור ישיר (בכפוף להסכמתך).
              </p>
            </div>

            <div>
              <h2 className="privacy-heading">3. קבצי מעקב ו-Cookies</h2>
              <p className="text-muted dark:text-white/65">
                האתר משתמש בעוגיות הכרחיות, אנליטיות ושיווקיות (כגון Google
                Analytics ו-Meta Pixel). באפשרותך לחסום או למחוק עוגיות דרך הגדרות
                הדפדפן.
              </p>
            </div>

            <div>
              <h2 className="privacy-heading">4. העברת מידע לצדדים שלישיים</h2>
              <p className="text-muted dark:text-white/65">
                המידע לא יועבר לצד שלישי למעט ספקי שירות תפעוליים (אחסון, מערכות
                דיוור, אנליטיקה), דרישה משפטית, או להגנה על זכויות העסק.
              </p>
            </div>

            <div>
              <h2 className="privacy-heading">5. משך החזקת המידע</h2>
              <p className="text-muted dark:text-white/65">
                המידע יישמר רק למשך הזמן הנדרש למימוש המטרות שלשמן נאסף או כנדרש על
                פי דין, ולאחר מכן יימחק.
              </p>
            </div>

            <div>
              <h2 className="privacy-heading">6. זכויות המשתמש (כולל תיקון 13)</h2>
              <p className="mb-3 text-muted dark:text-white/65">
                עומדות לך הזכויות לעיין במידע, לבקש תיקון או מחיקה, ולהתנגד לשימוש
                לדיוור ישיר.
              </p>
              <div className="rounded-lg border border-burgundy/15 bg-surface p-4 dark:border-gold/20 dark:bg-white/5">
                <strong className="text-primary dark:text-white">לתשומת לבך:</strong>{' '}
                <span className="text-muted dark:text-white/65">
                  תיקון 13 לחוק הגנת הפרטיות מעניק זכות לתבוע פיצוי כספי של עד
                  10,000 ₪ ללא הוכחת נזק במקרים מוגדרים של הפרת הוראות החוק.
                </span>
              </div>
            </div>

            <div>
              <h2 className="privacy-heading">7. אבטחת מידע</h2>
              <p className="text-muted dark:text-white/65">
                העסק נוקט באמצעי אבטחה מקובלים להגנה על המידע, אך אינו יכול להבטיח
                חסינות מוחלטת מפני אירועי אבטחה ברשת.
              </p>
            </div>

            <div className="border-t border-neutral-100 pt-6 dark:border-white/10">
              <h2 className="privacy-heading">8. יצירת קשר</h2>
              <ul className="privacy-list privacy-list-plain space-y-1 text-sm text-muted dark:text-white/65">
                <li>
                  <strong className="text-primary dark:text-white">שם העסק:</strong>{' '}
                  HULU WEB DESIGNER
                </li>
                <li>
                  <strong className="text-primary dark:text-white">דוא&quot;ל:</strong>{' '}
                  <a
                    href="mailto:hulu.web.designer@gmail.com"
                    className="privacy-link"
                  >
                    hulu.web.designer@gmail.com
                  </a>
                </li>
                <li>
                  <strong className="text-primary dark:text-white">טלפון:</strong>{' '}
                  <a href="tel:0533402891" className="privacy-link" dir="ltr">
                    053-3402891
                  </a>
                </li>
                <li>
                  <strong className="text-primary dark:text-white">כתובת:</strong>{' '}
                  צה&quot;ל 20/1, חדרה
                </li>
                <li>
                  <strong className="text-primary dark:text-white">ממונה DPO:</strong>{' '}
                  לא מונה, ניתן לפנות ישירות בדוא&quot;ל.
                </li>
              </ul>
            </div>
          </section>

          <footer className="mt-12 border-t border-neutral-100 pt-8 dark:border-white/10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-burgundy transition-colors hover:text-burgundy/80 dark:text-gold dark:hover:text-gold/80"
            >
              <ArrowRight className="h-4 w-4" aria-hidden />
              חזרה לדף הבית
            </Link>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  )
}
