import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { MessageSquareIcon, TrendingUpIcon, ClockIcon, UsersIcon } from "lucide-react"

export default function ForumsPage() {
  // Mock forum categories
  const forumCategories = [
    {
      id: 1,
      name: "General Gaming Discussion",
      description: "Discuss all things gaming related",
      posts: 1248,
      threads: 342,
      lastActive: "5 minutes ago",
    },
    {
      id: 2,
      name: "Game Reviews & Recommendations",
      description: "Share your thoughts on games and get recommendations",
      posts: 876,
      threads: 156,
      lastActive: "1 hour ago",
    },
    {
      id: 3,
      name: "Technical Support",
      description: "Get help with technical issues and troubleshooting",
      posts: 543,
      threads: 89,
      lastActive: "3 hours ago",
    },
    {
      id: 4,
      name: "Game Development",
      description: "Discuss game development, design, and industry news",
      posts: 721,
      threads: 124,
      lastActive: "Yesterday",
    },
  ]

  // Mock popular game forums
  const gameForums = [
    {
      id: 1,
      name: "Elden Ring",
      slug: "elden-ring",
      posts: 3421,
      threads: 542,
      lastActive: "2 minutes ago",
    },
    {
      id: 2,
      name: "Baldur's Gate 3",
      slug: "baldurs-gate-3",
      posts: 2876,
      threads: 456,
      lastActive: "15 minutes ago",
    },
    {
      id: 3,
      name: "Cyberpunk 2077",
      slug: "cyberpunk-2077",
      posts: 1943,
      threads: 289,
      lastActive: "1 hour ago",
    },
    {
      id: 4,
      name: "The Legend of Zelda: Tears of the Kingdom",
      slug: "zelda-tears-of-the-kingdom",
      posts: 2321,
      threads: 324,
      lastActive: "30 minutes ago",
    },
    {
      id: 5,
      name: "Starfield",
      slug: "starfield",
      posts: 1821,
      threads: 224,
      lastActive: "45 minutes ago",
    },
    {
      id: 6,
      name: "Diablo IV",
      slug: "diablo-iv",
      posts: 1621,
      threads: 184,
      lastActive: "2 hours ago",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Game Forums</h1>
        <p className="text-xl text-muted-foreground">
          Join discussions about your favorite games, share strategies, and connect with other players
        </p>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-8">
          <TabsTrigger value="all">All Forums</TabsTrigger>
          <TabsTrigger value="popular">Popular Discussions</TabsTrigger>
          <TabsTrigger value="recent">Recent Posts</TabsTrigger>
          <TabsTrigger value="my-posts">My Discussions</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {forumCategories.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle>
                    <Link href={`/forums/category/${category.id}`} className="hover:text-primary transition-colors">
                      {category.name}
                    </Link>
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex space-x-4">
                      <span>{category.threads} threads</span>
                      <span>{category.posts} posts</span>
                    </div>
                    <span>Last active: {category.lastActive}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-4">Popular Game Forums</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameForums.map((forum) => (
              <Card key={forum.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    <Link href={`/forums/${forum.slug}`} className="hover:text-primary transition-colors">
                      {forum.name}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex space-x-4">
                      <span>{forum.threads} threads</span>
                      <span>{forum.posts} posts</span>
                    </div>
                    <span>Last active: {forum.lastActive}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Popular Discussions</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select className="text-sm border rounded p-1">
                  <option>Most Replies</option>
                  <option>Most Views</option>
                  <option>Most Recent</option>
                </select>
              </div>
            </div>

            {/* Mock popular discussions */}
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full text-primary">
                        <MessageSquareIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-grow">
                        <Link href={`/forums/thread/${i + 1}`} className="font-bold text-lg hover:text-primary">
                          {
                            [
                              "What's your favorite build in Elden Ring?",
                              "Best party composition for Baldur's Gate 3",
                              "Hidden locations in Zelda: Tears of the Kingdom",
                              "Is Cyberpunk 2077 worth playing now after all the updates?",
                              "Starfield vs No Man's Sky - Which is better?",
                            ][i]
                          }
                        </Link>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <span>
                            by {["EldenFan", "RPGMaster", "HyruleExplorer", "NightCityVisitor", "SpaceExplorer"][i]}
                          </span>
                          <span>•</span>
                          <span>{["2 hours ago", "5 hours ago", "Yesterday", "3 days ago", "1 week ago"][i]}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <MessageSquareIcon className="h-3 w-3 mr-1" />
                            {[42, 37, 29, 53, 48][i]} replies
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <TrendingUpIcon className="h-3 w-3 mr-1" />
                            {[128, 95, 84, 112, 103][i]} views
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <Button variant="outline">Load More</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Recent Posts</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Filter by:</span>
                <select className="text-sm border rounded p-1">
                  <option>All Categories</option>
                  <option>General Gaming</option>
                  <option>Game Reviews</option>
                  <option>Technical Support</option>
                </select>
              </div>
            </div>

            {/* Mock recent posts */}
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full text-primary">
                        <ClockIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-grow">
                        <Link href={`/forums/thread/${i + 10}`} className="font-bold text-lg hover:text-primary">
                          {
                            [
                              "Just finished Baldur's Gate 3 - My thoughts (no spoilers)",
                              "Need help with Elden Ring final boss",
                              "Performance issues with Cyberpunk 2077 on PC",
                              "Zelda: Tears of the Kingdom - Master Sword location guide",
                              "Starfield ship building tips and tricks",
                            ][i]
                          }
                        </Link>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <span>by {["BG3Fan", "EldenNoob", "PCGamer", "ZeldaMaster", "StarExplorer"][i]}</span>
                          <span>•</span>
                          <span>
                            {["30 minutes ago", "1 hour ago", "2 hours ago", "3 hours ago", "4 hours ago"][i]}
                          </span>
                          <span>•</span>
                          <span>
                            in {["Baldur's Gate 3", "Elden Ring", "Cyberpunk 2077", "Zelda: TotK", "Starfield"][i]}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <MessageSquareIcon className="h-3 w-3 mr-1" />
                            {[12, 8, 15, 6, 3][i]} replies
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <TrendingUpIcon className="h-3 w-3 mr-1" />
                            {[45, 32, 67, 28, 19][i]} views
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <Button variant="outline">Load More</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="my-posts">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Discussions</h2>
              <Button>
                <MessageSquareIcon className="h-4 w-4 mr-2" />
                New Thread
              </Button>
            </div>

            <Card>
              <CardContent className="p-6 text-center">
                <UsersIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold mb-2">You need to log in</h3>
                <p className="text-muted-foreground mb-4">
                  Please log in or create an account to view your discussions
                </p>
                <div className="flex justify-center gap-4">
                  <Button asChild>
                    <Link href="/auth/login">Log In</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/auth/register">Create Account</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
