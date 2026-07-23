import type { TextBlock } from "@/components/Text";

export type SlugQueryResult = {
  slug: string | null;
}[];

export type PageQueryResult = {
  title?: string | null;
  content?: TextBlock[] | null;
} | null;
