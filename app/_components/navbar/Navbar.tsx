import Link from "next/link"
import * as React from "react"
import { cn } from "@/lib/utils"
import Image from "next/image";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/shadcn/navigation-menu"
import { Button } from "@/components/shadcn/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/avatar"
import { User2Icon } from "lucide-react";

export function Navbar() {

  return (
    <nav className="border-b">
      <div>
        <div className="container flex h-16 items-center justify-around mx-auto">
          
        <div className="flex items-center">
          <div className="relative w-12 h-12">
            <Image
              src="/assets/branding/logo.jpg"
              alt="Logo"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="ml-4 font-semibold text-xl">Avengerz</div>
      </div>
        

          { /*-- Navigations --*/ }
          <div>
            <NavigationMenu>
                <NavigationMenuList className="gap-4">
                  {/*-- Home --*/}
                  <NavigationMenuItem>
                    <Link href="/#" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  {/*-- Services --*/}
                  <NavigationMenuItem>
                  <Link href="/#" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/#" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Blogs
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
          </div>

          { /*-- Log-in --*/ }
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage  />
              <AvatarFallback><User2Icon/></AvatarFallback>
            </Avatar>
              <Button>
                  Log-in
              </Button>
          </div>
        </div>
      </div>
      <div>

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

