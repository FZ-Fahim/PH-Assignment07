
import ProductGrid from "@/components/products/ProductGrid";
import { getProducts } from "@/lib/api/products";
import type { Product } from "@/types/product";

export default async function Home() {
  let products: Product[] = [];
  let hasError = false;

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    hasError = true;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <section id="সব-পণ্য">
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            সব পণ্য
          </h1>

          <p className="mt-2 text-sm text-muted sm:text-base">
            নিত্যপ্রয়োজনীয় সকল পণ্যের আজকের বাজারদর এক নজরে দেখুন।
          </p>
        </div>

        {hasError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="text-price-up">
              পণ্যের তথ্য লোড করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।
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
    </div>
  );
}
