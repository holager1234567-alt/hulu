import { Link } from 'react-router-dom'

export function NightFooter() {
  return (
    <footer className="border-t border-night-line bg-night-deep py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-mauve sm:flex-row">
        <p className="text-center sm:text-start">© כל הזכויות שמורות לסטודיו HULU, פיתוח אתרים ודפי נחיתה</p>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link to="/privacy-policy" className="text-mauve no-underline transition-colors hover:text-sand">
            מדיניות פרטיות
          </Link>
          <Link to="/accessibility" className="text-mauve no-underline transition-colors hover:text-sand">
            הצהרת נגישות
          </Link>
          <p dir="ltr" className="tracking-wide">
            HULU Web Designer &amp; Landing page
          </p>
        </div>
      </div>
    </footer>
  )
}
