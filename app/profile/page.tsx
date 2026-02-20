"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ModeBadge } from "@/components/mode-badge"
import { EmptyState } from "@/components/empty-state"
import { WishlistButton } from "@/components/wishlist-button"
import { mockPurchases, mockDonations, formatPrice, type Purchase, type Donation } from "@/lib/mock-data"
import { useDemoUser } from "@/hooks/use-demo-user"
import { useCart } from "@/hooks/use-cart"
import { initStorage } from "@/lib/storage"
import {
  ShoppingBag,
  Heart,
  Sparkles,
  Award,
  Download,
  Calendar,
  CheckCircle2,
  Clock,
  PackageX,
  Star,
  HelpCircle,
} from "lucide-react"
import type { WishlistItem } from "@/lib/types"

function PurchaseCard({ purchase }: { purchase: Purchase }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-muted shrink-0">
            <Image
              src={purchase.product.image || "/placeholder.svg"}
              alt={purchase.product.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold line-clamp-1">{purchase.product.title}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(purchase.date).toLocaleDateString("en-US", { dateStyle: "medium" })}
                </p>
              </div>
              <ModeBadge mode={purchase.product.mode} size="sm" />
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm font-medium">{formatPrice(purchase.total)}</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Delivered
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function DonationCard({ donation }: { donation: Donation }) {
  const completedSteps = donation.trackingSteps.filter((s) => s.completed).length
  const progress = (completedSteps / donation.trackingSteps.length) * 100

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          {donation.product && (
            <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-muted shrink-0">
              <Image
                src={donation.product.image || "/placeholder.svg"}
                alt={donation.product.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold line-clamp-1">
                  {donation.product?.title || "Donation"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(donation.date).toLocaleDateString("en-US", { dateStyle: "medium" })}
                </p>
              </div>
              <ModeBadge
                mode={donation.type === "dowear" ? "dowear" : "dowear-plus"}
                size="sm"
              />
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">
                  {completedSteps}/{donation.trackingSteps.length} steps
                </span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <p className="text-sm font-medium mb-3">Tracking</p>
          <div className="space-y-2">
            {donation.trackingSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                {step.completed ? (
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                ) : (
                  <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
                <span className={step.completed ? "" : "text-muted-foreground"}>
                  {step.title}
                </span>
                {step.date && (
                  <span className="text-xs text-muted-foreground ml-auto">{step.date}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function WishlistCard({ item }: { item: WishlistItem }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-muted shrink-0">
            <Link href={`/listing/${item.productId}`}>
              <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
            </Link>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <Link href={`/listing/${item.productId}`} className="font-semibold line-clamp-1 hover:underline">
                {item.title}
              </Link>
              <WishlistButton
                item={{
                  productId: item.productId,
                  title: item.title,
                  image: item.image,
                  price: item.price,
                  size: item.size,
                  condition: item.condition,
                  mode: item.mode,
                  sellerId: item.sellerId,
                  sellerName: item.sellerName,
                }}
                variant="ghost"
              />
            </div>
            <p className="text-sm text-muted-foreground capitalize">
              {item.condition === "like-new" ? "Like New" : item.condition} · Size {item.size}
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm font-bold text-primary">{formatPrice(item.price)}</span>
              <Badge variant="secondary" className="text-xs capitalize">
                {item.mode}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CertificateCard({ userName }: { userName: string }) {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <span className="font-semibold">E-Certificate</span>
          </div>
          <Badge variant="secondary">2026</Badge>
        </div>
        <div className="p-4 rounded-lg bg-background border text-center mb-4">
          <p className="text-xs text-muted-foreground mb-2">Certificate of Appreciation</p>
          <p className="font-semibold text-lg">{userName}</p>
          <p className="text-sm text-muted-foreground mt-1">
            For contributing to sustainable fashion and community support through ReWear+
          </p>
        </div>
        <Link href="/certificate">
          <Button className="w-full bg-transparent" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            View &amp; Download Certificate
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default function ProfilePage() {
  const [initialized, setInitialized] = useState(false)
  const [activeTab, setActiveTab] = useState("purchases")
  const { currentUser } = useDemoUser()
  const { wishlistItems } = useCart()

  useEffect(() => {
    initStorage()
    setInitialized(true)
  }, [])

  const physicalDonations = mockDonations.filter((d) => d.type === "dowear")
  const fundDonations = mockDonations.filter((d) => d.type === "dowear-plus")

  if (!initialized) {
    return (
      <div className="container px-4 py-8 flex items-center justify-center h-64 text-muted-foreground">
        Memuat...
      </div>
    )
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative h-24 w-24 rounded-full overflow-hidden bg-muted shrink-0">
              <Image
                src={currentUser.avatar || "/placeholder.svg"}
                alt={currentUser.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold mb-1">{currentUser.name}</h1>
              <p className="text-muted-foreground mb-3">{currentUser.email}</p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge variant="outline" className="capitalize">
                  {currentUser.role}
                </Badge>
                {currentUser.badges.map((badge) => (
                  <Badge key={badge} variant="secondary" className="bg-primary/10 text-primary">
                    <Award className="h-3 w-3 mr-1" />
                    {badge}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-3 flex items-center justify-center sm:justify-start gap-1">
                <Calendar className="h-4 w-4" />
                Member since{" "}
                {new Date(currentUser.joinedAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="text-center">
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-3xl font-bold text-primary">
                  {mockPurchases.length + mockDonations.length}
                </p>
                <p className="text-xs text-muted-foreground">Total Activity</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total pembelian</p>
            <p className="text-2xl font-bold">{mockPurchases.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total donasi</p>
            <p className="text-2xl font-bold">{mockDonations.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Wishlist aktif</p>
            <p className="text-2xl font-bold">{wishlistItems.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Kontribusi ke fund</p>
            <p className="text-2xl font-bold text-primary">
              {formatPrice(mockPurchases.reduce((sum, p) => sum + p.total * 0.07, 0))}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start mb-6 flex-wrap h-auto">
              <TabsTrigger value="purchases" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Pembelian
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex items-center gap-2 relative">
                <Heart className="h-4 w-4" />
                Wishlist
                {wishlistItems.length > 0 && (
                  <Badge className="ml-1 h-4 w-4 p-0 text-[10px] flex items-center justify-center bg-red-500 text-white">
                    {wishlistItems.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="physical" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Donasi DoWear
              </TabsTrigger>
              <TabsTrigger value="fund" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Donasi DoWear+
              </TabsTrigger>
            </TabsList>

            <TabsContent value="purchases" className="space-y-4">
              {mockPurchases.length > 0 ? (
                mockPurchases.map((purchase) => (
                  <PurchaseCard key={purchase.id} purchase={purchase} />
                ))
              ) : (
                <EmptyState
                  icon={PackageX}
                  title="Belum ada pembelian"
                  description="Mulai belanja untuk melihat riwayat pembelian di sini."
                />
              )}
            </TabsContent>

            <TabsContent value="wishlist" className="space-y-4">
              {wishlistItems.length > 0 ? (
                wishlistItems.map((item) => <WishlistCard key={item.id} item={item} />)
              ) : (
                <EmptyState
                  icon={Heart}
                  title="Wishlist masih kosong"
                  description="Klik ikon hati di halaman produk untuk menambahkan ke wishlist."
                />
              )}
            </TabsContent>

            <TabsContent value="physical" className="space-y-4">
              {physicalDonations.length > 0 ? (
                physicalDonations.map((donation) => (
                  <DonationCard key={donation.id} donation={donation} />
                ))
              ) : (
                <EmptyState
                  icon={Heart}
                  title="Belum ada donasi DoWear"
                  description="Donasi pakaian lewat DoWear untuk membantu penerima manfaat."
                />
              )}
            </TabsContent>

            <TabsContent value="fund" className="space-y-4">
              {fundDonations.length > 0 ? (
                fundDonations.map((donation) => (
                  <DonationCard key={donation.id} donation={donation} />
                ))
              ) : (
                <EmptyState
                  icon={Sparkles}
                  title="Belum ada donasi DoWear+"
                  description="Donasi lewat DoWear+ untuk mendukung donation fund komunitas."
                />
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <CertificateCard userName={currentUser.name} />

          {/* Impact Summary */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Ringkasan Dampak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Items Donated</span>
                  <span className="font-semibold">{mockDonations.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Fund Contributed</span>
                  <span className="font-semibold text-primary">
                    {formatPrice(mockPurchases.reduce((sum, p) => sum + p.total * 0.07, 0))}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Wishlist Items</span>
                  <span className="font-semibold">{wishlistItems.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Events Supported</span>
                  <span className="font-semibold">3</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Akses Cepat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/calendar">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Calendar className="h-4 w-4" />
                  Donating Calendar
                </Button>
              </Link>
              <Link href="/chat">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Star className="h-4 w-4" />
                  My Conversations
                </Button>
              </Link>
              <Link href="/faq">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Bantuan & FAQ
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
