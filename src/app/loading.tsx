
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-7 space-y-3">
        <div className="h-8 w-40 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-80 max-w-full animate-pulse rounded bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
