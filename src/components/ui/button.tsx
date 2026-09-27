import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'group/button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-assistant font-bold transition-[transform,background-color,box-shadow,border-color,color] duration-500 ease-luxury focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-wine text-cream shadow-[0_16px_34px_-16px_rgb(37_7_13/0.65)] hover:-translate-y-0.5 hover:bg-wine-light hover:shadow-[0_22px_44px_-18px_rgb(37_7_13/0.75)]',
        outline:
          'border border-wine/20 bg-ivory/60 text-wine backdrop-blur-sm hover:-translate-y-0.5 hover:border-wine/40 hover:bg-ivory',
        cream:
          'bg-cream text-wine shadow-[0_16px_34px_-18px_rgb(10_2_4/0.7)] hover:-translate-y-0.5 hover:bg-ivory',
        ghost: 'bg-transparent text-wine hover:bg-wine/5',
        burgundy: 'bg-burgundy text-white shadow-soft hover:bg-burgundy/90',
        gold: 'bg-gold text-primary hover:bg-gold/90',
      },
      size: {
        default: 'h-11 px-6 text-[0.95rem]',
        sm: 'h-10 px-5 text-sm',
        lg: 'h-14 px-8 text-base sm:text-[1.05rem]',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
