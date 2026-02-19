"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  Menu,
  Home,
  ShoppingBag,
  PlusCircle,
  Heart,
  User,
  Settings,
  ShoppingCart,
  MessageSquare,
  CalendarDays,
} from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useChat } from "@/hooks/use-chat"
import { useDemoUser } from "@/hooks/use-demo-user"
import { initStorage } from "@/lib/storage"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/listings", label: "Listings", icon: ShoppingBag },
  { href: "/cart", label: "Cart", icon: ShoppingCart },
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/sell", label: "Sell", icon: PlusCircle },
  { href: "/donate", label: "Donate", icon: Heart },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/admin", label: "Admin", icon: Settings },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [initialized, setInitialized] = useState(false)

  const { currentUser } = useDemoUser()
  const { cartCount } = useCart()
  const { totalUnread } = useChat(currentUser.id)

  useEffect(() => {
    initStorage()
    setInitialized(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/rewear-logo.png"
            alt="ReWear+ Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight leading-tight">ReWear+</span>
            <span className="text-[10px] text-muted-foreground leading-none hidden sm:block">
              Sustainable Fashion Marketplace
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isCart = item.href === "/cart"
            const isChat = item.href === "/chat"
            const badge = isCart
              ? cartCount > 0
                ? cartCount
                : null
              : isChat
              ? totalUnread > 0
                ? totalUnread
                : null
              : null

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {initialized && badge !== null && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-[10px] flex items-center justify-center bg-red-500 text-white">
                    {badge}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="relative">
              <Menu className="h-5 w-5" />
              {initialized && (cartCount > 0 || totalUnread > 0) && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => {
                const isCart = item.href === "/cart"
                const isChat = item.href === "/chat"
                const badge = isCart
                  ? cartCount > 0
                    ? cartCount
                    : null
                  : isChat
                  ? totalUnread > 0
                    ? totalUnread
                    : null
                  : null

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "relative flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                    {initialized && badge !== null && (
                      <Badge className="ml-auto h-5 min-w-5 px-1 text-[10px] bg-red-500 text-white">
                        {badge}
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
