import Link from "next/link";
import { notFound } from "next/navigation";

import { PageBuilder } from "@/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/client";
import { PAGE_BY_SLUG_QUERY, SLUGS_QUERY } from "@/sanity/lib/queries";
import type { PageQueryResult, SlugQueryResult } from "@/sanity/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const pages = await sanityFetch<SlugQueryResult>(SLUGS_QUERY);

  return pages
    .filter((page): page is { slug: string } => Boolean(page.slug))
    .map(({ slug }) => ({ slug }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = await sanityFetch<PageQueryResult>(PAGE_BY_SLUG_QUERY, { slug });

  if (!page) {
    notFound();
  }

  const hasContent = Boolean(page.content?.length);

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 px-6 py-24 font-sans dark:bg-black">
      <main className="w-full max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-block text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          ← All pages
        </Link>

        {page.title ? (
          <h1 className="mb-12 text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            {page.title}
          </h1>
        ) : null}

        {hasContent ? (
          <PageBuilder content={page.content} />
        ) : (
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            This page has no content blocks yet.
          </p>
        )}
      </main>
    </div>
  );
}
