"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  CreditCard,
  Wallet,
  Building2,
  CheckCircle2,
} from "lucide-react"
import { formatPrice } from "@/lib/mock-data"
import { useCart } from "@/hooks/use-cart"
import { useCalendar } from "@/hooks/use-calendar"
import { useDemoUser } from "@/hooks/use-demo-user"
import { initStorage, readStorage, writeStorage, STORAGE_KEYS } from "@/lib/storage"
import type { Transaction } from "@/lib/types"

const conditionColors: Record<string, string> = {
  "like-new": "bg-green-100 text-green-800",
  good: "bg-yellow-100 text-yellow-800",
  fair: "bg-orange-100 text-orange-800",
}

const modeColors: Record<string, string> = {
  rewear: "bg-blue-100 text-blue-800",
  dowear: "bg-green-100 text-green-800",
  "dowear-plus": "bg-orange-100 text-orange-800",
}

export default function CartPage() {
  const [initialized, setInitialized] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("bank-transfer")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  })

  const { cartItems, removeFromCart, updateQuantity, clearCart, subtotal, shippingFee, total } =
    useCart()
  const { recordTransaction } = useCalendar()
  const { currentUser } = useDemoUser()

  useEffect(() => {
    initStorage()
    setInitialized(true)
  }, [])

  const handleCheckout = () => {
    cartItems.forEach((item) => {
      const tx: Transaction = {
        id: `t-${Date.now()}-${item.productId}`,
        productId: item.productId,
        productTitle: item.title,
        productImage: item.image,
        buyerId: currentUser.id,
        buyerName: currentUser.name,
        sellerId: item.sellerId,
        sellerName: item.sellerName,
        price: item.price,
        shippingFee: 0,
        total: item.price * item.quantity,
        status: "completed",
        date: new Date().toISOString().split("T")[0],
        reviewed: false,
      }
      const allTx = readStorage<Transaction[]>(STORAGE_KEYS.TRANSACTIONS, [])
      writeStorage(STORAGE_KEYS.TRANSACTIONS, [...allTx, tx])
      recordTransaction(tx)
    })

    setShowCheckout(false)
    setShowSuccess(true)

    setTimeout(() => {
      setShowSuccess(false)
      clearCart()
      setFormData({ name: "", phone: "", address: "", city: "", postalCode: "" })
    }, 3000)
  }

  if (!initialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
        Memuat...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/listings">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <p className="text-muted-foreground mt-1">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <Card className="p-12">
            <div className="text-center">
              <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Add some items from our listings to get started!
              </p>
              <Link href="/listings">
                <Button>Browse Listings</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-lg overflow-hidden bg-muted">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-2 mb-2">
                          <Link
                            href={`/listing/${item.productId}`}
                            className="font-semibold hover:underline"
                          >
                            {item.title}
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 shrink-0"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary" className={modeColors[item.mode] ?? ""}>
                            {item.mode.toUpperCase()}
                          </Badge>
                          <Badge variant="secondary">Size {item.size}</Badge>
                          <Badge
                            variant="secondary"
                            className={conditionColors[item.condition] ?? ""}
                          >
                            {item.condition === "like-new"
                              ? "Like New"
                              : item.condition.charAt(0).toUpperCase() +
                                item.condition.slice(1)}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <p className="text-lg font-bold">{formatPrice(item.price)}</p>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              readOnly
                              className="w-16 h-8 text-center"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Penjual: {item.sellerName}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">{formatPrice(shippingFee)}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold">Total</span>
                        <span className="text-xl font-bold text-primary">
                          {formatPrice(total)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-full mb-3"
                    size="lg"
                    onClick={() => setShowCheckout(true)}
                  >
                    Proceed to Checkout
                  </Button>
                  <Link href="/listings">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground text-center">
                      Berbelanja secara berkelanjutan membantu mengurangi limbah fashion
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Checkout Dialog */}
        <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Checkout</DialogTitle>
              <DialogDescription>
                Lengkapi detail pengiriman untuk menyelesaikan pesanan
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h3 className="font-semibold mb-3">Ringkasan Pesanan</h3>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.title} x{item.quantity}
                    </span>
                    <span className="font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{formatPrice(shippingFee)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Informasi Pengiriman</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input
                      id="name"
                      placeholder="Masukkan nama lengkap"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input
                      id="phone"
                      placeholder="08xx xxxx xxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Alamat</Label>
                    <Textarea
                      id="address"
                      placeholder="Masukkan alamat lengkap"
                      rows={3}
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="city">Kota</Label>
                      <Input
                        id="city"
                        placeholder="Kota"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="postalCode">Kode Pos</Label>
                      <Input
                        id="postalCode"
                        placeholder="12345"
                        value={formData.postalCode}
                        onChange={(e) =>
                          setFormData({ ...formData, postalCode: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Metode Pembayaran</h3>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted">
                    <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                    <Label
                      htmlFor="bank-transfer"
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Transfer Bank</p>
                        <p className="text-sm text-muted-foreground">BCA, Mandiri, BNI</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted">
                    <RadioGroupItem value="e-wallet" id="e-wallet" />
                    <Label
                      htmlFor="e-wallet"
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <Wallet className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">E-Wallet</p>
                        <p className="text-sm text-muted-foreground">
                          GoPay, OVO, Dana, ShopeePay
                        </p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label
                      htmlFor="credit-card"
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Kartu Kredit/Debit</p>
                        <p className="text-sm text-muted-foreground">Visa, Mastercard, JCB</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowCheckout(false)}
                >
                  Batal
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleCheckout}
                  disabled={
                    !formData.name ||
                    !formData.phone ||
                    !formData.address ||
                    !formData.city ||
                    !formData.postalCode
                  }
                >
                  Konfirmasi Pesanan
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Success Dialog */}
        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent className="max-w-md">
            <div className="text-center py-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <DialogTitle className="text-2xl mb-2">Pesanan Berhasil!</DialogTitle>
              <DialogDescription className="text-base">
                Pesananmu sudah tercatat. Transaksi otomatis dicatat di Donating Calendar!
              </DialogDescription>
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-1">Total Pesanan</p>
                <p className="text-2xl font-bold text-primary">{formatPrice(total)}</p>
              </div>
              <div className="flex gap-3 mt-6">
                <Link href="/calendar" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Lihat Calendar
                  </Button>
                </Link>
                <Button className="flex-1" onClick={() => setShowSuccess(false)}>
                  Lanjut Belanja
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
