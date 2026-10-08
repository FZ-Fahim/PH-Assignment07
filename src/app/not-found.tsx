
import Link from "next/link";
import {
  House,
  ArrowLeft,
  SearchX,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[65vh] items-center justify-center px-4 py-16">
      <div className="mx-auto w-full max-w-lg text-center">
        {/* Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#e7f5eb]">
          <SearchX
            size={46}
            strokeWidth={1.5}
            className="text-primary"
          />
        </div>

        {/* Error Code */}
        <h1 className="mt-6 text-7xl font-extrabold text-primary sm:text-8xl">
          ৪০৪
        </h1>

        {/* Message */}
        <h2 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
          দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি
          হয়তো সরিয়ে ফেলা হয়েছে অথবা
          ঠিকানাটি সঠিক নয়।
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
          >
            <House size={18} />
            হোম পেজে ফিরে যান
          </Link>

          <Link
            href="/#সব-পণ্য"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ArrowLeft size={18} />
            সব পণ্য দেখুন
          </Link>
        </div>
      </div>
    </main>
  );
}
