// NewsAPI service for gaming news
// Documentation: https://newsapi.org/docs

const NEWS_API_KEY = process.env.NEWS_API_KEY || ""
const NEWS_API_URL = "https://newsapi.org/v2"

export interface NewsArticle {
  source: {
    id: string | null
    name: string
  }
  author: string | null
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  content: string | null
}

export interface NewsResponse {
  status: string
  totalResults: number
  articles: NewsArticle[]
}

export async function fetchGamingNews(params: Record<string, string> = {}): Promise<NewsResponse> {
  const defaultParams = {
    q: 'gaming OR "video games"',
    language: "en",
    sortBy: "publishedAt",
    pageSize: "10",
  }

  const queryParams = new URLSearchParams({
    ...defaultParams,
    ...params,
    apiKey: NEWS_API_KEY,
  })

  try {
    const response = await fetch(`${NEWS_API_URL}/everything?${queryParams.toString()}`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching gaming news:", error)
    throw error
  }
}

export async function fetchGameSpecificNews(gameName: string): Promise<NewsResponse> {
  return fetchGamingNews({ q: `"${gameName}" game` })
}
