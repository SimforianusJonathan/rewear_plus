"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EventCard } from "@/components/event-card"
import { DonationFundWidget } from "@/components/donation-fund-widget"
import {
  mockEvents,
  mockDonationFund,
  mockImpactLogs,
  mockFoundations,
  formatPrice,
} from "@/lib/mock-data"
import { Sparkles, HandHeart, ArrowRight, TrendingUp, HelpCircle, Shield, CheckCircle2 } from "lucide-react"

export default function DonatePage() {
  const activeEvents = mockEvents.filter((e) => !e.distributed)
  const completedEvents = mockEvents.filter((e) => e.distributed)

  return (
    <div className="min-h-screen">
      <section className="bg-primary/5 border-b">
        <div className="container max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Donation Hub</h1>
            <p className="text-lg text-muted-foreground">
              Pilih jenis donasi yang sesuai: kirim pakaian langsung ke penerima (DoWear) atau donasikan untuk dijual dan
              hasilnya masuk ke dana komunitas (DoWear+).
            </p>
          </div>
        </div>
      </section>

      <div className="container max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Campaign aktif</p>
              <p className="text-3xl font-bold">{activeEvents.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Dana terkumpul</p>
              <p className="text-3xl font-bold">{formatPrice(mockDonationFund.total)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Target dana</p>
              <p className="text-3xl font-bold">{formatPrice(mockDonationFund.goal)}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-dowear/30">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-dowear/10 flex items-center justify-center mb-2">
                    <HandHeart className="h-6 w-6 text-dowear" />
                  </div>
                  <CardTitle>DoWear (Donasi Langsung)</CardTitle>
                  <CardDescription>Pakaian kamu dikirim langsung ke penerima manfaat.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Cocok untuk donasi cepat dan tepat sasaran</li>
                    <li>• Donatur menanggung biaya pengiriman</li>
                    <li>• Status donasi bisa dipantau di profile</li>
                  </ul>
                  <Link href="/sell">
                    <Button className="w-full bg-dowear hover:bg-dowear/90 text-dowear-foreground">
                      Donasi Sekarang
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-dowear-plus/30">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-dowear-plus/10 flex items-center justify-center mb-2">
                    <Sparkles className="h-6 w-6 text-dowear-plus-foreground" />
                  </div>
                  <CardTitle>DoWear+ (Donasi ke Fund)</CardTitle>
                  <CardDescription>Pakaian dijual oleh platform dan hasilnya 100% ke donation fund.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Cocok untuk bantu banyak campaign sekaligus</li>
                    <li>• Harga ditetapkan admin untuk transparansi</li>
                    <li>• Dana dipakai untuk event sosial komunitas</li>
                  </ul>
                  <Link href="/sell">
                    <Button className="w-full bg-dowear-plus hover:bg-dowear-plus/90 text-dowear-plus-foreground">
                      Donasi untuk Dijual
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Cara Donasi dalam 3 Langkah</CardTitle>
                <CardDescription>Alur sederhana agar user baru cepat paham.</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="p-4 rounded-lg border">
                  <p className="font-semibold mb-1">1. Pilih Mode</p>
                  <p className="text-muted-foreground">Pilih DoWear untuk donasi langsung atau DoWear+ untuk dukung fund.</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <p className="font-semibold mb-1">2. Upload Item</p>
                  <p className="text-muted-foreground">Isi detail kondisi barang, ukuran, dan foto pakaian yang akan didonasikan.</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <p className="font-semibold mb-1">3. Pantau Impact</p>
                  <p className="text-muted-foreground">Lihat update penyaluran/dana di profile dan log impact secara berkala.</p>
                </div>
              </CardContent>
            </Card>

            {/* Transparency Section */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Yayasan Mitra Terpercaya
                </CardTitle>
                <CardDescription>
                  Semua donasi disalurkan melalui yayasan resmi yang sudah terverifikasi dan memiliki izin operasional.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockFoundations.map((foundation) => (
                  <div key={foundation.id} className="p-4 rounded-lg border bg-background space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{foundation.name}</p>
                          {foundation.verified && (
                            <Badge className="bg-green-100 text-green-700 border-green-300 h-5">
                              <CheckCircle2 className="h-3 w-3 mr-1" /> Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{foundation.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
                      <span>{foundation.activePrograms} program aktif</span>
                      <span>•</span>
                      <span>{foundation.totalBeneficiaries.toLocaleString()} penerima manfaat</span>
                    </div>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground pt-2">
                  Setiap event/campaign menampilkan detail yayasan penyalur, lokasi penerima, dan laporan distribusi dengan
                  foto bukti.
                </p>
              </CardContent>
            </Card>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Active Events</h2>
                <span className="text-sm text-muted-foreground">{activeEvents.length} events</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {activeEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>

            {completedEvents.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Completed Events</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {completedEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <DonationFundWidget fund={mockDonationFund} />

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Impact Log
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockImpactLogs.slice(0, 4).map((log) => {
                    const foundation = log.foundationId
                      ? mockFoundations.find((f) => f.id === log.foundationId)
                      : null
                    return (
                      <div key={log.id} className="pb-3 border-b last:border-b-0 last:pb-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="text-xs text-muted-foreground">
                            {new Date(log.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                          </p>
                          {log.verified && (
                            <Badge className="bg-green-100 text-green-700 border-green-300 h-5">
                              <CheckCircle2 className="h-3 w-3" />
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm font-medium">{log.title}</p>
                        <p className="text-xs text-muted-foreground">{log.description}</p>
                        {log.itemCount && (
                          <p className="text-xs text-muted-foreground mt-1">📦 {log.itemCount} items</p>
                        )}
                        {log.amount && (
                          <p className="text-xs text-primary mt-1">Dana terpakai: {formatPrice(log.amount)}</p>
                        )}
                        {foundation && (
                          <p className="text-xs text-muted-foreground mt-1">
                            <Shield className="h-3 w-3 inline mr-1" />
                            {foundation.name}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Masih bingung mulai dari mana?
                </CardTitle>
                <CardDescription>Lihat FAQ untuk penjelasan fitur, role, dan alur transaksi.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/faq">
                  <Button variant="outline" className="w-full bg-transparent">
                    Buka FAQ
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
