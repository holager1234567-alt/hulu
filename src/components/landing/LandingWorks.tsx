type Work = {
  src: string
  title: string
  category: 'דף נחיתה' | 'אתר תדמית'
  alt: string
}

const works: Work[] = [
  {
    src: '/images/portfolio/master-money-monitor-nobg.png',
    title: 'Master Money 2.0',
    category: 'דף נחיתה',
    alt: 'Master Money 2.0, דף נחיתה על מסך מחשב',
  },
  {
    src: '/images/portfolio/noa-pilates-monitor-nobg.png',
    title: 'Noa Pilates',
    category: 'אתר תדמית',
    alt: 'Noa Pilates, אתר תדמית על מסך מחשב',
  },
  {
    src: '/images/portfolio/cohen-law-monitor-nobg.png',
    title: 'כהן בן עמי',
    category: 'אתר תדמית',
    alt: 'כהן בן עמי, אתר משרד עורכי דין על מסך מחשב',
  },
  {
    src: '/images/portfolio/mels-school-monitor-nobg.png',
    title: "Mel's School",
    category: 'דף נחיתה',
    alt: "Mel's School, דף נחיתה על מסך מחשב",
  },
  {
    src: '/images/portfolio/ride-yoav-monitor-nobg.png',
    title: 'Ride With Yoav',
    category: 'דף נחיתה',
    alt: 'Ride With Yoav, דף נחיתה על מסך מחשב',
  },
]

export function LandingWorks() {
  return (
    <section id="works" className="lp-section lp-works" aria-labelledby="lp-works-title">
      <div className="lp-container">
        <header className="lp-section-head">
          <p className="lp-eyebrow" data-reveal="">
            נכסים שכבר עובדים
          </p>
          <h2 id="lp-works-title" className="lp-heading" data-split="">
            פרויקטים נבחרים
          </h2>
          <p className="lp-lead" data-reveal="">
            הצצה לכמה מהאתרים ודפי הנחיתה שבניתי לעסקים שרצו לגדול
          </p>
        </header>

        <ul className="lp-works-grid">
          {works.map((work) => (
            <li key={work.src} className="lp-work" data-reveal="">
              <figure className="lp-work-card">
                <div className="lp-work-media">
                  <img
                    src={work.src}
                    alt={work.alt}
                    width={368}
                    height={454}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption className="lp-work-caption">
                  <span className="lp-work-title" dir="auto">
                    {work.title}
                  </span>
                  <span className="lp-work-tag">{work.category}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
