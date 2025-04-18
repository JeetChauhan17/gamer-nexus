"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ExternalLinkIcon } from "lucide-react"
import { useGamingNews } from "@/hooks/useGamingNews"
import { Skeleton } from "@/components/ui/skeleton"

interface GamingNewsProps {
  gameName?: string
  limit?: number
}

export default function GamingNews({ gameName, limit = 3 }: GamingNewsProps) {
  const { articles, loading, error } = useGamingNews({
    gameName,
    pageSize: limit,
  })

  if (error) {
    return (
      <div className="text-center p-8 bg-muted rounded-lg">
        <p className="text-red-500">Failed to load gaming news</p>
        <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(limit)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-video">
              <Skeleton className="h-full w-full" />
            </div>
            <CardHeader className="p-4 pb-2">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Skeleton className="h-4 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {articles.slice(0, limit).map((article, index) => (
        <Card key={index} className="overflow-hidden flex flex-col h-full">
          {article.urlToImage && (
            <div className="aspect-video overflow-hidden">
              <img
                src={article.urlToImage || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // If image fails to load, replace with placeholder
                  e.currentTarget.src = "/placeholder.svg?height=200&width=400"
                }}
              />
            </div>
          )}
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{article.source.name}</Badge>
              <span className="text-xs text-muted-foreground flex items-center">
                <CalendarIcon className="h-3 w-3 mr-1" />
                {new Date(article.publishedAt).toLocaleDateString()}
              </span>
            </div>
            <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-3">{article.description}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                Read Full Article
                <ExternalLinkIcon className="h-3 w-3 ml-2" />
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
