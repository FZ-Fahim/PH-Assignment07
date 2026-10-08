
"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  RefreshCw,
  House,
} from "lucide-react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    // Log the error for development debugging.
    console.error("BazarDor page error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[65vh] items-center justify-center px-4 py-16">
      <div className="mx-auto w-full max-w-lg text-center">
        {/* Error Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
          <AlertTriangle
            size={44}
            strokeWidth={1.5}
            className="text-red-500"
          />
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-2xl font-bold text-foreground sm:text-3xl">
        একটা সমস্যা হয়েছে!
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
          দুঃখিত, এই মুহূর্তে তথ্য লোড করা যাচ্ছে না।
          অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
          >
            <RefreshCw size={17} />
            আবার চেষ্টা করুন
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <House size={17} />
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
