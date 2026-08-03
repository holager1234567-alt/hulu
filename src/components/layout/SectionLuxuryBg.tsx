type SectionLuxuryBgProps = {
  variant: 'surface' | 'burgundy' | 'process' | 'benefits' | 'portfolio'
}

export function SectionLuxuryBg({ variant }: SectionLuxuryBgProps) {
  return (
    <>
      <div className={`section-luxury-bg section-luxury-bg--${variant}`} aria-hidden />
      <div className={`section-luxury-mesh section-luxury-mesh--${variant}`} aria-hidden />
      <div
        className={`tech-grid-bg section-luxury-grid section-luxury-grid--${variant}`}
        aria-hidden
      />
      <div className={`section-luxury-shine section-luxury-shine--${variant}`} aria-hidden />
      <div className={`section-luxury-ambient section-luxury-ambient--${variant}`} aria-hidden />
      <div className="grain-overlay section-luxury-grain" aria-hidden />
    </>
  )
}
