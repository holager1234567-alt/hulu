import type { CSSProperties } from 'react'
import { ArrowLeft, Check, TrendingUp } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { WhatsAppCta } from '@/components/ui/WhatsAppCta'
import { cn } from '@/lib/utils'

const introStep = (index: number) => ({ '--i': index }) as CSSProperties

export function LandingHero() {
  return (
    <section
      id="top"
      aria-labelledby="lp-hero-title"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#faf7f2_0%,#f4eee8_60%,#efe8e1_100%)] pt-[calc(4.5rem+3.5rem)] pb-40 font-assistant sm:pt-[calc(4.5rem+4.5rem)] lg:flex lg:min-h-svh lg:items-center lg:pt-[calc(4.5rem+5rem)] lg:pb-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_50%_at_50%_45%,rgb(255_253_249/0.95)_0%,rgb(255_253_249/0.5)_35%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[min(56rem,130vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(217_195_165/0.28),rgb(184_138_120/0.1)_42%,transparent_68%)] blur-2xl"
      />

      <div className="mx-auto grid w-full max-w-[76rem] items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div className="flex flex-col items-start gap-7">
          <Badge
            dir="ltr"
            style={introStep(0)}
            className="lp-intro gap-2.5 border-neutral-300 bg-white/60 px-4 py-1.5 font-lux text-[0.74rem] font-semibold tracking-[0.12em] text-espresso/80 uppercase shadow-[0_2px_12px_-4px_rgb(28_22_23/0.12)] backdrop-blur-sm sm:text-[0.9rem] sm:tracking-[0.16em]"
          >
            <span className="size-1.5 rounded-full bg-wine" aria-hidden />
            HULU Web Designer &amp; Landing page
          </Badge>

          <h1
            id="lp-hero-title"
            style={introStep(1)}
            className="lp-intro m-0 max-w-[13.5em] text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[1.08] font-extrabold tracking-tight text-balance text-espresso"
          >
            האתר שלך לא נועד רק להיראות טוב,{' '}
            <em className="text-wine not-italic">הוא נבנה כדי להכניס כסף</em>
          </h1>

          <p
            style={introStep(2)}
            className="lp-intro m-0 max-w-[33rem] text-[clamp(1.08rem,1.5vw,1.25rem)] leading-relaxed text-pretty text-neutral-600"
          >
            פיתוח אתרים ודפי נחיתה ממגנטים שמקצרים לך שמונים אחוז מזמן המכירות והופכים מתעניינות ללקוחות משלמות
          </p>

          <div style={introStep(3)} className="lp-intro mt-3 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <WhatsAppCta
              className={cn(
                buttonVariants({ size: 'lg' }),
                'rounded-full bg-wine px-9 transition-[background-color,transform,box-shadow] duration-300 ease-out hover:translate-y-0 hover:bg-wine-light motion-safe:hover:scale-[1.02]',
              )}
            >
              בואי נבנה לך דמו
              <ArrowLeft aria-hidden className="transition-transform duration-300 ease-out motion-safe:group-hover/button:-translate-x-1" />
            </WhatsAppCta>
            <a
              href="#works"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'rounded-full border-neutral-300 bg-white/70 px-9 text-espresso shadow-none transition-[background-color,border-color,transform] duration-300 ease-out hover:translate-y-0 hover:border-neutral-400 hover:bg-white motion-safe:hover:scale-[1.02]',
              )}
            >
              לפרויקטים נבחרים
            </a>
          </div>
        </div>

        <div style={introStep(1.5)} className="lp-intro flex justify-center">
          <div className="relative aspect-[5/6.4] w-[min(82%,19rem)] sm:w-[min(100%,23rem)] lg:w-[min(100%,25.5rem)]">
            <span aria-hidden className="absolute -inset-3.5 rounded-t-full rounded-b-[2.6rem] border border-champagne/80" />
            <div className="absolute inset-0 overflow-hidden rounded-t-full rounded-b-[2rem] border border-wine/15 bg-[radial-gradient(75%_55%_at_50%_32%,#fffdf9_0%,#f3e6dc_48%,#dcc2b3_100%)] shadow-[0_40px_80px_-40px_rgb(37_7_13/0.4),inset_0_0_0_8px_rgb(255_253_249/0.45)]">
              <img
                src="/images/hulu-editorial-hero.png?v=2"
                alt="הולו, מעצבת ומפתחת אתרים ודפי נחיתה"
                width={726}
                height={1024}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-x-0 bottom-0 h-[94%] w-full object-cover object-top"
              />
            </div>

            <div className="absolute inset-x-0 -bottom-28 mx-auto w-[min(17.5rem,92vw)] rounded-3xl border border-white/40 bg-white/70 p-5 shadow-[0_24px_60px_-24px_rgb(37_7_13/0.35)] backdrop-blur-md motion-safe:animate-float sm:w-[18rem] lg:inset-x-auto lg:-start-20 lg:bottom-10 lg:mx-0">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-full bg-wine/[0.08] text-wine [&_svg]:size-4">
                  <TrendingUp aria-hidden strokeWidth={1.8} />
                </span>
                <span className="text-sm font-bold text-espresso/70">הדף עובד בשבילך</span>
              </div>

              <div className="mt-3 flex items-baseline gap-2.5">
                <span dir="ltr" className="font-lux text-[2.6rem] leading-none font-semibold text-wine [font-variant-numeric:lining-nums]">
                  80%
                </span>
                <span className="text-[0.95rem] font-semibold leading-snug text-espresso/80">מזמן המכירות עובר לדף</span>
              </div>

              <div aria-hidden className="mt-3.5 h-1.5 overflow-hidden rounded-full bg-wine/10">
                <div className="h-full w-4/5 rounded-full bg-gradient-to-l from-wine to-rosegold" />
              </div>

              <div className="mt-4 flex items-center gap-2 border-t border-neutral-200/80 pt-3.5 text-sm font-semibold text-espresso/75">
                <span className="grid size-5 place-items-center rounded-full bg-wine text-cream [&_svg]:size-3">
                  <Check aria-hidden strokeWidth={3} />
                </span>
                דמו לפני כל התחייבות
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
