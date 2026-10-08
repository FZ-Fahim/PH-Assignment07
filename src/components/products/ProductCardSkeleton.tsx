
export default function ProductCardSkeleton() {
  return (
    <div
      className="flex h-full flex-col rounded-xl border border-border bg-white p-4"
      role="status"
      aria-label="পণ্য লোড হচ্ছে"
    >
      {/* Image skeleton */}
      <div className="h-36 animate-pulse rounded-lg bg-gray-100 sm:h-40" />

      {/* Name and unit skeleton */}
      <div className="mt-4 space-y-2">
        <div className="h-5 w-2/3 animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-gray-100" />
      </div>

      {/* Price skeleton */}
      <div className="mt-auto pt-4">
        <div className="border-t border-border pt-3">
          <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />

          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="h-6 w-28 animate-pulse rounded bg-gray-100" />
            <div className="h-7 w-16 animate-pulse rounded-md bg-gray-100" />
          </div>
        </div>
      </div>

      <span className="sr-only">পণ্য লোড হচ্ছে...</span>
    </div>
  );
}
