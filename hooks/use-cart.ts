"use client"

import { useState, useEffect, useCallback } from "react"
import type { CartItem, WishlistItem } from "@/lib/types"
import { readStorage, writeStorage, STORAGE_KEYS } from "@/lib/storage"

const SHIPPING_FEE = 25000

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])

  const loadData = useCallback(() => {
    setCartItems(readStorage<CartItem[]>(STORAGE_KEYS.CART, []))
    setWishlistItems(readStorage<WishlistItem[]>(STORAGE_KEYS.WISHLIST, []))
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const addToCart = useCallback(
    (item: Omit<CartItem, "id" | "addedAt" | "quantity">) => {
      const allItems = readStorage<CartItem[]>(STORAGE_KEYS.CART, [])
      const existing = allItems.find((i) => i.productId === item.productId)
      let updated: CartItem[]
      if (existing) {
        updated = allItems.map((i) =>
          i.productId === item.productId ? { ...i, quantity: i.quantity + 1 } : i
        )
      } else {
        const newItem: CartItem = {
          ...item,
          id: `ci-${Date.now()}`,
          quantity: 1,
          addedAt: new Date().toISOString(),
        }
        updated = [...allItems, newItem]
      }
      writeStorage(STORAGE_KEYS.CART, updated)
      setCartItems(updated)
    },
    []
  )

  const removeFromCart = useCallback((cartItemId: string) => {
    const updated = readStorage<CartItem[]>(STORAGE_KEYS.CART, []).filter(
      (i) => i.id !== cartItemId
    )
    writeStorage(STORAGE_KEYS.CART, updated)
    setCartItems(updated)
  }, [])

  const updateQuantity = useCallback((cartItemId: string, quantity: number) => {
    if (quantity < 1) return
    const updated = readStorage<CartItem[]>(STORAGE_KEYS.CART, []).map((i) =>
      i.id === cartItemId ? { ...i, quantity } : i
    )
    writeStorage(STORAGE_KEYS.CART, updated)
    setCartItems(updated)
  }, [])

  const clearCart = useCallback(() => {
    writeStorage(STORAGE_KEYS.CART, [])
    setCartItems([])
  }, [])

  const toggleWishlist = useCallback((item: Omit<WishlistItem, "id" | "addedAt">) => {
    const allItems = readStorage<WishlistItem[]>(STORAGE_KEYS.WISHLIST, [])
    const existing = allItems.find((i) => i.productId === item.productId)
    let updated: WishlistItem[]
    if (existing) {
      updated = allItems.filter((i) => i.productId !== item.productId)
    } else {
      const newItem: WishlistItem = {
        ...item,
        id: `wi-${Date.now()}`,
        addedAt: new Date().toISOString(),
      }
      updated = [...allItems, newItem]
    }
    writeStorage(STORAGE_KEYS.WISHLIST, updated)
    setWishlistItems(updated)
  }, [])

  const isInWishlist = useCallback(
    (productId: string) => wishlistItems.some((i) => i.productId === productId),
    [wishlistItems]
  )

  const isInCart = useCallback(
    (productId: string) => cartItems.some((i) => i.productId === productId),
    [cartItems]
  )

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingFee = cartItems.length > 0 ? SHIPPING_FEE : 0
  const total = subtotal + shippingFee
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0)

  return {
    cartItems,
    wishlistItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    isInWishlist,
    isInCart,
    subtotal,
    shippingFee,
    total,
    cartCount,
  }
}
