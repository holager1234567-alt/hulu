import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  id: string
  eyebrow: string
  title: ReactNode
  lead?: string
  tone?: 'light' | 'dark'
}

export function SectionHeading({ id, eyebrow, title, lead, tone = 'light' }: SectionHeadingProps) {
  const dark = tone === 'dark'

  return (
    <header className="mx-auto mb-12 max-w-[44rem] text-center sm:mb-16">
      <p
        data-reveal=""
        className={cn(
          'mb-4 inline-flex items-center gap-3.5 text-[0.95rem] font-bold before:h-px before:w-7 before:bg-current before:opacity-55 after:h-px after:w-7 after:bg-current after:opacity-55',
          dark ? 'text-champagne' : 'text-rose-ink',
        )}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        data-split=""
        className={cn(
          'm-0 text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.12] font-extrabold tracking-[-0.015em] text-balance',
          dark ? 'text-cream [text-shadow:0_2px_22px_rgb(20_4_8/0.4)]' : 'text-wine',
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          data-reveal=""
          className={cn(
            'mx-auto mt-4 max-w-[36rem] text-[clamp(1.05rem,1.5vw,1.22rem)] leading-[1.7] text-balance',
            dark ? 'text-cream/80' : 'text-espresso/70',
          )}
        >
          {lead}
        </p>
      ) : null}
    </header>
  )
}
