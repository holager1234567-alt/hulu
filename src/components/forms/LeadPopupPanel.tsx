import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import {
  EXISTING_SITE_OPTIONS,
  INITIAL_FORM,
  LEAD_FORM_STEP_PERCENT,
  SITE_GOAL_OPTIONS,
  canSavePartialLead,
  isValidPhone,
  submitLeadToFormspree,
  submitPartialLeadToFormspree,
  type ExistingSiteStatusValue,
  type FormData,
  type SiteGoalValue,
} from '@/components/forms/LeadQualificationForm'
import { WaveFormsEmbed } from '@/components/forms/WaveFormsEmbed'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useIsMobile } from '@/hooks/useIsMobile'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { getCalendarEmbedUrl, getWaveFormsEmbedUrl } from '@/lib/waveForms'

const RESET_DELAY = 420
const AUTO_ADVANCE_MS = 250
const PARTIAL_SAVE_DEBOUNCE_MS = 700

type FieldErrors = Partial<Record<keyof FormData, string>>

type StepCopy = {
  title: string
  subtitle: string
  subtitleExtra?: string
}

const STEP_COPY: Record<number, StepCopy> = {
  1: {
    title: 'בואי נכיר',
    subtitle: 'מלאי את הפרטים הראשוניים',
    subtitleExtra: 'ונתקדם שלב קדימה בבניית האתר דמו לעסק שלך !',
  },
  2: {
    title: 'אל תצאי עדיין, אנחנו כמעט מסיימים',
    subtitle: 'האם יש לך כרגע אתר או דף נחיתה פעיל',
  },
  3: {
    title: 'מה המטרה העיקרית של האתר החדש שלך',
    subtitle: 'בחרי את היעד החשוב ביותר לעסק',
  },
  4: {
    title: 'עוד צעד קטן להתאמה מושלמת של העיצוב',
    subtitle: 'ספרי בקצרה על תחום הפעילות שלך',
  },
  5: {
    title: 'אל תסגרי את העמוד, נשאר רק לשריין את שיחת הדמו',
    subtitle: 'בחרי ביומן את המועד שהכי נוח לך לפגישת אפיון ממוקדת בזום ללא עלות',
  },
}

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? -20 : 20,
    opacity: 0,
    filter: 'blur(4px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
  },
  exit: (direction: number) => ({
    x: direction > 0 ? 20 : -20,
    opacity: 0,
    filter: 'blur(4px)',
  }),
}

type LeadPopupPanelProps = {
  open: boolean
  onClose: () => void
}

function StepHeader({ step }: { step: number }) {
  const copy = STEP_COPY[step]
  if (!copy) return null

  return (
    <div className="lead-popup-step-header">
      <h2 id="lead-popup-title" className="lead-popup-title">
        {copy.title}
      </h2>
      <p className="lead-popup-sub">{copy.subtitle}</p>
      {copy.subtitleExtra ? (
        <p className="lead-popup-sub lead-popup-sub--extra">{copy.subtitleExtra}</p>
      ) : null}
    </div>
  )
}

function ChoiceCards<T extends string>({
  options,
  value,
  onSelect,
  name,
}: {
  options: readonly T[]
  value: T | ''
  onSelect: (option: T) => void
  name: string
}) {
  return (
    <div className="lead-popup-choice-grid" role="radiogroup" aria-label={name}>
      {options.map((option) => {
        const selected = value === option
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onSelect(option)}
            className={cn('lead-popup-choice-card', selected && 'lead-popup-choice-card--selected')}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

export function LeadPopupPanel({ open, onClose }: LeadPopupPanelProps) {
  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const externalEmbedUrl = getWaveFormsEmbedUrl()
  const calendarEmbedUrl = getCalendarEmbedUrl()

  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const cardRef = useRef<HTMLDivElement>(null)
  const firstFieldRef = useRef<HTMLInputElement>(null)
  const resetTimer = useRef<number | null>(null)
  const lastFocused = useRef<HTMLElement | null>(null)
  const autoAdvanceTimer = useRef<number | null>(null)
  const partialSaveTimer = useRef<number | null>(null)
  const leadSessionIdRef = useRef<string>(crypto.randomUUID())
  const lastPartialPayloadRef = useRef('')

  useBodyScrollLock(open)

  const progressPercent = LEAD_FORM_STEP_PERCENT[step] ?? 20
  const showBack = step > 1 && step <= 4
  const showStepActions = step === 1 || step === 4

  useEffect(
    () => () => {
      if (resetTimer.current) window.clearTimeout(resetTimer.current)
      if (autoAdvanceTimer.current) window.clearTimeout(autoAdvanceTimer.current)
      if (partialSaveTimer.current) window.clearTimeout(partialSaveTimer.current)
    },
    [],
  )

  useEffect(() => {
    if (open) {
      lastFocused.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null
      return
    }
    lastFocused.current?.focus()
  }, [open])

  const resetFormState = useCallback(() => {
    setStep(1)
    setDirection(1)
    setForm(INITIAL_FORM)
    setErrors({})
    setSubmitError(null)
    setIsSubmitting(false)
    leadSessionIdRef.current = crypto.randomUUID()
    lastPartialPayloadRef.current = ''
  }, [])

  const handleClose = useCallback(() => {
    if (isSubmitting) return
    onClose()

    if (resetTimer.current) window.clearTimeout(resetTimer.current)
    resetTimer.current = window.setTimeout(resetFormState, RESET_DELAY)
  }, [isSubmitting, onClose, resetFormState])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        handleClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, handleClose])

  useEffect(() => {
    if (!open || step !== 1) return
    if (isMobile) {
      cardRef.current?.focus({ preventScroll: true })
      return
    }
    const frame = requestAnimationFrame(() => firstFieldRef.current?.focus())
    return () => cancelAnimationFrame(frame)
  }, [open, step, isMobile])

  const persistPartialLead = useCallback(async (data: Pick<FormData, 'fullName' | 'phone'>) => {
    if (!canSavePartialLead(data)) return

    const payloadKey = `${data.fullName.trim()}|${normalizePhoneForKey(data.phone)}`
    if (payloadKey === lastPartialPayloadRef.current) return

    const ok = await submitPartialLeadToFormspree(data, leadSessionIdRef.current)
    if (ok) lastPartialPayloadRef.current = payloadKey
  }, [])

  useEffect(() => {
    if (!open || step !== 1) return
    if (!canSavePartialLead(form)) return

    if (partialSaveTimer.current) window.clearTimeout(partialSaveTimer.current)
    partialSaveTimer.current = window.setTimeout(() => {
      void persistPartialLead(form)
    }, PARTIAL_SAVE_DEBOUNCE_MS)

    return () => {
      if (partialSaveTimer.current) window.clearTimeout(partialSaveTimer.current)
    }
  }, [form.fullName, form.phone, open, persistPartialLead, step])

  const setField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
    setSubmitError(null)
  }

  const goTo = (next: number, nextDirection: number) => {
    if (autoAdvanceTimer.current) window.clearTimeout(autoAdvanceTimer.current)
    setDirection(nextDirection)
    setStep(next)
    setSubmitError(null)
  }

  const scheduleAutoAdvance = (nextStep: number) => {
    if (autoAdvanceTimer.current) window.clearTimeout(autoAdvanceTimer.current)
    autoAdvanceTimer.current = window.setTimeout(() => {
      goTo(nextStep, 1)
    }, AUTO_ADVANCE_MS)
  }

  const handleExistingSiteSelect = (value: ExistingSiteStatusValue) => {
    setField('existingSiteStatus', value)
    scheduleAutoAdvance(3)
  }

  const handleSiteGoalSelect = (value: SiteGoalValue) => {
    setField('siteGoal', value)
    scheduleAutoAdvance(4)
  }

  const validateStep1 = (): boolean => {
    const nextErrors: FieldErrors = {}
    if (!form.fullName.trim()) nextErrors.fullName = 'שדה חובה'
    if (!form.phone.trim()) nextErrors.phone = 'שדה חובה'
    else if (!isValidPhone(form.phone)) nextErrors.phone = 'מספר טלפון לא תקין'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const validateStep4 = (): boolean => {
    const nextErrors: FieldErrors = {}
    if (!form.businessField.trim()) nextErrors.businessField = 'שדה חובה'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleStep1Continue = async () => {
    if (!validateStep1()) return

    void persistPartialLead(form)
    goTo(2, 1)
  }

  const handleStep4Submit = async () => {
    if (!validateStep4()) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const ok = await submitLeadToFormspree(form, leadSessionIdRef.current)
      if (!ok) {
        setSubmitError('לא הצלחנו לשמור את הפרטים. נסי שוב.')
        return
      }
      goTo(5, 1)
    } catch {
      setSubmitError('לא הצלחנו לשמור את הפרטים. נסי שוב.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const stepTransition = { duration: reducedMotion ? 0 : 0.36, ease: EASE }

  return (
    <AnimatePresence>
      {open ? (
        <div
          className="lead-popup-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby={externalEmbedUrl ? undefined : 'lead-popup-title'}
          aria-label={externalEmbedUrl ? 'טופס יצירת קשר' : undefined}
        >
          <motion.div
            className="lead-popup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.25, ease: EASE }}
            onClick={handleClose}
            aria-hidden
          />

          <motion.div
            ref={cardRef}
            dir="rtl"
            tabIndex={-1}
            className="lead-popup-card lead-popup-card--dark"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.985 }}
            transition={{ duration: reducedMotion ? 0 : 0.42, ease: EASE }}
          >
            <div className="lead-popup-toolbar">
              {showBack && !externalEmbedUrl ? (
                <button
                  type="button"
                  onClick={() => goTo(step - 1, -1)}
                  className="lead-popup-back-pill"
                  aria-label="חזרה לשלב הקודם"
                >
                  <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
                  חזרה
                </button>
              ) : (
                <span className="lead-popup-toolbar-spacer" aria-hidden />
              )}

              <button
                type="button"
                onClick={handleClose}
                className="lead-popup-close-pill"
                aria-label="סגירת הטופס"
              >
                <X className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </button>
            </div>

            {!externalEmbedUrl ? (
              <div className="lead-popup-progress" aria-live="polite">
                <div className="lead-popup-progress-meta">
                  <span className="lead-popup-progress-label">התקדמות</span>
                  <span className="lead-popup-progress-value">{progressPercent}%</span>
                </div>
                <div className="lead-popup-progress-track">
                  <motion.div
                    className="lead-popup-progress-fill"
                    initial={false}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: reducedMotion ? 0 : 0.5, ease: EASE }}
                  />
                </div>
              </div>
            ) : null}

            {externalEmbedUrl ? (
              <div className="lead-popup-body lead-popup-body--embed">
                <WaveFormsEmbed url={externalEmbedUrl} />
              </div>
            ) : (
              <>
                <div className="lead-popup-body">
                  <AnimatePresence mode="wait" custom={direction} initial={false}>
                    {step === 1 ? (
                      <motion.div
                        key="step-1"
                        custom={direction}
                        variants={reducedMotion ? undefined : stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={stepTransition}
                        className="lead-popup-step-content"
                      >
                        <StepHeader step={1} />

                        <div className="lead-popup-fields">
                          <div className="lead-popup-field">
                            <Label htmlFor="lead-fullName" className="lead-popup-label">
                              שם מלא
                            </Label>
                            <Input
                              id="lead-fullName"
                              ref={firstFieldRef}
                              value={form.fullName}
                              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                setField('fullName', event.target.value)
                              }
                              onBlur={() => void persistPartialLead(form)}
                              onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                  event.preventDefault()
                                  void handleStep1Continue()
                                }
                              }}
                              placeholder="ישראל ישראלי"
                              autoComplete="name"
                              className="lead-popup-input"
                              aria-invalid={!!errors.fullName}
                            />
                            {errors.fullName ? (
                              <p className="lead-popup-error">{errors.fullName}</p>
                            ) : null}
                          </div>

                          <div className="lead-popup-field">
                            <Label htmlFor="lead-phone" className="lead-popup-label">
                              מספר טלפון
                            </Label>
                            <Input
                              id="lead-phone"
                              type="tel"
                              inputMode="tel"
                              autoComplete="tel"
                              value={form.phone}
                              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                setField('phone', event.target.value)
                              }
                              onBlur={() => void persistPartialLead(form)}
                              onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                  event.preventDefault()
                                  void handleStep1Continue()
                                }
                              }}
                              placeholder="0500000000"
                              className="lead-popup-input"
                              aria-invalid={!!errors.phone}
                              dir="ltr"
                            />
                            {errors.phone ? (
                              <p className="lead-popup-error">{errors.phone}</p>
                            ) : null}
                          </div>
                        </div>
                      </motion.div>
                    ) : step === 2 ? (
                      <motion.div
                        key="step-2"
                        custom={direction}
                        variants={reducedMotion ? undefined : stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={stepTransition}
                        className="lead-popup-step-content"
                      >
                        <StepHeader step={2} />
                        <ChoiceCards
                          name="מצב אתר קיים"
                          options={EXISTING_SITE_OPTIONS}
                          value={form.existingSiteStatus}
                          onSelect={handleExistingSiteSelect}
                        />
                      </motion.div>
                    ) : step === 3 ? (
                      <motion.div
                        key="step-3"
                        custom={direction}
                        variants={reducedMotion ? undefined : stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={stepTransition}
                        className="lead-popup-step-content"
                      >
                        <StepHeader step={3} />
                        <ChoiceCards
                          name="מטרת האתר"
                          options={SITE_GOAL_OPTIONS}
                          value={form.siteGoal}
                          onSelect={handleSiteGoalSelect}
                        />
                      </motion.div>
                    ) : step === 4 ? (
                      <motion.div
                        key="step-4"
                        custom={direction}
                        variants={reducedMotion ? undefined : stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={stepTransition}
                        className="lead-popup-step-content"
                      >
                        <StepHeader step={4} />

                        <div className="lead-popup-fields">
                          <div className="lead-popup-field">
                            <Label htmlFor="lead-businessField" className="lead-popup-label">
                              שם העסק או תחום העיסוק
                            </Label>
                            <Input
                              id="lead-businessField"
                              value={form.businessField}
                              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                setField('businessField', event.target.value)
                              }
                              onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                  event.preventDefault()
                                  void handleStep4Submit()
                                }
                              }}
                              placeholder="סטודיו לפילאטיס, NOA Pilates"
                              className="lead-popup-input"
                              aria-invalid={!!errors.businessField}
                            />
                            {errors.businessField ? (
                              <p className="lead-popup-error">{errors.businessField}</p>
                            ) : null}
                          </div>

                          <div className="lead-popup-field">
                            <Label htmlFor="lead-profileLink" className="lead-popup-label">
                              קישור לפרופיל ברשתות או לאתר קיים
                              <span className="lead-popup-optional"> (רשות)</span>
                            </Label>
                            <Input
                              id="lead-profileLink"
                              value={form.profileLink}
                              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                setField('profileLink', event.target.value)
                              }
                              placeholder="instagram.com/yourpage"
                              className="lead-popup-input"
                              dir="ltr"
                            />
                          </div>
                        </div>

                        {submitError ? (
                          <p className="lead-popup-error text-center" role="alert">
                            {submitError}
                          </p>
                        ) : null}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="step-5"
                        custom={direction}
                        variants={reducedMotion ? undefined : stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={stepTransition}
                        className="lead-popup-step-content lead-popup-step-content--calendar"
                      >
                        <StepHeader step={5} />

                        <div className="lead-popup-calendar-shell">
                          <WaveFormsEmbed
                            url={calendarEmbedUrl}
                            title="קביעת פגישת דמו בזום"
                            className="lead-popup-calendar-embed"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {showStepActions ? (
                  <div className="lead-popup-foot">
                    <div className="lead-popup-foot-actions">
                      <Button
                        type="button"
                        variant="burgundy"
                        onClick={() =>
                          step === 1 ? void handleStep1Continue() : void handleStep4Submit()
                        }
                        disabled={isSubmitting}
                        className="lead-popup-foot-btn lead-popup-foot-btn--next"
                      >
                        {step === 1 ? (
                          <>
                            בואי נמשיך
                            <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                          </>
                        ) : isSubmitting ? (
                          'שומרת...'
                        ) : (
                          <>
                            שמרי פרטים ועברי לקביעת השיחה
                            <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}

function normalizePhoneForKey(value: string): string {
  return value.replace(/\D/g, '')
}
