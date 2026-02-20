"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, HelpCircle } from "lucide-react"

const faqGroups = [
  {
    title: "Akun & Role",
    items: [
      {
        q: "Apa beda buyer, seller, dan admin?",
        a: "Buyer bisa belanja dan donasi. Seller bisa upload item untuk dijual. Admin mengelola approval listing, campaign, dan operasional platform.",
      },
      {
        q: "Kenapa buyer tidak bisa masuk halaman admin?",
        a: "Untuk keamanan operasional. Halaman admin hanya terbuka untuk role admin agar data dan keputusan moderasi tetap terkontrol.",
      },
    ],
  },
  {
    title: "Belanja & Listing",
    items: [
      {
        q: "Mulai cari produk dari mana?",
        a: "Gunakan halaman Listings untuk pencarian, filter kategori, kondisi, ukuran, mode, dan rentang harga.",
      },
      {
        q: "Apa bedanya Home dan Listings?",
        a: "Home berfungsi sebagai ringkasan dan navigasi awal. Listings adalah halaman utama untuk browsing detail produk dengan filter lengkap.",
      },
    ],
  },
  {
    title: "Donasi",
    items: [
      {
        q: "Apa beda DoWear dan DoWear+?",
        a: "DoWear: barang dikirim langsung ke penerima. DoWear+: barang dijual dulu, lalu 100% hasilnya masuk donation fund untuk event sosial.",
      },
      {
        q: "Bagaimana cara memantau status donasi?",
        a: "Buka halaman Profile lalu cek tab donasi. Di sana ada progress tracking tiap langkah donasi.",
      },
    ],
  },
  {
    title: "Profile & Dampak",
    items: [
      {
        q: "Apa saja yang bisa dilihat di Profile?",
        a: "Riwayat pembelian, wishlist, progress donasi DoWear/DoWear+, ringkasan kontribusi, serta e-certificate.",
      },
      {
        q: "Bagaimana melihat dampak kontribusi saya?",
        a: "Lihat bagian Ringkasan Dampak di Profile dan halaman Donate untuk update penggunaan donation fund.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="container max-w-5xl mx-auto px-4 py-10 space-y-8">
      <div>
        <Badge variant="outline" className="mb-3">
          <HelpCircle className="h-3.5 w-3.5 mr-1" />
          Pusat Bantuan
        </Badge>
        <h1 className="text-3xl font-bold mb-2">FAQ ReWear+</h1>
        <p className="text-muted-foreground">
          Ringkasan cepat agar user baru lebih mudah memahami fitur, alur belanja, donasi, dan pembagian role.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {faqGroups.map((group) => (
            <Badge key={group.title} variant="secondary">
              {group.title}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {faqGroups.map((group) => (
          <Card key={group.title}>
            <CardHeader>
              <CardTitle>{group.title}</CardTitle>
              <CardDescription>{group.items.length} pertanyaan umum</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {group.items.map((item) => (
                <details key={item.q} className="rounded-lg border bg-muted/30 p-4 open:bg-background open:border-primary/30 transition-colors">
                  <summary className="cursor-pointer font-medium">{item.q}</summary>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mulai Sekarang</CardTitle>
          <CardDescription>Pilih aksi sesuai tujuan kamu hari ini.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-3">
          <Link href="/listings" className="w-full sm:w-auto">
            <Button className="w-full">
              Jelajah Listings
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
          <Link href="/donate" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full bg-transparent">
              Mulai Donasi
            </Button>
          </Link>
          <Link href="/profile" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full bg-transparent">
              Lihat Profile
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
