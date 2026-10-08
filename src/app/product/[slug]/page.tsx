
import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  MapPin,
  CalendarDays,
  Store,
} from "lucide-react";

import { getAuth } from "@/lib/auth";
import { getProducts } from "@/lib/api/products";

// Bengali number formatter
const bnNumber = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 2,
});

function formatPrice(value: number) {
  return `৳${bnNumber.format(value)}`;
}

function formatNumber(value: number) {
  return bnNumber.format(value);
}

function getUnitLabel(unit: string) {
  const units: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  return units[unit] ?? unit;
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailsPage({
  params,
}: PageProps) {
  const { slug } = await params;

  // Check the session on the server
  const auth = await getAuth();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect visitors to sign in first
  if (!session?.user) {
    redirect(
      `/signin?callbackURL=${encodeURIComponent(
        `/product/${slug}`
      )}`
    );
  }

  // Our API supports numeric IDs, so find the product by slug
  // using the existing products endpoint.
  const products = await getProducts();

  const product = products.find(
    (item) => item.slug === slug
  );

  if (!product) {
    notFound();
  }

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const changeLabel = isUp
    ? "দাম বেড়েছে"
    : isDown
      ? "দাম কমেছে"
      : "দাম অপরিবর্তিত";

  const changeColor = isUp
    ? "text-red-600"
    : isDown
      ? "text-green-700"
      : "text-gray-600";

  const changeBg = isUp
    ? "bg-red-50"
    : isDown
      ? "bg-green-50"
      : "bg-gray-100";

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500"
      >
        <Link href="/" className="hover:text-primary">
          হোম
        </Link>

        <span>/</span>

        <Link
          href={`/category/${product.category}`}
          className="hover:text-primary"
        >
          {product.categoryNameBn}
        </Link>

        <span>/</span>

        <span className="font-medium text-gray-800">
          {product.nameBn}
        </span>
      </nav>

      {/* Main product summary */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr]">
          {/* Product image */}
          <div className="flex min-h-52 items-center justify-center bg-[#f0f8f2] p-8">
            <span
              role="img"
              aria-label={product.nameBn}
              className="text-8xl sm:text-9xl"
            >
              {product.image}
            </span>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8">
            <Link
              href={`/category/${product.category}`}
              className="inline-flex rounded-full bg-[#eaf7ee] px-3 py-1 text-xs font-semibold text-primary hover:underline"
            >
              {product.categoryNameBn}
            </Link>

            <h1 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
              {product.nameBn}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              বাংলাদেশের বিভিন্ন বাজারের সর্বশেষ পণ্যমূল্য
            </p>

            {/* Current price */}
            <div className="mt-7 flex flex-wrap items-end gap-3">
              <span className="text-4xl font-extrabold text-primary sm:text-5xl">
                {formatPrice(product.today)}
              </span>

              <span className="pb-1 text-sm text-gray-500">
                / {getUnitLabel(product.unit)}
              </span>
            </div>

            {/* Change indicator */}
            <div
              className={`mt-5 inline-flex items-center gap-2 rounded-lg px-3 py-2 ${changeBg} ${changeColor}`}
            >
              {isUp ? (
                <ArrowUpRight size={18} />
              ) : isDown ? (
                <ArrowDownRight size={18} />
              ) : (
                <Minus size={18} />
              )}

              <span className="text-sm font-semibold">
                {changeLabel}
              </span>

              <span className="text-sm font-bold">
                {formatNumber(product.change.pct)}%
              </span>
            </div>

            <p className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <CalendarDays size={15} />
              গতকালের দামের তুলনায় পরিবর্তন
            </p>
          </div>
        </div>
      </section>

      {/* Previous price comparison */}
      <section className="mt-8">
        <h2 className="mb-5 text-xl font-bold text-foreground">
          দামের তুলনা
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "আজকের দাম",
              price: product.today,
              accent: true,
            },
            {
              label: "গতকালের দাম",
              price: product.yesterday,
              accent: false,
            },
            {
              label: "গত সপ্তাহের দাম",
              price: product.lastWeek,
              accent: false,
            },
            {
              label: "গত মাসের দাম",
              price: product.lastMonth,
              accent: false,
            },
          ].map((item) => (
            <div
              key={item.label}
              className={`rounded-xl border p-5 shadow-sm ${
                item.accent
                  ? "border-green-200 bg-[#f0f9f2]"
                  : "border-gray-200 bg-white"
              }`}
            >
              <p className="text-sm text-gray-500">
                {item.label}
              </p>

              <p
                className={`mt-3 text-2xl font-bold ${
                  item.accent
                    ? "text-primary"
                    : "text-foreground"
                }`}
              >
                {formatPrice(item.price)}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                প্রতি {getUnitLabel(product.unit)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Market prices */}
      <section className="mt-10">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
              <Store size={21} className="text-primary" />
              বাজারভিত্তিক দাম
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              বিভিন্ন বাজারে পণ্যটির সর্বনিম্ন ও সর্বোচ্চ দাম
            </p>
          </div>

          <span className="rounded-full bg-[#eaf7ee] px-3 py-1.5 text-xs font-semibold text-primary">
            {formatNumber(product.markets.length)}টি বাজার
          </span>
        </div>

        {/* Desktop table + mobile horizontal scroll */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full min-w-[580px] text-left">
            <thead className="bg-[#eef7f0] text-sm text-gray-700">
              <tr>
                <th className="px-5 py-4 font-bold">
                  বাজার
                </th>

                <th className="px-5 py-4 font-bold">
                  বিভাগ
                </th>

                <th className="px-5 py-4 font-bold">
                  সর্বনিম্ন দাম
                </th>

                <th className="px-5 py-4 font-bold">
                  সর্বোচ্চ দাম
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {product.markets.map((market, index) => (
                <tr
                  key={`${market.market}-${index}`}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-5 py-4 text-sm font-semibold text-foreground">
                    <span className="flex items-center gap-2">
                      <MapPin
                        size={16}
                        className="shrink-0 text-primary"
                      />

                      {market.market}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {market.division}
                  </td>

                  <td className="px-5 py-4 text-sm font-bold text-green-700">
                    {formatPrice(market.min)}
                  </td>

                  <td className="px-5 py-4 text-sm font-bold text-red-600">
                    {formatPrice(market.max)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-gray-500">
          * বাজার ও স্থানভেদে পণ্যের প্রকৃত দাম ভিন্ন হতে পারে।
        </p>
      </section>

      {/* Back button */}
      <div className="mt-10">
        <Link
          href="/#সব-পণ্য"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <ArrowLeft size={17} />
          সব পণ্যে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
