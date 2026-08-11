/**
 * Wave Forms embed configuration.
 * Set VITE_WAVE_FORMS_EMBED_URL in .env for the full external multi-step form.
 * Set VITE_WAVE_FORMS_ZOOM_EMBED_URL for step 3 (Zoom scheduling) in the built-in flow.
 * Set VITE_WAVE_FORMS_WEBHOOK_URL to POST lead data when step 2 completes.
 */

export function getWaveFormsEmbedUrl(): string | undefined {
  const url = import.meta.env.VITE_WAVE_FORMS_EMBED_URL
  return typeof url === 'string' && url.trim().length > 0 ? url.trim() : undefined
}

export function getWaveFormsZoomEmbedUrl(): string | undefined {
  const url = import.meta.env.VITE_WAVE_FORMS_ZOOM_EMBED_URL
  return typeof url === 'string' && url.trim().length > 0 ? url.trim() : undefined
}

export function getWaveFormsWebhookUrl(): string | undefined {
  const url = import.meta.env.VITE_WAVE_FORMS_WEBHOOK_URL
  return typeof url === 'string' && url.trim().length > 0 ? url.trim() : undefined
}

export const LEAD_FLOW_CTA_LABEL = 'קבלי דמו בזום'
export const LEAD_FLOW_ANCHOR = '#contact'
