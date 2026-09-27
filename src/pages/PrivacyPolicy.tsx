import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Logo } from '@/components/layout/Logo'
import { Footer } from '@/components/layout/Footer'
import { RichText } from '@/content/RichText'
import { site } from '@/content/site'

const { privacy, business } = site
const strong = 'text-primary dark:text-white'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-svh bg-white dark:bg-[#0a0a0a]">
      <header className="border-b border-neutral-100 dark:border-white/10">
        <div className="container-site flex items-center justify-between py-5">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-burgundy dark:text-white/70 dark:hover:text-gold"
          >
            <ArrowRight className="h-4 w-4" aria-hidden />
            {site.chrome.backHome}
          </Link>
          <Link to="/" className="logo-hover shrink-0">
            <Logo className="h-10 w-auto min-w-[120px] md:h-12 md:min-w-[140px]" />
          </Link>
        </div>
      </header>

      <main className="section-pad">
        <article className="container-site mx-auto max-w-4xl">
          <header className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-primary dark:text-white md:text-4xl">{privacy.title}</h1>
            <p className="mt-2 text-sm text-muted dark:text-white/60">{privacy.updated}</p>
          </header>

          <section className="space-y-8 text-right leading-relaxed">
            {privacy.intro.map((paragraph) => (
              <p key={paragraph} className="text-primary/90 dark:text-white/85">
                <RichText text={paragraph} />
              </p>
            ))}

            <hr className="tech-divider" aria-hidden />

            {privacy.sections.map((section) => {
              if ('contact' in section) {
                return (
                  <div key={section.title} className="border-t border-neutral-100 pt-6 dark:border-white/10">
                    <h2 className="privacy-heading">{section.title}</h2>
                    <ul className="privacy-list privacy-list-plain space-y-1 text-sm text-muted dark:text-white/65">
                      <li>
                        <strong className={strong}>{business.labels.name}</strong> {business.name}
                      </li>
                      <li>
                        <strong className={strong}>{business.labels.email}</strong>{' '}
                        <a href={`mailto:${business.email}`} className="privacy-link">
                          {business.email}
                        </a>
                      </li>
                      <li>
                        <strong className={strong}>{business.labels.phone}</strong>{' '}
                        <a href={business.phoneHref} className="privacy-link" dir="ltr">
                          {business.phone}
                        </a>
                      </li>
                      <li>
                        <strong className={strong}>{business.labels.address}</strong> {business.address}
                      </li>
                      <li>
                        <strong className={strong}>{business.labels.dpo}</strong> {business.dpo}
                      </li>
                    </ul>
                  </div>
                )
              }

              if ('items' in section) {
                return (
                  <div key={section.title}>
                    <h2 className="privacy-heading">{section.title}</h2>
                    <ul className="privacy-list text-muted dark:text-white/65">
                      {section.items.map((item) => (
                        <li key={item}>
                          <RichText text={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              }

              return (
                <div key={section.title}>
                  <h2 className="privacy-heading">{section.title}</h2>
                  <p className={'note' in section ? 'mb-3 text-muted dark:text-white/65' : 'text-muted dark:text-white/65'}>
                    {section.body}
                  </p>
                  {'note' in section ? (
                    <div className="rounded-lg border border-burgundy/15 bg-surface p-4 dark:border-gold/20 dark:bg-white/5">
                      <strong className={strong}>{section.noteLead}</strong>{' '}
                      <span className="text-muted dark:text-white/65">{section.note}</span>
                    </div>
                  ) : null}
                </div>
              )
            })}
          </section>

          <footer className="mt-12 border-t border-neutral-100 pt-8 dark:border-white/10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-burgundy transition-colors hover:text-burgundy/80 dark:text-gold dark:hover:text-gold/80"
            >
              <ArrowRight className="h-4 w-4" aria-hidden />
              {site.chrome.backHome}
            </Link>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  )
}
