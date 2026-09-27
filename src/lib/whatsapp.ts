import { site } from '@/content/site'

export const WHATSAPP_PHONE = site.whatsapp.phone

export const WHATSAPP_CTA_MESSAGE = site.whatsapp.ctaMessage

export const WHATSAPP_CONTACT_MESSAGE = site.whatsapp.contactMessage

export const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_PHONE}`

export function whatsAppUrl(text: string) {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`
}

export const WHATSAPP_CTA_URL = whatsAppUrl(WHATSAPP_CTA_MESSAGE)
