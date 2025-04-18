import { type NextRequest, NextResponse } from "next/server"
import { searchGames } from "@/lib/api/twitch"

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    const data = await searchGames(query)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error searching Twitch games:", error)
    return NextResponse.json({ error: "Failed to search Twitch games" }, { status: 500 })
  }
}
