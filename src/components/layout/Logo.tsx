import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <img
      src="/images/logo.png?v=4"
      alt="Hulu, Web Designer"
      width={160}
      height={64}
      draggable={false}
      className={cn('block h-auto w-auto max-w-none object-contain', className)}
    />
  )
}
