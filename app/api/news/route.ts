import { type NextRequest, NextResponse } from "next/server"
import { fetchGamingNews, fetchGameSpecificNews } from "@/lib/api/news"

export async function GET(request: NextRequest) {
  const gameName = request.nextUrl.searchParams.get("game")
  const pageSize = request.nextUrl.searchParams.get("pageSize") || "10"

  try {
    let data
    if (gameName) {
      data = await fetchGameSpecificNews(gameName)
    } else {
      data = await fetchGamingNews({ pageSize })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}
