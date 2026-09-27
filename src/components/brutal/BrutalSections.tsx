import { LeadPopupTrigger } from '@/components/forms/LeadPopup'
import { interactiveMotion } from '@/components/brutal/motion'
import { WhatsAppCta } from '@/components/ui/WhatsAppCta'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

const services = site.services.items
const steps = site.process.steps
const works = site.works.items

const sectionShell = 'border-b border-cream/10 bg-transparent py-24 text-cream'
const sectionHeading = 'text-3xl font-medium tracking-[-0.025em] text-cream md:text-4xl'
const sectionLead = 'text-sm text-cream/55'

function Plus() {
  return (
    <span className="font-mono text-sm font-bold text-crimson" aria-hidden>
      +
    </span>
  )
}

function ModuleRow({
  tag,
  label,
  labelClassName,
  className,
}: {
  tag: string
  label: string
  labelClassName?: string
  className?: string
}) {
  return (
    <div
      dir="ltr"
      className={cn(
        'flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-xs text-body-muted',
        className,
      )}
    >
      <span className="font-bold text-crimson">{tag}</span>
      <span className={labelClassName}>{label}</span>
    </div>
  )
}

const serviceNumeralClass =
  'brutal-accent-numeral brutal-hero-gradient-text shrink-0 select-none text-[clamp(3.25rem,11vw,5.75rem)] md:text-[clamp(3.75rem,4.75vw,5.5rem)]'

function ServiceCardWithNumeral({
  service,
  numeral,
}: {
  service: (typeof services)[number]
  numeral: string
}) {
  return (
    <div className="flex w-full min-w-0 flex-row items-center gap-3 md:gap-4 lg:gap-5">
      <span dir="ltr" aria-hidden className={serviceNumeralClass}>
        {numeral}
      </span>
      <article className="min-w-0 flex-1 space-y-6 border border-white/90 bg-burgundy-deep p-8 text-center md:p-10 lg:p-12">
        <ModuleRow tag={service.tag} label={service.module} className="text-cream/50" />
        <h3 className="text-xl font-medium tracking-[-0.02em] text-cream md:text-2xl lg:text-3xl">{service.title}</h3>
        <p className="text-base leading-relaxed text-cream/80">{service.body}</p>
        <ul className="list-none space-y-3 border-t border-cream/20 p-0 pt-6 text-sm text-cream/55">
          {service.points.map((point) => (
            <li key={point} className="flex items-center justify-center gap-2">
              <Plus />
              {point}
            </li>
          ))}
        </ul>
      </article>
    </div>
  )
}

export function BrutalSalesPitch() {
  return (
    <section id="sales-asset" aria-labelledby="brutal-sales-pitch-title" className={sectionShell}>
      <div className="mx-auto max-w-3xl px-2 md:px-6">
        <h2 id="brutal-sales-pitch-title" className={cn(sectionHeading, 'text-balance leading-[1.2]')}>
          <span className="block">
            {site.salesPitch.title.before}
            <span className="bg-gradient-to-l from-burgundy-light via-champagne to-rosegold bg-clip-text text-transparent">
              {site.salesPitch.title.highlight}
            </span>
          </span>
          <span className="mt-2 block text-[0.95em] text-cream">{site.salesPitch.title.after}</span>
        </h2>
        <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-4 md:mt-10 md:gap-5">
          {site.salesPitch.bodyLines.map((line) => (
            <p
              key={line.text}
              className={cn(
                'text-pretty leading-relaxed',
                line.emphasis
                  ? 'font-assistant text-xl font-bold leading-snug text-cream md:text-2xl'
                  : 'font-sans text-base text-cream/80 md:text-lg',
              )}
            >
              {line.text}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

export function BrutalServices() {
  return (
    <section id="services" aria-labelledby="brutal-services-title" className={sectionShell}>
      <div className="mx-auto mb-16 max-w-6xl px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 id="brutal-services-title" className={sectionHeading}>
            {site.services.title}
          </h2>
          <p className={cn('max-w-sm', sectionLead)}>{site.services.lead}</p>
        </div>
      </div>

      <div className="mx-auto flex max-w-[min(100%,80rem)] flex-col gap-10 px-6 md:flex-row md:items-start md:justify-between md:gap-8 lg:gap-10 lg:px-12">
        {services.map((service, index) => (
          <div key={service.module} className="w-full min-w-0 md:max-w-[min(100%,22rem)] md:flex-1 lg:max-w-xl">
            <ServiceCardWithNumeral service={service} numeral={String(index + 1)} />
          </div>
        ))}
      </div>
    </section>
  )
}

export function BrutalProcess() {
  return (
    <section id="process" aria-labelledby="brutal-process-title" className={sectionShell}>
      <div className="mx-auto mb-16 max-w-2xl space-y-2 text-center">
        <h2 id="brutal-process-title" className={sectionHeading}>
          {site.process.title}
        </h2>
        <p className={sectionLead}>{site.process.lead}</p>
      </div>

      <ol className="grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-3 md:gap-8">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="space-y-4 border border-white/90 bg-burgundy-deep p-8 text-center"
          >
            <span dir="ltr" className="block font-mono text-xs font-bold tracking-wider text-crimson uppercase">
              {site.process.phase(index)}
            </span>
            <h3 className="text-xl font-medium tracking-[-0.02em] text-cream">{step.title}</h3>
            <p className="text-base leading-relaxed text-cream/55">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function BrutalWorks() {
  return (
    <section id="works" aria-labelledby="brutal-works-title" className={sectionShell}>
      <div className="mb-16 text-center">
        <h2 id="brutal-works-title" className={sectionHeading}>
          {site.works.title}
        </h2>
      </div>

      <ul className="mx-auto flex max-w-[90rem] list-none flex-col items-center gap-12 p-0 max-md:gap-14 md:flex-row md:flex-nowrap md:items-end md:justify-center md:gap-x-5 md:gap-y-0 lg:gap-x-6">
        {works.map((work) => (
          <li key={work.src} className="w-full max-w-[15rem] shrink-0 bg-transparent md:w-auto md:max-w-none md:min-w-0">
            <figure className="group flex h-full flex-col p-2 text-center sm:p-3">
              <div className="flex flex-1 items-end justify-center bg-transparent">
                <img
                  src={work.src}
                  alt={site.works.alt(work.title, work.category)}
                  width={368}
                  height={454}
                  loading="lazy"
                  decoding="async"
                  className="work-portfolio-monitor mx-auto block h-auto w-full max-w-[15rem] bg-transparent transition-transform duration-300 ease-exit group-hover:scale-[1.03] group-hover:duration-200 group-hover:ease-enter motion-reduce:transition-none motion-reduce:group-hover:scale-100 md:mx-0 md:max-w-[13rem] lg:max-w-[14.5rem] xl:max-w-[15.5rem]"
                />
              </div>
              <figcaption className="mt-3 flex flex-col items-center gap-1.5 md:mt-4">
                <span dir="auto" className="text-sm font-medium tracking-[-0.01em] text-cream md:text-base">
                  {work.title}
                </span>
                <span className="flex items-center justify-center gap-1.5 text-xs text-cream/55 md:text-sm">
                  <Plus />
                  {work.category}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function BrutalAbout() {
  return (
    <section id="about" aria-labelledby="brutal-about-title" className={sectionShell}>
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center md:gap-10">
        <div className="space-y-3">
          <h2 id="brutal-about-title" className={sectionHeading}>
            {site.about.title}
          </h2>
          <p className="text-lg font-medium text-cream md:text-xl">{site.about.intro}</p>
        </div>
        <figure className="w-full max-w-[9.5rem] rotate-[-5deg] sm:max-w-[10.5rem] md:max-w-[11.5rem]">
          <div className="border border-white/90 bg-burgundy-deep p-1.5 shadow-[0_18px_40px_-20px_rgb(0_0_0_/_0.55)] md:p-2">
            <img
              src={site.about.image}
              alt={site.about.imageAlt}
              width={640}
              height={800}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover object-[center_62%]"
            />
          </div>
        </figure>
        <p className="max-w-xl text-base leading-relaxed text-cream/80 md:text-lg">{site.about.body}</p>
      </div>
    </section>
  )
}

export function BrutalContact() {
  return (
    <section
      id="contact"
      aria-labelledby="brutal-contact-title"
      className="space-y-8 bg-transparent py-28 text-center text-cream"
    >
      <div className="space-y-4">
        <h2 id="brutal-contact-title" className="text-4xl font-medium tracking-[-0.03em] text-cream md:text-6xl">
          {site.contact.title}
        </h2>
        <p
          id="brutal-contact-subtitle"
          className="font-sans text-2xl font-semibold tracking-tight text-cream md:text-4xl"
        >
          {site.contact.subtitle}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
        <LeadPopupTrigger
          className={cn(
            'w-full cursor-pointer rounded-full border-0 bg-oxblood px-8 py-3.5 text-sm font-semibold text-cream shadow-md hover:bg-ink sm:w-auto',
            interactiveMotion,
          )}
        >
          {site.contact.primaryCta}
        </LeadPopupTrigger>
        <WhatsAppCta
          className={cn(
            'w-full rounded-full border border-cream/35 px-8 py-3.5 text-sm text-cream no-underline hover:border-cream hover:bg-cream/10 sm:w-auto',
            interactiveMotion,
          )}
        >
          {site.contact.secondaryCta}
        </WhatsAppCta>
      </div>
    </section>
  )
}
