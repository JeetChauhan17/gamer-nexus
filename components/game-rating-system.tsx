"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { StarIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface GameRatingSystemProps {
  gameId: number
  initialRating: number
  totalRatings: number
}

export default function GameRatingSystem({ gameId, initialRating, totalRatings }: GameRatingSystemProps) {
  const [userRating, setUserRating] = useState<number | null>(null)
  const [hoveredRating, setHoveredRating] = useState<number | null>(null)
  const [hasRated, setHasRated] = useState(false)

  // Mock rating distribution data
  const ratingDistribution = [
    { stars: 5, percentage: 75, count: Math.round(totalRatings * 0.75) },
    { stars: 4, percentage: 15, count: Math.round(totalRatings * 0.15) },
    { stars: 3, percentage: 5, count: Math.round(totalRatings * 0.05) },
    { stars: 2, percentage: 3, count: Math.round(totalRatings * 0.03) },
    { stars: 1, percentage: 2, count: Math.round(totalRatings * 0.02) },
  ]

  const handleRatingClick = (rating: number) => {
    setUserRating(rating)
  }

  const handleSubmitRating = () => {
    if (userRating) {
      // In a real app, this would send the rating to the server
      console.log(`Submitting rating ${userRating} for game ${gameId}`)
      setHasRated(true)
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Rating Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Community Rating</CardTitle>
            <CardDescription>See how other players have rated this game</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl font-bold">{initialRating}</div>
              <div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(initialRating) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{totalRatings.toLocaleString()} ratings</p>
              </div>
            </div>

            <div className="space-y-3">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-2">
                  <div className="w-8 text-sm">{item.stars} ★</div>
                  <Progress value={item.percentage} className="h-2 flex-1" />
                  <div className="w-12 text-sm text-right text-muted-foreground">{item.percentage}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Rating */}
        <Card>
          <CardHeader>
            <CardTitle>Rate This Game</CardTitle>
            <CardDescription>Share your opinion with the community</CardDescription>
          </CardHeader>
          <CardContent>
            {hasRated ? (
              <div className="text-center py-6">
                <div className="text-xl font-bold mb-2">Thank You!</div>
                <p className="text-muted-foreground">Your rating has been submitted successfully.</p>
                <div className="flex justify-center mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className={`h-8 w-8 ${
                        star <= (userRating || 0) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-center mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className={`h-10 w-10 cursor-pointer transition-colors ${
                        star <= (hoveredRating || userRating || 0)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-muted-foreground"
                      }`}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(null)}
                      onClick={() => handleRatingClick(star)}
                    />
                  ))}
                </div>
                <div className="text-center mb-4">
                  {userRating ? (
                    <p className="font-medium">
                      You selected {userRating} star{userRating !== 1 ? "s" : ""}
                    </p>
                  ) : (
                    <p className="text-muted-foreground">Click on a star to rate</p>
                  )}
                </div>
              </>
            )}
          </CardContent>
          <CardFooter>
            {!hasRated && (
              <Button className="w-full" disabled={!userRating} onClick={handleSubmitRating}>
                Submit Rating
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>

      {/* Recent Reviews */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Reviews</h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <img
                      src={`/placeholder.svg?height=40&width=40`}
                      alt="User avatar"
                      className="h-8 w-8 rounded-full"
                    />
                    <div>
                      <h4 className="font-medium">User{i + 1}</h4>
                      <p className="text-xs text-muted-foreground">
                        {i === 0 ? "2 hours ago" : i === 1 ? "Yesterday" : "3 days ago"}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, star) => (
                      <StarIcon
                        key={star}
                        className={`h-4 w-4 ${
                          star < 5 - i ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  {i === 0
                    ? "This game is absolutely amazing! The open world is breathtaking and the combat system is challenging but rewarding. Highly recommended for any RPG fan."
                    : i === 1
                      ? "Great game with stunning visuals and immersive gameplay. The story could be a bit more straightforward, but overall it's an excellent experience."
                      : "Decent game but has some performance issues on older hardware. The world design is fantastic though and the lore is incredibly deep."}
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <button className="hover:text-foreground transition-colors">Helpful (23)</button>
                  <button className="hover:text-foreground transition-colors">Reply</button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-4">
          <Button variant="outline">View All Reviews</Button>
        </div>
      </div>
    </div>
  )
}
