import { PageBuilder } from "@/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/client";
import { PAGE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import type { PageQueryResult } from "@/sanity/types";

export default async function Home() {
  const page = await sanityFetch<PageQueryResult>(PAGE_BY_SLUG_QUERY, {
    slug: "test",
  });
  const hasContent = Boolean(page?.content?.length);

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 px-6 py-24 font-sans dark:bg-black">
      <main className="w-full max-w-3xl">
        {page?.title ? (
          <h1 className="mb-12 text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            {page.title}
          </h1>
        ) : (
          <p className="mb-12 text-lg text-zinc-600 dark:text-zinc-400">
            No page found in Sanity. Create a Page document in Studio.
          </p>
        )}

        {hasContent ? (
          <PageBuilder content={page?.content} />
        ) : page ? (
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            This page has no content blocks yet. Open it in Studio and add a
            Text block under Content.
          </p>
        ) : null}
      </main>
    </div>
  );
}
