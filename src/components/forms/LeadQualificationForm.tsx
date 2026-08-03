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
  Building2,
  Calendar,
  Check,
  Clock,
  Crown,
  RefreshCw,
  Rocket,
  Target,
  Terminal,
  Users,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { EASE } from '@/lib/motion'
import { WHATSAPP_PHONE, whatsAppUrl } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

const TOTAL_STEPS = 4

type FormData = {
  projectType: string
  businessGoal: string
  timeline: string
  fullName: string
  businessName: string
}

type RadioOption = {
  value: string
  label: string
  icon: LucideIcon
  code: string
}

type StepConfig = {
  key: keyof Pick<FormData, 'projectType' | 'businessGoal' | 'timeline'>
  title: string
  subtitle: string
  module: string
  options: RadioOption[]
}

const STEPS: StepConfig[] = [
  {
    key: 'projectType',
    module: 'PROJECT_TYPE',
    title: 'מה סוג הפרויקט?',
    subtitle: 'בחרו את האפשרות שהכי מתאימה לכם',
    options: [
      {
        value: 'דף נחיתה ממוקד המרה',
        label: 'דף נחיתה ממוקד המרה',
        icon: Rocket,
        code: 'LP_CVR',
      },
      {
        value: 'אתר תדמית / פרימיום',
        label: 'אתר תדמית / פרימיום',
        icon: Building2,
        code: 'BRAND',
      },
      {
        value: 'שדרוג / מתיחת פנים לאתר קיים',
        label: 'שדרוג / מתיחת פנים לאתר קיים',
        icon: RefreshCw,
        code: 'REFRESH',
      },
    ],
  },
  {
    key: 'businessGoal',
    module: 'BUSINESS_GOAL',
    title: 'מה המטרה העסקית?',
    subtitle: 'נבין יחד מה חשוב לכם להשיג',
    options: [
      {
        value: 'להביא יותר לידים ולקוחות חדשים',
        label: 'להביא יותר לידים ולקוחות חדשים',
        icon: Users,
        code: 'LEADS',
      },
      {
        value: 'לחזק את המותג ולשדר יוקרה',
        label: 'לחזק את המותג ולשדר יוקרה',
        icon: Crown,
        code: 'LUXURY',
      },
      {
        value: 'להחליף אתר ישן ולא מעודכן',
        label: 'להחליף אתר ישן ולא מעודכן',
        icon: Target,
        code: 'REPLACE',
      },
    ],
  },
  {
    key: 'timeline',
    module: 'TIMELINE',
    title: 'מתי תרצו להתחיל?',
    subtitle: 'כדי שנוכל לתכנן יחד את לוח הזמנים',
    options: [
      {
        value: 'מיידית (בימים הקרובים)',
        label: 'מיידית (בימים הקרובים)',
        icon: Zap,
        code: 'ASAP',
      },
      {
        value: 'בחודש הקרוב',
        label: 'בחודש הקרוב',
        icon: Calendar,
        code: '30D',
      },
      {
        value: 'גמיש / בתכנון',
        label: 'גמיש / בתכנון',
        icon: Clock,
        code: 'FLEX',
      },
    ],
  },
]

const INITIAL_FORM: FormData = {
  projectType: '',
  businessGoal: '',
  timeline: '',
  fullName: '',
  businessName: '',
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

function formatWhatsAppMessage(data: FormData): string {
  const lines = [
    'היי הולו! 👋',
    'שלחתי פנייה דרך האתר:',
    '',
    `📋 *סוג פרויקט:* ${data.projectType}`,
    `🎯 *מטרה:* ${data.businessGoal}`,
    `⏱️ *לוח זמנים:* ${data.timeline}`,
    '',
    `👤 *שם:* ${data.fullName}`,
    `🏢 *שם העסק:* ${data.businessName}`,
  ]

  return lines.join('\n')
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

  const progress = (step / TOTAL_STEPS) * 100
  const currentRadioStep = step <= 3 ? STEPS[step - 1] : null
  const currentModule = currentRadioStep?.module ?? 'CONTACT_DATA'

  const setField = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validateCurrentStep = (): boolean => {
    if (step <= 3 && currentRadioStep) {
      const value = form[currentRadioStep.key]
      if (!value) {
        setErrors({ [currentRadioStep.key]: 'נא לבחור אפשרות' })
        return false
      }
      return true
    }

    const nextErrors: Partial<Record<keyof FormData, string>> = {}
    if (!form.fullName.trim()) nextErrors.fullName = 'שדה חובה'
    if (!form.businessName.trim()) nextErrors.businessName = 'שדה חובה'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const goNext = () => {
    if (!validateCurrentStep()) return
    setDirection(1)
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }

  const goBack = () => {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 1))
  }

  const handleSubmit = () => {
    if (!validateCurrentStep()) return
    const message = formatWhatsAppMessage(form)
    window.open(whatsAppUrl(message), '_blank', 'noopener,noreferrer')
  }

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
              {String(step).padStart(2, '0')}/{TOTAL_STEPS}
              <span className="mx-1.5 opacity-40">|</span>
              {Math.round(progress)}%
            </span>
          </div>

          <StepPipeline step={step} />

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
            {currentRadioStep ? (
              <motion.div
                key={`step-${step}`}
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
                    STEP_{String(step).padStart(2, '0')} // INPUT_REQUIRED
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-[#111111] md:text-2xl">
                    {currentRadioStep.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-[#555555] md:text-base">
                    {currentRadioStep.subtitle}
                  </p>
                  <hr className="tech-divider mx-auto mt-4 max-w-xs opacity-60" aria-hidden />
                </div>

                <div
                  className="space-y-2.5"
                  role="radiogroup"
                  aria-label={currentRadioStep.title}
                >
                  {currentRadioStep.options.map((option, idx) => {
                    const selected = form[currentRadioStep.key] === option.value
                    const Icon = option.icon
                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => setField(currentRadioStep.key, option.value)}
                        className={cn(
                          'lead-form-option group',
                          selected && 'lead-form-option--selected',
                        )}
                      >
                        <span className="lead-form-option-accent" aria-hidden />
                        <span className="lead-form-option-index">
                          <span>{String(idx + 1).padStart(2, '0')}</span>
                          <span className="text-[0.52rem] opacity-70">{option.code}</span>
                        </span>
                        <span className="flex flex-1 items-center gap-3 px-3 py-3.5 md:px-4">
                          <span
                            className={cn(
                              'flex h-10 w-10 shrink-0 items-center justify-center rounded-md border transition-all duration-300',
                              selected
                                ? 'border-[#5A0E23]/30 bg-[#5A0E23] text-white shadow-[0_0_14px_rgb(90_14_35_/_0.35)]'
                                : 'border-[#5A0E23]/12 bg-[#5A0E23]/[0.05] text-[#5A0E23]',
                            )}
                          >
                            <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                          </span>
                          <span className="flex-1 text-sm font-medium leading-snug text-[#111111] md:text-base">
                            {option.label}
                          </span>
                          <span
                            className={cn(
                              'font-mono-tech shrink-0 text-xs font-bold tracking-wider transition-colors duration-300',
                              selected ? 'text-[#5A0E23]' : 'text-[#5A0E23]/25',
                            )}
                          >
                            {selected ? '[x]' : '[ ]'}
                          </span>
                        </span>
                      </button>
                    )
                  })}
                </div>

                {errors[currentRadioStep.key] && (
                  <p
                    className="text-center font-mono-tech text-xs text-red-600"
                    role="alert"
                  >
                    ERR: {errors[currentRadioStep.key]}
                  </p>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="step-4"
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
                    STEP_04 // CONTACT_DATA
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-[#111111] md:text-2xl">
                    פרטי יצירת קשר
                  </h3>
                  <p className="mt-1.5 text-sm text-[#555555] md:text-base">
                    נשמח לחזור אליכם ולהמשיך ל-WhatsApp
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
                    <Label htmlFor="businessName" className="lead-form-field-label">
                      <span className="text-[#5A0E23]/40">&gt;</span>
                      BUSINESS_NAME
                      <span className="text-[#5A0E23]">*</span>
                    </Label>
                    <Input
                      id="businessName"
                      value={form.businessName}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setField('businessName', e.target.value)
                      }
                      placeholder="שם העסק שלי"
                      className="lead-form-field-input h-11"
                      aria-invalid={!!errors.businessName}
                    />
                    {errors.businessName && (
                      <p className="font-mono-tech text-xs text-red-600">
                        ERR: {errors.businessName}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Command bar */}
        <div className="lead-form-cmdbar relative z-[1]">
          <span className="lead-form-cmd-hint hidden md:inline">
            {step < TOTAL_STEPS ? 'ENTER → NEXT' : 'SEND → WHATSAPP'}
          </span>
          <div className="lead-form-cmdbar-actions">
            {step > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={goBack}
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
                className="lead-form-cmd-btn bg-[#5A0E23] font-mono-tech text-xs tracking-wide text-white hover:bg-[#5A0E23]/90"
              >
                המשך
                <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                className="lead-form-cmd-btn lead-form-cmd-btn--submit whitespace-normal bg-[#5A0E23] font-mono-tech text-xs leading-snug tracking-wide text-white hover:bg-[#5A0E23]/90 sm:whitespace-nowrap"
              >
                שליחה והמשך ל-WhatsApp 🚀
              </Button>
            )}
          </div>
        </div>

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

export { WHATSAPP_PHONE, formatWhatsAppMessage }
