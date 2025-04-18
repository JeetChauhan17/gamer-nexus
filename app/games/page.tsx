"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { StarIcon, FilterIcon } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useGames } from "@/hooks/useGames"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function GamesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [tempSearch, setTempSearch] = useState("")
  const [genre, setGenre] = useState("all")
  const [platform, setPlatform] = useState("all")
  const [releaseYear, setReleaseYear] = useState("all_years")
  const [rating, setRating] = useState("any_rating")
  const [sortBy, setSortBy] = useState("-rating")
  const [currentPage, setCurrentPage] = useState(1)

  const { games, loading, error, totalCount } = useGames({
    search: searchTerm,
    genres: genre !== "all" ? genre : "",
    platforms: platform !== "all" ? platform : "",
    ordering: sortBy,
    page: currentPage,
    pageSize: 8,
  })

  const totalPages = Math.ceil(totalCount / 8)

  const handleSearch = () => {
    setSearchTerm(tempSearch)
    setCurrentPage(1)
  }

  const handleApplyFilters = () => {
    setCurrentPage(1)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Games</h1>
          <p className="text-muted-foreground">Browse and discover games across all platforms and genres</p>
        </div>
        <div className="w-full md:w-auto">
          <div className="flex gap-2">
            <Input
              placeholder="Search games..."
              className="w-full md:w-[300px]"
              value={tempSearch}
              onChange={(e) => setTempSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
        {/* Filters */}
        <div className="space-y-6">
          <div className="bg-card rounded-lg border p-4">
            <h3 className="font-medium mb-4 flex items-center">
              <FilterIcon className="h-4 w-4 mr-2" />
              Filters
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Genre</label>
                <Select value={genre} onValueChange={setGenre}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Genres" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genres</SelectItem>
                    <SelectItem value="action">Action</SelectItem>
                    <SelectItem value="rpg">RPG</SelectItem>
                    <SelectItem value="shooter">Shooter</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="strategy">Strategy</SelectItem>
                    <SelectItem value="simulation">Simulation</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Platform</label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Platforms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="4">PC</SelectItem>
                    <SelectItem value="187,18,16">PlayStation</SelectItem>
                    <SelectItem value="1,186,14">Xbox</SelectItem>
                    <SelectItem value="7">Nintendo Switch</SelectItem>
                    <SelectItem value="21,3">Mobile</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Release Year</label>
                <Select value={releaseYear} onValueChange={setReleaseYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_years">All Years</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="2020">2020</SelectItem>
                    <SelectItem value="older">2019 &amp; Older</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Rating</label>
                <Select value={rating} onValueChange={setRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any_rating">Any Rating</SelectItem>
                    <SelectItem value="4.5">4.5 &amp; Up</SelectItem>
                    <SelectItem value="4.0">4.0 &amp; Up</SelectItem>
                    <SelectItem value="3.5">3.5 &amp; Up</SelectItem>
                    <SelectItem value="3.0">3.0 &amp; Up</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full" onClick={handleApplyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-muted-foreground">
                {loading ? "Loading..." : `Showing ${games.length} of ${totalCount} games`}
              </span>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-released">Newest First</SelectItem>
                <SelectItem value="released">Oldest First</SelectItem>
                <SelectItem value="-rating">Highest Rated</SelectItem>
                <SelectItem value="rating">Lowest Rated</SelectItem>
                <SelectItem value="name">Title (A-Z)</SelectItem>
                <SelectItem value="-name">Title (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error ? (
            <div className="text-center p-8 bg-muted rounded-lg">
              <p className="text-red-500">Failed to load games</p>
              <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
              <Button className="mt-4" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
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
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                        <Badge className="absolute top-2 right-2 bg-black/70 hover:bg-black/70">
                          {game.genres[0].name}
                        </Badge>
                      )}
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <h3 className="font-bold text-lg line-clamp-1">{game.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {game.platforms && game.platforms.length > 0
                          ? game.platforms
                              .slice(0, 2)
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
          )}

          {!loading && totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage > 1) setCurrentPage(currentPage - 1)
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  let pageNum

                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }

                  return (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        isActive={pageNum === currentPage}
                        onClick={(e) => {
                          e.preventDefault()
                          setCurrentPage(pageNum)
                        }}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  )
}
