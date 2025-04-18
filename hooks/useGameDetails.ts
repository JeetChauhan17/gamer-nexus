"use client"

import { useState, useEffect } from "react"
import { fetchGameDetailsClient, fetchGameScreenshotsClient, type RawgGame } from "@/lib/api/client/rawg"

export function useGameDetails(slug: string) {
  const [game, setGame] = useState<RawgGame | null>(null)
  const [screenshots, setScreenshots] = useState<{ id: number; image: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const gameData = await fetchGameDetailsClient(slug)
        setGame(gameData)

        // Fetch screenshots
        if (gameData.id) {
          try {
            const screenshotsData = await fetchGameScreenshotsClient(gameData.id)
            setScreenshots(screenshotsData.results)
          } catch (screenshotError) {
            console.error("Error fetching screenshots:", screenshotError)
            // Don't fail the whole request if screenshots fail
            setScreenshots([])
          }
        }

        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"))
        setGame(null)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchData()
    }
  }, [slug])

  return { game, screenshots, loading, error }
}
