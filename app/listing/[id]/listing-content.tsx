"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ModeBadge } from "@/components/mode-badge"
import { DonationBreakdown } from "@/components/donation-breakdown"
import { ReviewSection } from "@/components/review-section"
import { WishlistButton } from "@/components/wishlist-button"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/hooks/use-cart"
import { useChat } from "@/hooks/use-chat"
import { useDemoUser } from "@/hooks/use-demo-user"
import { initStorage } from "@/lib/storage"
import { formatPrice, calculateFees, type Product } from "@/lib/mock-data"
import {
  ShoppingCart,
  Share2,
  Truck,
  Package,
  CheckCircle2,
  ArrowLeft,
  Info,
  HandHeart,
  MessageCircle,
  CreditCard,
} from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const BASE_SHIPPING = 15000
const DISCOUNT = 5000
const EXPEDITIONS = ["JNE", "J&T", "Wahana", "Anteraja", "Pos Indonesia"]
const CITIES = [
  "Jakarta", "Bogor", "Depok", "Tangerang", "Bekasi",
  "Bandung", "Surabaya", "Medan", "Semarang", "Yogyakarta",
]

export function ListingContent({ product }: { product: Product }) {
  const [initialized, setInitialized] = useState(false)
  const { toast } = useToast()
  const [city, setCity] = useState("")
  const [customCity, setCustomCity] = useState("")
  const [openCheckout, setOpenCheckout] = useState(false)
  const [expedition, setExpedition] = useState("")
  const [fundDestChoice, setFundDestChoice] = useState<"disaster" | "education" | "general">("general")

  const { addToCart, isInCart } = useCart()
  const { currentUser } = useDemoUser()
  const { startConversation } = useChat(currentUser.id)

  useEffect(() => {
    initStorage()
    setInitialized(true)
  }, [])

  const selectedCity = city === "other" ? customCity : city
  const isJabodetabek = ["jakarta", "bogor", "depok", "tangerang", "bekasi"].includes(
    selectedCity.toLowerCase()
  )
  const shippingFee = isJabodetabek ? BASE_SHIPPING - DISCOUNT : BASE_SHIPPING

  const conditionColors = {
    "like-new": "bg-green-100 text-green-800",
    good: "bg-yellow-100 text-yellow-800",
    fair: "bg-orange-100 text-orange-800",
  }

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      size: product.size,
      condition: product.condition,
      mode: product.mode,
      sellerId: "u2",
      sellerName: product.seller,
    })
    toast({
      title: "Ditambahkan ke cart!",
      description: `${product.title} berhasil ditambahkan ke cart.`,
    })
    setOpenCheckout(false)
  }

  const handleBuyNow = () => {
    addToCart({
      productId: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      size: product.size,
      condition: product.condition,
      mode: product.mode,
      sellerId: "u2",
      sellerName: product.seller,
    })
    toast({
      title: "Menuju checkout!",
      description: `${product.title} ditambahkan. Silakan selesaikan pembayaran.`,
    })
    setOpenCheckout(false)
    window.location.href = "/cart"
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({ title: "Link disalin!", description: "Link produk berhasil disalin." })
  }

  const handleChat = () => {
    startConversation(
      product.id,
      product.title,
      product.image,
      currentUser.id,
      currentUser.name,
      "u2",
      product.seller
    )
    toast({
      title: "Percakapan dibuka",
      description: `Chat dengan ${product.seller}`,
    })
    window.location.href = "/chat"
  }

  const wishlistItem = {
    productId: product.id,
    title: product.title,
    image: product.image,
    price: product.price,
    size: product.size,
    condition: product.condition,
    mode: product.mode,
    sellerId: "u2",
    sellerName: product.seller,
  }

  if (!initialized) {
    return (
      <div className="container px-4 py-8">
        <div className="h-64 flex items-center justify-center text-muted-foreground">
          Memuat...
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/listings">Listings</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Link
        href="/listings"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to listings
      </Link>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 left-4">
            <ModeBadge mode={product.mode} />
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-3">{product.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{product.size}</Badge>
              <Badge variant="secondary" className={conditionColors[product.condition]}>
                {product.condition === "like-new"
                  ? "Like New"
                  : product.condition.charAt(0).toUpperCase() + product.condition.slice(1)}
              </Badge>
              <Badge variant="outline" className="capitalize">{product.category}</Badge>
            </div>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {/* ── ReWear ── */}
          {product.mode === "rewear" && (
            <>
              <div className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
                </div>
                <DonationBreakdown price={product.price} showSellerNet />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={() => setOpenCheckout(true)}
                  disabled={isInCart(product.id)}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {isInCart(product.id) ? "Sudah di Cart" : "Tambah ke Cart"}
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setOpenCheckout(true)}
                  disabled={isInCart(product.id)}
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Beli Sekarang
                </Button>
                <WishlistButton item={wishlistItem} />
                <Button size="lg" variant="outline" onClick={handleChat} title="Chat Penjual">
                  <MessageCircle className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" onClick={handleShare} title="Bagikan">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <Dialog open={openCheckout} onOpenChange={setOpenCheckout}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Informasi Pengiriman & Donasi</DialogTitle>
                    <DialogDescription>Pilih kota, ekspedisi, dan arah donasi 7%</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Arahkan Donasi 7% ke Fund</label>
                    <RadioGroup
                      value={fundDestChoice}
                      onValueChange={(v) => setFundDestChoice(v as "disaster" | "education" | "general")}
                      className="space-y-1"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="disaster" id="fund-disaster" />
                        <label htmlFor="fund-disaster" className="text-sm cursor-pointer">Disaster Response Fund</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="education" id="fund-education" />
                        <label htmlFor="fund-education" className="text-sm cursor-pointer">Education Fund</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="general" id="fund-general" />
                        <label htmlFor="fund-general" className="text-sm cursor-pointer">General Aid Fund</label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Kota</label>
                    <select
                      className="w-full border rounded-md px-3 py-2 text-sm"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="">Pilih kota</option>
                      {CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                      <option value="other">Lainnya</option>
                    </select>
                    {city === "other" && (
                      <input
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        placeholder="Masukkan kotamu"
                        value={customCity}
                        onChange={(e) => setCustomCity(e.target.value)}
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ekspedisi</label>
                    <select
                      className="w-full border rounded-md px-3 py-2 text-sm"
                      value={expedition}
                      onChange={(e) => setExpedition(e.target.value)}
                    >
                      <option value="">Pilih ekspedisi</option>
                      {EXPEDITIONS.map((exp) => (
                        <option key={exp} value={exp}>{exp}</option>
                      ))}
                    </select>
                  </div>
                  <div className="rounded-lg border p-3 text-sm space-y-1 bg-muted/50">
                    <p>Ongkos dasar: {formatPrice(BASE_SHIPPING)}</p>
                    {isJabodetabek && (
                      <p className="text-green-600">Diskon Jabodetabek: -{formatPrice(DISCOUNT)}</p>
                    )}
                    <p className="font-medium">Ongkos kirim: {formatPrice(shippingFee)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      disabled={!expedition || !city || (city === "other" && !customCity)}
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Tambah ke Cart
                    </Button>
                    <Button
                      className="flex-1"
                      disabled={!expedition || !city || (city === "other" && !customCity)}
                      onClick={handleBuyNow}
                    >
                      <CreditCard className="h-4 w-4 mr-1" />
                      Beli Sekarang
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}

          {/* ── DoWear ── */}
          {product.mode === "dowear" && (
            <>
              <Card className="border-dowear/30 bg-dowear/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2 text-dowear">
                    <HandHeart className="h-5 w-5" />
                    Physical Donation Item
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Item ini akan didonasikan langsung kepada yang membutuhkan.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Package className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Siapkan itemmu</p>
                        <p className="text-xs text-muted-foreground">Bersihkan dan kemas item dengan aman</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Truck className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Kirim ke gudang kami</p>
                        <p className="text-xs text-muted-foreground">Label pengiriman diberikan setelah donasi</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Kami yang urus sisanya</p>
                        <p className="text-xs text-muted-foreground">Item didistribusikan ke penerima manfaat</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="w-full bg-dowear hover:bg-dowear/90 text-dowear-foreground">
                    <HandHeart className="h-5 w-5 mr-2" />
                    Donasi Item Serupa
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Mulai Donasimu</DialogTitle>
                    <DialogDescription>
                      Siap mendonasikan item serupa? Pergi ke halaman Jual dan pilih mode DoWear.
                    </DialogDescription>
                  </DialogHeader>
                  <Link href="/sell">
                    <Button className="w-full mt-4">Ke Halaman Donasi</Button>
                  </Link>
                </DialogContent>
              </Dialog>
            </>
          )}

          {/* ── DoWear+ ── */}
          {product.mode === "dowear-plus" && (
            <>
              <Card className="border-dowear-plus/30 bg-dowear-plus/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2 text-dowear-plus-foreground">
                    <Info className="h-5 w-5" />
                    DoWear+ Item
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Item ini didonasikan melalui DoWear+. Platform menetapkan harga tetap
                    (maks Rp100.000), dan semua hasil penjualan masuk ke Dana Donasi.
                  </p>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-background border">
                    <div className="h-10 w-10 rounded-full bg-dowear-plus/20 flex items-center justify-center">
                      <HandHeart className="h-5 w-5 text-dowear-plus-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Tujuan Dana: <span className="capitalize">{product.fundDestination}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">100% hasil penjualan masuk ke dana</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
                <span className="text-sm text-muted-foreground">Platform price</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="flex-1 bg-dowear-plus hover:bg-dowear-plus/90 text-dowear-plus-foreground"
                  onClick={handleAddToCart}
                  disabled={isInCart(product.id)}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {isInCart(product.id) ? "Sudah di Cart" : "Beli & Dukung Dana"}
                </Button>
                <WishlistButton item={wishlistItem} />
                <Button size="lg" variant="outline" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </>
          )}

          {/* Seller Info */}
          <div className="pt-6 border-t">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  {product.mode === "rewear" ? "Dijual oleh" : "Didonasikan oleh"}{" "}
                  <span className="font-medium text-foreground">{product.seller}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Terdaftar pada{" "}
                  {new Date(product.createdAt).toLocaleDateString("id-ID", { dateStyle: "medium" })}
                </p>
              </div>
              {product.mode === "rewear" && (
                <Button variant="outline" size="sm" onClick={handleChat}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat Penjual
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <ReviewSection productId={product.id} currentUser={currentUser} />
    </div>
  )
}
