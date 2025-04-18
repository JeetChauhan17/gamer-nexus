"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquareIcon, HeartIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function RecentDiscussions() {
  const [discussions, setDiscussions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        setLoading(true)
        // Fetch discussions for popular games
        const games = ["Elden Ring", "Baldur's Gate 3", "Cyberpunk 2077", "Zelda Tears of the Kingdom"]

        // Get one discussion for each game
        const discussionPromises = games.map(async (game) => {
          try {
            const response = await fetch(`/api/discussions?game=${encodeURIComponent(game)}`)

            // Even if response is not OK, we'll try to parse it
            const posts = await response.json()

            return {
              game,
              post: Array.isArray(posts) && posts.length > 0 ? posts[0] : null,
            }
          } catch (err) {
            console.warn(`Error fetching discussions for ${game}:`, err)
            return { game, post: null }
          }
        })

        const results = await Promise.all(discussionPromises)

        // Format the discussions
        const formattedDiscussions = results
          .filter((result) => result.post) // Filter out any games that didn't return posts
          .map((result) => ({
            id: result.post.id,
            title: result.post.title,
            game: result.game,
            author: {
              name: result.post.author,
              avatar: "/placeholder.svg?height=40&width=40",
            },
            replies: result.post.num_comments,
            likes: result.post.score,
            lastActivity: formatRedditTime(result.post.created_utc),
            gameSlug: result.game.toLowerCase().replace(/\s+/g, "-"),
            forumId: "discussions",
            url: result.post.id.startsWith("mock")
              ? `/forums/${result.game.toLowerCase().replace(/\s+/g, "-")}`
              : `https://reddit.com${result.post.permalink}`,
          }))

        setDiscussions(formattedDiscussions)
        setError(null)
      } catch (err) {
        console.error("Error in fetchDiscussions:", err)
        setError(err instanceof Error ? err : new Error("Failed to load discussions"))
      } finally {
        setLoading(false)
      }
    }

    fetchDiscussions()
  }, [])

  // Helper function to format Reddit timestamp
  const formatRedditTime = (timestamp: number) => {
    try {
      const now = Math.floor(Date.now() / 1000)
      const diff = now - timestamp

      if (diff < 60) return "just now"
      if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
      if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`
      if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`

      return new Date(timestamp * 1000).toLocaleDateString()
    } catch (e) {
      return "recently"
    }
  }

  // Mock discussions for fallback
  const mockDiscussions = [
    {
      id: "mock1",
      title: "What's your favorite build in Elden Ring?",
      game: "Elden Ring",
      author: { name: "EldenFan", avatar: "/placeholder.svg?height=40&width=40" },
      replies: 42,
      likes: 128,
      lastActivity: "2 hours ago",
      gameSlug: "elden-ring",
      forumId: "discussions",
      url: "/forums/elden-ring",
    },
    {
      id: "mock2",
      title: "Best party composition for Baldur's Gate 3",
      game: "Baldur's Gate 3",
      author: { name: "RPGMaster", avatar: "/placeholder.svg?height=40&width=40" },
      replies: 37,
      likes: 95,
      lastActivity: "5 hours ago",
      gameSlug: "baldurs-gate-3",
      forumId: "discussions",
      url: "/forums/baldurs-gate-3",
    },
    {
      id: "mock3",
      title: "Hidden locations in Zelda: Tears of the Kingdom",
      game: "Zelda Tears of the Kingdom",
      author: { name: "HyruleExplorer", avatar: "/placeholder.svg?height=40&width=40" },
      replies: 29,
      likes: 84,
      lastActivity: "Yesterday",
      gameSlug: "zelda-tears-of-the-kingdom",
      forumId: "discussions",
      url: "/forums/zelda-tears-of-the-kingdom",
    },
    {
      id: "mock4",
      title: "Is Cyberpunk 2077 worth playing now after all the updates?",
      game: "Cyberpunk 2077",
      author: { name: "NightCityVisitor", avatar: "/placeholder.svg?height=40&width=40" },
      replies: 53,
      likes: 112,
      lastActivity: "3 days ago",
      gameSlug: "cyberpunk-2077",
      forumId: "discussions",
      url: "/forums/cyberpunk-2077",
    },
  ]

  // Use mock discussions if we have no real ones
  const displayDiscussions = discussions.length > 0 ? discussions : mockDiscussions

  if (error) {
    return (
      <div className="space-y-4">
        {mockDiscussions.map((discussion) => (
          <a href={discussion.url} key={discussion.id}>
            <Card className="overflow-hidden hover:bg-muted/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={discussion.author.avatar || "/placeholder.svg"} alt={discussion.author.name} />
                    <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow min-w-0">
                    <h3 className="font-bold text-base line-clamp-1">{discussion.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs font-normal">
                        {discussion.game}
                      </Badge>
                      <span className="text-xs text-muted-foreground">by {discussion.author.name}</span>
                      <span className="text-xs text-muted-foreground">{discussion.lastActivity}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MessageSquareIcon className="h-3 w-3 mr-1" />
                        {discussion.replies} replies
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <HeartIcon className="h-3 w-3 mr-1" />
                        {discussion.likes} likes
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-grow min-w-0">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <div className="flex items-center gap-2 mt-1">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
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
      {displayDiscussions.map((discussion) => (
        <a
          href={discussion.url}
          target={discussion.url.startsWith("http") ? "_blank" : undefined}
          rel={discussion.url.startsWith("http") ? "noopener noreferrer" : undefined}
          key={discussion.id}
        >
          <Card className="overflow-hidden hover:bg-muted/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={discussion.author.avatar || "/placeholder.svg"} alt={discussion.author.name} />
                  <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow min-w-0">
                  <h3 className="font-bold text-base line-clamp-1">{discussion.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs font-normal">
                      {discussion.game}
                    </Badge>
                    <span className="text-xs text-muted-foreground">by {discussion.author.name}</span>
                    <span className="text-xs text-muted-foreground">{discussion.lastActivity}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MessageSquareIcon className="h-3 w-3 mr-1" />
                      {discussion.replies} replies
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <HeartIcon className="h-3 w-3 mr-1" />
                      {discussion.likes} likes
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  )
}
