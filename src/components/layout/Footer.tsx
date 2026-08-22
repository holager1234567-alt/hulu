import { Link } from 'react-router-dom'
import { Logo } from '@/components/layout/Logo'

const quickLinks = [  { href: '#top', label: 'בית' },
  { href: '#about', label: 'אודות' },
  { href: '#process', label: 'תהליך' },
  { href: '#work', label: 'פרויקטים' },
  { href: '#contact', label: 'צור קשר' },
]

function openAccessibilityPanel() {  const fab = document.querySelector<HTMLButtonElement>('.hulu-a11y-fab')
  fab?.click()
}

type FooterProps = {
  variant?: 'default' | 'finale'
}

export function Footer({ variant = 'default' }: FooterProps) {
  const isFinale = variant === 'finale'

  return (
    <footer className={isFinale ? 'site-footer site-footer--finale relative' : 'relative'}>
      <hr className={isFinale ? 'site-footer-divider site-footer-divider--soft' : 'tech-divider'} aria-hidden />
      <div className={`container-site grid gap-10 md:grid-cols-2 ${isFinale ? 'py-12 md:py-14' : 'py-16'}`}>
        <div>
          <Logo className="h-10 w-auto min-w-[120px] md:h-12 md:min-w-[140px]" />
          <p className="mt-3 max-w-xs text-sm text-muted dark:text-white/60">
            אתרים מדויקים, יוקרתיים ואסטרטגיים לעסקים שרוצים נוכחות דיגיטלית
            ברמה שלהם.
          </p>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold text-primary dark:text-white">
            ניווט
          </p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:max-w-xs">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-burgundy dark:text-white/60 dark:hover:text-gold"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-100 dark:border-white/5">
        <div className="container-site flex flex-col items-center gap-3 py-6 text-center">
          <p className="text-xs text-muted dark:text-white/40">
            © {new Date().getFullYear()} הולו. כל הזכויות שמורות.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link
              to="/privacy-policy"
              className="text-sm text-muted hover:underline dark:text-white/40"
            >
              מדיניות פרטיות
            </Link>
            <button
              type="button"
              onClick={openAccessibilityPanel}
              className="text-sm text-muted hover:underline dark:text-white/40"
            >
              נגישות
            </button>
          </div>
          <p className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted/90 dark:text-white/35">
            <span>אתר זה נבנה על ידי</span>
            <a
              href="#about"
              aria-label="אודות הולו"
              className="inline-flex rounded-sm opacity-75 transition-opacity duration-300 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/40"
            >
              <Logo className="h-4 w-auto md:h-[1.125rem]" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
