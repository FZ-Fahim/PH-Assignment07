
import Link from "next/link";
import CategoryProducts from "@/components/products/CategoryProducts";

import {
  getCategory,
  getProductsByCategory,
} from "@/lib/api/products";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  let category;
  let products;

  try {
    [category, products] = await Promise.all([
      getCategory(slug),
      getProductsByCategory(slug),
    ]);
  } catch (error) {
    console.error("Category fetch error:", error);

    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-5xl font-bold text-primary">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-foreground">
          ক্যাটাগরি পাওয়া যায়নি!
        </h2>

        <p className="mt-3 text-sm text-muted">
          ক্যাটাগরিটি খুঁজে পাওয়া যায়নি অথবা তথ্য লোড করতে সমস্যা হয়েছে।
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Category Heading */}
      <div className="mb-6 flex items-center gap-4 rounded-xl border border-border bg-white p-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-background text-3xl">
          {category.icon}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            {category.nameBn}
          </h1>

          <p className="mt-1 text-sm text-muted">
            {category.nameBn} জাতীয় পণ্যের আজকের বাজারদর
          </p>
        </div>
      </div>

      {/* Sort and Products */}
      <CategoryProducts products={products} />
    </div>
  );
}
