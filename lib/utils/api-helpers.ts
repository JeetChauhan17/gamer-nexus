/**
 * Handles API errors and provides fallback data
 */
export async function fetchWithErrorHandling<T>(
  url: string,
  options?: RequestInit,
  fallback: T | null = null,
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      cache: "no-store", // Prevent caching issues
    })

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching ${url}:`, error)
    if (fallback !== null) {
      return fallback as T
    }
    throw error
  }
}

/**
 * Formats a date string for display
 */
export function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch (error) {
    return "Unknown date"
  }
}
