import {Text, type TextBlock} from '@/components/Text'

type PageBuilderBlock = TextBlock

type PageBuilderProps = {
  content?: PageBuilderBlock[] | null
}

export function PageBuilder({content}: PageBuilderProps) {
  if (!content?.length) {
    return null
  }

  return (
    <div className="flex flex-col gap-12">
      {content.map((block) => {
        switch (block._type) {
          case 'textBlock':
            return <Text key={block._key} {...block} />
          default:
            return null
        }
      })}
    </div>
  )
}
