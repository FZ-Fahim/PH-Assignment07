
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import ProductGrid from "./ProductGrid";
import CategorySort, { type SortOption } from "./CategorySort";

import type { Product } from "@/types/product";
import { formatBanglaNumber } from "@/lib/utils/format";

interface CategoryProductsProps {
  products: Product[];
}

export default function CategoryProducts({
  products,
}: CategoryProductsProps) {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sortBy === "low") {
      result.sort((a, b) => a.today - b.today);
    }

    if (sortBy === "high") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sortBy]);

  return (
    <div>
      {/* Sorting Control */}
      <div className="mb-6 flex flex-wrap items-center justify-end gap-3 rounded-xl border border-border bg-white px-4 py-3">
        <CategorySort
          value={sortBy}
          onChange={setSortBy}
        />
      </div>

      {/* Empty State */}
      {products.length === 0 ? (
        <div className="rounded-xl border border-border bg-white px-5 py-16 text-center">
          <h2 className="text-2xl font-bold text-foreground">
            কোনো পণ্য পাওয়া যায়নি!
          </h2>

          <p className="mt-3 text-sm text-muted">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <>
          {/* Product Count */}
          <p className="mb-4 text-sm text-muted">
            মোট {formatBanglaNumber(products.length)}টি পণ্য পাওয়া গেছে
          </p>

          {/* Product Grid */}
          <ProductGrid products={sortedProducts} />
        </>
      )}
    </div>
  );
}
