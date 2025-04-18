"use client"

import { useState, useEffect } from "react"
import type { NewsArticle } from "@/lib/api/news"

interface UseGamingNewsOptions {
  gameName?: string
  pageSize?: number
}

export function useGamingNews(options: UseGamingNewsOptions = {}) {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const params = new URLSearchParams()
        if (options.gameName) params.append("game", options.gameName)
        if (options.pageSize) params.append("pageSize", options.pageSize.toString())

        const response = await fetch(`/api/news?${params.toString()}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.status}`)
        }

        const data = await response.json()
        setArticles(data.articles || [])
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"))
        setArticles([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [options.gameName, options.pageSize])

  return { articles, loading, error }
}
