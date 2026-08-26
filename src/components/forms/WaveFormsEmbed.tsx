import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type WaveFormsEmbedProps = {
  url: string
  title?: string
  className?: string
  onScheduled?: () => void
}

function isCalendlyOrigin(origin: string): boolean {
  return /^https:\/\/(www\.)?calendly\.com$/i.test(origin)
}

export function WaveFormsEmbed({
  url,
  title = 'קביעת שיחת אפיון בזום',
  className,
  onScheduled,
}: WaveFormsEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(640)
  const scheduledRef = useRef(false)

  useEffect(() => {
    scheduledRef.current = false
  }, [url])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (onScheduled && isCalendlyOrigin(event.origin) && !scheduledRef.current) {
        const data = event.data
        if (data && typeof data === 'object' && data.event === 'calendly.event_scheduled') {
          scheduledRef.current = true
          onScheduled()
        }
      }

      const data = event.data
      if (!data || typeof data !== 'object') return

      const nextHeight =
        typeof data.height === 'number'
          ? data.height
          : typeof data.payload?.height === 'number'
            ? data.payload.height
            : null

      if (nextHeight && nextHeight > 200) {
        setHeight(Math.min(nextHeight + 24, 1200))
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [onScheduled])

  return (
    <div className={cn('wave-forms-embed w-full overflow-hidden rounded-2xl', className)}>
      <iframe
        ref={iframeRef}
        src={url}
        title={title}
        className="w-full border-0"
        style={{ height: `${height}px`, minHeight: '520px' }}
        loading="lazy"
        allow="fullscreen"
      />
    </div>
  )
}
