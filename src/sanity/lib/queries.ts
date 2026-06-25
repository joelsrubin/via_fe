import { defineQuery } from "next-sanity";

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

export const FIRST_PAGE_QUERY = defineQuery(`
  *[_type == "page"] | order(_createdAt asc)[0]{
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
