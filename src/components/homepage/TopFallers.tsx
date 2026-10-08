
import ProductCard from "@/components/products/ProductCard";
import type { Product } from "@/types/product";

interface TopFallersProps {
  products: Product[];
}

export default function TopFallers({
  products,
}: TopFallersProps) {
  const topFallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  if (topFallers.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 sm:mt-12">
      {/* Section Heading */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm font-bold text-price-down">
          ▼
        </span>

        <h2 className="text-lg font-bold text-foreground sm:text-xl">
          আজ দাম কমেছে
        </h2>
      </div>

      {/* Top 6 Price Fallers */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {topFallers.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="compact"
          />
        ))}
      </div>
    </section>
  );
}
