import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/layout/Logo'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

const links = [
  { href: '#about', label: 'אודות' },
  { href: '#work', label: 'עבודות' },
  { href: '#why', label: 'למה אני' },
  { href: '#contact', label: 'צור קשר' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [open, setOpen] = useState(false)
  const lastScrollY = useRef(0)
  const { toggle, Icon } = useTheme()

  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        setScrolled(currentScrollY > 24)

        if (currentScrollY <= 24) {
          setVisible(true)
        } else if (currentScrollY > lastScrollY.current + 8) {
          setVisible(false)
          setOpen(false)
        } else if (currentScrollY < lastScrollY.current - 8) {
          setVisible(true)
        }

        lastScrollY.current = currentScrollY
        ticking = false
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-transform duration-300 md:px-6',
        !visible && '-translate-y-[calc(100%+1rem)] pointer-events-none',
      )}
    >
      <div
        className={cn(
          'container-site relative flex h-16 items-center justify-between rounded-lg border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] header-glass',
          scrolled
            ? 'header-scrolled-line border-black/8 bg-white/88 shadow-soft dark:border-white/12 dark:bg-black/72'
            : 'border-transparent bg-white/45 dark:bg-black/35',
        )}
      >
        <a
          href="#top"
          className="logo-hover flex shrink-0 items-center text-primary dark:text-white"
        >
          <Logo className="h-12 w-auto min-w-[130px] md:h-14 md:min-w-[160px]" />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link-underline text-sm text-muted transition-colors duration-300 hover:text-burgundy dark:text-white/70 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label="החלפת מצב תצוגה"
            className="hidden sm:inline-flex"
          >
            <Icon className="h-4 w-4" strokeWidth={1.5} />
          </Button>
          <Button asChild variant="burgundy" size="sm" className="hidden rounded-full sm:inline-flex">
            <a href="#contact">השאירו פרטים</a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="תפריט"
          >
            {open ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            )}
          </Button>
        </div>
      </div>

      {open && (
        <div className="container-site mt-2 rounded-lg border border-black/5 bg-white/90 p-4 shadow-soft backdrop-blur-md dark:border-white/10 dark:bg-black/80 lg:hidden">
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-primary hover:bg-black/5 dark:text-white dark:hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
            <Button asChild variant="burgundy" className="mt-2">
              <a href="#contact" onClick={() => setOpen(false)}>
                השאירו פרטים
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
