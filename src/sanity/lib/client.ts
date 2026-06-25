import { createClient, type QueryParams } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

const isDev = process.env.NODE_ENV === "development";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: !isDev,
});

export async function sanityFetch<QueryResponse>(
  query: string,
  params: QueryParams = {},
) {
  return client.fetch<QueryResponse>(
    query,
    params,
    isDev ? { cache: "no-store" } : { next: { revalidate: 60 } },
  );
}
