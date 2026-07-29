export const WHATSAPP_PHONE = '972533402891'

export const WHATSAPP_FLOAT_MESSAGE =
  'היי הולו , אני מעוניין/ת באתר / דף נחיתה  ולעסק שלי ואשמח לשמוע פרטים'

export const WHATSAPP_CONTACT_MESSAGE = 'היי, אשמח לשמוע על בניית אתר'

export const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_PHONE}`

export function whatsAppUrl(text: string) {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`
}
