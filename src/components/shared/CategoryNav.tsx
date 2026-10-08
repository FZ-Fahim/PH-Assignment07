
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/api/config";

type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

export default function CategoryNav() {
  const pathname = usePathname();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.categories}`);

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Category fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    getCategories();
  }, []);

  return (
    <nav className="w-full border-t border-border bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center gap-2 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            
            <Link
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
              className={`flex shrink-0 items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                pathname === "/"
                  ? "bg-primary text-white"
                  : "text-foreground hover:bg-primary-light hover:text-primary"
              }`}
            >
              <span>🏠</span>
              <span>হোম</span>
            </Link>

          {loading ? (
            <div className="flex gap-3 py-1">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="h-8 w-20 animate-pulse rounded-md bg-gray-100"
                />
              ))}
            </div>
          ) : (
            categories.map((category) => {
              const isActive =
                pathname === `/category/${category.slug}`;

              return (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex shrink-0 items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-foreground hover:bg-primary-light hover:text-primary"
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.nameBn}</span>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </nav>
  );
}
