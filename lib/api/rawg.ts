// RAWG API service for game data
// Documentation: https://rawg.io/apidocs

const RAWG_API_KEY = process.env.RAWG_API_KEY || ""
const RAWG_BASE_URL = "https://api.rawg.io/api"

export interface RawgGame {
  id: number
  slug: string
  name: string
  released: string
  background_image: string
  rating: number
  ratings_count: number
  metacritic: number | null
  genres: { id: number; name: string; slug: string }[]
  platforms: { platform: { id: number; name: string; slug: string } }[]
  developers: { id: number; name: string; slug: string }[]
  publishers: { id: number; name: string; slug: string }[]
  esrb_rating: { id: number; name: string; slug: string } | null
  description_raw?: string
  description?: string
  screenshots?: { id: number; image: string }[]
}

export interface RawgResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// Server-side API calls (using server environment variables)
export async function fetchGames(params: Record<string, string> = {}): Promise<RawgResponse<RawgGame>> {
  const queryParams = new URLSearchParams({
    key: RAWG_API_KEY,
    ...params,
  })

  try {
    const response = await fetch(`${RAWG_BASE_URL}/games?${queryParams.toString()}`, {
      cache: "no-store", // Prevent caching issues
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch games: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching games:", error)
    throw error
  }
}

export async function fetchGameDetails(slug: string): Promise<RawgGame> {
  const queryParams = new URLSearchParams({
    key: RAWG_API_KEY,
  })

  try {
    const response = await fetch(`${RAWG_BASE_URL}/games/${slug}?${queryParams.toString()}`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch game details: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching game details:", error)
    throw error
  }
}

export async function fetchGameScreenshots(gameId: number): Promise<{ results: { id: number; image: string }[] }> {
  const queryParams = new URLSearchParams({
    key: RAWG_API_KEY,
  })

  try {
    const response = await fetch(`${RAWG_BASE_URL}/games/${gameId}/screenshots?${queryParams.toString()}`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch game screenshots: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching game screenshots:", error)
    throw error
  }
}

export async function searchGames(query: string): Promise<RawgResponse<RawgGame>> {
  return fetchGames({ search: query })
}
