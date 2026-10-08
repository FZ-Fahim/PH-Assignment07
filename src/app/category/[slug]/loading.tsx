
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";

export default function CategoryLoading() {
  return (
    <div
      className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10"
      role="status"
      aria-label="ক্যাটাগরির তথ্য লোড হচ্ছে"
    >
      {/* Category Header Skeleton */}
      <div className="mb-6 flex items-center gap-4 rounded-xl border border-border bg-white p-5">
        <div className="h-14 w-14 animate-pulse rounded-xl bg-gray-100" />

        <div className="flex-1 space-y-3">
          <div className="h-6 w-36 animate-pulse rounded bg-gray-100" />
          <div className="h-4 w-60 max-w-full animate-pulse rounded bg-gray-100" />
        </div>
      </div>

      {/* Sort Skeleton */}
      <div className="mb-6 flex justify-end rounded-xl border border-border bg-white p-4">
        <div className="h-10 w-44 animate-pulse rounded-lg bg-gray-100" />
      </div>

      {/* Product Grid Skeleton */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>

      <span className="sr-only">
        ক্যাটাগরির পণ্য লোড হচ্ছে...
      </span>
    </div>
  );
}
