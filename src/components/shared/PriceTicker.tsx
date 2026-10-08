
"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/api/config";

type Product = {
  id: number;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

const unitLabels: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const banglaNumber = (value: number) =>
  value.toLocaleString("bn-BD");

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.products}`);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Price ticker fetch error:", error);
      }
    }

    getProducts();
  }, []);

  if (products.length === 0) return null;

  return (
    <div className="w-full overflow-hidden border-t border-border bg-white py-2 sm:py-2.5">
      <div className="ticker-track flex w-max items-center">
        {/* Duplicate products for seamless scrolling */}
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs sm:gap-2 sm:text-sm"
            aria-hidden={copy === 1}
          >
            {products.map((product) => {
              const { dir, pct } = product.change;

              const changeColor =
                dir === "up"
                  ? "text-price-up"
                  : dir === "down"
                    ? "text-price-down"
                    : "text-price-flat";

              const arrow =
                dir === "up" ? "▲" : dir === "down" ? "▼" : "—";

              return (
                <div
                  key={product.id}
                  className="flex shrink-0 items-center gap-2 whitespace-nowrap text-sm"
                >
                  <span className="text-sm sm:text-base">{product.image}</span>

                  <span className="font-medium text-foreground">
                    {product.nameBn}
                  </span>

                  <span className="text-muted">
                    {banglaNumber(product.today)} টাকা/
                    {unitLabels[product.unit] ?? product.unit}
                  </span>

                  <span className={`font-semibold ${changeColor}`}>
                    {arrow} {banglaNumber(Math.abs(pct))}%
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
