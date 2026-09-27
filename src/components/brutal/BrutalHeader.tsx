import { useState } from 'react'
import { Menu, X } from 'lucide-react'

import { interactiveMotion } from '@/components/brutal/motion'
import { WhatsAppCta } from '@/components/ui/WhatsAppCta'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

export const BRUTAL_NAV = site.nav

const pillClass = cn(
  'inline-flex items-center gap-1.5 rounded-full border border-cream/15 px-3 py-1.5 text-sm font-medium text-cream no-underline hover:border-crimson hover:bg-oxblood/40 hover:text-cream',
  interactiveMotion,
)

function NavPill({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  return (
    <a href={href} onClick={onClick} className={pillClass}>
      <span className="font-mono text-xs" aria-hidden>
        +
      </span>
      {label}
    </a>
  )
}

export function BrutalHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-burgundy-deep/95 backdrop-blur-md">
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6">
        <a href="#top" dir="ltr" className="flex items-center justify-self-start gap-3 no-underline" aria-label={site.chrome.home}>
          <span className="font-mono text-lg font-bold tracking-tight text-cream">{site.chrome.wordmark}</span>
          <span className="inline-block size-2 rounded-full bg-crimson" aria-hidden />
          <span className="hidden font-mono text-xs tracking-wider text-tan uppercase sm:inline-block">{site.chrome.engine}</span>
        </a>

        <nav className="hidden items-center justify-center gap-3 justify-self-center md:flex" aria-label={site.chrome.mainNav}>
          {BRUTAL_NAV.map((link) => (
            <NavPill key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-2">
          <WhatsAppCta
            className={cn(
              'rounded-full bg-cream px-4 py-2 text-sm font-semibold text-ink no-underline hover:bg-oxblood hover:text-cream',
              interactiveMotion,
            )}
          >
            {site.headerCta}
          </WhatsAppCta>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? site.chrome.closeMenu : site.chrome.openMenu}
            aria-expanded={open}
            className={cn(
              'inline-grid size-9 place-items-center rounded-full border border-cream/15 text-cream hover:border-crimson md:hidden [&_svg]:size-4',
              interactiveMotion,
            )}
          >
            {open ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="flex flex-wrap justify-center gap-2 border-t border-cream/10 px-6 pt-3 pb-4 md:hidden" aria-label={site.chrome.mobileNav}>
          {BRUTAL_NAV.map((link) => (
            <NavPill key={link.href} href={link.href} label={link.label} onClick={() => setOpen(false)} />
          ))}
        </nav>
      ) : null}
    </header>
  )
}
