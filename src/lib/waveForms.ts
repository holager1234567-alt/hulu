/**
 * Wave Forms embed configuration.
 * Set VITE_WAVE_FORMS_EMBED_URL in .env for the full external multi-step form.
 * Set VITE_CALENDLY_EMBED_URL (or legacy VITE_WAVE_FORMS_ZOOM_EMBED_URL) to override scheduling embed.
 * Set VITE_WAVE_FORMS_WEBHOOK_URL to POST lead data when step 2 completes.
 */

export const DEFAULT_CALENDLY_EMBED_URL =
  'https://calendly.com/hulu-web-designer/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=1c1418&text_color=f7f2ee&primary_color=942839'

export function getWaveFormsEmbedUrl(): string | undefined {
  const url = import.meta.env.VITE_WAVE_FORMS_EMBED_URL
  return typeof url === 'string' && url.trim().length > 0 ? url.trim() : undefined
}

export function getWaveFormsZoomEmbedUrl(): string | undefined {
  const url = import.meta.env.VITE_WAVE_FORMS_ZOOM_EMBED_URL
  return typeof url === 'string' && url.trim().length > 0 ? url.trim() : undefined
}

/** Calendly (or custom) scheduling iframe for onboarding step 5 */
export function getCalendarEmbedUrl(): string {
  const calendly = import.meta.env.VITE_CALENDLY_EMBED_URL
  if (typeof calendly === 'string' && calendly.trim().length > 0) {
    return calendly.trim()
  }

  const legacy = getWaveFormsZoomEmbedUrl()
  if (legacy) return legacy

  return DEFAULT_CALENDLY_EMBED_URL
}

export function getWaveFormsWebhookUrl(): string | undefined {
  const url = import.meta.env.VITE_WAVE_FORMS_WEBHOOK_URL
  return typeof url === 'string' && url.trim().length > 0 ? url.trim() : undefined
}

export const LEAD_FLOW_CTA_LABEL = 'לתיאום שיחת אפיון ובדיקת התאמה'

export const LEAD_FLOW_ANCHOR = '#contact'
