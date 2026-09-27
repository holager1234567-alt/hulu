import { useEffect, useState } from 'react'
import { ArrowLeft, Menu, X } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { WhatsAppCta } from '@/components/ui/WhatsAppCta'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useHeaderScrollState } from '@/hooks/useHeaderScrollState'
import { useIsMobile } from '@/hooks/useIsMobile'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

export const NAV_LINKS = site.legalFooter.links

export function Header() {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const { visible } = useHeaderScrollState()

  useBodyScrollLock(isMobile && open)

  useEffect(() => {
    if (!visible) setOpen(false)
  }, [visible])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b border-champagne/40 bg-cream/80 font-assistant backdrop-blur-xl transition-transform duration-500 ease-luxury',
        !visible && 'pointer-events-none -translate-y-full',
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[76rem] items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href="#top"
          dir="ltr"
          aria-label={site.chrome.home}
          className="font-lux text-[1.35rem] font-bold tracking-[0.32em] text-wine no-underline"
        >
          {site.chrome.wordmark}
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label={site.chrome.mainNav}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-[0.98rem] font-semibold text-espresso/75 no-underline transition-colors after:absolute after:inset-x-0 after:-bottom-1.5 after:h-px after:origin-center after:scale-x-0 after:bg-wine after:transition-transform after:duration-500 after:ease-luxury hover:text-wine hover:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppCta className={cn(buttonVariants({ size: 'sm' }), 'px-5')}>{site.header.talk}</WhatsAppCta>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? site.chrome.closeMenu : site.chrome.openMenu}
            aria-expanded={open}
            className="inline-grid size-10 place-items-center rounded-full border border-rosegold/30 text-wine transition-colors hover:bg-wine/5 lg:hidden [&_svg]:size-5"
          >
            {open ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="mx-4 mb-4 rounded-3xl border border-rosegold/30 bg-ivory p-3 shadow-[0_24px_48px_-28px_rgb(37_7_13/0.35)] lg:hidden">
          <nav className="flex flex-col gap-0.5" aria-label={site.chrome.mobileNav}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-[1.05rem] font-semibold text-wine no-underline hover:bg-alabaster"
              >
                {link.label}
              </a>
            ))}
            <WhatsAppCta className={cn(buttonVariants(), 'mt-2 w-full')} onClick={() => setOpen(false)}>
              {site.header.demo}
              <ArrowLeft aria-hidden />
            </WhatsAppCta>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
