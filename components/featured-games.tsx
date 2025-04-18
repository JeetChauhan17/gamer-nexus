"use client"

import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { StarIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import type { RawgGame } from "@/lib/api/rawg"

export default function FeaturedGames() {
  const [games, setGames] = useState<RawgGame[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchFeaturedGames = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/games/featured")

        if (!response.ok) {
          throw new Error(`Failed to fetch featured games: ${response.status}`)
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

    fetchFeaturedGames()
  }, [])

  if (error) {
    return (
      <div className="text-center p-8 bg-muted rounded-lg">
        <p className="text-red-500">Failed to load featured games</p>
        <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="overflow-hidden h-full">
            <div className="aspect-video relative overflow-hidden">
              <Skeleton className="h-full w-full" />
            </div>
            <CardHeader className="p-4 pb-2">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {games.map((game) => (
        <Link href={`/games/${game.slug}`} key={game.id} className="group">
          <Card className="overflow-hidden h-full transition-all hover:shadow-md">
            <div className="aspect-video relative overflow-hidden">
              <img
                src={game.background_image || "/placeholder.svg?height=200&width=350"}
                alt={game.name}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
              />
              {game.genres && game.genres.length > 0 && (
                <Badge className="absolute top-2 right-2 bg-black/70 hover:bg-black/70">{game.genres[0].name}</Badge>
              )}
            </div>
            <CardHeader className="p-4 pb-2">
              <h3 className="font-bold text-lg line-clamp-1">{game.name}</h3>
              <p className="text-sm text-muted-foreground">
                {game.platforms && game.platforms.length > 0
                  ? game.platforms
                      .slice(0, 3)
                      .map((p) => p.platform.name)
                      .join(", ")
                  : "Multiple Platforms"}
              </p>
            </CardHeader>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <div className="flex items-center">
                <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium">{game.rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {game.released ? new Date(game.released).toLocaleDateString() : "TBA"}
              </span>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
