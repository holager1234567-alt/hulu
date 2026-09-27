import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold whitespace-nowrap [&_svg]:size-3.5',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-wine/[0.07] text-wine',
        outline: 'border-rosegold/35 bg-ivory/70 text-rose-ink',
        solid: 'border-transparent bg-wine text-cream',
        glass: 'border-champagne/30 bg-ivory/10 text-champagne',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
