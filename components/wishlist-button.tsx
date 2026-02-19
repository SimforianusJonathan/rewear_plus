"use client"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import type { WishlistItem } from "@/lib/types"

interface WishlistButtonProps {
  item: Omit<WishlistItem, "id" | "addedAt">
  size?: "default" | "sm" | "lg" | "icon"
  variant?: "default" | "outline" | "ghost"
}

export function WishlistButton({
  item,
  size = "icon",
  variant = "outline",
}: WishlistButtonProps) {
  const { toggleWishlist, isInWishlist } = useCart()
  const inWishlist = isInWishlist(item.productId)

  return (
    <Button
      size={size}
      variant={variant}
      onClick={() => toggleWishlist(item)}
      title={inWishlist ? "Hapus dari Wishlist" : "Tambah ke Wishlist"}
    >
      <Heart
        className={`h-5 w-5 transition-colors ${
          inWishlist ? "fill-red-500 text-red-500" : ""
        }`}
      />
    </Button>
  )
}
