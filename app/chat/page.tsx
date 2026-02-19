"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useChat } from "@/hooks/use-chat"
import { useDemoUser } from "@/hooks/use-demo-user"
import { ChatWindow } from "@/components/chat-window"
import { initStorage } from "@/lib/storage"
import type { ChatConversation } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare } from "lucide-react"

export default function ChatPage() {
  const [initialized, setInitialized] = useState(false)
  const [selectedConv, setSelectedConv] = useState<ChatConversation | null>(null)
  const { currentUser } = useDemoUser()
  const { conversations, totalUnread } = useChat(currentUser.id)

  useEffect(() => {
    initStorage()
    setInitialized(true)
  }, [])

  if (!initialized) {
    return (
      <div className="container px-4 py-8 max-w-7xl mx-auto">
        <div className="h-96 flex items-center justify-center text-muted-foreground">
          Memuat...
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="h-7 w-7 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Chat</h1>
          <p className="text-muted-foreground text-sm">
            Percakapan dengan buyer &amp; seller
          </p>
        </div>
        {totalUnread > 0 && (
          <Badge className="ml-2 bg-red-500 text-white">{totalUnread} unread</Badge>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6" style={{ height: "calc(100vh - 18rem)" }}>
        {/* Conversations List */}
        <div className="lg:col-span-1 overflow-y-auto space-y-2 pr-1">
          {conversations.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Belum ada percakapan</p>
            </div>
          ) : (
            conversations
              .sort((a, b) => b.lastTimestamp.localeCompare(a.lastTimestamp))
              .map((conv) => {
                const otherName =
                  currentUser.id === conv.buyerId ? conv.sellerName : conv.buyerName
                const isSelected = selectedConv?.id === conv.id
                return (
                  <Card
                    key={conv.id}
                    className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                      isSelected ? "border-primary ring-1 ring-primary/30" : ""
                    }`}
                    onClick={() => setSelectedConv(conv)}
                  >
                    <CardContent className="p-3">
                      <div className="flex gap-3 items-start">
                        <div className="relative h-11 w-11 rounded-lg overflow-hidden bg-muted shrink-0">
                          <Image
                            src={conv.productImage || "/placeholder.svg"}
                            alt={conv.productTitle}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <p className="font-medium text-sm truncate">{otherName}</p>
                            {conv.unreadCount > 0 && (
                              <Badge className="h-5 w-5 p-0 text-[10px] flex items-center justify-center shrink-0 bg-red-500 text-white">
                                {conv.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <p className="text-[11px] text-muted-foreground truncate">
                            {conv.productTitle}
                          </p>
                          <p className="text-xs text-muted-foreground truncate mt-0.5 italic">
                            {conv.lastMessage || "Mulai percakapan..."}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
          )}
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-2 border rounded-xl overflow-hidden flex flex-col bg-background">
          {selectedConv ? (
            <ChatWindow
              conversation={selectedConv}
              currentUserId={currentUser.id}
              currentUserName={currentUser.name}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-center text-muted-foreground">
              <div>
                <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p className="text-sm">Pilih percakapan untuk memulai chat</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
