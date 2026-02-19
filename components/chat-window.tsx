"use client"

import { useState, useRef, useEffect } from "react"
import type { ChatConversation } from "@/lib/types"
import { useChat } from "@/hooks/use-chat"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, X } from "lucide-react"

interface ChatWindowProps {
  conversation: ChatConversation
  currentUserId: string
  currentUserName: string
  onClose?: () => void
}

export function ChatWindow({
  conversation,
  currentUserId,
  currentUserName,
  onClose,
}: ChatWindowProps) {
  const { getConversationMessages, sendMessage, markRead } = useChat(currentUserId)
  const [text, setText] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  const messages = getConversationMessages(conversation.id)

  useEffect(() => {
    markRead(conversation.id)
  }, [conversation.id, markRead])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages.length])

  const handleSend = () => {
    if (!text.trim()) return
    sendMessage(conversation.id, text.trim(), currentUserId, currentUserName)
    setText("")
  }

  const otherName =
    currentUserId === conversation.buyerId
      ? conversation.sellerName
      : conversation.buyerName

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between bg-muted/30 shrink-0">
        <div>
          <p className="font-semibold">{otherName}</p>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {conversation.productTitle}
          </p>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {messages.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground pt-8">
            Mulai percakapan tentang{" "}
            <span className="font-medium">{conversation.productTitle}</span>
          </p>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === currentUserId
            return (
              <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                    isMe
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted rounded-bl-none"
                  }`}
                >
                  <p>{msg.text}</p>
                  <p
                    className={`text-[10px] mt-1 ${
                      isMe ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            )
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t flex gap-2 shrink-0">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ketik pesan..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1"
        />
        <Button size="icon" onClick={handleSend} disabled={!text.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
