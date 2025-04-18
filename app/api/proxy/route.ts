// API proxy route to hide API keys from client-side requests
import { type NextRequest, NextResponse } from "next/server"

// List of allowed API endpoints to proxy
const ALLOWED_ENDPOINTS = ["https://api.rawg.io/api", "https://newsapi.org/v2", "https://en.wikipedia.org/w/api.php"]

// Map of API endpoints to their respective API keys
const API_KEYS: Record<string, string> = {
  "https://api.rawg.io/api": process.env.RAWG_API_KEY || "",
  "https://newsapi.org/v2": process.env.NEWS_API_KEY || "",
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
  }

  // Check if the URL is allowed
  const isAllowed = ALLOWED_ENDPOINTS.some((endpoint) => url.startsWith(endpoint))

  if (!isAllowed) {
    return NextResponse.json({ error: "URL not allowed" }, { status: 403 })
  }

  try {
    // Add API key if needed
    let finalUrl = url
    for (const [endpoint, apiKey] of Object.entries(API_KEYS)) {
      if (url.startsWith(endpoint)) {
        const separator = url.includes("?") ? "&" : "?"
        finalUrl = `${url}${separator}key=${apiKey}`
        break
      }
    }

    const response = await fetch(finalUrl, {
      // Add cache: 'no-store' to prevent caching issues during development
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Proxy error:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}
