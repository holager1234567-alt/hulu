const FORMSPREE_URL = 'https://formspree.io/f/xnpaddqa'

export const EXISTING_SITE_OPTIONS = [
  'אין לי בכלל ואני מתחילה מאפס',
  'יש לי אתר ישן שכבר לא מייצג אותי',
  'יש לי רק עמוד פעיל ברשתות החברתיות',
  'יש לי דף נחיתה בסיסי',
] as const

export const SITE_GOAL_OPTIONS = [
  'למשוך לקוחות חדשות ופניות איכותיות',
  'לשדרג את הנראות למותג פרימיום יוקרתי',
  'למכור מוצרים, סדנאות או קורסים דיגיטליים',
  'להציג את השירותים בצורה מסודרת ומקצועית',
] as const

export type ExistingSiteStatusValue = (typeof EXISTING_SITE_OPTIONS)[number] | ''
export type SiteGoalValue = (typeof SITE_GOAL_OPTIONS)[number] | ''

export type FormData = {
  fullName: string
  phone: string
  existingSiteStatus: ExistingSiteStatusValue
  siteGoal: SiteGoalValue
  businessField: string
  profileLink: string
}

export const INITIAL_FORM: FormData = {
  fullName: '',
  phone: '',
  existingSiteStatus: '',
  siteGoal: '',
  businessField: '',
  profileLink: '',
}

export const LEAD_FORM_STEP_PERCENT: Record<number, number> = {
  1: 20,
  2: 40,
  3: 60,
  4: 80,
  5: 100,
}

export const LEAD_FORM_TOTAL_STEPS = 5

function normalizePhone(value: string): string {
  return value.replace(/\D/g, '')
}

export function isValidPhone(value: string): boolean {
  const digits = normalizePhone(value)
  return digits.length >= 9 && digits.length <= 12
}

export function canSavePartialLead(data: Pick<FormData, 'fullName' | 'phone'>): boolean {
  return data.fullName.trim().length > 0 && isValidPhone(data.phone)
}

type FormspreePayload = {
  name: string
  phone: string
  leadSessionId: string
  leadStage: 'partial' | 'complete' | 'booked'
  source: string
  _subject?: string
  message?: string
  existingSiteStatus?: string
  siteGoal?: string
  businessField?: string
  profileLink?: string
}

async function postToFormspree(payload: FormspreePayload): Promise<boolean> {
  const response = await fetch(FORMSPREE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })

  return response.ok
}

export async function submitPartialLeadToFormspree(
  data: Pick<FormData, 'fullName' | 'phone'>,
  leadSessionId: string,
): Promise<boolean> {
  if (!canSavePartialLead(data)) return false

  return postToFormspree({
    name: data.fullName.trim(),
    phone: data.phone.trim(),
    leadSessionId,
    leadStage: 'partial',
    source: 'hulu-site',
  })
}

export async function submitLeadToFormspree(
  data: FormData,
  leadSessionId: string,
): Promise<boolean> {
  return postToFormspree({
    name: data.fullName.trim(),
    phone: data.phone.trim(),
    leadSessionId,
    leadStage: 'complete',
    source: 'hulu-site',
    _subject: `ליד חדש — ${data.fullName.trim()}`,
    existingSiteStatus: data.existingSiteStatus,
    siteGoal: data.siteGoal,
    businessField: data.businessField.trim(),
    profileLink: data.profileLink.trim() || undefined,
  })
}

export async function submitBookingConfirmationToFormspree(
  data: FormData,
  leadSessionId: string,
): Promise<boolean> {
  return postToFormspree({
    name: data.fullName.trim(),
    phone: data.phone.trim(),
    leadSessionId,
    leadStage: 'booked',
    source: 'hulu-site',
    _subject: `נקבעה שיחת אפיון — ${data.fullName.trim()}`,
    message: 'הלקוחה סיימה לקבוע שיחת אפיון בזום דרך Calendly.',
    existingSiteStatus: data.existingSiteStatus,
    siteGoal: data.siteGoal,
    businessField: data.businessField.trim(),
    profileLink: data.profileLink.trim() || undefined,
  })
}

/** @deprecated Embedded monitor form — registration runs through LeadPopup */
export function LeadQualificationForm() {
  return null
}
