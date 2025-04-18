import { type NextRequest, NextResponse } from "next/server"
import { getStreamsByGame } from "@/lib/api/twitch"

export async function GET(request: NextRequest) {
  const gameId = request.nextUrl.searchParams.get("gameId")
  const limit = request.nextUrl.searchParams.get("limit") || "10"

  if (!gameId) {
    return NextResponse.json({ error: "GameId parameter is required" }, { status: 400 })
  }

  try {
    const data = await getStreamsByGame(gameId, limit)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error getting Twitch streams:", error)
    return NextResponse.json({ error: "Failed to get Twitch streams" }, { status: 500 })
  }
}
