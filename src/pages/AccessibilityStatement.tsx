import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import { Footer } from '@/components/layout/Footer'
import { WhatsAppCta } from '@/components/ui/WhatsAppCta'
import { site } from '@/content/site'

export default function AccessibilityStatement() {
  return (
    <div className="lp-page">
      <header className="border-b border-champagne/40">
        <div className="mx-auto flex h-[4.5rem] w-full max-w-[76rem] items-center justify-between px-5 sm:px-8">
          <Link to="/" className="inline-flex items-center gap-2 font-semibold text-wine no-underline [&_svg]:size-4">
            <ArrowRight aria-hidden />
            {site.chrome.backHome}
          </Link>
          <Link to="/" dir="ltr" className="font-lux text-[1.35rem] font-bold tracking-[0.32em] text-wine no-underline">
            {site.chrome.wordmark}
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[46rem] px-5 py-14 text-[1.1rem] leading-[1.8] sm:px-8 sm:py-20">
        <h1 className="mb-6 text-[clamp(2.2rem,4.4vw,3.2rem)] leading-tight font-extrabold text-wine">
          {site.accessibility.title}
        </h1>
        {site.accessibility.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p>
          <WhatsAppCta className="font-bold text-wine underline underline-offset-4">{site.accessibility.cta}</WhatsAppCta>
        </p>
        <p className="text-[0.9rem] text-espresso/60">{site.accessibility.updated}</p>
      </main>

      <Footer />
    </div>
  )
}
