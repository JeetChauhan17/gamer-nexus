"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MessageSquareIcon, HeartIcon, PlusIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface GameForumPreviewProps {
  gameSlug: string
  gameName?: string
}

export default function GameForumPreview({ gameSlug, gameName }: GameForumPreviewProps) {
  const [discussions, setDiscussions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchDiscussions = async () => {
      if (!gameName) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await fetch(`/api/discussions?game=${encodeURIComponent(gameName)}`)

        // Even if response is not OK, we'll try to parse it
        const posts = await response.json()

        // Format the discussions
        const formattedDiscussions = (Array.isArray(posts) ? posts : []).slice(0, 3).map((post: any) => ({
          id: post.id,
          title: post.title,
          category: post.subreddit,
          author: {
            name: post.author,
            avatar: "/placeholder.svg?height=40&width=40",
          },
          replies: post.num_comments,
          likes: post.score,
          lastActivity: formatRedditTime(post.created_utc),
          url: post.id.startsWith("mock") ? `/forums/${gameSlug}` : `https://reddit.com${post.permalink}`,
        }))

        setDiscussions(formattedDiscussions)
        setError(null)
      } catch (err) {
        console.error(`Error fetching discussions for ${gameName}:`, err)
        setError(err instanceof Error ? err : new Error("Failed to load discussions"))
        setDiscussions([])
      } finally {
        setLoading(false)
      }
    }

    fetchDiscussions()
  }, [gameName, gameSlug])

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

  // Mock forum categories
  const forumCategories = [
    { id: 1, name: "General Discussion", slug: "general", posts: 342, lastActive: "5 minutes ago" },
    { id: 2, name: "Guides & Strategies", slug: "guides", posts: 156, lastActive: "1 hour ago" },
    { id: 3, name: "Technical Support", slug: "support", posts: 89, lastActive: "3 hours ago" },
    { id: 4, name: "Lore & Story", slug: "lore", posts: 124, lastActive: "Yesterday" },
  ]

  // Mock discussions for fallback
  const mockDiscussions = gameName
    ? [
        {
          id: `mock1-${gameSlug}`,
          title: `What's your favorite part of ${gameName}?`,
          category: "Gaming",
          author: { name: "GameFan", avatar: "/placeholder.svg?height=40&width=40" },
          replies: 42,
          likes: 128,
          lastActivity: "2 hours ago",
          url: `/forums/${gameSlug}`,
        },
        {
          id: `mock2-${gameSlug}`,
          title: `Tips and tricks for beginners in ${gameName}`,
          category: "Guides",
          author: { name: "ProGamer", avatar: "/placeholder.svg?height=40&width=40" },
          replies: 37,
          likes: 95,
          lastActivity: "5 hours ago",
          url: `/forums/${gameSlug}`,
        },
        {
          id: `mock3-${gameSlug}`,
          title: `Hidden secrets in ${gameName} you might have missed`,
          category: "Secrets",
          author: { name: "Explorer", avatar: "/placeholder.svg?height=40&width=40" },
          replies: 29,
          likes: 84,
          lastActivity: "Yesterday",
          url: `/forums/${gameSlug}`,
        },
      ]
    : []

  // Use mock discussions if we have no real ones
  const displayDiscussions = discussions.length > 0 ? discussions : mockDiscussions

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Forum Categories</h2>
        <Button asChild>
          <Link href={`/forums/${gameSlug}`}>View All Forums</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {forumCategories.map((category) => (
          <Link href={`/forums/${gameSlug}/${category.slug}`} key={category.id}>
            <Card className="hover:bg-muted/50 transition-colors h-full">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{category.posts} posts</span>
                  <span>Last active: {category.lastActive}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Recent Discussions</h2>
        <Button variant="outline" asChild>
          <Link href={`/forums/${gameSlug}/new`}>
            <PlusIcon className="h-4 w-4 mr-2" />
            New Post
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        {loading ? (
          [...Array(3)].map((_, i) => (
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
          ))
        ) : displayDiscussions.length > 0 ? (
          displayDiscussions.map((discussion) => (
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
                          {discussion.category}
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
          ))
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No discussions found. Be the first to start a discussion!</p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex justify-center">
        <Button variant="outline" asChild>
          <Link href={`/forums/${gameSlug}`}>View All Discussions</Link>
        </Button>
      </div>
    </div>
  )
}
