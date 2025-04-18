// Wikipedia API service for wiki content
// Documentation: https://www.mediawiki.org/wiki/API:Main_page

const WIKIPEDIA_API_URL = "https://en.wikipedia.org/w/api.php"

export interface WikipediaSearchResult {
  pageid: number
  title: string
  snippet: string
  thumbnail?: {
    source: string
    width: number
    height: number
  }
}

export interface WikipediaContent {
  title: string
  extract: string
  thumbnail?: {
    source: string
    width: number
    height: number
  }
  url: string
  pageid: number
}

export async function searchWikipedia(query: string): Promise<WikipediaSearchResult[]> {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    list: "search",
    srsearch: `${query} video game`,
    srlimit: "5",
    srprop: "snippet",
    origin: "*",
  })

  const response = await fetch(`${WIKIPEDIA_API_URL}?${params.toString()}`)

  if (!response.ok) {
    throw new Error(`Failed to search Wikipedia: ${response.status}`)
  }

  const data = await response.json()
  return data.query.search
}

export async function fetchWikipediaContent(pageId: number): Promise<WikipediaContent> {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    prop: "extracts|pageimages|info",
    pageids: pageId.toString(),
    exintro: "1",
    explaintext: "1",
    pithumbsize: "300",
    inprop: "url",
    origin: "*",
  })

  const response = await fetch(`${WIKIPEDIA_API_URL}?${params.toString()}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch Wikipedia content: ${response.status}`)
  }

  const data = await response.json()
  const page = data.query.pages[pageId]

  return {
    title: page.title,
    extract: page.extract,
    thumbnail: page.thumbnail,
    url: page.fullurl,
    pageid: page.pageid,
  }
}
