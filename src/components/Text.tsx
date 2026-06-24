import {stegaClean} from 'next-sanity'

export type TextBlock = {
  _type: 'textBlock'
  _key: string
  eyebrow?: string | null
  heading?: string | null
  body?: string | null
  alignment?: 'left' | 'center' | null
}

type TextProps = Omit<TextBlock, '_type' | '_key'>

export function Text({eyebrow, heading, body, alignment}: TextProps) {
  const align = stegaClean(alignment) ?? 'left'

  return (
    <section
      className={[
        'flex flex-col gap-3',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
      ].join(' ')}
    >
      {eyebrow ? (
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">{eyebrow}</p>
      ) : null}
      {heading ? (
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          {heading}
        </h2>
      ) : null}
      {body ? (
        <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">{body}</p>
      ) : null}
    </section>
  )
}
