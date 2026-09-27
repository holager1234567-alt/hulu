import { Fragment } from 'react'

/** Renders **bold** markers from the site copy file. */
export function RichText({ text, strongClassName }: { text: string; strongClassName?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index} className={strongClassName}>
              {part.slice(2, -2)}
            </strong>
          )
        }
        return <Fragment key={index}>{part}</Fragment>
      })}
    </>
  )
}
