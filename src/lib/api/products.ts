
import { API_BASE_URL, API_ENDPOINTS } from "./config";
import type { Product, Category } from "@/types/product";

// Reusable API request function
async function fetchData<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

// Get all products
export async function getProducts(): Promise<Product[]> {
  return fetchData<Product[]>(API_ENDPOINTS.products);
}

// Get a single product by ID
export async function getProduct(
  id: number | string
): Promise<Product> {
  return fetchData<Product>(API_ENDPOINTS.product(id));
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
  return fetchData<Category[]>(API_ENDPOINTS.categories);
}

// Get a single category
export async function getCategory(
  slug: string
): Promise<Category> {
  return fetchData<Category>(API_ENDPOINTS.category(slug));
}
