"use client"

import { useState, useEffect } from "react"
import type { WikipediaContent } from "@/lib/api/wikipedia"

export function useWikiContent(gameName: string) {
  const [wikiContent, setWikiContent] = useState<WikipediaContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!gameName) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)

        const response = await fetch(`/api/wiki?game=${encodeURIComponent(gameName)}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch wiki content: ${response.status}`)
        }

        const content = await response.json()
        setWikiContent(content)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"))
        setWikiContent(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [gameName])

  return { wikiContent, loading, error }
}
