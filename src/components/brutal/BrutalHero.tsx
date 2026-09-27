import { interactiveMotion } from '@/components/brutal/motion'
import { WhatsAppCta } from '@/components/ui/WhatsAppCta'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

export function BrutalHero() {
  return (
    <section
      id="top"
      aria-labelledby="brutal-hero-title"
      aria-describedby="brutal-hero-subtitle"
      className="hero-section relative bg-transparent pt-12 pb-16 text-cream md:pt-16 md:pb-20"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <h1
          id="brutal-hero-title"
          className="m-0 flex w-full max-w-[min(100%,56rem)] flex-col items-center leading-none font-semibold text-cream"
        >
          <span className="hero-title-lead block w-full whitespace-nowrap text-[clamp(1.625rem,6.25vw,4.75rem)] md:text-[clamp(1.25rem,2.05vw,2.35rem)]">
            {site.hero.titleLead}
          </span>
          <span className="hero-title-tail mt-2 block whitespace-nowrap bg-gradient-to-l from-burgundy-light via-champagne to-rosegold bg-clip-text text-[clamp(2.75rem,8.25vw,7.25rem)] text-transparent md:mt-1.5 md:text-[clamp(1.65rem,3.15vw,3.35rem)]">
            {site.hero.titleTail}
          </span>
        </h1>

        <p
          id="brutal-hero-subtitle"
          className="mt-3 max-w-lg text-pretty text-xs font-light leading-relaxed text-white md:mt-4 md:text-sm"
        >
          {site.hero.subtitle}
        </p>

        <WhatsAppCta
          className={cn(
            'mt-5 inline-flex w-auto max-w-full items-center justify-center rounded-full bg-cream px-4 py-2.5 text-center text-sm font-semibold text-ink no-underline shadow-md ring-1 ring-cream/25 hover:bg-white hover:shadow-lg sm:mt-6 sm:px-5',
            interactiveMotion,
          )}
        >
          {site.hero.subtitleCta}
        </WhatsAppCta>

        <div className="hero-cloud-cutout-wrap relative mt-6 w-full max-w-[min(100%,480px)] md:mt-8 md:max-w-[560px]">
          <img
            src="/images/hulu-hero-cloud-cutout.png"
            alt={site.hero.imageAlt}
            width={764}
            height={1024}
            fetchPriority="high"
            decoding="async"
            className="hero-cloud-cutout relative mx-auto block h-auto max-h-[min(64vh,540px)] w-full object-contain object-bottom md:max-h-[min(68vh,640px)]"
          />
        </div>
      </div>
    </section>
  )
}
