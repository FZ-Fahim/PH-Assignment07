
import ProductCard from "@/components/products/ProductCard";
import type { Product } from "@/types/product";

interface TopRisersProps {
  products: Product[];
}

export default function TopRisers({
  products,
}: TopRisersProps) {
  const topRisers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  if (topRisers.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 sm:mt-12">
      {/* Section heading */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm font-bold text-price-up">
          ▲
        </span>

        <h2 className="text-lg font-bold text-foreground sm:text-xl">
          আজ দাম বেড়েছে
        </h2>
      </div>

      {/* Top 6 products */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {topRisers.map((product) => (
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
