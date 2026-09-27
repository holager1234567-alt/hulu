import { useState } from 'react'
import { Menu, X } from 'lucide-react'

import { WhatsAppCta } from '@/components/ui/WhatsAppCta'

export const NIGHT_NAV = [
  { href: '#services', label: 'שירותים' },
  { href: '#process', label: 'איך זה עובד' },
  { href: '#works', label: 'פרויקטים' },
  { href: '#vision', label: 'החזון' },
]

export function NightHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-night-line bg-night/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-6">
        <a href="#top" dir="ltr" className="flex items-center gap-3 no-underline" aria-label="הולו, חזרה לראש העמוד">
          <span className="text-2xl font-bold tracking-tight text-cream">HULU</span>
          <span className="inline-block size-2 rounded-full bg-sand" aria-hidden />
        </a>

        <nav className="hidden items-center gap-10 text-sm text-mist md:flex" aria-label="ראשי">
          {NIGHT_NAV.map((link) => (
            <a key={link.href} href={link.href} className="text-mist no-underline transition-colors hover:text-cream">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppCta className="rounded-[8px] bg-cream px-5 py-2.5 text-sm font-semibold text-night no-underline shadow-sm transition-all hover:bg-sand">
            בואי נבנה דמו
          </WhatsAppCta>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'סגירת תפריט' : 'פתיחת תפריט'}
            aria-expanded={open}
            className="inline-grid size-10 place-items-center rounded-[8px] border border-night-line text-mist transition-colors hover:border-sand hover:text-cream md:hidden [&_svg]:size-5"
          >
            {open ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-night-line px-6 pt-2 pb-4 md:hidden" aria-label="תפריט נייד">
          {NIGHT_NAV.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-[8px] px-3 py-3 text-base text-mist no-underline transition-colors hover:bg-night-card hover:text-cream"
            >
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  )
}
