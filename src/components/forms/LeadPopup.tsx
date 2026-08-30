import {
  createContext,
  forwardRef,
  lazy,
  Suspense,
  useCallback,
  useContext,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react'

const LazyLeadPopupPanel = lazy(() =>
  import('@/components/forms/LeadPopupPanel').then((module) => ({
    default: module.LeadPopupPanel,
  })),
)

type LeadPopupContextValue = {
  openLeadPopup: () => void
}

const LeadPopupContext = createContext<LeadPopupContextValue | null>(null)

export function LeadPopupProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  // Tracked here because the panel unmounts on close and cannot restore focus itself.
  const lastFocused = useRef<HTMLElement | null>(null)

  const openLeadPopup = useCallback(() => {
    lastFocused.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    setOpen(true)
  }, [])

  const closeLeadPopup = useCallback(() => {
    setOpen(false)
    lastFocused.current?.focus()
    lastFocused.current = null
  }, [])

  return (
    <LeadPopupContext.Provider value={{ openLeadPopup }}>
      {children}
      {open ? (
        <Suspense fallback={null}>
          <LazyLeadPopupPanel open={open} onClose={closeLeadPopup} />
        </Suspense>
      ) : null}
    </LeadPopupContext.Provider>
  )
}

export function useLeadPopup() {
  const context = useContext(LeadPopupContext)
  if (!context) {
    throw new Error('useLeadPopup must be used within LeadPopupProvider')
  }
  return context
}

export const LeadPopupTrigger = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function LeadPopupTrigger({ onClick, type = 'button', ...props }, ref) {
  const { openLeadPopup } = useLeadPopup()

  return (
    <button
      ref={ref}
      type={type}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) openLeadPopup()
      }}
      {...props}
    />
  )
})

LeadPopupTrigger.displayName = 'LeadPopupTrigger'
