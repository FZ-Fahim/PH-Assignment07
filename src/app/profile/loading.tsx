
export default function ProfileLoading() {
  return (
    <main className="mx-auto w-full max-w-5xl animate-pulse px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-3 h-8 w-44 rounded bg-gray-200" />
      <div className="mb-8 h-4 w-72 max-w-full rounded bg-gray-200" />

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="h-28 bg-green-100 sm:h-36" />

        <div className="px-5 pb-8 sm:px-9">
          <div className="-mt-12 h-24 w-24 rounded-full border-4 border-white bg-gray-200 sm:-mt-14 sm:h-28 sm:w-28" />

          <div className="mt-5 h-7 w-48 rounded bg-gray-200" />
          <div className="mt-3 h-4 w-32 rounded bg-gray-200" />

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="h-28 rounded-xl bg-gray-100" />
            <div className="h-28 rounded-xl bg-gray-100" />
            <div className="h-28 rounded-xl bg-gray-100 sm:col-span-2" />
          </div>
        </div>
      </div>
    </main>
  );
}
