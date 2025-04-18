import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import {
  BarChart3Icon,
  UsersIcon,
  GamepadIcon,
  FileTextIcon,
  UploadIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  CheckIcon,
  XIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
  DownloadIcon,
} from "lucide-react"

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage games, users, content, and uploads</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/games/new">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add New Game
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Games</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+24</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,492</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+128</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Forum Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,156</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+1,839</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">256 GB</div>
            <p className="text-xs text-muted-foreground">of 1 TB (25.6%)</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="games" className="mb-8">
        <TabsList className="mb-8">
          <TabsTrigger value="games" className="flex items-center gap-2">
            <GamepadIcon className="h-4 w-4" />
            Games
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <UsersIcon className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <FileTextIcon className="h-4 w-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="uploads" className="flex items-center gap-2">
            <UploadIcon className="h-4 w-4" />
            Uploads
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3Icon className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="games">
          <Card>
            <CardHeader>
              <CardTitle>Manage Games</CardTitle>
              <CardDescription>View, edit, and manage all games in the database</CardDescription>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search games..." className="pl-8" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Games</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Game</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Added</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: 1,
                      title: "Elden Ring",
                      status: "published",
                      rating: 4.9,
                      added: "Feb 25, 2022",
                    },
                    {
                      id: 2,
                      title: "Cyberpunk 2077",
                      status: "published",
                      rating: 4.2,
                      added: "Dec 10, 2020",
                    },
                    {
                      id: 3,
                      title: "The Legend of Zelda: Tears of the Kingdom",
                      status: "published",
                      rating: 4.8,
                      added: "May 12, 2023",
                    },
                    {
                      id: 4,
                      title: "Starfield",
                      status: "published",
                      rating: 4.3,
                      added: "Sep 6, 2023",
                    },
                    {
                      id: 5,
                      title: "Upcoming Game 2024",
                      status: "draft",
                      rating: null,
                      added: "Jan 15, 2024",
                    },
                  ].map((game) => (
                    <TableRow key={game.id}>
                      <TableCell className="font-medium">{game.title}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            game.status === "published" ? "success" : game.status === "draft" ? "outline" : "secondary"
                          }
                        >
                          {game.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {game.rating ? (
                          <div className="flex items-center">
                            <span>{game.rating}</span>
                            <span className="text-yellow-500 ml-1">★</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">N/A</span>
                        )}
                      </TableCell>
                      <TableCell>{game.added}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontalIcon className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <EyeIcon className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <EditIcon className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <TrashIcon className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Showing 5 of 1,248 games</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage user accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: 1,
                      name: "John Doe",
                      email: "john@example.com",
                      role: "Admin",
                      status: "active",
                      joined: "Jan 10, 2022",
                    },
                    {
                      id: 2,
                      name: "Jane Smith",
                      email: "jane@example.com",
                      role: "Moderator",
                      status: "active",
                      joined: "Mar 15, 2022",
                    },
                    {
                      id: 3,
                      name: "Bob Johnson",
                      email: "bob@example.com",
                      role: "User",
                      status: "active",
                      joined: "Jun 22, 2022",
                    },
                    {
                      id: 4,
                      name: "Alice Brown",
                      email: "alice@example.com",
                      role: "User",
                      status: "suspended",
                      joined: "Sep 5, 2022",
                    },
                    {
                      id: 5,
                      name: "Charlie Wilson",
                      email: "charlie@example.com",
                      role: "User",
                      status: "active",
                      joined: "Nov 18, 2022",
                    },
                  ].map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.role === "Admin" ? "default" : user.role === "Moderator" ? "secondary" : "outline"
                          }
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div
                            className={`h-2 w-2 rounded-full mr-2 ${
                              user.status === "active" ? "bg-green-500" : "bg-red-500"
                            }`}
                          />
                          {user.status}
                        </div>
                      </TableCell>
                      <TableCell>{user.joined}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontalIcon className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <EyeIcon className="h-4 w-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <EditIcon className="h-4 w-4 mr-2" />
                              Edit User
                            </DropdownMenuItem>
                            {user.status === "active" ? (
                              <DropdownMenuItem>
                                <XIcon className="h-4 w-4 mr-2" />
                                Suspend
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>
                                <CheckIcon className="h-4 w-4 mr-2" />
                                Activate
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <TrashIcon className="h-4 w-4 mr-2" />
                              Delete Account
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>Manage wiki pages, forum posts, and other content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Wiki Pages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">1,248</div>
                      <p className="text-sm text-muted-foreground">
                        <span className="text-green-500">+24</span> new this month
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href="/admin/content/wiki">Manage Wiki Pages</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Forum Posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">24,156</div>
                      <p className="text-sm text-muted-foreground">
                        <span className="text-green-500">+1,839</span> new this month
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href="/admin/content/forum">Manage Forum Posts</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Reported Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">12</div>
                      <p className="text-sm text-muted-foreground">
                        <span className="text-red-500">+3</span> new reports
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href="/admin/content/reported">Review Reports</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Content Updates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Content</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Author</TableHead>
                          <TableHead>Updated</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          {
                            id: 1,
                            title: "Elden Ring Boss Guide",
                            type: "Wiki",
                            author: "GameMaster",
                            updated: "2 hours ago",
                          },
                          {
                            id: 2,
                            title: "Cyberpunk 2077 Performance Issues",
                            type: "Forum",
                            author: "TechGuru",
                            updated: "5 hours ago",
                          },
                          {
                            id: 3,
                            title: "Zelda: Tears of the Kingdom Walkthrough",
                            type: "Wiki",
                            author: "ZeldaFan",
                            updated: "Yesterday",
                          },
                          {
                            id: 4,
                            title: "Best Build for Baldur's Gate 3",
                            type: "Forum",
                            author: "RPGMaster",
                            updated: "2 days ago",
                          },
                          {
                            id: 5,
                            title: "Starfield Ship Building Guide",
                            type: "Wiki",
                            author: "SpaceExplorer",
                            updated: "3 days ago",
                          },
                        ].map((content) => (
                          <TableRow key={content.id}>
                            <TableCell className="font-medium">{content.title}</TableCell>
                            <TableCell>
                              <Badge variant={content.type === "Wiki" ? "secondary" : "outline"}>{content.type}</Badge>
                            </TableCell>
                            <TableCell>{content.author}</TableCell>
                            <TableCell>{content.updated}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/admin/content/${content.id}`}>View</Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="uploads">
          <Card>
            <CardHeader>
              <CardTitle>File Uploads</CardTitle>
              <CardDescription>Manage game files and assets uploaded to Backblaze B2</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="font-medium">Upload New Files</h3>
                      <p className="text-sm text-muted-foreground">
                        Upload game files, screenshots, or other assets to Backblaze B2
                      </p>
                    </div>
                    <Button asChild>
                      <Link href="/admin/uploads/new">
                        <UploadIcon className="h-4 w-4 mr-2" />
                        Upload Files
                      </Link>
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Recent Uploads</h3>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Files</SelectItem>
                        <SelectItem value="images">Images</SelectItem>
                        <SelectItem value="videos">Videos</SelectItem>
                        <SelectItem value="documents">Documents</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>File Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Uploaded By</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: 1,
                          name: "game-screenshot-01.jpg",
                          type: "image/jpeg",
                          size: "2.4 MB",
                          uploadedBy: "Admin",
                          date: "Today, 10:30 AM",
                        },
                        {
                          id: 2,
                          name: "game-trailer.mp4",
                          type: "video/mp4",
                          size: "48.2 MB",
                          uploadedBy: "GameDev",
                          date: "Yesterday, 3:15 PM",
                        },
                        {
                          id: 3,
                          name: "game-manual.pdf",
                          type: "application/pdf",
                          size: "1.8 MB",
                          uploadedBy: "ContentManager",
                          date: "Mar 15, 2024",
                        },
                        {
                          id: 4,
                          name: "game-assets.zip",
                          type: "application/zip",
                          size: "156.7 MB",
                          uploadedBy: "Developer",
                          date: "Mar 10, 2024",
                        },
                        {
                          id: 5,
                          name: "game-soundtrack.mp3",
                          type: "audio/mpeg",
                          size: "18.3 MB",
                          uploadedBy: "AudioDesigner",
                          date: "Mar 5, 2024",
                        },
                      ].map((file) => (
                        <TableRow key={file.id}>
                          <TableCell className="font-medium">{file.name}</TableCell>
                          <TableCell>{file.type}</TableCell>
                          <TableCell>{file.size}</TableCell>
                          <TableCell>{file.uploadedBy}</TableCell>
                          <TableCell>{file.date}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontalIcon className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <EyeIcon className="h-4 w-4 mr-2" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <DownloadIcon className="h-4 w-4 mr-2" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <TrashIcon className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="bg-muted rounded-lg p-4">
                  <h3 className="font-medium mb-2">Storage Usage</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Used: 256 GB</span>
                      <span>Total: 1 TB</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: "25.6%" }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground">25.6% of your storage has been used</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>View site traffic, user engagement, and other metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">128,543</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-green-500">+12.5%</span> from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">42,897</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-green-500">+8.3%</span> from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4m 12s</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-red-500">-0.8%</span> from last month
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-card border rounded-lg p-6">
                  <h3 className="font-medium mb-4">Traffic Overview</h3>
                  <div className="h-80 flex items-center justify-center bg-muted rounded-md">
                    <p className="text-muted-foreground">[Traffic chart visualization would appear here]</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Pages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Page</TableHead>
                            <TableHead className="text-right">Views</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            { page: "Homepage", views: 24156 },
                            { page: "Elden Ring Game Page", views: 18432 },
                            { page: "Baldur's Gate 3 Game Page", views: 15287 },
                            { page: "Games Listing", views: 12543 },
                            { page: "Login Page", views: 8976 },
                          ].map((item, i) => (
                            <TableRow key={i}>
                              <TableCell>{item.page}</TableCell>
                              <TableCell className="text-right">{item.views.toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>User Demographics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center bg-muted rounded-md">
                        <p className="text-muted-foreground">[Demographics chart would appear here]</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
