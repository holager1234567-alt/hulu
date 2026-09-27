type NightSectionHeadProps = {
  id: string
  eyebrow: string
  title: string
  lead: string
}

export function NightSectionHead({ id, eyebrow, title, lead }: NightSectionHeadProps) {
  return (
    <div className="mx-auto mb-16 max-w-2xl space-y-4 text-center">
      <span className="block text-xs tracking-widest text-sand uppercase">{eyebrow}</span>
      <h2 id={id} className="text-3xl font-bold text-cream md:text-4xl">
        {title}
      </h2>
      <p className="text-base text-mist">{lead}</p>
    </div>
  )
}
