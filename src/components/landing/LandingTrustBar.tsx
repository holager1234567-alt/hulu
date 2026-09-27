import { cn } from '@/lib/utils'

const clients = [
  { name: 'Master Money 2.0', className: 'font-lux text-[1.35rem] font-bold tracking-[0.18em] uppercase', dir: 'ltr' },
  { name: 'Noa Pilates', className: 'font-lux text-[1.6rem] font-medium italic lowercase tracking-wide', dir: 'ltr' },
  { name: 'כהן בן עמי', className: 'font-assistant text-[1.3rem] font-extrabold tracking-wide', dir: 'rtl' },
  { name: "Mel's School", className: 'font-lux text-[1.5rem] font-semibold', dir: 'ltr' },
  { name: 'Ride With Yoav', className: 'font-assistant text-[1.05rem] font-extrabold tracking-[0.28em] uppercase', dir: 'ltr' },
] as const

function Wordmarks({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className={cn(
        hidden && 'motion-reduce:hidden',
        'm-0 flex shrink-0 list-none items-center gap-14 p-0 pe-14 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-10 motion-reduce:gap-y-4 motion-reduce:pe-0 sm:gap-20 sm:pe-20',
      )}
    >
      {clients.map((client) => (
        <li
          key={client.name}
          dir={client.dir}
          className={cn(
            'whitespace-nowrap text-espresso/40 transition-colors duration-500 hover:text-wine/80',
            client.className,
          )}
        >
          {client.name}
        </li>
      ))}
    </ul>
  )
}

export function LandingTrustBar() {
  return (
    <section aria-label="לקוחות" className="border-y border-champagne/35 bg-ivory py-10 font-assistant sm:py-12">
      <p className="mx-auto mb-7 max-w-[76rem] px-5 text-center text-[0.95rem] font-bold text-rose-ink sm:px-8">
        עסקים שכבר עובדים עם נכס דיגיטלי מבית הולו
      </p>
      <div
        dir="ltr"
        className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
      >
        <div className="flex w-max motion-safe:animate-marquee motion-reduce:w-full motion-reduce:justify-center">
          <Wordmarks />
          <Wordmarks hidden />
          <Wordmarks hidden />
          <Wordmarks hidden />
        </div>
      </div>
    </section>
  )
}
