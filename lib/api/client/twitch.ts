// Client-side Twitch API service using NEXT_PUBLIC environment variables
const TWITCH_CLIENT_ID = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID || ""
const TWITCH_API_URL = "https://api.twitch.tv/helix"

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

// For client-side, we'll use a server API route to proxy Twitch requests
// This avoids exposing the client secret
export async function searchGamesClient(query: string): Promise<{ data: TwitchGame[] }> {
  try {
    const response = await fetch(`/api/twitch/games/search?query=${encodeURIComponent(query)}`)

    if (!response.ok) {
      throw new Error(`Failed to search Twitch games: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error searching Twitch games:", error)
    throw error
  }
}

export async function getTopGamesClient(limit = 20): Promise<{ data: TwitchGame[] }> {
  try {
    const response = await fetch(`/api/twitch/games/top?limit=${limit}`)

    if (!response.ok) {
      throw new Error(`Failed to get top Twitch games: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error getting top Twitch games:", error)
    throw error
  }
}

export async function getStreamsByGameClient(gameId: string, limit = 10): Promise<{ data: TwitchStream[] }> {
  try {
    const response = await fetch(`/api/twitch/streams?gameId=${gameId}&limit=${limit}`)

    if (!response.ok) {
      throw new Error(`Failed to get Twitch streams: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error getting Twitch streams:", error)
    throw error
  }
}
