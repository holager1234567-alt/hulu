const monitors = [
  {
    src: '/images/portfolio/master-money-monitor-nobg.png',
    alt: 'Master Money 2.0, דף נחיתה על מסך מחשב',
  },
  {
    src: '/images/portfolio/noa-pilates-monitor-nobg.png',
    alt: 'noa pilates, אתר על מסך מחשב',
  },
  {
    src: '/images/portfolio/cohen-law-monitor-nobg.png',
    alt: 'כהן בן עמי, אתר משרד עורכי דין על מסך מחשב',
  },
  {
    src: '/images/portfolio/mels-school-monitor-nobg.png',
    alt: "Mel's School, אתר על מסך מחשב",
  },
  {
    src: '/images/portfolio/ride-yoav-monitor-nobg.png',
    alt: 'Ride With Yoav, אתר על מסך מחשב',
  },
] as const

export function EditorialPortfolio() {
  return (
    <section className="editorial-portfolio" aria-label="עבודות נבחרות">
      <div className="editorial-portfolio-track">
        {monitors.map((monitor) => (
          <figure key={monitor.src} className="editorial-portfolio-item">
            <img
              src={monitor.src}
              alt={monitor.alt}
              width={640}
              height={480}
              loading="lazy"
              decoding="async"
              className="editorial-portfolio-img"
            />
          </figure>
        ))}
      </div>
    </section>
  )
}
