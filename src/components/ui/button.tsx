import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/40 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-white shadow-soft hover:scale-[1.03] hover:bg-primary/90 hover:shadow-[0_16px_40px_-12px_rgb(0_0_0_/_0.18)]',
        burgundy:
          'btn-burgundy-glow bg-burgundy text-white shadow-soft hover:bg-burgundy/90',
        outline:
          'border border-primary/20 bg-white/30 text-primary backdrop-blur-md hover:scale-[1.02] hover:border-burgundy/35 hover:bg-white/50 hover:text-burgundy hover:shadow-[0_16px_40px_-16px_rgb(90_14_35_/_0.18)] dark:border-white/20 dark:text-white dark:hover:bg-white/10',
        ghost:
          'bg-transparent text-primary hover:bg-primary/5 dark:text-white dark:hover:bg-white/10',
        gold: 'bg-gold text-primary hover:scale-[1.02] hover:bg-gold/90',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 rounded-md px-4 text-sm',
        lg: 'h-12 rounded-md px-8 text-base',
        icon: 'h-10 w-10',
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
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
