"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, ShoppingBag, Heart, TrendingUp, CheckCircle2 } from "lucide-react"
import { useDemoUser } from "@/hooks/use-demo-user"

export function QuickStartGuide() {
  const [isVisible, setIsVisible] = useState(true)
  const { currentUser } = useDemoUser()

  if (!isVisible) return null

  const getBuyerGuide = () => (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-sm font-bold text-primary">1</span>
        </div>
        <div>
          <p className="font-semibold text-sm mb-1">Jelajahi Produk Preloved</p>
          <p className="text-xs text-muted-foreground mb-2">
            Klik "Listings" di menu atau tombol "Mulai Belanja" di homepage. Filter berdasarkan kategori, ukuran, harga,
            atau mode (ReWear/DoWear+).
          </p>
          <Link href="/listings">
            <Button size="sm" variant="outline">
              <ShoppingBag className="h-3 w-3 mr-1" />
              Ke Listings
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-sm font-bold text-primary">2</span>
        </div>
        <div>
          <p className="font-semibold text-sm mb-1">Tambahkan ke Cart & Checkout</p>
          <p className="text-xs text-muted-foreground mb-2">
            Klik produk → "Add to Cart" → Lihat cart di icon keranjang (navbar) → "Checkout". 7% otomatis masuk donation
            fund!
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-sm font-bold text-primary">3</span>
        </div>
        <div>
          <p className="font-semibold text-sm mb-1">Pantau Histori & Dampak</p>
          <p className="text-xs text-muted-foreground mb-2">
            Buka "Profile" untuk lihat pembelian, wishlist, dan total kontribusi donasimu dari transaksi ReWear.
          </p>
          <Link href="/profile">
            <Button size="sm" variant="outline">
              <TrendingUp className="h-3 w-3 mr-1" />
              Ke Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )

  const getSellerGuide = () => (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-sm font-bold text-primary">1</span>
        </div>
        <div>
          <p className="font-semibold text-sm mb-1">Upload Item untuk Dijual atau Donasi</p>
          <p className="text-xs text-muted-foreground mb-2">
            Klik "Sell/Donate" → Pilih "ReWear" (jual), "DoWear" (donasi langsung ke campaign), atau "DoWear+" (donasi
            untuk dijual, hasil 100% ke fund).
          </p>
          <Link href="/sell">
            <Button size="sm" variant="outline">
              <Heart className="h-3 w-3 mr-1" />
              Upload Item
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-sm font-bold text-primary">2</span>
        </div>
        <div>
          <p className="font-semibold text-sm mb-1">Isi Detail & Submit</p>
          <p className="text-xs text-muted-foreground mb-2">
            Upload foto asli, pilih kondisi, ukuran, kategori. Untuk ReWear: set harga sendiri. Untuk DoWear+: harga
            ditetapkan admin. Submit untuk review.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-sm font-bold text-primary">3</span>
        </div>
        <div>
          <p className="font-semibold text-sm mb-1">Track Status di Profile</p>
          <p className="text-xs text-muted-foreground mb-2">
            Lihat status approval, penjualan, dan tracking donasi di "Profile". Admin akan review dalam 1-2 hari kerja.
          </p>
          <Link href="/profile">
            <Button size="sm" variant="outline">
              <TrendingUp className="h-3 w-3 mr-1" />
              Ke Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )

  const getAdminGuide = () => (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-sm font-bold text-primary">1</span>
        </div>
        <div>
          <p className="font-semibold text-sm mb-1">Akses Admin Dashboard</p>
          <p className="text-xs text-muted-foreground mb-2">
            Klik menu "Admin" (hanya terlihat untuk role admin). Dashboard menampilkan pending listings dan events yang
            perlu direview.
          </p>
          <Link href="/admin">
            <Button size="sm" variant="outline">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Ke Admin Dashboard
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-sm font-bold text-primary">2</span>
        </div>
        <div>
          <p className="font-semibold text-sm mb-1">Review Listing: Approve/Reject</p>
          <p className="text-xs text-muted-foreground mb-2">
            Periksa foto, deskripsi, dan kondisi barang. Approve jika sesuai standar, reject dengan alasan jika tidak
            memenuhi syarat (foto blur, harga tidak wajar, dll).
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-sm font-bold text-primary">3</span>
        </div>
        <div>
          <p className="font-semibold text-sm mb-1">Set Harga DoWear+ & Manage Events</p>
          <p className="text-xs text-muted-foreground mb-2">
            Untuk item DoWear+, admin set harga jual yang fair. Kelola campaign donasi: buat, edit, atau tandai campaign
            sebagai "distributed".
          </p>
        </div>
      </div>
    </div>
  )

  const getGuideContent = () => {
    switch (currentUser.role) {
      case "buyer":
        return getBuyerGuide()
      case "seller":
        return getSellerGuide()
      case "admin":
        return getAdminGuide()
      default:
        return getBuyerGuide()
    }
  }

  return (
    <Card className="border-2 border-primary/30 bg-primary/5 relative">
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-4 right-4 h-6 w-6 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
        title="Tutup panduan"
      >
        <X className="h-4 w-4" />
      </button>

      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Badge className="bg-primary">Quick Start</Badge>
          <Badge variant="secondary" className="capitalize">
            Role: {currentUser.role}
          </Badge>
        </div>
        <CardTitle className="text-xl">Panduan Cepat untuk {currentUser.name}</CardTitle>
        <CardDescription>Ikuti langkah-langkah ini untuk mulai menggunakan fitur sesuai role Anda</CardDescription>
      </CardHeader>

      <CardContent>{getGuideContent()}</CardContent>
    </Card>
  )
}
