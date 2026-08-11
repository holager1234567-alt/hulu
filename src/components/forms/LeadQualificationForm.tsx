import { useRef, useState, type ChangeEvent, type MouseEvent } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Terminal,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

const TOTAL_STEPS = 2
const FORMSPREE_URL = 'https://formspree.io/f/xnpaddqa'

const THANK_YOU_TITLE = 'מעולה, אנחנו בדרך לאתר שלכם.'
const THANK_YOU_BODY =
  'השארתם את הפרטים עכשיו נשאר לנו להכיר את העסק, להבין את החזון שלכם ולבנות את הכיוון הנכון לאתר.'
const THANK_YOU_FOOTER = 'בקרוב ניצור איתכם קשר לתיאום שיחת האפיון.'

type YesNoValue = '' | 'כן' | 'לא'

type FormData = {
  fullName: string
  phone: string
  activeBusiness: YesNoValue
  hasPortfolio: YesNoValue
  age18Plus: YesNoValue
}

type YesNoQuestion = {
  key: keyof Pick<FormData, 'activeBusiness' | 'hasPortfolio' | 'age18Plus'>
  title: string
  code: string
}

const YES_NO_QUESTIONS: YesNoQuestion[] = [
  { key: 'activeBusiness', title: 'יש עסק פעיל?', code: 'BIZ' },
  { key: 'hasPortfolio', title: 'יש תיק עבודות / תוכן?', code: 'PORT' },
  { key: 'age18Plus', title: 'גיל 18+?', code: '18+' },
]

const INITIAL_FORM: FormData = {
  fullName: '',
  phone: '',
  activeBusiness: '',
  hasPortfolio: '',
  age18Plus: '',
}

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? -32 : 32,
    opacity: 0,
    filter: 'blur(4px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
  },
  exit: (direction: number) => ({
    x: direction > 0 ? 32 : -32,
    opacity: 0,
    filter: 'blur(4px)',
  }),
}

function normalizePhone(value: string): string {
  return value.replace(/\D/g, '')
}

function isValidPhone(value: string): boolean {
  const digits = normalizePhone(value)
  return digits.length >= 9 && digits.length <= 12
}

async function submitLeadToFormspree(data: FormData): Promise<boolean> {
  const response = await fetch(FORMSPREE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: data.fullName.trim(),
      phone: data.phone.trim(),
      activeBusiness: data.activeBusiness,
      hasPortfolio: data.hasPortfolio,
      age18Plus: data.age18Plus,
      source: 'hulu-site',
    }),
  })

  return response.ok
}

function StepPipeline({ step }: { step: number }) {
  return (
    <div className="lead-form-pipeline" aria-hidden>
      {Array.from({ length: TOTAL_STEPS }, (_, i) => {
        const n = i + 1
        const isActive = n === step
        const isDone = n < step
        return (
          <span key={n} className="flex items-center gap-[0.35rem]">
            <span
              className={cn(
                'lead-form-pipeline-node',
                isDone && 'lead-form-pipeline-node--done',
                isActive && 'lead-form-pipeline-node--active',
              )}
            >
              {isDone ? <Check className="h-3 w-3" strokeWidth={2.5} /> : `0${n}`}
            </span>
            {n < TOTAL_STEPS && (
              <span
                className={cn(
                  'lead-form-pipeline-line',
                  isDone && 'lead-form-pipeline-line--done',
                )}
              />
            )}
          </span>
        )
      })}
    </div>
  )
}

function useMonitorTilt(enabled: boolean) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const rotateX = useSpring(10, { stiffness: 160, damping: 24, mass: 0.8 })
  const rotateY = useSpring(0, { stiffness: 160, damping: 24, mass: 0.8 })

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!enabled || !sceneRef.current) return

    const rect = sceneRef.current.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5

    rotateY.set(x * 16)
    rotateX.set(10 - y * 12)
  }

  const handleMouseLeave = () => {
    rotateX.set(10)
    rotateY.set(0)
  }

  return { sceneRef, rotateX, rotateY, handleMouseMove, handleMouseLeave }
}

type LeadQualificationFormProps = {
  variant?: 'embedded' | 'modal'
  className?: string
  onClose?: () => void
}

export function LeadQualificationForm({
  variant = 'embedded',
  className,
  onClose,
}: LeadQualificationFormProps) {
  const reducedMotion = useReducedMotion()
  const tiltEnabled = !reducedMotion
  const { sceneRef, rotateX, rotateY, handleMouseMove, handleMouseLeave } =
    useMonitorTilt(tiltEnabled)
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const progress = isSubmitted ? 100 : (step / TOTAL_STEPS) * 100

  const setField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
    setSubmitError(null)
  }

  const validateStep1 = (): boolean => {
    const nextErrors: Partial<Record<keyof FormData, string>> = {}
    if (!form.fullName.trim()) nextErrors.fullName = 'שדה חובה'
    if (!form.phone.trim()) nextErrors.phone = 'שדה חובה'
    else if (!isValidPhone(form.phone)) nextErrors.phone = 'מספר טלפון לא תקין'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const validateStep2 = (): boolean => {
    const nextErrors: Partial<Record<keyof FormData, string>> = {}

    for (const question of YES_NO_QUESTIONS) {
      if (!form[question.key]) nextErrors[question.key] = 'נא לבחור תשובה'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const validateCurrentStep = (): boolean => {
    if (step === 1) return validateStep1()
    if (step === 2) return validateStep2()
    return true
  }

  const goNext = () => {
    if (!validateCurrentStep()) return

    setDirection(1)
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }

  const submitForm = async () => {
    if (!validateCurrentStep()) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const ok = await submitLeadToFormspree(form)
      if (!ok) {
        setSubmitError('לא הצלחנו לשמור את הפרטים. נסי שוב.')
        setIsSubmitting(false)
        return
      }
      setIsSubmitted(true)
    } catch {
      setSubmitError('לא הצלחנו לשמור את הפרטים. נסי שוב.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const goBack = () => {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 1))
    setSubmitError(null)
  }

  const currentModule = isSubmitted
    ? 'COMPLETE'
    : step === 1
      ? 'CONTACT_DATA'
      : 'QUALIFICATION'

  const formCard = (
    <div
      dir="rtl"
      className={cn(
        'lead-form-terminal relative w-full overflow-hidden',
        variant === 'modal' && 'shadow-2xl',
      )}
    >
      <div className="lead-form-screen-shine" aria-hidden />
      {/* Title bar — monitor chrome */}
      <div className="lead-form-titlebar">
        <div className="lead-form-dots" aria-hidden>
          <span className="lead-form-dot lead-form-dot--close" />
          <span className="lead-form-dot lead-form-dot--min" />
          <span className="lead-form-dot lead-form-dot--max" />
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
          <Terminal className="h-3.5 w-3.5 shrink-0 text-white/70" strokeWidth={1.75} />
          <span className="truncate font-mono-tech text-[0.65rem] tracking-widest text-white/85 md:text-xs">
            HULU // LEAD_QUALIFICATION.sys
          </span>
        </div>
        <span className="font-mono-tech shrink-0 text-[0.58rem] tracking-wider text-white/45">
          v1.0
        </span>
      </div>

      {/* Screen body */}
      <div className="lead-form-screen">
        <div className="lead-form-grid" aria-hidden />
        {!reducedMotion && <div className="lead-form-scan" aria-hidden />}
        <span className="lead-form-bracket lead-form-bracket--tl" aria-hidden />
        <span className="lead-form-bracket lead-form-bracket--tr" aria-hidden />
        <span className="lead-form-bracket lead-form-bracket--bl" aria-hidden />
        <span className="lead-form-bracket lead-form-bracket--br" aria-hidden />

        {/* HUD header */}
        <div className="relative z-[1] border-b border-[#5A0E23]/10 px-5 py-4 md:px-7 md:py-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-mono-tech text-[0.62rem] font-bold tracking-[0.14em] text-[#5A0E23]/55">
                MODULE
              </span>
              <span className="rounded border border-[#5A0E23]/20 bg-[#5A0E23]/[0.06] px-2 py-0.5 font-mono-tech text-[0.65rem] font-bold tracking-wider text-[#5A0E23]">
                {currentModule}
              </span>
            </div>
            <span className="font-mono-tech text-xs tabular-nums text-[#5A0E23]/50">
              {isSubmitted
                ? 'DONE'
                : `${String(step).padStart(2, '0')}/${TOTAL_STEPS}`}
              <span className="mx-1.5 opacity-40">|</span>
              {Math.round(progress)}%
            </span>
          </div>

          <StepPipeline step={isSubmitted ? TOTAL_STEPS : step} />

          <div className="mt-3 h-1 overflow-hidden rounded-sm bg-[#5A0E23]/8">
            <motion.div
              className="h-full bg-gradient-to-l from-[#5A0E23] via-[#7a1c2e] to-[#5A0E23]"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: reducedMotion ? 0 : 0.45, ease: EASE }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="relative z-[1] min-h-[340px] px-5 py-6 md:min-h-[380px] md:px-7 md:py-7">
          <AnimatePresence mode="wait" custom={direction}>
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.4, ease: EASE }}
                className="flex min-h-[280px] flex-col items-center justify-center space-y-5 text-center md:min-h-[320px]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#5A0E23]/20 bg-[#5A0E23]/[0.06]">
                  <Check className="h-7 w-7 text-[#5A0E23]" strokeWidth={2} />
                </div>
                <div className="max-w-md space-y-4 px-1">
                  <p className="font-mono-tech text-[0.62rem] font-bold tracking-[0.16em] text-[#5A0E23]/45">
                    STATUS // SAVED
                  </p>
                  <h3 className="text-xl font-bold leading-snug text-[#111111] md:text-2xl">
                    {THANK_YOU_TITLE}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#555555] md:text-base">
                    {THANK_YOU_BODY}
                  </p>
                  <p className="text-sm font-medium leading-relaxed text-[#111111] md:text-base">
                    {THANK_YOU_FOOTER}
                  </p>
                </div>
              </motion.div>
            ) : step === 1 ? (
              <motion.div
                key="step-1"
                custom={direction}
                variants={reducedMotion ? undefined : stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: EASE }}
                className="space-y-5"
              >
                <div className="text-center">
                  <p className="font-mono-tech text-[0.62rem] font-bold tracking-[0.16em] text-[#5A0E23]/45">
                    STEP_01 // CONTACT_DATA
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-[#111111] md:text-2xl">
                    בואי נכיר
                  </h3>
                  <p className="mt-1.5 text-sm text-[#555555] md:text-base">
                    שם וטלפון — ונמשיך לשלב הבא
                  </p>
                  <hr className="tech-divider mx-auto mt-4 max-w-xs opacity-60" aria-hidden />
                </div>

                <div className="space-y-4 rounded-lg border border-dashed border-[#5A0E23]/15 bg-white/50 p-4 md:p-5">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="lead-form-field-label">
                      <span className="text-[#5A0E23]/40">&gt;</span>
                      FULL_NAME
                      <span className="text-[#5A0E23]">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      value={form.fullName}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setField('fullName', e.target.value)
                      }
                      placeholder="ישראל ישראלי"
                      autoComplete="name"
                      className="lead-form-field-input h-11"
                      aria-invalid={!!errors.fullName}
                    />
                    {errors.fullName && (
                      <p className="font-mono-tech text-xs text-red-600">
                        ERR: {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="lead-form-field-label">
                      <span className="text-[#5A0E23]/40">&gt;</span>
                      PHONE
                      <span className="text-[#5A0E23]">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setField('phone', e.target.value)
                      }
                      placeholder="050-0000000"
                      className="lead-form-field-input h-11"
                      aria-invalid={!!errors.phone}
                      dir="ltr"
                    />
                    {errors.phone && (
                      <p className="font-mono-tech text-xs text-red-600">
                        ERR: {errors.phone}
                      </p>
                    )}
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
                transition={{ duration: 0.38, ease: EASE }}
                className="space-y-5"
              >
                <div className="text-center">
                  <p className="font-mono-tech text-[0.62rem] font-bold tracking-[0.16em] text-[#5A0E23]/45">
                    STEP_02 // QUALIFICATION
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-[#111111] md:text-2xl">
                    כמה שאלות קצרות
                  </h3>
                  <p className="mt-1.5 text-sm text-[#555555] md:text-base">
                    ענו בכן או לא — ונמשיך
                  </p>
                  <hr className="tech-divider mx-auto mt-4 max-w-xs opacity-60" aria-hidden />
                </div>

                <div className="space-y-4">
                  {YES_NO_QUESTIONS.map((question, idx) => (
                    <div
                      key={question.key}
                      className="rounded-lg border border-dashed border-[#5A0E23]/15 bg-white/50 p-4 md:p-5"
                    >
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-[#111111] md:text-base">
                          {question.title}
                        </p>
                        <span className="font-mono-tech shrink-0 text-[0.58rem] tracking-wider text-[#5A0E23]/45">
                          {String(idx + 1).padStart(2, '0')} {question.code}
                        </span>
                      </div>

                      <div
                        className="grid grid-cols-2 gap-2"
                        role="radiogroup"
                        aria-label={question.title}
                      >
                        {(['כן', 'לא'] as const).map((value) => {
                          const selected = form[question.key] === value
                          const isYes = value === 'כן'
                          return (
                            <button
                              key={value}
                              type="button"
                              role="radio"
                              aria-checked={selected}
                              onClick={() => setField(question.key, value)}
                              className={cn(
                                'lead-form-yesno-btn',
                                selected && 'lead-form-yesno-btn--selected',
                              )}
                            >
                              <span
                                className={cn(
                                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-md border transition-all duration-300',
                                  selected
                                    ? 'border-[#5A0E23]/30 bg-[#5A0E23] text-white'
                                    : 'border-[#5A0E23]/12 bg-[#5A0E23]/[0.05] text-[#5A0E23]',
                                )}
                              >
                                {isYes ? (
                                  <Check className="h-4 w-4" strokeWidth={2} />
                                ) : (
                                  <X className="h-4 w-4" strokeWidth={2} />
                                )}
                              </span>
                              <span className="text-sm font-medium text-[#111111]">{value}</span>
                            </button>
                          )
                        })}
                      </div>

                      {errors[question.key] && (
                        <p className="mt-2 font-mono-tech text-xs text-red-600" role="alert">
                          ERR: {errors[question.key]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {submitError && (
                  <p className="text-center font-mono-tech text-xs text-red-600" role="alert">
                    ERR: {submitError}
                  </p>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {!isSubmitted ? (
          <div className="lead-form-cmdbar relative z-[1]">
            <span className="lead-form-cmd-hint hidden md:inline">
              {step < TOTAL_STEPS ? 'ENTER → NEXT' : 'SUBMIT → SEND'}
            </span>
            <div className="lead-form-cmdbar-actions">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={goBack}
                  disabled={isSubmitting}
                  className="lead-form-cmd-btn lead-form-cmd-btn--back border-[#5A0E23]/25 bg-white/70 font-mono-tech text-xs tracking-wide text-[#111111] hover:border-[#5A0E23]/45 hover:bg-[#5A0E23]/5"
                >
                  <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                  הקודם
                </Button>
              ) : null}

              {step < TOTAL_STEPS ? (
                <Button
                  type="button"
                  onClick={goNext}
                  disabled={isSubmitting}
                  className="lead-form-cmd-btn bg-[#5A0E23] font-mono-tech text-xs tracking-wide text-white hover:bg-[#5A0E23]/90"
                >
                  המשך
                  <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => void submitForm()}
                  disabled={isSubmitting}
                  className="lead-form-cmd-btn bg-[#5A0E23] font-mono-tech text-xs tracking-wide text-white hover:bg-[#5A0E23]/90"
                >
                  {isSubmitting ? 'שולח...' : 'שליחת פרטים'}
                  <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                </Button>
              )}
            </div>
          </div>
        ) : null}

        {/* Status bar */}
        <div className="lead-form-statusbar relative z-[1]">
          <span>
            <span className="lead-form-status-dot" aria-hidden />
            SYSTEM ONLINE
          </span>
          <span>SECURE CHANNEL</span>
          <span className="hidden sm:inline">HULU.STUDIO</span>
        </div>
      </div>
    </div>
  )

  const monitor3d = (
    <div
      ref={sceneRef}
      className={cn('lead-form-3d-scene', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="lead-form-3d-glow" aria-hidden />
      <div className={cn('lead-form-3d-float', !tiltEnabled && 'lead-form-3d-float--static')}>
        <motion.div
          className="lead-form-3d-rig"
          style={{
            rotateX: tiltEnabled ? rotateX : 10,
            rotateY: tiltEnabled ? rotateY : 0,
            transformPerspective: 1400,
          }}
        >
        <div className="lead-form-monitor">
          <div className="lead-form-bezel">
            <div className="lead-form-bezel-inner">{formCard}</div>
          </div>
          <div className="lead-form-chin" aria-hidden />
          <div className="lead-form-stand">
            <div className="lead-form-neck" aria-hidden />
            <div className="lead-form-base" aria-hidden />
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  )

  if (variant === 'modal') {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-label="טופס יצירת קשר"
      >
        <motion.button
          type="button"
          aria-label="סגירה"
          className="absolute inset-0 bg-[#111111]/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        <motion.div
          className="relative z-10 w-full max-w-lg"
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {monitor3d}
        </motion.div>
      </div>
    )
  }

  return monitor3d
}
