import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type WaveFormsEmbedProps = {
  url: string
  title?: string
  className?: string
}

export function WaveFormsEmbed({
  url,
  title = 'קביעת שיחת אפיון בזום',
  className,
}: WaveFormsEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(640)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
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
  }, [])

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
