
import { Suspense } from "react";
import { connection } from "next/server";

import Banner from "@/components/homepage/Banner";
import ProductGrid from "@/components/products/ProductGrid";
import TopRisers from "@/components/homepage/TopRisers";
import TopFallers from "@/components/homepage/TopFallers";

import { getProducts } from "@/lib/api/products";
import type { Product } from "@/types/product";

// Fetch product data when someone visits the page
async function HomeProducts() {
  // Defer fetching until request time, not build time.
  await connection();

  let products: Product[] = [];
  let hasError = false;

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    hasError = true;
  }

  return (
    <>
      {/* Top Risers */}
      <TopRisers products={products} />

      {/* Top Fallers */}
      <TopFallers products={products} />

      {/* All Products */}
      <section
        id="সব-পণ্য"
        className="mt-14 scroll-mt-6"
      >
        <div className="mb-7">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            সব পণ্য
          </h2>

          <p className="mt-2 text-sm text-muted sm:text-base">
            নিত্যপ্রয়োজনীয় সকল পণ্যের আজকের বাজারদর
            এক নজরে দেখুন।
          </p>
        </div>

        {hasError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="text-price-up">
              পণ্যের তথ্য লোড করা যায়নি।
              অনুগ্রহ করে আবার চেষ্টা করুন।
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-xl border border-border bg-white p-8 text-center">
            <p className="text-muted">
              বর্তমানে কোনো পণ্য পাওয়া যায়নি।
            </p>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </section>
    </>
  );
}

// Display while product data is loading
function ProductsLoading() {
  return (
    <div
      className="mt-10 space-y-8"
      role="status"
      aria-label="পণ্যের তথ্য লোড হচ্ছে"
    >
      <div className="h-7 w-48 animate-pulse rounded bg-gray-200" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-44 animate-pulse rounded-xl border border-border bg-white"
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Hero Banner */}
      <Banner />

      {/* Product sections are streamed at request time */}
      <Suspense fallback={<ProductsLoading />}>
        <HomeProducts />
      </Suspense>
    </div>
  );
}
