import { type NextRequest, NextResponse } from "next/server"
import { getTopGames } from "@/lib/api/twitch"

export async function GET(request: NextRequest) {
  const limit = request.nextUrl.searchParams.get("limit") || "20"

  try {
    const data = await getTopGames(limit)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error getting top Twitch games:", error)
    return NextResponse.json({ error: "Failed to get top Twitch games" }, { status: 500 })
  }
}
