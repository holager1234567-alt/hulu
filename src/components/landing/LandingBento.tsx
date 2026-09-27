import type { LucideIcon } from 'lucide-react'
import { Eye, Globe, MousePointerClick, Timer } from 'lucide-react'

import { SectionHeading } from '@/components/landing/SectionHeading'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type BentoItem = {
  key: string
  icon: LucideIcon
  badge: string
  title: string
  body: string
  wide: boolean
  stat?: string
  chips?: readonly string[]
  image?: { src: string; alt: string }
}

const items: BentoItem[] = [
  {
    key: 'landing',
    icon: MousePointerClick,
    badge: 'ממוקד המרה',
    title: 'דפי נחיתה',
    body: 'דפי נחיתה ממוקדים לקורסים, סדנאות והשקות שמסבירים בדיוק מה הערך וסוגרים עסקאות על אוטומט.',
    wide: true,
    chips: ['קורסים', 'סדנאות', 'השקות'],
    image: { src: '/images/portfolio/ride-yoav-monitor-nobg.png', alt: 'Ride With Yoav, דף נחיתה על מסך מחשב' },
  },
  {
    key: 'sales',
    icon: Timer,
    badge: 'מכירה על אוטומט',
    title: 'מתהליך המכירה עובר לדף',
    stat: '80%',
    body: 'הדף עונה על השאלות, מסנן התלבטויות ומוכר בשבילך מסביב לשעון',
    wide: false,
  },
  {
    key: 'demo',
    icon: Eye,
    badge: 'בלי סיכון',
    title: 'דמו לפני כל התחייבות',
    body: 'שאלון של עשר דקות, ואת רואה את הדף שלך עוד לפני שאת מחליטה',
    wide: false,
  },
  {
    key: 'sites',
    icon: Globe,
    badge: 'סמכות ונוכחות',
    title: 'אתרים',
    body: 'אתרי תדמית ומכירה רחבים שמעניקים בית שלם לעסק שלך ומבססים סמכות בלתי מעורערת.',
    wide: true,
    chips: ['תדמית', 'מכירה', 'סמכות'],
    image: { src: '/images/portfolio/cohen-law-monitor-nobg.png', alt: 'כהן בן עמי, אתר תדמית על מסך מחשב' },
  },
]

function BentoCard({ item }: { item: BentoItem }) {
  const Icon = item.icon

  return (
    <li data-reveal="" className={cn('list-none', item.wide ? 'lg:col-span-2' : 'lg:col-span-1')}>
      <Card
        className={cn(
          'group relative flex h-full flex-col overflow-hidden transition-[transform,box-shadow,border-color] duration-700 ease-luxury before:absolute before:inset-x-8 before:top-0 before:h-0.5 before:bg-gradient-to-r before:from-transparent before:via-champagne before:to-transparent hover:-translate-y-1.5 hover:border-rosegold/50 hover:shadow-[0_40px_70px_-40px_rgb(37_7_13/0.45)]',
          item.wide && 'sm:flex-row sm:items-stretch',
          !item.wide && 'bg-gradient-to-b from-wine to-wine-deep text-cream border-wine',
          item.key === 'demo' && 'from-ivory to-alabaster text-espresso border-rosegold/30',
        )}
      >
        <CardHeader className={cn('flex-1', item.wide && 'sm:py-10 sm:ps-10')}>
          <div className="mb-2 flex items-center justify-between gap-3">
            <span
              className={cn(
                'grid size-12 place-items-center rounded-2xl border [&_svg]:size-5',
                item.key === 'sales'
                  ? 'border-champagne/35 bg-cream/10 text-champagne'
                  : 'border-rosegold/30 bg-ivory text-wine',
              )}
            >
              <Icon strokeWidth={1.6} aria-hidden />
            </span>
            <Badge variant={item.key === 'sales' ? 'glass' : 'outline'}>{item.badge}</Badge>
          </div>

          {item.stat ? (
            <p className="m-0 font-lux text-[4.25rem] leading-none font-semibold text-champagne [font-variant-numeric:lining-nums]" dir="ltr">
              {item.stat}
            </p>
          ) : null}

          <CardTitle className={cn(item.wide && 'text-[clamp(1.75rem,2.6vw,2.2rem)]', item.key === 'sales' && 'text-cream')}>
            {item.title}
          </CardTitle>
          <CardDescription
            className={cn(item.wide && 'max-w-[26rem] text-[1.08rem] leading-[1.75]', item.key === 'sales' && 'text-cream/78')}
          >
            {item.body}
          </CardDescription>

          {item.chips ? (
            <ul className="m-0 mt-2 flex list-none flex-wrap gap-2 p-0">
              {item.chips.map((chip) => (
                <li key={chip}>
                  <Badge variant="outline" className="px-3.5 py-1 text-[0.85rem] font-semibold">
                    {chip}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : null}
        </CardHeader>

        {item.image ? (
          <div className="relative flex items-end justify-center px-8 pb-0 sm:w-[42%] sm:shrink-0 sm:items-center sm:px-6 sm:py-8">
            <span
              aria-hidden
              className="absolute inset-x-6 bottom-6 top-10 rounded-[1.5rem] bg-[radial-gradient(60%_60%_at_50%_55%,rgb(217_195_165/0.45),transparent_75%)]"
            />
            <img
              src={item.image.src}
              alt={item.image.alt}
              width={368}
              height={454}
              loading="lazy"
              decoding="async"
              className="relative block h-auto w-full max-w-[14rem] transition-transform duration-700 ease-luxury group-hover:-translate-y-1 group-hover:scale-[1.04]"
            />
          </div>
        ) : null}
      </Card>
    </li>
  )
}

export function LandingBento() {
  return (
    <section id="solutions" aria-labelledby="lp-solutions-title" className="relative bg-cream py-20 font-assistant sm:py-28">
      <div className="mx-auto w-full max-w-[76rem] px-5 sm:px-8">
        <SectionHeading
          id="lp-solutions-title"
          eyebrow="שני פתרונות, מטרה אחת"
          title="אתרים ודפי נחיתה"
          lead="גם אתרים מקיפים וגם דפי נחיתה ממירים, כל אחד נבנה סביב המטרה העסקית שלך"
        />

        <ul className="m-0 grid grid-cols-1 gap-5 p-0 lg:grid-cols-3 lg:gap-6">
          {items.map((item) => (
            <BentoCard key={item.key} item={item} />
          ))}
        </ul>
      </div>
    </section>
  )
}
