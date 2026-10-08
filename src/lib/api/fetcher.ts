
import {
  API_BASE_URL,
  API_FALLBACK_URL,
} from "./config";

export async function apiFetch<T>(
  endpoint: string
): Promise<T> {
  const baseUrls = [
    API_BASE_URL,
    API_FALLBACK_URL,
  ];

  let lastError: unknown;

  for (const baseUrl of baseUrls) {
    try {
      const response = await fetch(
        `${baseUrl}${endpoint}`,
        {
          cache: "no-store",
          signal: AbortSignal.timeout(10000),
        }
      );

      if (!response.ok) {
        throw new Error(
          `API request failed: ${response.status}`
        );
      }

      return (await response.json()) as T;
    } catch (error) {
      lastError = error;
      // Automatically try the next API.
    }
  }

  throw new Error(
    "Both BazarDor APIs are unavailable",
    { cause: lastError }
  );
}
