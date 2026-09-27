import { forwardRef, type AnchorHTMLAttributes } from 'react'

import { WHATSAPP_CTA_URL } from '@/lib/whatsapp'

export const WhatsAppCta = forwardRef<
  HTMLAnchorElement,
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>
>(function WhatsAppCta(props, ref) {
  return (
    <a ref={ref} href={WHATSAPP_CTA_URL} target="_blank" rel="noopener noreferrer" {...props} />
  )
})

WhatsAppCta.displayName = 'WhatsAppCta'
