"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  StarIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  MessageSquareIcon,
  PencilIcon,
  BookOpenIcon,
  Share2Icon,
  Loader2Icon,
} from "lucide-react"
import Link from "next/link"
import GameRatingSystem from "@/components/game-rating-system"
import GameForumPreview from "@/components/game-forum-preview"
import GameWikiPreview from "@/components/game-wiki-preview"
import { useGameDetails } from "@/hooks/useGameDetails"
import { useWikiContent } from "@/hooks/useWikiContent"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function GameDetailPage({ params }: { params: { slug: string } }) {
  const { game, screenshots, loading: gameLoading, error: gameError } = useGameDetails(params.slug)
  const { wikiContent, loading: wikiLoading } = useWikiContent(game?.name || "")

  if (gameLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg">Loading game details...</span>
        </div>
      </div>
    )
  }

  if (gameError || !game) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive" className="mb-8">
          <AlertDescription>Failed to load game details. Please try again later.</AlertDescription>
        </Alert>
        <Button asChild>
          <Link href="/games">Back to Games</Link>
        </Button>
      </div>
    )
  }

  // Format platforms for display
  const platforms = game.platforms?.map((p) => p.platform.name) || []

  // Get developer and publisher
  const developer = game.developers?.[0]?.name || "Unknown Developer"
  const publisher = game.publishers?.[0]?.name || "Unknown Publisher"

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        {/* Main Content */}
        <div>
          {/* Game Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{game.name}</h1>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {game.genres &&
                game.genres.map((genre) => (
                  <Badge key={genre.id} variant="secondary">
                    {genre.name}
                  </Badge>
                ))}
              {platforms.map((platform, index) => (
                <Badge key={index} variant="outline">
                  {platform}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Developer: {developer}</span>
              <span>Publisher: {publisher}</span>
              <span>Released: {game.released ? new Date(game.released).toLocaleDateString() : "TBA"}</span>
            </div>
          </div>

          {/* Cover Image */}
          <div className="rounded-lg overflow-hidden mb-8">
            <img
              src={game.background_image || "/placeholder.svg?height=600&width=1200"}
              alt={game.name}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="wiki">Wiki</TabsTrigger>
              <TabsTrigger value="forum">Forum</TabsTrigger>
              <TabsTrigger value="ratings">Ratings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">About</h2>
                  <p className="text-muted-foreground">{game.description_raw || "No description available."}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Screenshots</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {screenshots && screenshots.length > 0
                      ? screenshots.slice(0, 4).map((screenshot, index) => (
                          <div key={screenshot.id} className="rounded-lg overflow-hidden">
                            <img
                              src={screenshot.image || "/placeholder.svg"}
                              alt={`${game.name} screenshot ${index + 1}`}
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        ))
                      : [...Array(4)].map((_, index) => (
                          <div key={index} className="rounded-lg overflow-hidden bg-muted">
                            <div className="aspect-video"></div>
                          </div>
                        ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button className="flex items-center gap-2" asChild>
                    <Link href={`/wiki/${params.slug}`}>
                      <BookOpenIcon className="h-4 w-4" />
                      View Full Wiki
                    </Link>
                  </Button>
                  <Button className="flex items-center gap-2" asChild>
                    <Link href={`/forums/${params.slug}`}>
                      <MessageSquareIcon className="h-4 w-4" />
                      Join Discussion
                    </Link>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Share2Icon className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="wiki">
              <GameWikiPreview
                gameSlug={params.slug}
                gameName={game.name}
                wikiContent={wikiContent}
                isLoading={wikiLoading}
              />
            </TabsContent>
            <TabsContent value="forum">
              <GameForumPreview gameSlug={params.slug} gameName={game.name} />
            </TabsContent>
            <TabsContent value="ratings">
              <GameRatingSystem gameId={game.id} initialRating={game.rating} totalRatings={game.ratings_count} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Rating Card */}
          <div className="bg-card rounded-lg border p-6">
            <h3 className="text-xl font-bold mb-4">Community Rating</h3>
            <div className="flex items-center gap-2 mb-2">
              <StarIcon className="h-6 w-6 text-yellow-500" />
              <span className="text-3xl font-bold">{game.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">/ 5</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Based on {game.ratings_count.toLocaleString()} ratings</p>
            <div className="flex gap-4 mb-6">
              <div className="flex items-center gap-1">
                <ThumbsUpIcon className="h-4 w-4 text-green-500" />
                <span className="text-sm">{Math.round(game.ratings_count * 0.85).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsDownIcon className="h-4 w-4 text-red-500" />
                <span className="text-sm">{Math.round(game.ratings_count * 0.15).toLocaleString()}</span>
              </div>
            </div>
            <Button className="w-full">Rate This Game</Button>
          </div>

          {/* Wiki Contributors */}
          <div className="bg-card rounded-lg border p-6">
            <h3 className="text-xl font-bold mb-4">Wiki Contributors</h3>
            <div className="flex -space-x-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="relative">
                  <img
                    src={`/placeholder.svg?height=40&width=40`}
                    alt={`Contributor ${i + 1}`}
                    className="h-8 w-8 rounded-full border-2 border-background"
                  />
                </div>
              ))}
              <div className="relative flex items-center justify-center h-8 w-8 rounded-full bg-muted border-2 border-background text-xs">
                +42
              </div>
            </div>
            <Button variant="outline" className="w-full flex items-center gap-2">
              <PencilIcon className="h-4 w-4" />
              Contribute to Wiki
            </Button>
          </div>

          {/* Related Games */}
          <div className="bg-card rounded-lg border p-6">
            <h3 className="text-xl font-bold mb-4">Similar Games</h3>
            <div className="space-y-4">
              {game.genres && game.genres.length > 0 ? (
                <div className="text-sm text-muted-foreground mb-2">
                  Games similar to {game.name} in the {game.genres[0].name} genre
                </div>
              ) : null}
              {[...Array(4)].map((_, i) => (
                <Link href="#" key={i} className="flex items-center gap-3 group">
                  <img
                    src={`/placeholder.svg?height=60&width=60`}
                    alt="Similar game"
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-medium group-hover:text-primary transition-colors">Similar Game {i + 1}</h4>
                    <p className="text-xs text-muted-foreground">
                      {game.genres && game.genres.length > 0 ? game.genres[0].name : "Action"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
