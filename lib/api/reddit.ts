// Reddit API service for community discussions
// Documentation: https://www.reddit.com/dev/api/

const REDDIT_API_URL = "https://www.reddit.com"

export interface RedditPost {
  id: string
  title: string
  author: string
  subreddit: string
  score: number
  num_comments: number
  created_utc: number
  permalink: string
  url: string
  selftext: string
  thumbnail: string
  is_self: boolean
}

export interface RedditResponse {
  kind: string
  data: {
    children: {
      kind: string
      data: RedditPost
    }[]
    after: string | null
    before: string | null
  }
}

// Mock data generator for when Reddit API fails
function generateMockDiscussions(gameName: string, count = 5): RedditPost[] {
  const now = Math.floor(Date.now() / 1000)
  const topics = [
    "What's your favorite part of",
    "Just finished",
    "Need help with",
    "Best build for",
    "Hidden secrets in",
    "Is anyone else enjoying",
    "Tips and tricks for",
    "Should I buy",
    "What do you think about",
    "Bug found in",
  ]

  return Array.from({ length: count }, (_, i) => {
    const randomTopic = topics[Math.floor(Math.random() * topics.length)]
    const randomScore = Math.floor(Math.random() * 2000) + 50
    const randomComments = Math.floor(Math.random() * 500) + 10
    const randomHoursAgo = Math.floor(Math.random() * 72) + 1

    return {
      id: `mock-${gameName.replace(/\s+/g, "-").toLowerCase()}-${i}`,
      title: `${randomTopic} ${gameName}?`,
      author: ["GameFan", "RPGMaster", "ProGamer", "GameExplorer", "GamerPro"][Math.floor(Math.random() * 5)],
      subreddit: ["gaming", "Games", "pcgaming", "GameDiscussion", gameName.replace(/\s+/g, "")][
        Math.floor(Math.random() * 4)
      ],
      score: randomScore,
      num_comments: randomComments,
      created_utc: now - randomHoursAgo * 3600,
      permalink: `/r/gaming/comments/${i}/${gameName.replace(/\s+/g, "_").toLowerCase()}_discussion`,
      url: `https://reddit.com/r/gaming/comments/${i}/${gameName.replace(/\s+/g, "_").toLowerCase()}_discussion`,
      selftext: `This is a mock discussion about ${gameName} generated because the Reddit API is currently unavailable.`,
      thumbnail: "",
      is_self: true,
    }
  })
}

export async function fetchSubredditPosts(subreddit: string, limit = 10): Promise<RedditPost[]> {
  try {
    const response = await fetch(`${REDDIT_API_URL}/r/${subreddit}.json?limit=${limit}`, {
      headers: {
        // More detailed User-Agent to avoid 403 errors
        "User-Agent": "GameWiki/1.0 (Web; +https://gamewiki.example.com)",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      console.warn(`Failed to fetch subreddit posts: ${response.status}`)
      return [] // Return empty array instead of throwing
    }

    const data: RedditResponse = await response.json()
    return data.data.children.map((child) => child.data)
  } catch (error) {
    console.error(`Error fetching subreddit posts for ${subreddit}:`, error)
    return [] // Return empty array instead of throwing
  }
}

export async function searchReddit(query: string, limit = 10): Promise<RedditPost[]> {
  try {
    const params = new URLSearchParams({
      q: query,
      limit: limit.toString(),
      sort: "relevance",
      t: "month",
    })

    const response = await fetch(`${REDDIT_API_URL}/search.json?${params.toString()}`, {
      headers: {
        // More detailed User-Agent to avoid 403 errors
        "User-Agent": "GameWiki/1.0 (Web; +https://gamewiki.example.com)",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      console.warn(`Failed to search Reddit: ${response.status}`)
      // Extract game name from query for mock data
      const gameName = query.replace(" game", "").trim()
      return generateMockDiscussions(gameName, limit)
    }

    const data: RedditResponse = await response.json()
    return data.data.children.map((child) => child.data)
  } catch (error) {
    console.error(`Error searching Reddit for ${query}:`, error)
    // Extract game name from query for mock data
    const gameName = query.replace(" game", "").trim()
    return generateMockDiscussions(gameName, limit)
  }
}

export async function fetchGameDiscussions(gameName: string): Promise<RedditPost[]> {
  try {
    // Try to search for game discussions
    const results = await searchReddit(`${gameName} game`)

    // If we got results, return them
    if (results && results.length > 0) {
      return results
    }

    // If no results or error, return mock data
    return generateMockDiscussions(gameName)
  } catch (error) {
    console.error(`Error fetching game discussions for ${gameName}:`, error)
    return generateMockDiscussions(gameName)
  }
}

export { generateMockDiscussions }
