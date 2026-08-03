import { Link } from 'react-router-dom'
import { Logo } from '@/components/layout/Logo'

const quickLinks = [
  { href: '#about', label: 'אודות' },
  { href: '#work', label: 'עבודות' },
  { href: '#contact', label: 'צור קשר' },
]

export function Footer() {
  return (
    <footer className="relative">
      <hr className="tech-divider" aria-hidden />
      <div className="container-site grid gap-10 py-16 md:grid-cols-2">
        <div>
          <Logo className="h-10 w-auto min-w-[120px] md:h-12 md:min-w-[140px]" />
          <p className="mt-3 max-w-xs text-sm text-muted dark:text-white/60">
            עיצוב ובניית אתרים ברמה גבוהה, אסתטיקה, טכנולוגיה ותוצאות עסקיות.
          </p>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold text-primary dark:text-white">
            קישורים מהירים
          </p>
          <ul className="space-y-2">
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
          <Link
            to="/privacy-policy"
            className="text-sm text-muted hover:underline dark:text-white/40"
          >
            מדיניות פרטיות
          </Link>
          <p className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted/90 dark:text-white/35">
            <span>אתר זה נבנה על ידי</span>
            <Logo className="h-4 w-auto opacity-75 md:h-[1.125rem]" />
          </p>
        </div>
      </div>
    </footer>
  )
}
