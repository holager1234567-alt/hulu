import type { ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { viewportOnceTight } from '@/lib/motion'
import { cn } from '@/lib/utils'

type AnimatedInputProps = {
  id: string
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
  required?: boolean
}

export function AnimatedInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
}: AnimatedInputProps) {
  return (
    <motion.div
      className="group space-y-2"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnceTight}
      transition={{ duration: 0.4 }}
    >
      <Label
        htmlFor={id}
        className="block transition-transform duration-200 group-focus-within:-translate-y-0.5 group-focus-within:text-burgundy"
      >
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          'transition-all duration-300',
          'focus-visible:border-burgundy focus-visible:shadow-[0_0_0_3px_rgb(122_28_46_/_0.12)]',
        )}
      />
    </motion.div>
  )
}
