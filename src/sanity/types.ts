import type {TextBlock} from '@/components/Text'

export type PageQueryResult = {
  title?: string | null
  content?: TextBlock[] | null
} | null
