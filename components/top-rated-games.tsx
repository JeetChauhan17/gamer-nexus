"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { StarIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import type { RawgGame } from "@/lib/api/rawg"

export default function TopRatedGames() {
  const [games, setGames] = useState<RawgGame[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchTopRatedGames = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/games/top-rated")

        if (!response.ok) {
          throw new Error(`Failed to fetch top rated games: ${response.status}`)
        }

        const data = await response.json()
        setGames(data.results)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"))
        setGames([])
      } finally {
        setLoading(false)
      }
    }

    fetchTopRatedGames()
  }, [])

  if (error) {
    return (
      <div className="text-center p-8 bg-muted rounded-lg">
        <p className="text-red-500">Failed to load top rated games</p>
        <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <Skeleton className="w-16 h-16 rounded-md" />
                </div>
                <div className="flex-grow min-w-0">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <div className="flex items-center gap-2 mt-1">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {games.map((game) => (
        <Link href={`/games/${game.slug}`} key={game.id}>
          <Card className="overflow-hidden hover:bg-muted/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={game.background_image || "/placeholder.svg?height=100&width=100"}
                    alt={game.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="font-bold text-base line-clamp-1">{game.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {game.genres && game.genres.length > 0 && (
                      <Badge variant="outline" className="text-xs font-normal">
                        {game.genres[0].name}
                      </Badge>
                    )}
                    <div className="flex items-center">
                      <StarIcon className="h-3 w-3 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{game.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{game.ratings_count.toLocaleString()} reviews</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
