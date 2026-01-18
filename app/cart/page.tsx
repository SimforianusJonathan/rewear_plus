"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react"
import { formatPrice } from "@/lib/mock-data"

// Dummy cart data
const dummyCartItems = [
  {
    id: "cart-1",
    productId: "1",
    title: "Vintage Batik Tulis Solo",
    image: "/vintage-batik-tulis-solo-traditional-indonesian-fa.jpg",
    price: 85000,
    size: "M",
    condition: "like-new",
    quantity: 1,
    mode: "rewear",
  },
  {
    id: "cart-2",
    productId: "2",
    title: "Modern Kebaya Kutubaru",
    image: "/modern-kebaya-kutubaru-indonesian-traditional-dres.jpg",
    price: 75000,
    size: "S",
    condition: "good",
    quantity: 2,
    mode: "rewear",
  },
  {
    id: "cart-3",
    productId: "4",
    title: "Oversized Denim Jacket",
    image: "/oversized-denim-jacket-vintage-streetwear.jpg",
    price: 65000,
    size: "L",
    condition: "good",
    quantity: 1,
    mode: "rewear",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(dummyCartItems)

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingFee = 25000
  const total = subtotal + shippingFee

  const conditionColors: Record<string, string> = {
    "like-new": "bg-green-100 text-green-800",
    good: "bg-yellow-100 text-yellow-800",
    fair: "bg-orange-100 text-orange-800",
  }

  const modeColors: Record<string, string> = {
    rewear: "bg-blue-100 text-blue-800",
    upwear: "bg-purple-100 text-purple-800",
    dowear: "bg-green-100 text-green-800",
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8 max-w-7xl mx-auto">
        {/* Header */}
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
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
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
                            className="h-8 w-8 flex-shrink-0"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge
                            variant="secondary"
                            className={modeColors[item.mode]}
                          >
                            {item.mode.toUpperCase()}
                          </Badge>
                          <Badge variant="secondary">Size {item.size}</Badge>
                          <Badge
                            variant="secondary"
                            className={conditionColors[item.condition]}
                          >
                            {item.condition === "like-new"
                              ? "Like New"
                              : item.condition.charAt(0).toUpperCase() +
                                item.condition.slice(1)}
                          </Badge>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <p className="text-lg font-bold">
                            {formatPrice(item.price)}
                          </p>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, -1)}
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
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
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

                  <Button className="w-full mb-3" size="lg">
                    Proceed to Checkout
                  </Button>
                  <Link href="/listings">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>

                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground text-center">
                      🌿 Shopping sustainably helps reduce fashion waste
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
