import { WhatsAppCta } from '@/components/ui/WhatsAppCta'

const assurances = ['ללא צורך בידע טכני', 'התאמה מלאה למובייל', 'אפיון מכירתי ממוקד']

export function NightHero() {
  return (
    <section
      id="top"
      aria-labelledby="night-hero-title"
      className="grid grid-cols-1 items-center gap-12 pt-20 pb-24 md:pt-32 md:pb-36 lg:grid-cols-12 lg:gap-8"
    >
      <div className="space-y-8 lg:col-span-7">
        <div className="inline-flex items-center gap-2 rounded-full border border-sand/30 bg-night-card px-3 py-1.5" dir="ltr">
          <span className="size-1.5 rounded-full bg-sand" aria-hidden />
          <span className="text-xs font-medium tracking-wide text-sand">HULU Web Designer &amp; Landing page</span>
        </div>

        <h1 id="night-hero-title" className="text-4xl leading-[1.15] font-extrabold text-cream sm:text-5xl lg:text-6xl">
          האתר שלך לא נועד רק להיראות טוב, הוא נבנה כדי להכניס כסף
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-mist md:text-xl">
          פיתוח אתרים מקיפים ודפי נחיתה ממגנטים שמקצרים לך שמונים אחוז מזמן המכירות והופכים מתעניינות ללקוחות משלמות על
          אוטומט
        </p>

        <div className="flex flex-col items-stretch gap-4 pt-2 sm:flex-row sm:items-center">
          <WhatsAppCta className="rounded-[8px] bg-cream px-8 py-4 text-center text-base font-semibold text-night no-underline shadow-lg transition-all hover:bg-sand">
            בואי נתחיל בדמו אישי
          </WhatsAppCta>
          <a
            href="#process"
            className="rounded-[8px] border border-night-line px-6 py-4 text-center text-base text-mist no-underline transition-all hover:border-sand hover:text-cream"
          >
            איך זה עובד בעשר דקות
          </a>
        </div>

        <ul className="flex list-none flex-wrap items-center gap-x-6 gap-y-2 p-0 pt-6 text-xs text-mauve">
          {assurances.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center lg:col-span-5">
        <div className="relative aspect-[4/5] w-full max-w-[380px] rounded-[8px] border border-night-line bg-night-card p-2 shadow-2xl">
          <div className="relative h-full w-full overflow-hidden rounded-[6px] bg-[radial-gradient(80%_60%_at_50%_35%,#42141d_0%,#1c060a_75%)]">
            <img
              src="/images/hulu-editorial-hero.png?v=2"
              alt="הולו, מעצבת ומפתחת אתרים ודפי נחיתה"
              width={726}
              height={1024}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top grayscale-[15%] transition-all duration-500 hover:grayscale-0"
            />
          </div>
          <div className="absolute -start-3 -bottom-4 rounded-[8px] border border-night-line bg-night p-4 shadow-xl sm:-start-4">
            <p className="text-xs font-semibold text-sand">חיסכון של 80%</p>
            <p className="text-xs text-mist">מתהליך המכירה הראשוני</p>
          </div>
        </div>
      </div>
    </section>
  )
}
