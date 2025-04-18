import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { BookOpenIcon, PencilIcon, ClockIcon, UsersIcon, SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function WikiPage() {
  // Mock popular wikis
  const popularWikis = [
    {
      id: 1,
      name: "Elden Ring",
      slug: "elden-ring",
      description: "Open-world action RPG by FromSoftware",
      contributors: 156,
      lastUpdated: "2 hours ago",
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      id: 2,
      name: "Baldur's Gate 3",
      slug: "baldurs-gate-3",
      description: "Turn-based RPG based on D&D 5e rules",
      contributors: 142,
      lastUpdated: "5 hours ago",
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      id: 3,
      name: "Cyberpunk 2077",
      slug: "cyberpunk-2077",
      description: "Open-world action RPG set in Night City",
      contributors: 128,
      lastUpdated: "1 day ago",
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      id: 4,
      name: "The Legend of Zelda: Tears of the Kingdom",
      slug: "zelda-tears-of-the-kingdom",
      description: "Action-adventure game in the Zelda series",
      contributors: 134,
      lastUpdated: "3 hours ago",
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      id: 5,
      name: "Starfield",
      slug: "starfield",
      description: "Space exploration RPG by Bethesda",
      contributors: 112,
      lastUpdated: "6 hours ago",
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      id: 6,
      name: "Diablo IV",
      slug: "diablo-iv",
      description: "Action RPG with dark fantasy setting",
      contributors: 98,
      lastUpdated: "12 hours ago",
      image: "/placeholder.svg?height=150&width=300",
    },
  ]

  // Mock recent changes
  const recentChanges = [
    {
      id: 1,
      page: "Elden Ring - Boss Guide",
      editor: "EldenMaster",
      timeAgo: "30 minutes ago",
      summary: "Added strategy for Malenia",
    },
    {
      id: 2,
      page: "Baldur's Gate 3 - Classes",
      editor: "RPGFan",
      timeAgo: "1 hour ago",
      summary: "Updated Sorcerer spell list",
    },
    {
      id: 3,
      page: "Cyberpunk 2077 - Builds",
      editor: "NightCityLegend",
      timeAgo: "2 hours ago",
      summary: "Added new Netrunner build",
    },
    {
      id: 4,
      page: "Zelda: TotK - Shrine Locations",
      editor: "HyruleHero",
      timeAgo: "3 hours ago",
      summary: "Added missing shrine in Hebra region",
    },
    {
      id: 5,
      page: "Starfield - Ship Building",
      editor: "SpaceExplorer",
      timeAgo: "5 hours ago",
      summary: "Updated engine comparison table",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Game Wiki</h1>
        <p className="text-xl text-muted-foreground">
          Comprehensive guides, walkthroughs, and information for your favorite games
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-grow">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search wikis..." className="pl-9" />
          </div>
        </div>
        <Button asChild>
          <Link href="/wiki/contribute">
            <PencilIcon className="h-4 w-4 mr-2" />
            Contribute
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="popular" className="mb-8">
        <TabsList className="mb-8">
          <TabsTrigger value="popular">Popular Wikis</TabsTrigger>
          <TabsTrigger value="recent">Recent Changes</TabsTrigger>
          <TabsTrigger value="contribute">How to Contribute</TabsTrigger>
        </TabsList>

        <TabsContent value="popular">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularWikis.map((wiki) => (
              <Card key={wiki.id} className="overflow-hidden">
                <div className="aspect-video">
                  <img src={wiki.image || "/placeholder.svg"} alt={wiki.name} className="w-full h-full object-cover" />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>
                    <Link href={`/wiki/${wiki.slug}`} className="hover:text-primary transition-colors">
                      {wiki.name}
                    </Link>
                  </CardTitle>
                  <CardDescription>{wiki.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <UsersIcon className="h-3 w-3 mr-1" />
                      {wiki.contributors} contributors
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      Updated {wiki.lastUpdated}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Recent Wiki Updates</h2>
            <div className="space-y-4">
              {recentChanges.map((change) => (
                <Card key={change.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full text-primary">
                        <ClockIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-grow">
                        <Link href={`/wiki/page/${change.id}`} className="font-bold text-lg hover:text-primary">
                          {change.page}
                        </Link>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <span>by {change.editor}</span>
                          <span>•</span>
                          <span>{change.timeAgo}</span>
                        </div>
                        <p className="mt-2 text-sm">{change.summary}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <Button variant="outline">View More Changes</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contribute">
          <div className="space-y-8">
            <div className="bg-muted rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">How to Contribute</h2>
              <p className="mb-4">
                Contributing to the GameWiki is easy and helps build a valuable resource for the gaming community.
                Follow these steps to get started:
              </p>
              <ol className="list-decimal list-inside space-y-2 mb-4">
                <li>Create an account or log in to your existing account</li>
                <li>Browse to the game wiki you want to contribute to</li>
                <li>Click the "Edit" button on any page or create a new page</li>
                <li>Make your changes using the wiki editor</li>
                <li>Preview your changes to ensure they look correct</li>
                <li>Add a summary of your changes</li>
                <li>Submit your changes for review</li>
              </ol>
              <p>All contributions are reviewed by our moderators to ensure quality and accuracy.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpenIcon className="h-5 w-5 text-primary" />
                    Write Articles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Create new wiki pages or expand existing ones with your knowledge about games, characters,
                    mechanics, and more.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PencilIcon className="h-5 w-5 text-primary" />
                    Edit & Improve
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Help improve existing content by fixing errors, adding missing information, or updating outdated
                    details.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UsersIcon className="h-5 w-5 text-primary" />
                    Join the Community
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Connect with other wiki contributors, discuss changes, and collaborate on building comprehensive
                    game guides.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center">
              <Button asChild size="lg">
                <Link href="/auth/register">Create an Account to Contribute</Link>
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
