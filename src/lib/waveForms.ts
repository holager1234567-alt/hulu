/**
 * Wave Forms embed configuration.
 * Set VITE_WAVE_FORMS_EMBED_URL in .env for the full external multi-step form.
 * Set VITE_CALENDLY_EMBED_URL (or legacy VITE_WAVE_FORMS_ZOOM_EMBED_URL) to override scheduling embed.
 * Set VITE_WAVE_FORMS_WEBHOOK_URL to POST lead data when step 2 completes.
 */

export const DEFAULT_CALENDLY_EVENT_PATH = 'hulu-web-designer/30min'

const CALENDLY_EMBED_STYLE_PARAMS =
  'hide_event_type_details=1&hide_gdpr_banner=1&background_color=1c1418&text_color=f7f2ee&primary_color=942839'

export type CalendarPrefill = {
  fullName?: string
  phone?: string
}

/** Build an inline Calendly embed URL (step 5). */
export function buildCalendarEmbedUrl(
  prefill: CalendarPrefill = {},
  baseOverride?: string,
): string {
  const rawBase =
    baseOverride?.trim() ||
    (typeof import.meta.env.VITE_CALENDLY_EMBED_URL === 'string'
      ? import.meta.env.VITE_CALENDLY_EMBED_URL.trim()
      : '') ||
    getWaveFormsZoomEmbedUrl() ||
    `https://calendly.com/${DEFAULT_CALENDLY_EVENT_PATH}`

  const url = new URL(rawBase.split('?')[0] ?? rawBase)

  const styleParams = new URLSearchParams(CALENDLY_EMBED_STYLE_PARAMS)
  styleParams.forEach((value, key) => url.searchParams.set(key, value))

  url.searchParams.set('embed_type', 'Inline')
  if (typeof window !== 'undefined' && window.location.hostname) {
    url.searchParams.set('embed_domain', window.location.hostname)
  }

  const name = prefill.fullName?.trim()
  if (name) url.searchParams.set('name', name)

  const phoneDigits = prefill.phone?.replace(/\D/g, '') ?? ''
  if (phoneDigits) url.searchParams.set('a1', phoneDigits)

  return url.toString()
}

export function getWaveFormsEmbedUrl(): string | undefined {
  const url = import.meta.env.VITE_WAVE_FORMS_EMBED_URL
  return typeof url === 'string' && url.trim().length > 0 ? url.trim() : undefined
}

export function getWaveFormsZoomEmbedUrl(): string | undefined {
  const url = import.meta.env.VITE_WAVE_FORMS_ZOOM_EMBED_URL
  return typeof url === 'string' && url.trim().length > 0 ? url.trim() : undefined
}

/** Calendly (or custom) scheduling iframe for onboarding step 5 */
export function getCalendarEmbedUrl(prefill: CalendarPrefill = {}): string {
  return buildCalendarEmbedUrl(prefill)
}

export function getWaveFormsWebhookUrl(): string | undefined {
  const url = import.meta.env.VITE_WAVE_FORMS_WEBHOOK_URL
  return typeof url === 'string' && url.trim().length > 0 ? url.trim() : undefined
}

export const LEAD_FLOW_CTA_LABEL = 'לדף נחיתה דמו בחינם ולתיאום שיחת אפיון'

/** Hero-only CTA (replaces legacy demo copy). */
export const HERO_CTA_LABEL = LEAD_FLOW_CTA_LABEL

export const LEAD_FLOW_ANCHOR = '#contact'
