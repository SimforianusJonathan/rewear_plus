"use client"

import { useState, useEffect, useCallback } from "react"
import type { Review, Transaction } from "@/lib/types"
import { readStorage, writeStorage, STORAGE_KEYS } from "@/lib/storage"

export function useReview(currentUserId: string) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const loadData = useCallback(() => {
    setReviews(readStorage<Review[]>(STORAGE_KEYS.REVIEWS, []))
    setTransactions(readStorage<Transaction[]>(STORAGE_KEYS.TRANSACTIONS, []))
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const getProductReviews = useCallback(
    (productId: string) => reviews.filter((r) => r.productId === productId),
    [reviews]
  )

  const canReview = useCallback(
    (productId: string) => {
      const completedTx = transactions.find(
        (t) =>
          t.productId === productId &&
          t.buyerId === currentUserId &&
          t.status === "completed" &&
          !t.reviewed
      )
      return !!completedTx
    },
    [transactions, currentUserId]
  )

  const getReviewableTransaction = useCallback(
    (productId: string) =>
      transactions.find(
        (t) =>
          t.productId === productId &&
          t.buyerId === currentUserId &&
          t.status === "completed" &&
          !t.reviewed
      ),
    [transactions, currentUserId]
  )

  const submitReview = useCallback(
    (review: Omit<Review, "id" | "createdAt">) => {
      const newReview: Review = {
        ...review,
        id: `rev-${Date.now()}`,
        createdAt: new Date().toISOString().split("T")[0],
      }
      const allReviews = readStorage<Review[]>(STORAGE_KEYS.REVIEWS, [])
      writeStorage(STORAGE_KEYS.REVIEWS, [...allReviews, newReview])

      const allTx = readStorage<Transaction[]>(STORAGE_KEYS.TRANSACTIONS, [])
      const updatedTx = allTx.map((t) =>
        t.id === review.transactionId ? { ...t, reviewed: true } : t
      )
      writeStorage(STORAGE_KEYS.TRANSACTIONS, updatedTx)
      loadData()
    },
    [loadData]
  )

  const getAverageRating = useCallback(
    (productId: string) => {
      const productReviews = reviews.filter((r) => r.productId === productId)
      if (productReviews.length === 0) return 0
      return productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
    },
    [reviews]
  )

  return {
    reviews,
    transactions,
    getProductReviews,
    canReview,
    getReviewableTransaction,
    submitReview,
    getAverageRating,
  }
}
