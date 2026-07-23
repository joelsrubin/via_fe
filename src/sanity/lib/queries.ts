import { defineQuery } from "next-sanity";

export const SLUGS_QUERY = defineQuery(`
  *[_type == "page" && defined(slug.current)]{
    "slug": slug.current
  }
`);

export const PAGE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    title,
    content[]{
      _key,
      _type,
      _type == "textBlock" => {
        eyebrow,
        heading,
        body,
        alignment
      }
    }
  }
`);
