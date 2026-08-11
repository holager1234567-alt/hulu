import { Link } from 'react-router-dom'
import { Logo } from '@/components/layout/Logo'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

const quickLinks = [
  { href: '#top', label: 'בית' },
  { href: '#about', label: 'אודות' },
  { href: '#process', label: 'תהליך' },
  { href: '#work', label: 'פרויקטים' },
  { href: '#faq', label: 'שאלות ותשובות' },
  { href: '#contact', label: 'צור קשר' },
]

// TODO: replace with the studio's real Instagram profile URL.
const INSTAGRAM_URL = 'https://www.instagram.com/'

function openAccessibilityPanel() {
  const fab = document.querySelector<HTMLButtonElement>('.hulu-a11y-fab')
  fab?.click()
}

export function Footer() {
  return (
    <footer className="relative">
      <hr className="tech-divider" aria-hidden />
      <div className="container-site grid gap-10 py-16 md:grid-cols-2">
        <div>
          <Logo className="h-10 w-auto min-w-[120px] md:h-12 md:min-w-[140px]" />
          <p className="mt-3 max-w-xs text-sm text-muted dark:text-white/60">
            אתרים מדויקים, יוקרתיים ואסטרטגיים לעסקים שרוצים נוכחות דיגיטלית
            ברמה שלהם.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="אינסטגרם"
            className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-muted transition-colors duration-300 hover:border-burgundy/40 hover:text-burgundy dark:border-white/15 dark:text-white/60 dark:hover:border-white/40 dark:hover:text-white"
          >
            <InstagramIcon className="h-4.5 w-4.5" />
          </a>
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
            <Logo className="h-4 w-auto opacity-75 md:h-[1.125rem]" />
          </p>
        </div>
      </div>
    </footer>
  )
}
