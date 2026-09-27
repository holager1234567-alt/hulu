import type { AnchorHTMLAttributes, ReactNode } from 'react'

import { WhatsAppCta } from '@/components/ui/WhatsAppCta'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { cn } from '@/lib/utils'

type CtaButtonProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'> & {
  children: ReactNode
  tone?: 'wine' | 'cream'
  size?: 'sm' | 'md' | 'lg'
}

/** WhatsApp CTA with the magnetic hover, sheen and icon badge. */
export function CtaButton({ children, tone = 'wine', size = 'md', className, ...rest }: CtaButtonProps) {
  return (
    <WhatsAppCta
      className={cn(
        'editorial-pill lux-cta',
        tone === 'cream' && 'editorial-pill--light',
        size === 'sm' && 'editorial-pill--sm',
        size === 'lg' && 'editorial-pill--lg',
        className,
      )}
      data-magnetic=""
      {...rest}
    >
      <span className="lux-cta-inner" data-magnetic-inner="">
        <span className="lux-cta-label">{children}</span>
        <span className="lux-cta-icon" aria-hidden>
          <WhatsAppIcon />
        </span>
      </span>
    </WhatsAppCta>
  )
}
