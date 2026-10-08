
import Link from "next/link";
import type { Product } from "@/types/product";
import {
  formatPrice,
  formatPercentage,
  formatUnit,
} from "@/lib/utils/format";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dir } = product.change;

  const changeStyles = {
    up: "bg-red-50 text-price-up",
    down: "bg-green-50 text-price-down",
    flat: "bg-gray-100 text-price-flat",
  };

  const changeArrow = {
    up: "▲",
    down: "▼",
    flat: "—",
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white p-4 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {/* Product illustration */}
      <div className="flex h-36 items-center justify-center rounded-lg bg-background sm:h-40">
        <span
          className="text-6xl transition-transform duration-200 group-hover:scale-110"
          role="img"
          aria-label={product.nameBn}
        >
          {product.image}
        </span>
      </div>

      {/* Product information */}
      <div className="mt-4">
        <h3 className="text-base font-bold text-foreground sm:text-lg">
          {product.nameBn}
        </h3>

        <p className="mt-1 text-sm text-muted">
          প্রতি {formatUnit(product.unit)}
        </p>
      </div>

      {/* Price information */}
      <div className="mt-auto pt-4">
        <div className="border-t border-border pt-3">
          <p className="text-xs text-muted">
            আজকের দাম
          </p>

          <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xl font-bold text-foreground">
              {formatPrice(product.today)}
            </p>

            <span
              className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ${changeStyles[dir]}`}
            >
              {changeArrow[dir]}{" "}
              {formatPercentage(product.change.pct)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
