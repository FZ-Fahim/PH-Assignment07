
export default function ProductDetailsLoading() {
  return (
    <main className="mx-auto w-full max-w-6xl animate-pulse px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-6 h-5 w-64 rounded bg-gray-200" />

      <div className="grid overflow-hidden rounded-2xl border border-gray-200 bg-white lg:grid-cols-[240px_1fr]">
        <div className="h-56 bg-green-50 lg:h-72" />

        <div className="space-y-5 p-6 sm:p-8">
          <div className="h-6 w-24 rounded-full bg-gray-200" />
          <div className="h-9 w-64 max-w-full rounded bg-gray-200" />
          <div className="h-12 w-40 rounded bg-gray-200" />
          <div className="h-8 w-32 rounded bg-gray-200" />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-32 rounded-xl border border-gray-200 bg-white"
          />
        ))}
      </div>

      <div className="mt-10 h-72 rounded-xl border border-gray-200 bg-white" />
    </main>
  );
}
