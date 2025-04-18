// IGDB API service for detailed game data
// Documentation: https://api-docs.igdb.com/

const IGDB_CLIENT_ID = process.env.TWITCH_CLIENT_ID || "" // IGDB uses Twitch credentials
const IGDB_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET || ""
const IGDB_API_URL = "https://api.igdb.com/v4"

let accessToken: string | null = null
let tokenExpiry: number | null = null

export interface IGDBGame {
  id: number
  name: string
  slug: string
  summary: string
  storyline?: string
  cover?: {
    id: number
    url: string
  }
  screenshots?: {
    id: number
    url: string
  }[]
  genres?: {
    id: number
    name: string
  }[]
  platforms?: {
    id: number
    name: string
  }[]
  release_dates?: {
    id: number
    date: number
    human: string
  }[]
  rating?: number
  rating_count?: number
  aggregated_rating?: number
  aggregated_rating_count?: number
  similar_games?: number[]
  dlcs?: number[]
  expansions?: number[]
  developers?: {
    id: number
    name: string
  }[]
  publishers?: {
    id: number
    name: string
  }[]
}

async function getAccessToken() {
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken
  }

  const response = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: IGDB_CLIENT_ID,
      client_secret: IGDB_CLIENT_SECRET,
      grant_type: "client_credentials",
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to get IGDB access token: ${response.status}`)
  }

  const data = await response.json()
  accessToken = data.access_token
  tokenExpiry = Date.now() + data.expires_in * 1000

  return accessToken
}

async function igdbApiRequest(endpoint: string, query: string) {
  const token = await getAccessToken()

  const response = await fetch(`${IGDB_API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Client-ID": IGDB_CLIENT_ID,
      Authorization: `Bearer ${token}`,
      "Content-Type": "text/plain",
    },
    body: query,
  })

  if (!response.ok) {
    throw new Error(`IGDB API request failed: ${response.status}`)
  }

  return response.json()
}

export async function searchGames(searchTerm: string): Promise<IGDBGame[]> {
  const query = `
    search "${searchTerm}";
    fields name,slug,cover.url,platforms.name,genres.name,summary,rating;
    limit 10;
  `

  return igdbApiRequest("/games", query)
}

export async function getGameBySlug(slug: string): Promise<IGDBGame[]> {
  const query = `
    where slug = "${slug}";
    fields name,slug,summary,storyline,cover.url,screenshots.url,genres.name,platforms.name,
    release_dates.human,rating,rating_count,aggregated_rating,aggregated_rating_count,
    similar_games,dlcs,expansions,developers.name,publishers.name;
    limit 1;
  `

  return igdbApiRequest("/games", query)
}

export async function getPopularGames(): Promise<IGDBGame[]> {
  const now = Math.floor(Date.now() / 1000)
  const oneYearAgo = now - 365 * 24 * 60 * 60

  const query = `
    where first_release_date > ${oneYearAgo} & rating_count > 5;
    sort rating desc;
    fields name,slug,cover.url,platforms.name,genres.name,summary,rating;
    limit 10;
  `

  return igdbApiRequest("/games", query)
}

export async function getGamesByIds(ids: number[]): Promise<IGDBGame[]> {
  if (ids.length === 0) return []

  const query = `
    where id = (${ids.join(",")});
    fields name,slug,cover.url,platforms.name,genres.name,summary,rating;
    limit 50;
  `

  return igdbApiRequest("/games", query)
}
