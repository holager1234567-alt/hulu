type HeroLuxuryBackdropProps = {
  /** Softer layers for sections that continue the hero visually */
  variant?: 'hero' | 'continuation'
}

export function HeroLuxuryBackdrop({
  variant = 'hero',
}: HeroLuxuryBackdropProps) {
  const continuation = variant === 'continuation'

  return (
    <>
      <div className="hero-luxury-bg" aria-hidden />
      <div className="hero-luxury-mesh" aria-hidden />
      {!continuation ? (
        <div className="hero-luxury-perspective-grid" aria-hidden>
          <div className="hero-luxury-perspective-grid-inner" />
        </div>
      ) : null}
      <div
        className={`hero-luxury-horizon ${continuation ? 'hero-luxury-horizon--soft' : ''}`}
        aria-hidden
      />
      <div className="hero-luxury-texture" aria-hidden />
      <div className="hero-luxury-ambient hero-luxury-ambient--primary" aria-hidden />
      <div className="hero-luxury-ambient hero-luxury-ambient--secondary" aria-hidden />
      <div className="hero-luxury-ambient hero-luxury-ambient--accent" aria-hidden />
      {!continuation ? (
        <div className="hero-luxury-spotlight" aria-hidden />
      ) : null}
      {!continuation ? (
        <div className="hero-luxury-nodes" aria-hidden>
          <span className="hero-luxury-node hero-luxury-node--1" />
          <span className="hero-luxury-node hero-luxury-node--2" />
          <span className="hero-luxury-node hero-luxury-node--3" />
          <span className="hero-luxury-node hero-luxury-node--4" />
        </div>
      ) : null}
      <div className="tech-grid-bg hero-luxury-grid" aria-hidden />
      <div className="hero-luxury-scanlines" aria-hidden />
      <div
        className={`hero-luxury-vignette ${continuation ? 'hero-luxury-vignette--soft' : ''}`}
        aria-hidden
      />
      <div className="grain-overlay hero-luxury-grain" aria-hidden />
    </>
  )
}
