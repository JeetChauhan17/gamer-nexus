import { type NextRequest, NextResponse } from "next/server"
import { searchWikipedia, fetchWikipediaContent } from "@/lib/api/wikipedia"

export async function GET(request: NextRequest) {
  const gameName = request.nextUrl.searchParams.get("game")

  if (!gameName) {
    return NextResponse.json({ error: "Game parameter is required" }, { status: 400 })
  }

  try {
    // First search for the game on Wikipedia
    const searchResults = await searchWikipedia(gameName)

    if (searchResults.length > 0) {
      // Get the first result's content
      const content = await fetchWikipediaContent(searchResults[0].pageid)
      return NextResponse.json(content)
    } else {
      return NextResponse.json(null)
    }
  } catch (error) {
    console.error("Error fetching wiki content:", error)
    return NextResponse.json({ error: "Failed to fetch wiki content" }, { status: 500 })
  }
}
