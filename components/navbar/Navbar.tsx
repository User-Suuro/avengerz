"use client"

import { Check, Moon, Palette, Sun, Wallpaper} from "lucide-react"
import { Button } from "@/lib/shadcn/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/lib/shadcn/dropdown-menu"
import Link from "next/link"
import * as React from "react"
import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/lib/shadcn/navigation-menu"

import { useTheme } from "@/components/navbar/theme-provider"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export function Navbar() {
  const { theme, setTheme, colorTheme, setColorTheme } = useTheme()

  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center justify-around mx-auto">
        
        { /*-- Title --*/ }
        <div className="font-semibold text-xl">Avengerz</div>

        { /*-- Navigations --*/ }
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          
                          <div className="mb-2 mt-4 text-lg font-medium">
                            shadcn/ui
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Beautifully designed components built with Radix UI and
                            Tailwind CSS.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/docs" title="Introduction">
                      Re-usable components built using Radix UI and Tailwind CSS.
                    </ListItem>
                    <ListItem href="/docs/installation" title="Installation">
                      How to install dependencies and structure your app.
                    </ListItem>
                    <ListItem href="/docs/primitives/typography" title="Typography">
                      Styles for headings, paragraphs, lists...etc
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Documentation
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        { /*-- Settings --*/ }
        <div className="flex items-center gap-2">
          {/* Color Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10 relative cursor-pointer">
                <Palette className="h-[1.2rem] w-[1.2rem]" />
                {/* Color indicator on the button */}
                <div
                  className={`absolute bottom-1 right-1 w-2 h-2 rounded-full border ${
                    colorTheme === "default"
                      ? "bg-black"
                      : colorTheme === "red"
                        ? "bg-red-500"
                        : colorTheme === "white"
                          ? "bg-white"
                          : colorTheme === "yellow"
                            ? "bg-yellow-400"
                            : ""
                  }`}
                />
               
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setColorTheme("default")} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2 h-4 w-4 rounded-full bg-black" />
                  <span>Default</span>
                </div>
                {colorTheme === "default" && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setColorTheme("red")} className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center">
                  <div className="mr-2 h-4 w-4 rounded-full bg-red-500" />
                  <span>Red</span>
                </div>
                {colorTheme === "red" && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setColorTheme("white")} className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center">
                  <div className="mr-2 h-4 w-4 rounded-full bg-white border" />
                  <span>White</span>
                </div>
                {colorTheme === "white" && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setColorTheme("yellow")} className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center">
                  <div className="mr-2 h-4 w-4 rounded-full bg-yellow-400" />
                  <span>Yellow</span>
                </div>
                {colorTheme === "yellow" && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
        
            <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="relative h-10 w-10 overflow-hidden cursor-pointer">
                          <Sun
                            className={`absolute h-[1.2rem] w-[1.2rem] transform transition-transform duration-300 ${
                              theme === "light" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
                            }`}
                          />
                          <Moon
                            className={`absolute h-[1.2rem] w-[1.2rem] transform transition-transform duration-300 ${
                              theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"
                            }`}
                          />
                          <Wallpaper
                            className={`absolute h-[1.2rem] w-[1.2rem] transform transition-transform duration-300 ${
                              theme === "system" ? "rotate-0 scale-100" : "rotate-90 scale-0"
                            }`}
                          />
                        </Button>
                  </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("system")} className="flex items-center justify-between cursor-pointer">
                    <span>System</span>
                    {theme === "system" && <Check className="size-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center justify-between cursor-pointer">
                    <span>Light</span>
                    {theme === "light" && <Check className="size-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center justify-between cursor-pointer">
                    <span>Dark</span>
                    {theme === "dark" && <Check className="size-4" />}
                  </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

