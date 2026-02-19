"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useReview } from "@/hooks/use-review"
import type { DemoUser } from "@/lib/types"

interface ReviewSectionProps {
  productId: string
  currentUser: DemoUser
}

function StarRating({
  value,
  onChange,
}: {
  value: number
  onChange?: (v: number) => void
}) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          onMouseEnter={() => onChange && setHover(star)}
          onMouseLeave={() => onChange && setHover(0)}
          className={onChange ? "cursor-pointer" : "cursor-default"}
        >
          <Star
            className={`h-5 w-5 transition-colors ${
              star <= (hover || value)
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground"
            }`}
          />
        </button>
      ))}
    </div>
  )
}

export function ReviewSection({ productId, currentUser }: ReviewSectionProps) {
  const {
    getProductReviews,
    canReview,
    getReviewableTransaction,
    submitReview,
    getAverageRating,
  } = useReview(currentUser.id)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const productReviews = getProductReviews(productId)
  const avgRating = getAverageRating(productId)
  const reviewable = canReview(productId)
  const tx = getReviewableTransaction(productId)

  const handleSubmit = () => {
    if (!tx) return
    submitReview({
      transactionId: tx.id,
      productId,
      productTitle: tx.productTitle,
      reviewerId: currentUser.id,
      reviewerName: currentUser.name,
      reviewerAvatar: currentUser.avatar,
      sellerId: tx.sellerId,
      rating,
      comment,
    })
    setSubmitted(true)
    setComment("")
    setRating(5)
  }

  return (
    <div className="mt-8 pt-8 border-t space-y-6">
      <div className="flex items-center gap-4 flex-wrap">
        <h2 className="text-xl font-bold">Ulasan Pembeli</h2>
        {productReviews.length > 0 && (
          <div className="flex items-center gap-2">
            <StarRating value={Math.round(avgRating)} />
            <span className="text-sm text-muted-foreground">
              {avgRating.toFixed(1)} ({productReviews.length} ulasan)
            </span>
          </div>
        )}
      </div>

      {/* Write Review Form */}
      {reviewable && !submitted && (
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Tulis Ulasan Kamu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Rating</p>
              <StarRating value={rating} onChange={setRating} />
            </div>
            <Textarea
              placeholder="Bagaimana pengalamanmu dengan produk ini?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
            <Button onClick={handleSubmit} disabled={!comment.trim()} size="sm">
              Kirim Ulasan
            </Button>
          </CardContent>
        </Card>
      )}

      {submitted && (
        <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-200">
          Terima kasih! Ulasanmu berhasil dikirim.
        </div>
      )}

      {/* Review List */}
      {productReviews.length > 0 ? (
        <div className="space-y-4">
          {productReviews.map((review) => (
            <div key={review.id} className="flex gap-3">
              <div className="h-9 w-9 rounded-full bg-muted overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={review.reviewerAvatar || "/placeholder.svg"}
                  alt={review.reviewerName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-medium text-sm">{review.reviewerName}</span>
                  <StarRating value={review.rating} />
                  <span className="text-xs text-muted-foreground ml-auto">
                    {review.createdAt}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Belum ada ulasan untuk produk ini.</p>
      )}
    </div>
  )
}
