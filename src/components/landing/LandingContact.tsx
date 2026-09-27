import type { ReactNode } from 'react'
import { ArrowLeft, ClipboardList, Star } from 'lucide-react'

import { SectionHeading } from '@/components/landing/SectionHeading'
import { SilkBackdrop } from '@/components/three/SilkBackdrop'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { WhatsAppCta } from '@/components/ui/WhatsAppCta'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { cn } from '@/lib/utils'

const marquee = [
  'העסק שלך מוכר גם כשאת נחה',
  'פחות שאלות חוזרות, יותר לקוחות משלמות',
  'הזמן שלך שווה כסף',
  'נוכחות דיגיטלית יוקרתית',
  'גם אתרים מקיפים וגם דפי נחיתה ממירים',
  'מגיע לך להרוויח יותר ולעבוד פחות',
]

type ContactCardProps = {
  featured?: boolean
  icon: ReactNode
  title: string
  body: string
  points: string[]
  action: string
}

function ContactCard({ featured = false, icon, title, body, points, action }: ContactCardProps) {
  return (
    <article
      data-reveal=""
      className={cn(
        'relative flex flex-col gap-4 rounded-[1.75rem] p-7 transition-transform duration-700 ease-luxury hover:-translate-y-1.5 sm:p-9',
        featured
          ? 'bg-cream text-wine shadow-[0_0_0_1px_rgb(217_195_165/0.9),0_0_0_7px_rgb(217_195_165/0.16),0_40px_80px_-30px_rgb(10_2_4/0.8)] lg:-my-4 lg:py-12'
          : 'border border-champagne/30 bg-ivory/[0.06] text-cream backdrop-blur-md',
      )}
    >
      {featured ? (
        <Badge variant="solid" className="absolute -top-3.5 start-7 px-3.5 py-1.5 shadow-[0_10px_24px_-10px_rgb(37_7_13/0.6)] sm:start-9">
          <Star aria-hidden className="fill-champagne text-champagne" />
          מומלץ להתחלה
        </Badge>
      ) : null}

      <span className="grid size-12 place-items-center rounded-full border border-current opacity-85 [&_svg]:size-5">{icon}</span>
      <h3 className="m-0 text-[clamp(1.5rem,2.4vw,1.9rem)] font-extrabold">{title}</h3>
      <p className={cn('m-0 text-[1.05rem] leading-[1.7]', featured ? 'text-espresso/75' : 'text-cream/80')}>{body}</p>

      <ul className="m-0 mb-2 flex list-none flex-col gap-2 p-0">
        {points.map((point) => (
          <li key={point} className={cn('flex items-center gap-2.5 text-[0.98rem] font-semibold', featured ? 'text-espresso/80' : 'text-cream/85')}>
            <span aria-hidden className={cn('size-1.5 shrink-0 rounded-full', featured ? 'bg-rosegold' : 'bg-champagne')} />
            {point}
          </li>
        ))}
      </ul>

      <WhatsAppCta
        className={cn(buttonVariants({ variant: featured ? 'default' : 'cream', size: 'lg' }), 'mt-auto w-full sm:w-fit')}
      >
        {action}
        <ArrowLeft aria-hidden className="transition-transform duration-500 ease-luxury group-hover/button:-translate-x-1" />
      </WhatsAppCta>
    </article>
  )
}

export function LandingContact() {
  return (
    <section id="contact" aria-labelledby="lp-contact-title" className="relative isolate overflow-hidden bg-wine pt-24 font-assistant text-cream sm:pt-32">
      <SilkBackdrop palette="burgundy" />

      <div className="relative z-10 mx-auto w-full max-w-[76rem] px-5 pb-20 sm:px-8 sm:pb-24">
        <SectionHeading
          id="lp-contact-title"
          tone="dark"
          eyebrow="הצעד הבא שלך"
          title="מוכנה שהעסק שלך יתחיל לעבוד בשבילך?"
          lead="בחרי את הדרך שנוחה לך, ואני כבר אקח את זה משם"
        />

        <div className="mx-auto grid max-w-[62rem] grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-6">
          <ContactCard
            featured
            icon={<ClipboardList strokeWidth={1.5} aria-hidden />}
            title="שאלון של עשר דקות"
            body="את מספרת על העסק במילים שלך, ואני בונה ממנו כיוון ודמו שמרגיש בדיוק כמוך"
            points={['עשר דקות מהטלפון', 'דמו מעוצב לפני כל התחייבות', 'שיחת זום קצרה להצגת הקונספט']}
            action="להתחלת השאלון"
          />
          <ContactCard
            icon={<WhatsAppIcon />}
            title="שיחה ישירה בוואטסאפ"
            body="יש לך שאלה לפני שמתחילות? כתבי לי ונדבר"
            points={['מענה אישי ממני', 'בלי טפסים, ישר לעניין']}
            action="לשיחה בוואטסאפ"
          />
        </div>
      </div>

      <div
        aria-hidden
        dir="ltr"
        className="relative z-10 overflow-hidden border-t border-champagne/20 bg-wine-deep/45 py-5 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
      >
        <div className="flex w-max motion-safe:animate-marquee">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0">
              {marquee.map((line) => (
                <span
                  key={line}
                  dir="rtl"
                  className="inline-flex items-center gap-8 pe-8 text-[clamp(1rem,1.6vw,1.2rem)] font-semibold whitespace-nowrap text-cream/85"
                >
                  {line}
                  <span className="text-[0.8em] text-champagne">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
