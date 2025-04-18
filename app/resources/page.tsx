import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { BookOpenIcon, CodeIcon, DownloadIcon, VideoIcon } from "lucide-react"

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Game Development Resources</h1>
        <p className="text-xl text-muted-foreground">
          A curated collection of tools, tutorials, and assets for game developers
        </p>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-8">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="tools">Tools & Software</TabsTrigger>
          <TabsTrigger value="assets">Game Assets</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {/* Featured Resources */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-purple-900 to-indigo-800 text-white">
                <CardHeader>
                  <CardTitle>Getting Started with Game Development</CardTitle>
                  <CardDescription className="text-white/80">A comprehensive guide for beginners</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Learn the fundamentals of game development, from choosing an engine to publishing your first game.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" asChild>
                    <Link href="/resources/guides/getting-started">Read Guide</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900 to-cyan-800 text-white">
                <CardHeader>
                  <CardTitle>Game Engine Comparison</CardTitle>
                  <CardDescription className="text-white/80">Find the right tool for your project</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Compare popular game engines like Unity, Unreal, Godot, and more to find the best fit for your
                    needs.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" asChild>
                    <Link href="/resources/guides/engine-comparison">View Comparison</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-gradient-to-br from-green-900 to-emerald-800 text-white">
                <CardHeader>
                  <CardTitle>Game Design Principles</CardTitle>
                  <CardDescription className="text-white/80">Create engaging player experiences</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Learn the core principles of game design that will help you create compelling and enjoyable games.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" asChild>
                    <Link href="/resources/guides/design-principles">Explore Principles</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* Resource Categories */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Resource Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <VideoIcon className="h-5 w-5 text-blue-500" />
                    Tutorials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Step-by-step guides and video tutorials for all skill levels
                  </p>
                  <div className="space-y-1 text-sm">
                    <Link href="/resources/tutorials/beginner" className="block hover:text-primary">
                      Beginner Tutorials
                    </Link>
                    <Link href="/resources/tutorials/intermediate" className="block hover:text-primary">
                      Intermediate Tutorials
                    </Link>
                    <Link href="/resources/tutorials/advanced" className="block hover:text-primary">
                      Advanced Techniques
                    </Link>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/resources/tutorials">View All Tutorials</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <CodeIcon className="h-5 w-5 text-green-500" />
                    Tools & Software
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Game engines, frameworks, and development tools</p>
                  <div className="space-y-1 text-sm">
                    <Link href="/resources/tools/engines" className="block hover:text-primary">
                      Game Engines
                    </Link>
                    <Link href="/resources/tools/frameworks" className="block hover:text-primary">
                      Frameworks & Libraries
                    </Link>
                    <Link href="/resources/tools/utilities" className="block hover:text-primary">
                      Utility Software
                    </Link>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/resources/tools">Browse Tools</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <DownloadIcon className="h-5 w-5 text-purple-500" />
                    Game Assets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Graphics, audio, models, and other game assets</p>
                  <div className="space-y-1 text-sm">
                    <Link href="/resources/assets/graphics" className="block hover:text-primary">
                      Graphics & Textures
                    </Link>
                    <Link href="/resources/assets/audio" className="block hover:text-primary">
                      Sound Effects & Music
                    </Link>
                    <Link href="/resources/assets/3d-models" className="block hover:text-primary">
                      3D Models & Animations
                    </Link>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/resources/assets">Explore Assets</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpenIcon className="h-5 w-5 text-red-500" />
                    Documentation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Reference materials, guides, and best practices</p>
                  <div className="space-y-1 text-sm">
                    <Link href="/resources/docs/api-references" className="block hover:text-primary">
                      API References
                    </Link>
                    <Link href="/resources/docs/best-practices" className="block hover:text-primary">
                      Best Practices
                    </Link>
                    <Link href="/resources/docs/patterns" className="block hover:text-primary">
                      Design Patterns
                    </Link>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/resources/docs">View Documentation</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* Latest Articles */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Optimizing Game Performance",
                  excerpt: "Learn techniques to improve your game's performance across different platforms.",
                  author: "PerformanceGuru",
                  date: "2 days ago",
                  category: "Technical",
                },
                {
                  title: "Creating Compelling Game Characters",
                  excerpt: "Discover how to design memorable characters that players will connect with.",
                  author: "StoryMaster",
                  date: "1 week ago",
                  category: "Design",
                },
                {
                  title: "Monetization Strategies for Indie Games",
                  excerpt: "Explore different monetization models and find what works for your indie game.",
                  author: "IndieDevPro",
                  date: "2 weeks ago",
                  category: "Business",
                },
              ].map((article, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="text-sm text-muted-foreground mb-1">{article.category}</div>
                    <CardTitle className="text-xl">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{article.excerpt}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      By {article.author} • {article.date}
                    </div>
                    <Button variant="ghost" size="sm">
                      Read More
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline" asChild>
                <Link href="/resources/articles">View All Articles</Link>
              </Button>
            </div>
          </section>

          {/* Community Spotlight */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Community Spotlight</h2>
            <Card>
              <CardHeader>
                <CardTitle>Featured Community Projects</CardTitle>
                <CardDescription>Check out these amazing projects from our community members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Pixel Adventure",
                      creator: "PixelArtist",
                      image: "/placeholder.svg?height=150&width=300",
                      description: "A beautiful pixel art platformer with unique mechanics",
                    },
                    {
                      title: "Space Odyssey",
                      creator: "SpaceExplorer",
                      image: "/placeholder.svg?height=150&width=300",
                      description: "An immersive space exploration game with procedural generation",
                    },
                    {
                      title: "Dungeon Crawler",
                      creator: "RPGMaster",
                      image: "/placeholder.svg?height=150&width=300",
                      description: "A roguelike dungeon crawler with deep progression systems",
                    },
                  ].map((project, i) => (
                    <div key={i} className="border rounded-lg overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-bold mb-1">{project.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">by {project.creator}</p>
                        <p className="text-sm">{project.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <Link href="/community/projects">View More Projects</Link>
                </Button>
              </CardFooter>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="tutorials">
          <h2 className="text-2xl font-bold mb-6">Game Development Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tutorial cards would go here */}
            <Card>
              <CardHeader>
                <CardTitle>Getting Started with Unity</CardTitle>
                <CardDescription>Beginner • 10 lessons</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Learn the basics of Unity game engine, from interface navigation to creating your first game.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="/resources/tutorials/unity-basics">Start Learning</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Game AI</CardTitle>
                <CardDescription>Advanced • 8 lessons</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Implement sophisticated AI systems for your games, including pathfinding, decision making, and
                  behavior trees.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="/resources/tutorials/advanced-ai">Start Learning</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Game Optimization Techniques</CardTitle>
                <CardDescription>Intermediate • 6 lessons</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Learn how to optimize your game for better performance across different platforms and devices.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="/resources/tutorials/optimization">Start Learning</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tools">
          <h2 className="text-2xl font-bold mb-6">Game Development Tools</h2>
          {/* Tools content would go here */}
        </TabsContent>

        <TabsContent value="assets">
          <h2 className="text-2xl font-bold mb-6">Game Assets</h2>
          {/* Assets content would go here */}
        </TabsContent>

        <TabsContent value="community">
          <h2 className="text-2xl font-bold mb-6">Community Resources</h2>
          {/* Community content would go here */}
        </TabsContent>
      </Tabs>

      {/* Newsletter Signup */}
      <section className="bg-muted rounded-lg p-8 text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter to receive the latest game development resources, tutorials, and community
          updates.
        </p>
        <div className="flex max-w-md mx-auto gap-2">
          <input
            type="email"
            placeholder="Your email address"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button>Subscribe</Button>
        </div>
      </section>
    </div>
  )
}
