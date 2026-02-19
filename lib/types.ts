export interface DemoUser {
  id: string
  name: string
  email: string
  avatar: string
  role: "buyer" | "seller" | "admin"
  badges: string[]
  joinedAt: string
}

export interface ChatMessage {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  text: string
  timestamp: string
  read: boolean
}

export interface ChatConversation {
  id: string
  productId: string
  productTitle: string
  productImage: string
  buyerId: string
  buyerName: string
  sellerId: string
  sellerName: string
  lastMessage: string
  lastTimestamp: string
  unreadCount: number
}

export interface CartItem {
  id: string
  productId: string
  title: string
  image: string
  price: number
  size: string
  condition: string
  mode: string
  sellerId: string
  sellerName: string
  quantity: number
  addedAt: string
}

export interface WishlistItem {
  id: string
  productId: string
  title: string
  image: string
  price: number
  size: string
  condition: string
  mode: string
  sellerId: string
  sellerName: string
  addedAt: string
}

export interface Review {
  id: string
  transactionId: string
  productId: string
  productTitle: string
  reviewerId: string
  reviewerName: string
  reviewerAvatar: string
  sellerId: string
  rating: number
  comment: string
  createdAt: string
}

export interface Transaction {
  id: string
  productId: string
  productTitle: string
  productImage: string
  buyerId: string
  buyerName: string
  sellerId: string
  sellerName: string
  price: number
  shippingFee: number
  total: number
  status: "pending" | "processing" | "shipped" | "completed" | "cancelled"
  date: string
  reviewed: boolean
}

export interface CalendarEvent {
  id: string
  date: string
  type: "transaction" | "donation" | "charity_event" | "distribution"
  title: string
  description: string
  amount?: number
  productId?: string
  eventId?: string
  color: string
}
