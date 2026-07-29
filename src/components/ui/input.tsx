import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-12 w-full rounded-md border border-neutral-200 bg-white px-4 py-2 text-base text-primary transition-colors placeholder:text-muted/60 focus-visible:border-burgundy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-white',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
