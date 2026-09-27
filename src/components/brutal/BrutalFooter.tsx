import { Link } from 'react-router-dom'

import { interactiveMotion } from '@/components/brutal/motion'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

const legalLinkClass = cn('text-cream/55 no-underline hover:text-champagne', interactiveMotion)

export function BrutalFooter() {
  return (
    <footer className="border-t border-cream/10 bg-transparent py-10 text-cream/55">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 px-6 text-center text-xs sm:flex-row sm:flex-wrap">
        <p>{site.footer.rights}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link to="/privacy-policy" className={legalLinkClass}>
            {site.footer.privacy}
          </Link>
          <Link to="/accessibility" className={legalLinkClass}>
            {site.footer.accessibility}
          </Link>
          <div dir="ltr" className="flex items-center gap-2 font-mono uppercase">
            <span className="size-2 rounded-full bg-crimson" aria-hidden />
            <p className="text-cream/80">{site.chrome.englishLine}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
