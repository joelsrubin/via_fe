import Link from "next/link";

import { sanityFetch } from "@/sanity/lib/client";
import { SLUGS_QUERY } from "@/sanity/lib/queries";
import type { SlugQueryResult } from "@/sanity/types";

export default async function Home() {
  const slugs = await sanityFetch<SlugQueryResult>(SLUGS_QUERY);

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 px-6 py-24 font-sans dark:bg-black">
      <main className="w-full max-w-3xl">
        <h1 className="mb-8 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Pages
        </h1>
        <nav className="flex flex-wrap gap-3">
          {slugs.map(({ slug }) =>
            slug ? (
              <Link
                key={slug}
                href={`/${slug}`}
                className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
              >
                {slug}
              </Link>
            ) : null,
          )}
        </nav>
      </main>
    </div>
  );
}
