
export const API_BASE_URL =
  "https://api.abcz.workers.dev/api/bazardor";

export const API_FALLBACK_URL =
  "https://api.api-store.workers.dev/api/bazardor";

export const API_ENDPOINTS = {
  products: "/products",

  product: (id: number | string) =>
    `/products/${encodeURIComponent(String(id))}`,

  productsByCategory: (slug: string) =>
    `/products?category=${encodeURIComponent(slug)}`,

  categories: "/categories",

  category: (slug: string) =>
    `/categories/${encodeURIComponent(slug)}`,
};
