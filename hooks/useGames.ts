"use client"

import { useState, useEffect } from "react"
import { fetchGamesClient, type RawgGame } from "@/lib/api/client/rawg"

interface UseGamesOptions {
  page?: number
  pageSize?: number
  search?: string
  genres?: string
  platforms?: string
  ordering?: string
}

export function useGames(options: UseGamesOptions = {}) {
  const [games, setGames] = useState<RawgGame[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const params: Record<string, string> = {
          page: options.page?.toString() || "1",
          page_size: options.pageSize?.toString() || "20",
        }

        if (options.search) params.search = options.search
        if (options.genres) params.genres = options.genres
        if (options.platforms) params.platforms = options.platforms
        if (options.ordering) params.ordering = options.ordering

        const data = await fetchGamesClient(params)
        setGames(data.results)
        setTotalCount(data.count)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"))
        // Provide fallback data in case of error
        setGames([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [options.page, options.pageSize, options.search, options.genres, options.platforms, options.ordering])

  return { games, loading, error, totalCount }
}
