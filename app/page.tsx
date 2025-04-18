import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { StarIcon, TrendingUpIcon, BookOpenIcon, MessageSquareIcon } from "lucide-react"
import FeaturedGames from "@/components/featured-games"
import TopRatedGames from "@/components/top-rated-games"
import RecentDiscussions from "@/components/recent-discussions"
import GamingNews from "@/components/gaming-news"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative rounded-lg overflow-hidden bg-gradient-to-r from-purple-900 to-indigo-800 text-white mb-12">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 px-6 py-16 md:py-24 md:px-12 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Your Ultimate Gaming Wiki</h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            Discover, rate, and discuss your favorite games. Contribute to the gaming community with reviews, guides,
            and more.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/games">Browse Games</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10" asChild>
              <Link href="/auth/register">Join Community</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Everything You Need in One Place</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <StarIcon className="h-5 w-5 text-yellow-500" />
                Rate Games
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Share your opinions and see what others think about the latest releases.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <MessageSquareIcon className="h-5 w-5 text-blue-500" />
                Join Discussions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Participate in game-specific forums and connect with other gamers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <BookOpenIcon className="h-5 w-5 text-green-500" />
                Wiki Contributions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Help build comprehensive wikis for your favorite games.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <TrendingUpIcon className="h-5 w-5 text-purple-500" />
                Track Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Discover trending and top-rated games across different genres.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Games */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Featured Games</h2>
          <Button variant="outline" asChild>
            <Link href="/games">View All</Link>
          </Button>
        </div>
        <FeaturedGames />
      </section>

      {/* Top Rated Games */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Top Rated</h2>
          <Button variant="outline" asChild>
            <Link href="/games/top-rated">See More</Link>
          </Button>
        </div>
        <TopRatedGames />
      </section>

      {/* Gaming News */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Latest Gaming News</h2>
          <Button variant="outline" asChild>
            <Link href="/news">All News</Link>
          </Button>
        </div>
        <GamingNews limit={3} />
      </section>

      {/* Recent Discussions */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Recent Discussions</h2>
          <Button variant="outline" asChild>
            <Link href="/forums">All Forums</Link>
          </Button>
        </div>
        <RecentDiscussions />
      </section>

      {/* Call to Action */}
      <section className="bg-muted rounded-lg p-8 text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Ready to Contribute?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Join our community of gamers and developers. Share your knowledge, rate games, and participate in discussions.
        </p>
        <Button size="lg" asChild>
          <Link href="/auth/register">Create an Account</Link>
        </Button>
      </section>
    </div>
  )
}
