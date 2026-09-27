import { Link, useLocation } from 'react-router-dom'

import { site } from '@/content/site'
import { WhatsAppCta } from '@/components/ui/WhatsAppCta'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'

const linkClass = 'text-cream/70 no-underline transition-colors duration-300 hover:text-champagne'

export function Footer() {
  const { pathname } = useLocation()
  const prefix = pathname === '/' ? '' : '/'

  return (
    <footer className="bg-wine-deep font-assistant text-cream/70">
      <div className="mx-auto grid w-full max-w-[76rem] gap-12 px-5 pt-16 pb-12 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] md:gap-10">
        <div className="flex flex-col items-start gap-4">
          <a href={`${prefix}#top`} dir="ltr" className="font-lux text-[1.6rem] font-bold tracking-[0.32em] text-cream no-underline">
            {site.chrome.wordmark}
          </a>
          <p className="m-0 max-w-[22rem] text-[0.98rem] leading-[1.7]">{site.legalFooter.blurb}</p>
          <WhatsAppCta className="mt-1 inline-flex items-center gap-2.5 rounded-full border border-champagne/25 px-4 py-2 text-[0.95rem] font-bold text-cream no-underline transition-colors hover:border-champagne/60 hover:text-champagne [&_svg]:size-4">
            <WhatsAppIcon />
            <span dir="ltr">{site.legalFooter.phone}</span>
          </WhatsAppCta>
        </div>

        <nav aria-label={site.legalFooter.navAria}>
          <p className="m-0 mb-4 text-sm font-extrabold tracking-wide text-champagne">{site.legalFooter.navLabel}</p>
          <ul className="m-0 grid list-none gap-2.5 p-0 text-[0.98rem] font-semibold">
            {site.legalFooter.links.map((link) => (
              <li key={link.href}>
                <a href={`${prefix}${link.href}`} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="m-0 mb-4 text-sm font-extrabold tracking-wide text-champagne">{site.legalFooter.infoLabel}</p>
          <ul className="m-0 grid list-none gap-2.5 p-0 text-[0.98rem] font-semibold">
            <li>
              <Link to="/privacy-policy" className={linkClass}>
                {site.footer.privacy}
              </Link>
            </li>
            <li>
              <Link to="/accessibility" className={linkClass}>
                {site.footer.accessibility}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-champagne/15">
        <p className="mx-auto m-0 w-full max-w-[76rem] px-5 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] text-center text-[0.82rem] text-cream/45 sm:px-8 sm:text-start">
          {site.legalFooter.rights(new Date().getFullYear())}
        </p>
      </div>
    </footer>
  )
}
