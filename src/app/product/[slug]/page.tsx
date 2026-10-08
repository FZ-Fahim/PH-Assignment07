
import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Store,
} from "lucide-react";

import { getAuth } from "@/lib/auth";
import { getProducts } from "@/lib/api/products";

const bnNumber = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 2,
});

function formatNumber(value: number) {
  return bnNumber.format(value);
}

function formatPrice(value: number) {
  return `${formatNumber(value)} টাকা`;
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

  // Protect the product details page with BetterAuth
  const auth = await getAuth();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect(
      `/signin?callbackURL=${encodeURIComponent(
        `/product/${slug}`
      )}`
    );
  }

  // Find the product by its slug
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
    ? "বেড়েছে"
    : isDown
      ? "কমেছে"
      : "অপরিবর্তিত";

  const changeTextColor = isUp
    ? "text-red-600"
    : isDown
      ? "text-green-700"
      : "text-gray-500";

  const changeSymbol = isUp
    ? "▲"
    : isDown
      ? "▼"
      : "—";

  const priceDifference = Math.abs(
    product.today - product.yesterday
  );

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

        <span className="font-medium text-foreground">
          {product.nameBn}
        </span>
      </nav>

      {/* Compact Product Summary */}
      <section className="rounded-2xl border border-[#dce7de] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: Product image and information */}
          <div className="flex min-w-0 items-start gap-4 sm:items-center">
            {/* Product emoji */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#f0f6f1] sm:h-24 sm:w-24">
              <span
                role="img"
                aria-label={product.nameBn}
                className="text-5xl sm:text-6xl"
              >
                {product.image}
              </span>
            </div>

            {/* Product details */}
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                প্রতি {getUnitLabel(product.unit)} ·{" "}
                <Link
                  href={`/category/${product.category}`}
                  className="hover:text-primary hover:underline"
                >
                  {product.categoryNameBn}
                </Link>
              </p>

              <p className="mt-3 text-sm text-gray-700">
                গতকালের তুলনায় আজ দাম{" "}
                <span
                  className={`font-semibold ${changeTextColor}`}
                >
                  {changeLabel}
                </span>

                {priceDifference > 0 && (
                  <>
                    {" "}
                    · {formatPrice(priceDifference)}
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Right: Today's price */}
          <div className="flex w-full shrink-0 flex-col items-center justify-center rounded-2xl bg-[#f0f6f1] px-6 py-5 text-center sm:w-auto sm:min-w-[132px]">
            <p className="text-sm text-gray-500">
              আজকের দাম
            </p>

            <p className="mt-1 text-3xl font-extrabold text-foreground">
              {formatNumber(product.today)}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              টাকা / {getUnitLabel(product.unit)}
            </p>

            <p
              className={`mt-2 text-sm font-bold ${changeTextColor}`}
            >
              {changeSymbol}{" "}
              {formatNumber(
                Math.abs(product.change.pct)
              )}
              %
            </p>
          </div>
        </div>
      </section>

      {/* Price Comparison */}
      <section className="mt-8 rounded-2xl border border-[#dce7de] bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-5 text-xl font-bold text-foreground">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "আজকের দাম",
              price: product.today,
              color: "text-primary",
            },
            {
              label: "গতকালের দাম",
              price: product.yesterday,
              color: "text-red-600",
            },
            {
              label: "গত সপ্তাহের দাম",
              price: product.lastWeek,
              color: "text-foreground",
            },
            {
              label: "গত মাসের দাম",
              price: product.lastMonth,
              color: "text-foreground",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-[#e3eae5] bg-[#fafcfb] p-5"
            >
              <p className="text-sm text-gray-500">
                {item.label}
              </p>

              <p
                className={`mt-3 text-2xl font-bold ${item.color}`}
              >
                {formatPrice(item.price)}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                প্রতি {getUnitLabel(product.unit)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Market Price Table */}
      <section className="mt-8 rounded-2xl border border-[#dce7de] bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
              <Store size={21} className="text-primary" />
              বাজারভিত্তিক আজকের দাম
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              বিভিন্ন বাজারে পণ্যটির সর্বনিম্ন ও সর্বোচ্চ দাম
            </p>
          </div>

          <span className="rounded-full bg-[#eaf7ee] px-3 py-1.5 text-xs font-semibold text-primary">
            {formatNumber(product.markets.length)}টি বাজার
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full min-w-[720px] text-left">
            <thead className="bg-[#eef7f0] text-sm text-foreground">
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

                <th className="px-5 py-4 text-right font-bold">
                  গড়
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {product.markets.map((market, index) => {
                const average =
                  (market.min + market.max) / 2;

                return (
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

                    <td className="px-5 py-4 text-right text-sm font-bold text-foreground">
                      {formatPrice(average)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-gray-500">
          * গড় দাম সর্বনিম্ন ও সর্বোচ্চ দামের মধ্যবিন্দু
          থেকে হিসাব করা হয়েছে। বাজার ও স্থানভেদে প্রকৃত
          দাম ভিন্ন হতে পারে।
        </p>
      </section>

      {/* Back to All Products */}
      <div className="mt-8">
        <Link
          href="/#সব-পণ্য"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-primary"
        >
          <ArrowLeft size={17} />
          সব পণ্যে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
