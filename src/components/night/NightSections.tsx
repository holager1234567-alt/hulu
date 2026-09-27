import { NightSectionHead } from '@/components/night/NightSectionHead'
import { WhatsAppCta } from '@/components/ui/WhatsAppCta'
import { cn } from '@/lib/utils'

const services = [
  {
    index: '01',
    title: 'דפי נחיתה ממוקדי המרה',
    body: 'דף ייעודי שנבנה עבור קורס דיגיטלי, סדנה, תהליך ליווי או השקה. הדף מפרק התנגדויות, מציג את התוצאה בצורה חדה וסוגר עסקאות בלי שתצטרכי להסביר שוב ושוב בוואטסאפ.',
    points: ['קופירייטינג פסיכולוגי שמניע לפעולה', 'חיבור מלא למערכות סליקה ודיוור', 'טעינה מהירה במיוחד בנייד'],
  },
  {
    index: '02',
    title: 'אתרי תדמית ומכירה מקיפים',
    body: 'בית דיגיטלי שלם ומעוצב ברמת פרימיום. מציג את כל סל השירותים והמוצרים שלך, מבסס מעמד של מותג מוביל בתחומך ומייצר תחושת ביטחון מיידית אצל כל מתעניינת.',
    points: ['אפיון חוויית משתמש ועיצוב אישי', 'קטלוג שירותים ועמודי תוכן מעמיקים', 'מבנה המותאם לקידום אורגני ברשת'],
  },
]

const steps = [
  {
    index: '01',
    title: 'שאלון של עשר דקות',
    body: 'את ממלאת שאלון אפיון קצר וממוקד שמספר לנו על העסק, הלקוחות האידיאליות והמטרות הכלכליות שלך.',
  },
  {
    index: '02',
    title: 'דמו חי בשיחת זום',
    body: 'אנחנו מפתחות עבורך דף דמו מוכן, ואופיר מציגה לך אותו בשיחה קצרה של עשרים דקות ועונה על כל השאלות.',
  },
  {
    index: '03',
    title: 'סשן שדרוג ועליה לאוויר',
    body: 'בשיחה משותפת איתי אנחנו עוברות על הסקשנים, מדייקות את הניואנסים לפי הבקשות שלך ומשיקות את הנכס.',
  },
]

const works = [
  { src: '/images/portfolio/master-money-monitor-nobg.png', title: 'Master Money 2.0', category: 'דף נחיתה' },
  { src: '/images/portfolio/noa-pilates-monitor-nobg.png', title: 'Noa Pilates', category: 'אתר תדמית' },
  { src: '/images/portfolio/cohen-law-monitor-nobg.png', title: 'כהן בן עמי', category: 'אתר תדמית' },
  { src: '/images/portfolio/mels-school-monitor-nobg.png', title: "Mel's School", category: 'דף נחיתה' },
  { src: '/images/portfolio/ride-yoav-monitor-nobg.png', title: 'Ride With Yoav', category: 'דף נחיתה' },
]

const sectionClass = 'border-t border-night-line py-24'

export function NightServices() {
  return (
    <section id="services" aria-labelledby="night-services-title" className={sectionClass}>
      <NightSectionHead
        id="night-services-title"
        eyebrow="הפתרונות הדיגיטליים"
        title="הנכס הנכון בדיוק לשלב שבו העסק שלך נמצא"
        lead="בין אם את משיקה מוצר ספציפי ובין אם הגיע הזמן לבסס נוכחות מותג מלאה"
      />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {services.map((service) => (
          <article
            key={service.index}
            className="space-y-6 rounded-[8px] border border-night-line bg-night-card p-8 transition-all hover:border-sand/40 md:p-10"
          >
            <div className="flex size-10 items-center justify-center rounded-[8px] border border-night-line bg-night font-mono text-sm text-sand">
              {service.index}
            </div>
            <h3 className="text-2xl font-bold text-cream">{service.title}</h3>
            <p className="text-base leading-relaxed text-mist">{service.body}</p>
            <ul className="list-none space-y-3 p-0 pt-2 text-sm text-mist">
              {service.points.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <span className="size-1.5 shrink-0 rounded-full bg-sand" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

export function NightProcess() {
  return (
    <section id="process" aria-labelledby="night-process-title" className={sectionClass}>
      <NightSectionHead
        id="night-process-title"
        eyebrow="פשוט, מהיר וללא מאמץ"
        title="איך זה עובד בלי לקחת ממך ימי עבודה"
        lead="כל התהליך מצדך מסתכם בשעה אחת בלבד של מעורבות, אנחנו דואגות לכל השאר"
      />
      <ol className="grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-3">
        {steps.map((step) => (
          <li key={step.index} className="relative space-y-4 rounded-[8px] border border-night-line bg-night-card p-8">
            <span className="block text-3xl font-extrabold text-sand">{step.index}</span>
            <h3 className="text-xl font-bold text-cream">{step.title}</h3>
            <p className="text-sm leading-relaxed text-mist">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function NightWorks() {
  return (
    <section id="works" aria-labelledby="night-works-title" className={sectionClass}>
      <NightSectionHead
        id="night-works-title"
        eyebrow="עבודות נבחרות"
        title="פרויקטים נבחרים"
        lead="הצצה לכמה מהאתרים ודפי הנחיתה שבניתי לעסקים שרצו לגדול"
      />
      <ul className="grid list-none grid-cols-2 gap-4 p-0 md:gap-6 lg:grid-cols-6 lg:gap-8">
        {works.map((work, index) => (
          <li
            key={work.src}
            className={cn(
              'min-w-0 lg:col-span-2',
              index === 3 && 'lg:col-start-2',
              index === works.length - 1 && 'col-span-2 mx-auto w-[calc(50%-0.5rem)] md:w-[calc(50%-0.75rem)] lg:mx-0 lg:w-auto',
            )}
          >
            <figure className="group flex h-full flex-col rounded-[8px] border border-night-line bg-night-card p-3 transition-all hover:border-sand/40 md:p-6">
              <div className="flex flex-1 items-end justify-center">
                <img
                  src={work.src}
                  alt={`${work.title}, ${work.category} על מסך מחשב`}
                  width={368}
                  height={454}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full max-w-[17rem] transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </div>
              <figcaption className="mt-3 flex flex-col items-center gap-2 text-center md:mt-5 md:flex-row md:justify-between md:text-start">
                <span dir="auto" className="text-sm font-semibold text-cream md:text-base">
                  {work.title}
                </span>
                <span className="rounded-full border border-sand/30 px-2.5 py-0.5 text-xs text-sand">{work.category}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function NightVision() {
  return (
    <section id="vision" aria-labelledby="night-vision-title" className={sectionClass}>
      <div className="mx-auto max-w-4xl space-y-6 rounded-[8px] border border-night-line bg-night-card p-8 text-center md:p-16">
        <span className="block text-xs tracking-widest text-sand uppercase">השליחות שלי</span>
        <h2 id="night-vision-title" className="text-3xl font-bold text-cream md:text-4xl">
          נשים בעסקים ראויות להרוויח סכומים שמשנים מציאות
        </h2>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-mist">
          העבודה שלי איתך נולדה מתוך אמונה עמוקה בכוח של נשים להצליח, להוביל ולייצר שפע כלכלי. נכס דיגיטלי מדויק הוא לא
          מותרות, הוא הכלי שמאפשר לך להפסיק להישחק מול הטלפון ולהתחיל לראות הכנסות אמיתיות שמשקפות את הכישרון שלך.
        </p>
      </div>
    </section>
  )
}

export function NightContact() {
  return (
    <section id="contact" aria-labelledby="night-contact-title" className="space-y-8 border-t border-night-line py-28 text-center">
      <span className="block text-xs tracking-widest text-sand uppercase">הצעד הבא שלך</span>
      <h2 id="night-contact-title" className="text-4xl font-black text-cream md:text-5xl">
        מוכנה להפסיק להפסיד לקוחות חמות?
      </h2>
      <p className="mx-auto max-w-xl text-lg text-mist">
        מילוי השאלון לוקח רק עשר דקות, ובסיומו כבר נתחיל לעבוד על הדמו האישי שלך
      </p>
      <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
        <WhatsAppCta className="w-full rounded-[8px] bg-cream px-10 py-4 text-base font-bold text-night no-underline shadow-xl transition-all hover:bg-sand sm:w-auto">
          למילוי השאלון וקבלת דמו אישי
        </WhatsAppCta>
        <WhatsAppCta className="w-full rounded-[8px] border border-night-line px-8 py-4 text-base text-cream no-underline transition-all hover:border-sand sm:w-auto">
          שיחה מהירה בוואטסאפ
        </WhatsAppCta>
      </div>
    </section>
  )
}
