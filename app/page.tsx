"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/product-card"
import { EventCard } from "@/components/event-card"
import { DonationFundWidget } from "@/components/donation-fund-widget"
import { QuickStartGuide } from "@/components/quick-start-guide"
import { mockProducts, mockEvents, mockDonationFund, mockFoundations } from "@/lib/mock-data"
import {
  ArrowRight,
  HandHeart,
  Search,
  Sparkles,
  ShieldCheck,
  Leaf,
  TrendingUp,
  Users,
  CheckCircle2,
  Recycle,
  Heart,
  Package,
} from "lucide-react"

export default function HomePage() {
  const featuredProducts = mockProducts.filter((product) => product.status === "approved" && product.mode === "rewear").slice(0, 6)
  const activeEvents = mockEvents.filter((event) => !event.distributed).slice(0, 2)

  return (
    <div className="min-h-screen">
      {/* Hero Section - Enhanced Value Proposition */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/5 border-b">
        <div className="container max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <Badge variant="secondary" className="gap-1.5 text-xs">
                <Leaf className="h-3.5 w-3.5" />
                Zero Waste Fashion
              </Badge>
              <Badge variant="secondary" className="gap-1.5 text-xs">
                <ShieldCheck className="h-3.5 w-3.5" />
                Yayasan Terverifikasi
              </Badge>
              <Badge variant="secondary" className="gap-1.5 text-xs">
                <Heart className="h-3.5 w-3.5" />
                Dampak Sosial Nyata
              </Badge>
            </div>

            <div className="flex justify-center mb-6">
              <Image src="/rewear-logo.png" alt="ReWear+ Logo" width={200} height={200} className="object-contain" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-center">
              <span className="block text-foreground">Wear Again</span>
              <span className="block mt-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Care Again
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-medium">
              Fashion Berkelanjutan yang Peduli Sesama
            </p>

            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              <span className="font-semibold text-foreground">Masalah:</span> Pakaian layak pakai menumpuk di lemari, fast
              fashion merusak lingkungan, dan donasi tradisional kurang transparan.
              <br />
              <br />
              <span className="font-semibold text-foreground">Solusi ReWear+:</span> Marketplace preloved dengan{" "}
              <span className="text-primary font-medium">otomatis menyisihkan 7% untuk donasi</span>, plus sistem donasi
              langsung (DoWear) dan donasi fund (DoWear+) yang{" "}
              <span className="text-primary font-medium">100% transparan</span> melalui yayasan terverifikasi.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/auth">
                <Button size="lg" className="w-full sm:w-auto text-base px-8 py-6 shadow-lg">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Daftar Sekarang - Gratis!
                </Button>
              </Link>
              <Link href="/listings">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 py-6 bg-transparent">
                  <Search className="h-5 w-5 mr-2" />
                  Jelajahi Produk
                </Button>
              </Link>
            </div>

            <p className="text-sm text-muted-foreground">
              🎉 Sudah{" "}
              <span className="font-semibold text-primary">
                {mockProducts.filter((p) => p.status === "approved").length}+ produk
              </span>{" "}
              tersedia •{" "}
              <span className="font-semibold text-primary">
                Rp {(mockDonationFund.total / 1000000).toFixed(1)}jt+ dana terkumpul
              </span>{" "}
              • <span className="font-semibold text-primary">{mockFoundations.length} yayasan mitra</span>
            </p>
          </div>
        </div>
      </section>

      {/* Key Stats Section */}
      <section className="container max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid sm:grid-cols-3 gap-4">
          <Card className="border-2">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <p className="text-3xl font-bold mb-1">{mockProducts.filter((item) => item.status === "approved").length}+</p>
              <p className="text-sm text-muted-foreground">Produk Preloved Tersedia</p>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <p className="text-3xl font-bold text-primary mb-1">Rp {(mockDonationFund.total / 1000000).toFixed(1)}jt</p>
              <p className="text-sm text-muted-foreground">Dana Komunitas Terkumpul</p>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <p className="text-3xl font-bold mb-1">{mockFoundations.length}</p>
              <p className="text-sm text-muted-foreground">Yayasan Mitra Terverifikasi</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Choose ReWear Plus */}
      <section className="container max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Kenapa Pilih ReWear Plus?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Bukan sekadar marketplace preloved biasa. Kami menggabungkan jual-beli dengan dampak sosial yang terukur.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Recycle className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Otomatis Ber-dampak</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Setiap pembelian otomatis sisihkan 7% untuk donasi. Belanja sambil berbagi tanpa ribet.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">100% Transparan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Lihat kemana donasi tersalur dengan detail yayasan, penerima, dan laporan foto bukti distribusi.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">3 Mode Kontribusi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                ReWear (belanja), DoWear (donasi langsung), DoWear+ (donasi untuk dijual). Fleksibel sesuai kebutuhan.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Kurasi Berkualitas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Admin review setiap listing untuk menjaga kualitas. Foto asli, deskripsi jelas, harga wajar.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-primary/5 py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Cara Kerja ReWear Plus</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Alur sederhana untuk mulai belanja preloved dan berkontribusi untuk sesama.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Daftar & Pilih Role</h3>
              <p className="text-muted-foreground">
                Buat akun gratis dan pilih role: <span className="font-semibold">Buyer</span> (belanja),{" "}
                <span className="font-semibold">Seller</span> (jual/donasi), atau keduanya.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Belanja atau Donasi</h3>
              <p className="text-muted-foreground">
                <span className="font-semibold">Belanja</span> preloved dengan harga terjangkau.{" "}
                <span className="font-semibold">Donasi langsung</span> ke campaign atau{" "}
                <span className="font-semibold">donasi untuk dijual</span> (hasil 100% ke fund).
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Pantau Dampakmu</h3>
              <p className="text-muted-foreground">
                Lihat kontribusimu di <span className="font-semibold">Profile</span>: histori belanja, donasi, dan impact log
                dengan bukti distribusi ke penerima manfaat.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/faq">
              <Button size="lg" variant="outline" className="bg-background">
                <Sparkles className="h-5 w-5 mr-2" />
                Baca FAQ Lengkap
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3 Modes Section */}
      <section className="container max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">3 Cara Berkontribusi</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Satu platform untuk semua kebutuhan fashion berkelanjutan dan sosial Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-2 hover:shadow-lg transition-all">
            <CardHeader>
              <div className="h-14 w-14 rounded-full bg-rewear/10 flex items-center justify-center mb-4">
                <Search className="h-7 w-7 text-rewear" />
              </div>
              <CardTitle className="text-xl">ReWear (Belanja)</CardTitle>
              <CardDescription className="text-base">
                Jual beli pakaian preloved berkualitas dengan otomatis menyisihkan 7% untuk donasi.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Harga terjangkau, kualitas terjamin</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>7% otomatis masuk donation fund</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Kurasi admin untuk quality control</span>
                </li>
              </ul>
              <Link href="/listings" className="block">
                <Button className="w-full" size="lg">
                  Lihat Produk
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all border-dowear/30">
            <CardHeader>
              <div className="h-14 w-14 rounded-full bg-dowear/10 flex items-center justify-center mb-4">
                <HandHeart className="h-7 w-7 text-dowear" />
              </div>
              <CardTitle className="text-xl">DoWear (Donasi Langsung)</CardTitle>
              <CardDescription className="text-base">
                Donasi pakaian langsung ke penerima manfaat melalui campaign aktif yang terverifikasi.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Tepat sasaran untuk kebutuhan spesifik</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Track status donasi real-time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Laporan foto bukti distribusi</span>
                </li>
              </ul>
              <Link href="/donate" className="block">
                <Button className="w-full bg-dowear hover:bg-dowear/90 text-dowear-foreground" size="lg">
                  Lihat Campaign
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all border-dowear-plus/30">
            <CardHeader>
              <div className="h-14 w-14 rounded-full bg-dowear-plus/10 flex items-center justify-center mb-4">
                <Sparkles className="h-7 w-7 text-dowear-plus-foreground" />
              </div>
              <CardTitle className="text-xl">DoWear+ (Donasi Fund)</CardTitle>
              <CardDescription className="text-base">
                Donasi pakaian untuk dijual platform, hasil 100% masuk ke donation fund komunitas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>100% hasil penjualan untuk donasi</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Dukung banyak campaign sekaligus</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Harga ditetapkan admin (fair & transparan)</span>
                </li>
              </ul>
              <Link href="/donate" className="block">
                <Button
                  className="w-full bg-dowear-plus hover:bg-dowear-plus/90 text-dowear-plus-foreground"
                  size="lg"
                >
                  Pelajari DoWear+
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Products & Events */}
      <section className="container max-w-7xl mx-auto px-4 py-16 bg-muted/30">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-12">
            {/* Featured Products */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Produk Pilihan Minggu Ini</h2>
                  <p className="text-muted-foreground">Kurasi item preloved terbaik dengan kualitas terjamin</p>
                </div>
                <Link href="/listings">
                  <Button variant="ghost" size="sm" className="hidden sm:flex">
                    Lihat Semua
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="mt-6 text-center sm:hidden">
                <Link href="/listings">
                  <Button variant="outline" className="w-full bg-background">
                    Lihat Semua Produk
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Active Campaigns */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Campaign Donasi Aktif</h2>
                  <p className="text-muted-foreground">Kontribusi langsung untuk mereka yang membutuhkan</p>
                </div>
                <Link href="/donate">
                  <Button variant="ghost" size="sm" className="hidden sm:flex">
                    Lihat Semua
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                {activeEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              <div className="mt-6 text-center sm:hidden">
                <Link href="/donate">
                  <Button variant="outline" className="w-full bg-background">
                    Lihat Semua Campaign
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <QuickStartGuide />

            <DonationFundWidget fund={mockDonationFund} />

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Butuh Panduan?</CardTitle>
                <CardDescription>Lihat FAQ untuk memahami alur lengkap jual, beli, dan donasi.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/faq">
                  <Button className="w-full" size="lg">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Buka FAQ
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">Siap Mulai Demo?</CardTitle>
                <CardDescription>
                  Coba fitur lengkap sebagai Buyer, Seller, atau Admin dengan akun demo kami.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/auth">
                  <Button className="w-full" size="lg" variant="default">
                    Login Demo Account
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground text-center">
                  Akses instant tanpa registrasi untuk evaluasi fitur
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Berkontribusi untuk Fashion Berkelanjutan?</h2>
          <p className="text-lg mb-8 opacity-90">
            Bergabung dengan komunitas ReWear Plus dan mulai belanja preloved atau donasi pakaian hari ini.
            <br />
            <span className="font-semibold">100% gratis, 100% transparan, 100% berdampak.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto text-base px-8 py-6 bg-background text-foreground hover:bg-background/90 shadow-lg"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Daftar Sekarang
              </Button>
            </Link>
            <Link href="/faq">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base px-8 py-6 border-2 border-white bg-white/10 text-white hover:bg-white hover:text-foreground transition-all shadow-lg backdrop-blur-sm"
              >
                Pelajari Lebih Lanjut
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
