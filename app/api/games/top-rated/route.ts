import { NextResponse } from "next/server"
import { fetchGames } from "@/lib/api/rawg"

export async function GET() {
  try {
    const data = await fetchGames({
      ordering: "-rating",
      page_size: "5",
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching top rated games:", error)
    return NextResponse.json({ error: "Failed to fetch top rated games" }, { status: 500 })
  }
}
