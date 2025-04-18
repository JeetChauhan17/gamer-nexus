// Twitch API service for streaming data
// Documentation: https://dev.twitch.tv/docs/api/

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID || ""
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET || ""
const TWITCH_API_URL = "https://api.twitch.tv/helix"

let accessToken: string | null = null
let tokenExpiry: number | null = null

export interface TwitchStream {
  id: string
  user_id: string
  user_name: string
  game_id: string
  game_name: string
  type: string
  title: string
  viewer_count: number
  started_at: string
  language: string
  thumbnail_url: string
  tag_ids: string[]
}

export interface TwitchGame {
  id: string
  name: string
  box_art_url: string
}

async function getAccessToken() {
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken
  }

  try {
    const response = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: TWITCH_CLIENT_ID,
        client_secret: TWITCH_CLIENT_SECRET,
        grant_type: "client_credentials",
      }),
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to get Twitch access token: ${response.status}`)
    }

    const data = await response.json()
    accessToken = data.access_token
    tokenExpiry = Date.now() + data.expires_in * 1000

    return accessToken
  } catch (error) {
    console.error("Error getting Twitch access token:", error)
    throw error
  }
}

async function twitchApiRequest(endpoint: string, params: Record<string, string> = {}) {
  const token = await getAccessToken()

  const queryParams = new URLSearchParams(params)

  try {
    const response = await fetch(`${TWITCH_API_URL}${endpoint}?${queryParams.toString()}`, {
      headers: {
        "Client-ID": TWITCH_CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Twitch API request failed: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error making Twitch API request:", error)
    throw error
  }
}

export async function searchGames(query: string): Promise<{ data: TwitchGame[] }> {
  return twitchApiRequest("/games", { name: query })
}

export async function getTopGames(limit = "20"): Promise<{ data: TwitchGame[] }> {
  return twitchApiRequest("/games/top", { first: limit })
}

export async function getStreamsByGame(gameId: string, limit = "10"): Promise<{ data: TwitchStream[] }> {
  return twitchApiRequest("/streams", { game_id: gameId, first: limit })
}
