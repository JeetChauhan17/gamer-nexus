import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GithubIcon, TwitterIcon, YoutubeIcon } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">GameWiki</h3>
            <p className="text-sm text-muted-foreground">
              Your ultimate resource for game information, ratings, discussions, and more.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <TwitterIcon className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <YoutubeIcon className="h-5 w-5" />
                  <span className="sr-only">YouTube</span>
                </Link>
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/games" className="hover:underline">
                  Games
                </Link>
              </li>
              <li>
                <Link href="/forums" className="hover:underline">
                  Forums
                </Link>
              </li>
              <li>
                <Link href="/wiki" className="hover:underline">
                  Wiki
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:underline">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/creators" className="hover:underline">
                  Creators
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/resources/development" className="hover:underline">
                  Game Development
                </Link>
              </li>
              <li>
                <Link href="/resources/design" className="hover:underline">
                  Game Design
                </Link>
              </li>
              <li>
                <Link href="/resources/tools" className="hover:underline">
                  Tools & Software
                </Link>
              </li>
              <li>
                <Link href="/resources/tutorials" className="hover:underline">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/resources/assets" className="hover:underline">
                  Game Assets
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-center text-muted-foreground">
            © {new Date().getFullYear()} GameWiki. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
