"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useDemoUser } from "@/hooks/use-demo-user"
import { Leaf, UserCircle, Store, ShieldCheck, Sparkles } from "lucide-react"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { switchUser } = useDemoUser()

  const handleDemoLogin = (userIndex: number, userName: string, role: string) => {
    switchUser(userIndex)
    toast({
      title: "Demo Mode Activated!",
      description: `Logged in as ${userName} (${role})`,
    })
    router.push("/")
  }

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      })
    }, 1000)
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      })
    }, 1000)
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="container max-w-6xl mx-auto">
        {/* Demo Mode Section - Prominent for Jury */}
        <Card className="mb-8 border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader className="text-center pb-3">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">🎯 Mode Demo untuk Evaluasi</CardTitle>
            </div>
            <CardDescription className="text-base">
              Login instant dengan akun demo untuk mengevaluasi semua fitur ReWear Plus. Pilih role sesuai alur yang ingin
              dicoba.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {/* Buyer Demo */}
              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader className="pb-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <UserCircle className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-center text-lg">Demo: Buyer</CardTitle>
                  <CardDescription className="text-center text-sm">Anisa Rahmawati</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>
                      <strong>Email:</strong> anisa@email.com
                    </p>
                    <p>
                      <strong>Akses:</strong> Belanja produk, lihat histori pembelian, tracking donasi
                    </p>
                  </div>
                  <Button onClick={() => handleDemoLogin(0, "Anisa", "Buyer")} className="w-full" size="lg">
                    Login sebagai Buyer
                  </Button>
                </CardContent>
              </Card>

              {/* Seller Demo */}
              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader className="pb-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Store className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-center text-lg">Demo: Seller</CardTitle>
                  <CardDescription className="text-center text-sm">Budi Santoso</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>
                      <strong>Email:</strong> budi@email.com
                    </p>
                    <p>
                      <strong>Akses:</strong> Jual item, donasi (DoWear/DoWear+), lihat penjualan
                    </p>
                  </div>
                  <Button onClick={() => handleDemoLogin(1, "Budi", "Seller")} className="w-full" size="lg">
                    Login sebagai Seller
                  </Button>
                </CardContent>
              </Card>

              {/* Admin Demo */}
              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader className="pb-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-center text-lg">Demo: Admin</CardTitle>
                  <CardDescription className="text-center text-sm">Rina Pratama</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>
                      <strong>Email:</strong> admin@rewear.com
                    </p>
                    <p>
                      <strong>Akses:</strong> Kelola listing, approve/reject, lihat dashboard admin
                    </p>
                  </div>
                  <Button onClick={() => handleDemoLogin(3, "Rina", "Admin")} className="w-full" size="lg">
                    Login sebagai Admin
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 text-center">
              <Badge variant="secondary" className="text-xs">
                💡 Tip: Coba masing-masing role untuk lihat perbedaan akses dan fitur
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Regular Auth Section */}
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <Link href="/" className="flex items-center justify-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">ReWear</span>
            </Link>
            <CardTitle>Sign In / Sign Up</CardTitle>
            <CardDescription>Untuk akun production (coming soon)</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input id="signin-email" type="email" placeholder="you@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input id="signin-password" type="password" placeholder="••••••••" required />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    <Link href="#" className="hover:text-primary underline">
                      Forgot password?
                    </Link>
                  </p>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input id="signup-name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" type="email" placeholder="you@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" type="password" placeholder="••••••••" required />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    By signing up, you agree to our{" "}
                    <Link href="#" className="hover:text-primary underline">
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="hover:text-primary underline">
                      Privacy Policy
                    </Link>
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
