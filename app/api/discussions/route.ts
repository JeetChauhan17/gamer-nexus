import { type NextRequest, NextResponse } from "next/server"
import { fetchGameDiscussions, generateMockDiscussions } from "@/lib/api/reddit"

export async function GET(request: NextRequest) {
  const gameName = request.nextUrl.searchParams.get("game")

  if (!gameName) {
    return NextResponse.json({ error: "Game parameter is required" }, { status: 400 })
  }

  try {
    const posts = await fetchGameDiscussions(gameName)

    // Always return something - either real posts or mock data
    return NextResponse.json(posts.length > 0 ? posts : generateMockDiscussions(gameName))
  } catch (error) {
    console.error(`Error in discussions API route for ${gameName}:`, error)
    // Return mock data with a 200 status instead of an error
    return NextResponse.json(generateMockDiscussions(gameName))
  }
}
