"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import type { ChatMessage, ChatConversation } from "@/lib/types"
import { readStorage, writeStorage, STORAGE_KEYS } from "@/lib/storage"

const POLL_INTERVAL = 2000

export function useChat(currentUserId: string) {
  const [conversations, setConversations] = useState<ChatConversation[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const loadData = useCallback(() => {
    setConversations(readStorage<ChatConversation[]>(STORAGE_KEYS.CONVERSATIONS, []))
    setMessages(readStorage<ChatMessage[]>(STORAGE_KEYS.MESSAGES, []))
  }, [])

  useEffect(() => {
    loadData()
    pollingRef.current = setInterval(loadData, POLL_INTERVAL)
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current)
    }
  }, [loadData])

  const getConversationMessages = useCallback(
    (conversationId: string) => messages.filter((m) => m.conversationId === conversationId),
    [messages]
  )

  const sendMessage = useCallback(
    (conversationId: string, text: string, senderId: string, senderName: string) => {
      const newMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        conversationId,
        senderId,
        senderName,
        text,
        timestamp: new Date().toISOString(),
        read: false,
      }
      const allMessages = readStorage<ChatMessage[]>(STORAGE_KEYS.MESSAGES, [])
      writeStorage(STORAGE_KEYS.MESSAGES, [...allMessages, newMessage])

      const allConvs = readStorage<ChatConversation[]>(STORAGE_KEYS.CONVERSATIONS, [])
      const updatedConvs = allConvs.map((c) =>
        c.id === conversationId
          ? { ...c, lastMessage: text, lastTimestamp: newMessage.timestamp }
          : c
      )
      writeStorage(STORAGE_KEYS.CONVERSATIONS, updatedConvs)
      loadData()
    },
    [loadData]
  )

  const startConversation = useCallback(
    (
      productId: string,
      productTitle: string,
      productImage: string,
      buyerId: string,
      buyerName: string,
      sellerId: string,
      sellerName: string
    ): string => {
      const allConvs = readStorage<ChatConversation[]>(STORAGE_KEYS.CONVERSATIONS, [])
      const existing = allConvs.find(
        (c) => c.productId === productId && c.buyerId === buyerId && c.sellerId === sellerId
      )
      if (existing) return existing.id

      const newConv: ChatConversation = {
        id: `conv-${Date.now()}`,
        productId,
        productTitle,
        productImage,
        buyerId,
        buyerName,
        sellerId,
        sellerName,
        lastMessage: "",
        lastTimestamp: new Date().toISOString(),
        unreadCount: 0,
      }
      writeStorage(STORAGE_KEYS.CONVERSATIONS, [...allConvs, newConv])
      loadData()
      return newConv.id
    },
    [loadData]
  )

  const markRead = useCallback(
    (conversationId: string) => {
      const allConvs = readStorage<ChatConversation[]>(STORAGE_KEYS.CONVERSATIONS, [])
      const updatedConvs = allConvs.map((c) =>
        c.id === conversationId ? { ...c, unreadCount: 0 } : c
      )
      writeStorage(STORAGE_KEYS.CONVERSATIONS, updatedConvs)
      loadData()
    },
    [loadData]
  )

  const myConversations = conversations.filter(
    (c) => c.buyerId === currentUserId || c.sellerId === currentUserId
  )
  const totalUnread = myConversations.reduce((sum, c) => sum + c.unreadCount, 0)

  return {
    conversations: myConversations,
    messages,
    getConversationMessages,
    sendMessage,
    startConversation,
    markRead,
    totalUnread,
  }
}
