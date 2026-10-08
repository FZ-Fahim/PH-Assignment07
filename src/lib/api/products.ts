
import {
  API_BASE_URL,
  API_FALLBACK_URL,
  API_ENDPOINTS,
} from "./config";

import type {
  Product,
  Category,
} from "@/types/product";

// Reusable API request with automatic fallback
async function fetchData<T>(
  endpoint: string
): Promise<T> {
  const urls = [
    `${API_BASE_URL}${endpoint}`,
    `${API_FALLBACK_URL}${endpoint}`,
  ];

  for (const url of urls) {
    try {
      const response = await fetch(url, {
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        // Includes 429 (Too Many Requests)
        // and other HTTP errors.
        continue;
      }

      return (await response.json()) as T;
    } catch {
      // Network error, timeout, or invalid JSON.
      // Try the next API.
    }
  }

  throw new Error(
    `Unable to load data from either API: ${endpoint}`
  );
}

// Get all products
export async function getProducts(): Promise<Product[]> {
  return fetchData<Product[]>(
    API_ENDPOINTS.products
  );
}

// Get a single product by ID
export async function getProduct(
  id: number | string
): Promise<Product> {
  return fetchData<Product>(
    API_ENDPOINTS.product(id)
  );
}

// Get products by category
export async function getProductsByCategory(
  slug: string
): Promise<Product[]> {
  return fetchData<Product[]>(
    API_ENDPOINTS.productsByCategory(slug)
  );
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  return fetchData<Category[]>(
    API_ENDPOINTS.categories
  );
}

// Get a single category
export async function getCategory(
  slug: string
): Promise<Category> {
  return fetchData<Category>(
    API_ENDPOINTS.category(slug)
  );
}
