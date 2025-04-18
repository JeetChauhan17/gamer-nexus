import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MessageSquareIcon, PinIcon, TrendingUpIcon, ClockIcon, PlusIcon } from "lucide-react"

export default function GameForumPage({ params }: { params: { slug: string } }) {
  // Format the game name from the slug
  const gameName = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Mock forum categories for this game
  const forumCategories = [
    {
      id: 1,
      name: "General Discussion",
      description: `Talk about anything related to ${gameName}`,
      posts: 342,
      threads: 78,
      lastActive: "5 minutes ago",
    },
    {
      id: 2,
      name: "Guides & Strategies",
      description: `Share tips, builds, and strategies for ${gameName}`,
      posts: 156,
      threads: 42,
      lastActive: "1 hour ago",
    },
    {
      id: 3,
      name: "Technical Support",
      description: `Get help with ${gameName} technical issues and bugs`,
      posts: 89,
      threads: 24,
      lastActive: "3 hours ago",
    },
    {
      id: 4,
      name: "Lore & Story",
      description: `Discuss the story, characters, and lore of ${gameName}`,
      posts: 124,
      threads: 31,
      lastActive: "Yesterday",
    },
  ]

  // Mock popular threads for this game
  const popularThreads = [
    {
      id: 1,
      title: `What's your favorite part of ${gameName}?`,
      author: "GameFan",
      replies: 42,
      views: 128,
      lastActive: "2 hours ago",
      isPinned: true,
    },
    {
      id: 2,
      title: `Tips and tricks for beginners in ${gameName}`,
      author: "ProGamer",
      replies: 37,
      views: 95,
      lastActive: "5 hours ago",
      isPinned: false,
    },
    {
      id: 3,
      title: `Hidden secrets in ${gameName} you might have missed`,
      author: "Explorer",
      replies: 29,
      views: 84,
      lastActive: "Yesterday",
      isPinned: false,
    },
    {
      id: 4,
      title: `Is the DLC for ${gameName} worth buying?`,
      author: "ValueHunter",
      replies: 53,
      views: 112,
      lastActive: "3 days ago",
      isPinned: false,
    },
    {
      id: 5,
      title: `${gameName} performance optimization guide`,
      author: "TechGuru",
      replies: 18,
      views: 76,
      lastActive: "1 week ago",
      isPinned: false,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <h1 className="text-4xl font-bold">{gameName} Forums</h1>
            <p className="text-muted-foreground">Join the community discussion about {gameName}</p>
          </div>
          <Button asChild>
            <Link href={`/forums/${params.slug}/new`}>
              <PlusIcon className="h-4 w-4 mr-2" />
              New Thread
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="discussions" className="mb-8">
        <TabsList className="mb-8">
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="recent">Recent Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="discussions">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Popular Threads</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select className="text-sm border rounded p-1">
                  <option>Most Recent</option>
                  <option>Most Replies</option>
                  <option>Most Views</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {popularThreads.map((thread) => (
                <Card key={thread.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full text-primary">
                        <MessageSquareIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/forums/${params.slug}/thread/${thread.id}`}
                            className="font-bold text-lg hover:text-primary"
                          >
                            {thread.title}
                          </Link>
                          {thread.isPinned && (
                            <Badge variant="outline" className="text-xs">
                              <PinIcon className="h-3 w-3 mr-1" />
                              Pinned
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <span>by {thread.author}</span>
                          <span>•</span>
                          <span>{thread.lastActive}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <MessageSquareIcon className="h-3 w-3 mr-1" />
                            {thread.replies} replies
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <TrendingUpIcon className="h-3 w-3 mr-1" />
                            {thread.views} views
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

        <TabsContent value="categories">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {forumCategories.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle>
                    <Link
                      href={`/forums/${params.slug}/category/${category.id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {category.name}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
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
        </TabsContent>

        <TabsContent value="recent">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Recent Posts</h2>
            </div>

            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full text-primary">
                        <ClockIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-grow">
                        <Link
                          href={`/forums/${params.slug}/thread/${i + 10}`}
                          className="font-bold text-lg hover:text-primary"
                        >
                          {
                            [
                              `Just finished ${gameName} - My thoughts (no spoilers)`,
                              `Need help with ${gameName} boss fight`,
                              `${gameName} performance issues on my system`,
                              `Hidden location in ${gameName} - guide`,
                              `${gameName} tips and tricks for new players`,
                            ][i]
                          }
                        </Link>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <span>by {["GameFan", "NeedHelp", "TechGuru", "Explorer", "Veteran"][i]}</span>
                          <span>•</span>
                          <span>
                            {["30 minutes ago", "1 hour ago", "2 hours ago", "3 hours ago", "4 hours ago"][i]}
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
      </Tabs>
    </div>
  )
}
