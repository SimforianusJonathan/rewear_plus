"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/product-card"
import { EventCard } from "@/components/event-card"
import { DonationFundWidget } from "@/components/donation-fund-widget"
import { mockProducts, mockEvents, mockDonationFund } from "@/lib/mock-data"
import { ArrowRight, HandHeart, Search, Sparkles, ShieldCheck, Leaf } from "lucide-react"

export default function HomePage() {
  const featuredProducts = mockProducts.filter((product) => product.status === "approved" && product.mode === "rewear").slice(0, 6)
  const activeEvents = mockEvents.filter((event) => !event.distributed).slice(0, 2)

  return (
    <div className="min-h-screen">
      <section className="relative bg-primary/5 border-b">
        <div className="container max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              <Badge variant="secondary" className="gap-1.5">
                <Leaf className="h-3.5 w-3.5" />
                Sustainable Marketplace
              </Badge>
              <Badge variant="secondary" className="gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                Curated Listings
              </Badge>
            </div>
            <div className="flex justify-center mb-6">
              <Image src="/rewear-logo.png" alt="ReWear+ Logo" width={220} height={220} className="object-contain" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-center">
              <span className="block">Wear Again</span>
              <span className="block mt-2 text-primary">Care Again</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Platform fashion berkelanjutan untuk belanja preloved, donasi langsung, dan kontribusi ke dana komunitas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/listings">
                <Button size="lg" className="w-full sm:w-auto">
                  <Search className="h-4 w-4 mr-2" />
                  Mulai Belanja
                </Button>
              </Link>
              <Link href="/donate">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  <HandHeart className="h-4 w-4 mr-2" />
                  Mulai Donasi
                </Button>
              </Link>
              <Link href="/faq">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Pelajari Fitur
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container max-w-7xl mx-auto px-4 -mt-6 md:-mt-8 relative z-10">
        <div className="grid sm:grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Produk tersedia</p>
              <p className="text-2xl font-bold">{mockProducts.filter((item) => item.status === "approved").length}+</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Campaign aktif</p>
              <p className="text-2xl font-bold">{mockEvents.filter((event) => !event.distributed).length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Dana komunitas</p>
              <p className="text-2xl font-bold text-primary">Rp {(mockDonationFund.total / 1000000).toFixed(1)}jt</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-4">Pilih Cara Berkontribusi</h2>
        <p className="text-muted-foreground mb-4">Satu platform untuk beli preloved, donasi langsung, dan dukung program sosial.</p>
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>ReWear</CardTitle>
              <CardDescription>Jual beli pakaian preloved dengan donasi otomatis 7% dari transaksi.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/listings">
                <Button variant="outline" className="w-full bg-transparent">
                  Lihat Listings
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>DoWear</CardTitle>
              <CardDescription>Donasi pakaian langsung ke penerima manfaat melalui campaign aktif.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/donate">
                <Button variant="outline" className="w-full bg-transparent">
                  Donasi Pakaian
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>DoWear+</CardTitle>
              <CardDescription>Donasi pakaian untuk dijual; hasil 100% masuk ke donation fund.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/donate">
                <Button variant="outline" className="w-full bg-transparent">
                  Lihat Skema DoWear+
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container max-w-7xl mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-10">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Produk Pilihan</h2>
                <Link href="/listings">
                  <Button variant="ghost" size="sm">
                    Lihat Semua
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Kurasi item preloved terbaik minggu ini.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Campaign Donasi Aktif</h2>
                <Link href="/donate">
                  <Button variant="ghost" size="sm">
                    Lihat Semua
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Lihat campaign yang sedang berjalan dan berikan kontribusimu.</p>
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                {activeEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <DonationFundWidget fund={mockDonationFund} />
            <Card>
              <CardHeader>
                <CardTitle>Butuh panduan?</CardTitle>
                <CardDescription>Lihat FAQ untuk memahami alur jual, beli, dan donasi.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/faq">
                  <Button className="w-full">Buka FAQ</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
