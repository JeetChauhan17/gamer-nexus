"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { PencilIcon, BookOpenIcon, ClockIcon, UsersIcon } from "lucide-react"
import type { WikipediaContent } from "@/lib/api/wikipedia"
import { Skeleton } from "@/components/ui/skeleton"
import { useWikiContent } from "@/hooks/useWikiContent"
import { useEffect, useState } from "react"

interface GameWikiPreviewProps {
  gameSlug: string
  gameName?: string
  wikiContent?: WikipediaContent | null
  isLoading?: boolean
}

export default function GameWikiPreview({
  gameSlug,
  gameName,
  wikiContent: propWikiContent,
  isLoading: propIsLoading,
}: GameWikiPreviewProps) {
  const [fetchedWikiContent, setFetchedWikiContent] = useState<WikipediaContent | null>(null)
  const [fetchLoading, setFetchLoading] = useState(false)

  const { wikiContent: hookWikiContent, loading: hookLoading } = useWikiContent(gameName || "")

  useEffect(() => {
    if (!propWikiContent && gameName) {
      setFetchLoading(true)
      // useWikiContent(gameName) // Removed conditional hook call
      //   .then((result) => {
      //     setFetchedWikiContent(result.wikiContent)
      //     setFetchLoading(result.loading)
      //   })
      //   .catch((error) => {
      //     console.error("Error fetching wiki content:", error)
      //     setFetchLoading(false)
      //   })
    } else {
      setFetchLoading(false)
    }
  }, [gameName, propWikiContent])

  useEffect(() => {
    if (hookWikiContent) {
      setFetchedWikiContent(hookWikiContent)
    }
    setFetchLoading(hookLoading)
  }, [hookWikiContent, hookLoading])

  // Use either the prop or fetched data
  const wikiContent = propWikiContent || fetchedWikiContent
  const isLoading = propIsLoading || fetchLoading

  // Mock wiki sections
  const wikiSections = [
    { id: 1, title: "Game Mechanics", slug: "mechanics", icon: <BookOpenIcon className="h-5 w-5" /> },
    { id: 2, title: "Characters & NPCs", slug: "characters", icon: <UsersIcon className="h-5 w-5" /> },
    { id: 3, title: "Locations & Maps", slug: "locations", icon: <BookOpenIcon className="h-5 w-5" /> },
    { id: 4, title: "Items & Equipment", slug: "items", icon: <BookOpenIcon className="h-5 w-5" /> },
  ]

  // Mock recent wiki edits
  const recentEdits = [
    {
      id: 1,
      page: `${gameName || "Game"} Guide`,
      editor: "WikiMaster",
      timeAgo: "2 hours ago",
      summary: "Added new strategy for gameplay",
    },
    {
      id: 2,
      page: "Game Mechanics",
      editor: "StatGuru",
      timeAgo: "Yesterday",
      summary: "Updated formulas after latest patch",
    },
    {
      id: 3,
      page: "Hidden Areas",
      editor: "Explorer99",
      timeAgo: "3 days ago",
      summary: "Added newly discovered secret area",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Wiki Sections</h2>
        <Button asChild>
          <Link href={`/wiki/${gameSlug}`}>Full Wiki</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wikiSections.map((section) => (
          <Link href={`/wiki/${gameSlug}/${section.slug}`} key={section.id}>
            <Card className="hover:bg-muted/50 transition-colors h-full">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">{section.icon}</div>
                <h3 className="font-bold text-lg">{section.title}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpenIcon className="h-5 w-5" />
            {gameName ? `About ${gameName}` : "Game Overview"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : wikiContent ? (
            <div>
              <p className="mb-4">{wikiContent.extract}</p>
              <div className="flex justify-end">
                <Button variant="outline" size="sm" asChild>
                  <a href={wikiContent.url} target="_blank" rel="noopener noreferrer">
                    Read more on Wikipedia
                  </a>
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">
              No wiki content available yet. Be the first to contribute to this game's wiki!
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5" />
            Recent Wiki Updates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentEdits.map((edit) => (
              <div key={edit.id} className="border-b pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <Link href={`/wiki/${gameSlug}/page/${edit.id}`} className="font-medium hover:underline">
                      {edit.page}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">{edit.summary}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-muted-foreground">{edit.timeAgo}</p>
                    <p>by {edit.editor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="bg-muted rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold mb-2">Contribute to the Wiki</h3>
        <p className="text-muted-foreground mb-4">
          Help build the knowledge base for this game by contributing to the wiki.
        </p>
        <Button className="flex items-center gap-2" asChild>
          <Link href={`/wiki/${gameSlug}/contribute`}>
            <PencilIcon className="h-4 w-4" />
            Start Contributing
          </Link>
        </Button>
      </div>
    </div>
  )
}
